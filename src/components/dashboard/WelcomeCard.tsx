import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function WelcomeCard() {
  return (
    <Card className="vision-card border-border/20 overflow-hidden relative col-span-full lg:col-span-2">
      <div className="absolute inset-0 bg-gradient-primary opacity-10" />
      <div className="absolute top-0 right-0 w-64 h-64 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-vision-blue to-vision-purple rounded-full blur-3xl" />
      </div>
      
      <CardContent className="p-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-4 flex-1">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Welcome back,</p>
              <h2 className="text-3xl font-bold text-foreground">
                John Doe
              </h2>
              <p className="text-muted-foreground">
                Glad to see you again! 🎉
              </p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Explore 2,053+ automation workflows
              </p>
              <p className="text-xs text-muted-foreground">
                365+ integrations • 29,445 nodes • Lightning fast search
              </p>
            </div>
            
            <Button 
              className="bg-gradient-primary hover:opacity-90 transition-opacity btn-glow mt-4"
            >
              Browse Workflows
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="relative animate-float">
            <div className="w-40 h-40 bg-gradient-to-br from-vision-blue/30 to-vision-purple/30 rounded-full blur-xl" />
            <div className="absolute inset-0 w-40 h-40 bg-gradient-to-br from-vision-blue to-vision-purple rounded-full opacity-80" />
            <div className="absolute inset-4 w-32 h-32 bg-card rounded-full flex items-center justify-center">
              <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                n8n
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}