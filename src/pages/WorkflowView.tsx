import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function WorkflowView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [jsonContent, setJsonContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // We expect the workflow rawUrl to be passed via location state or query param
  // But since we only have id, we will fetch the list again and find the rawUrl by id
  // For simplicity, we fetch workflows again here (could be optimized with context or global state)
  const [workflows, setWorkflows] = useState<
    Array<{ id: string; rawUrl: string; name: string }>
  >([]);

  useEffect(() => {
    async function fetchWorkflows() {
      try {
        setLoading(true);
        const resp = await fetch(
          "https://api.github.com/repos/Zie619/n8n-workflows/git/trees/main?recursive=1"
        );
        if (!resp.ok) throw new Error(`GitHub API error (${resp.status})`);
        const data = await resp.json();
        const files = data.tree
          .filter((item: any) => item.type === "blob" && /\.json$/i.test(item.path))
          .map((item: any) => {
            const fileName = item.path.split("/").pop() || item.path;
            const rawName = fileName.replace(/\.json$/i, "");
            const name = rawName
              .replace(/^\d+_*/, "")
              .split(/[_\s]+/)
              .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
              .join(" ");
            return {
              id: item.sha,
              rawUrl: `https://raw.githubusercontent.com/Zie619/n8n-workflows/main/${item.path}`,
              name,
            };
          });
        setWorkflows(files);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load workflows");
      } finally {
        setLoading(false);
      }
    }
    fetchWorkflows();
  }, []);

  useEffect(() => {
    if (!id || workflows.length === 0) return;
    const wf = workflows.find((w) => w.id === id);
    if (!wf) {
      setError("Workflow not found");
      setJsonContent(null);
      return;
    }
    setLoading(true);
    fetch(wf.rawUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch workflow (${res.status})`);
        return res.json();
      })
      .then((data) => {
        setJsonContent(JSON.stringify(data, null, 2));
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setJsonContent(null);
      })
      .finally(() => setLoading(false));
  }, [id, workflows]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
          <p className="text-destructive text-lg">{error}</p>
          <Button onClick={() => navigate(-1)} className="bg-gradient-primary hover:opacity-90">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Card className="vision-card border-border/20 max-w-4xl mx-auto">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Workflow JSON Viewer</CardTitle>
          <Button onClick={() => navigate(-1)} variant="outline" size="sm" className="btn-glow">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </CardHeader>
        <CardContent>
          <pre className="whitespace-pre-wrap max-h-[70vh] overflow-auto bg-background p-4 rounded-md border border-border text-sm text-foreground">
            {jsonContent}
          </pre>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}