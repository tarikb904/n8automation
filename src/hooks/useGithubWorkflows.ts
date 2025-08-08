import { useEffect, useState } from "react";

export interface GithubWorkflowItem {
  id: string;
  name: string;
  description: string | null;
  category: string; // Using a single category label for GitHub-sourced items
  complexity: "beginner" | "intermediate" | "advanced"; // defaulted when unknown
  integrations: string[]; // best-effort (left empty unless parsed later)
  rating: number; // placeholder
  downloads: number; // placeholder
  price: number; // placeholder (free)
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // GitHub specifics
  path: string;
  rawUrl: string;
  htmlUrl: string;
}

interface GithubTreeResponse {
  sha: string;
  url: string;
  truncated: boolean;
  tree: Array<{
    path: string;
    mode: string;
    type: "blob" | "tree";
    sha: string;
    size?: number;
    url: string;
  }>;
}

const OWNER = "Zie619";
const REPO = "n8n-workflows";
const DEFAULT_BRANCHES = ["main", "master"] as const;

// Utility to clean workflow name
function cleanName(rawName: string) {
  // Remove numeric prefix and underscores, then capitalize words
  const nameWithoutPrefix = rawName.replace(/^\d+_*/, "");
  const words = nameWithoutPrefix.split(/[_\s]+/);
  const capitalized = words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
  return capitalized.join(" ");
}

// Utility to generate friendly description
function generateDescription(name: string) {
  return `Automation workflow: ${name}`;
}

export function useGithubWorkflows() {
  const [workflows, setWorkflows] = useState<GithubWorkflowItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const fetchTree = async (branch: string) => {
    const resp = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/git/trees/${branch}?recursive=1`
    );
    if (!resp.ok) throw new Error(`GitHub API error (${resp.status})`);
    return (await resp.json()) as GithubTreeResponse;
  };

  const fetchWorkflows = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try multiple default branches for robustness
      let tree: GithubTreeResponse | null = null;
      let usedBranch: string | null = null;
      for (const branch of DEFAULT_BRANCHES) {
        try {
          tree = await fetchTree(branch);
          usedBranch = branch;
          break;
        } catch (e) {
          // Try next branch
        }
      }
      if (!tree || !usedBranch) throw new Error("Unable to access repository tree");

      const files = tree.tree
        .filter((item) => item.type === "blob" && /\.json$/i.test(item.path))
        .map<GithubWorkflowItem>((item) => {
          const fileName = item.path.split("/").pop() || item.path;
          const rawName = fileName.replace(/\.json$/i, "");
          const name = cleanName(rawName);
          const category = item.path.includes("/")
            ? item.path.split("/")[0]
            : "GitHub";
          const now = new Date().toISOString();

          return {
            id: item.sha,
            name,
            description: generateDescription(name),
            category,
            complexity: "beginner",
            integrations: [],
            rating: 5,
            downloads: 0,
            price: 0,
            is_featured: false,
            is_active: true,
            created_at: now,
            updated_at: now,
            path: item.path,
            rawUrl: `https://raw.githubusercontent.com/${OWNER}/${REPO}/${usedBranch}/${item.path}`,
            htmlUrl: `https://github.com/${OWNER}/${REPO}/blob/${usedBranch}/${item.path}`,
          };
        });

      setWorkflows(files);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load GitHub workflows");
      setWorkflows([]);
    } finally {
      setLoading(false);
    }
  };

  const downloadWorkflow = async (rawUrl: string, fileName: string) => {
    try {
      const resp = await fetch(rawUrl);
      if (!resp.ok) throw new Error(`Failed to fetch file (${resp.status})`);
      const blob = await resp.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${cleanName(fileName)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Download failed",
      };
    }
  };

  return { workflows, loading, error, downloadWorkflow, refetch: fetchWorkflows };
}