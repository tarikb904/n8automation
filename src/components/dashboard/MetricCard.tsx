import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  progress: number;
  className?: string;
}

export function MetricCard({ 
  title, 
  value, 
  subtitle, 
  progress, 
  className = "" 
}: MetricCardProps) {
  return (
    <Card className={`vision-card border-border/20 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground">
              {value}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {subtitle}
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-foreground">{progress}%</span>
          </div>
          <Progress 
            value={progress} 
            className="h-2"
          />
        </div>
      </CardContent>
    </Card>
  );
}