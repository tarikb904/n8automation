import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter, Download, Eye, Star } from "lucide-react";
import { useGithubWorkflows } from "@/hooks/useGithubWorkflows";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// categories are derived dynamically below
const complexityLevels = ["All", "beginner", "intermediate", "advanced"];

export default function Workflows() {
  const { workflows, loading, error, downloadWorkflow } = useGithubWorkflows();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedComplexity, setSelectedComplexity] = useState("All");

  const categories = useMemo(() => {
    const unique = Array.from(new Set(workflows.map((w) => w.category)));
    return ["All", ...unique];
  }, [workflows]);

  const handleDownload = async (wf: { rawUrl: string; name: string }) => {
    const result = await downloadWorkflow(wf.rawUrl, wf.name);
    if (result.success) {
      toast({
        title: "Download Started",
        description: "Workflow has been downloaded successfully!",
      });
    } else {
      toast({
        title: "Download Failed",
        description: result.error || "Failed to download workflow",
        variant: "destructive",
      });
    }
  };

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (workflow.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workflow.integrations.some(integration => 
                           integration.toLowerCase().includes(searchQuery.toLowerCase())
                         );
    const matchesCategory = selectedCategory === "All" || workflow.category === selectedCategory;
    const matchesComplexity = selectedComplexity === "All" || workflow.complexity === selectedComplexity;
    
    return matchesSearch && matchesCategory && matchesComplexity;
  });

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "beginner": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "intermediate": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "advanced": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="p-6 text-center">
            <p className="text-destructive">Error loading workflows: {error}</p>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              AI Automation Workflows
            </h1>
            <p className="text-muted-foreground">
              Discover and explore {workflows.length}+ GitHub workflows
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="btn-glow">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="vision-card border-border/20">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search workflows, integrations, or descriptions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background/50 border-border/20"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedComplexity} onValueChange={setSelectedComplexity}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Complexity" />
                </SelectTrigger>
                <SelectContent>
                  {complexityLevels.map(level => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="vision-card border-border/20">
                <CardHeader className="pb-3">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-20" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-8 flex-1" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkflows.map(workflow => (
              <Card key={workflow.id} className="vision-card border-border/20 hover:scale-105 transition-all duration-300 group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors">
                        {workflow.name}
                      </CardTitle>
                      <Badge className={`text-xs ${getComplexityColor(workflow.complexity)}`}>
                        {workflow.complexity}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {workflow.rating}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {workflow.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {workflow.integrations.map(integration => (
                        <Badge key={integration} variant="outline" className="text-xs">
                          {integration}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>${workflow.price}</span>
                      <span>{workflow.downloads} downloads</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 pt-2">
                    <Button size="sm" className="flex-1 bg-gradient-primary hover:opacity-90" onClick={() => window.open((workflow as any).htmlUrl, "_blank")}> 
                      <Eye className="h-3 w-3 mr-2" />
                      View
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="btn-glow"
                      onClick={() => handleDownload({ rawUrl: (workflow as any).rawUrl, name: workflow.name })}
                    >
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && filteredWorkflows.length === 0 && (
          <Card className="vision-card border-border/20">
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">
                No workflows found matching your criteria.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}