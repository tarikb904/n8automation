import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { WelcomeCard } from "@/components/dashboard/WelcomeCard";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { DollarSign, Users, Activity, Zap } from "lucide-react";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <WelcomeCard />
          <MetricCard
            title="Satisfaction Rate"
            value="95%"
            subtitle="Based on latest surveys"
            progress={95}
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Workflows"
            value="2,053"
            change="12%"
            changeType="positive"
            icon={Zap}
            iconColor="bg-gradient-to-r from-vision-blue to-blue-500"
          />
          <StatsCard
            title="Active Users"
            value="2,300"
            change="3%"
            changeType="positive"
            icon={Users}
            iconColor="bg-gradient-to-r from-vision-purple to-purple-500"
          />
          <StatsCard
            title="Integrations"
            value="365"
            change="8%"
            changeType="positive"
            icon={Activity}
            iconColor="bg-gradient-to-r from-vision-pink to-pink-500"
          />
          <StatsCard
            title="Revenue"
            value="$103,430"
            change="5%"
            changeType="positive"
            icon={DollarSign}
            iconColor="bg-gradient-to-r from-green-500 to-emerald-500"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            type="line"
            title="Workflow Usage"
            subtitle="+5% more than last month"
          />
          <ChartCard
            type="bar"
            title="Active Users"
            subtitle="(+23) than last week"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}