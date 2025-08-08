import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: LucideIcon;
  iconColor: string;
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon, 
  iconColor 
}: StatsCardProps) {
  return (
    <Card className="vision-card border-border/20 hover:scale-105 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {title}
            </p>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-foreground">
                {value}
              </p>
              <div className="flex items-center gap-1">
                <span 
                  className={`text-sm font-medium ${
                    changeType === "positive" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {changeType === "positive" ? "+" : ""}{change}
                </span>
              </div>
            </div>
          </div>
          <div className={`p-3 rounded-xl ${iconColor}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}