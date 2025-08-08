import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";

const salesData = [
  { month: "Jan", value: 400 },
  { month: "Feb", value: 300 },
  { month: "Mar", value: 600 },
  { month: "Apr", value: 800 },
  { month: "May", value: 750 },
  { month: "Jun", value: 950 },
  { month: "Jul", value: 1200 },
];

const usageData = [
  { name: "Users", value: 32984 },
  { name: "Clicks", value: 2420000 },
  { name: "Sales", value: 2400 },
  { name: "Items", value: 320 },
];

interface ChartCardProps {
  type: "line" | "bar";
  title: string;
  subtitle: string;
  className?: string;
}

export function ChartCard({ type, title, subtitle, className = "" }: ChartCardProps) {
  return (
    <Card className={`vision-card border-border/20 ${className}`}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {subtitle}
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {type === "line" ? (
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--vision-blue))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--vision-blue))", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "hsl(var(--vision-blue))", fill: "hsl(var(--vision-blue))" }}
                />
              </LineChart>
            ) : (
              <BarChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Bar 
                  dataKey="value" 
                  fill="hsl(var(--vision-purple))" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}