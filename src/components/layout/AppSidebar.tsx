import { 
  LayoutDashboard, 
  Search, 
  Settings, 
  CreditCard, 
  Users, 
  FileText, 
  Zap,
  Shield,
  Crown,
  Database
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Workflows", url: "/workflows", icon: Zap },
  { title: "Search", url: "/search", icon: Search },
  { title: "Analytics", url: "/analytics", icon: Database },
];

const accountItems = [
  { title: "Pricing", url: "/pricing", icon: CreditCard },
  { title: "Team", url: "/team", icon: Users },
  { title: "Settings", url: "/settings", icon: Settings },
];

const adminItems = [
  { title: "Admin Panel", url: "/admin", icon: Shield },
  { title: "Documentation", url: "/docs", icon: FileText },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const getNavClassName = (path: string) =>
    isActive(path)
      ? "bg-gradient-primary text-white font-medium glow-primary"
      : "hover:bg-sidebar-accent/50 text-sidebar-foreground";

  return (
    <Sidebar className="vision-card border-r-0">
      <SidebarHeader className="p-6 border-b border-border/10">
        <div className="flex items-center gap-3">
          {collapsed ? (
            <img src="/lovable-uploads/05251343-4251-4d60-81d9-c8bcf1e0377b.png" alt="BotLibrary logo" className="h-8 w-8 rounded" />
          ) : (
            <>
              <img src="/lovable-uploads/05251343-4251-4d60-81d9-c8bcf1e0377b.png" alt="BotLibrary logo" className="h-8 w-8 rounded" />
              <div>
                <h2 className="text-lg font-semibold text-white">BotLibrary</h2>
                <p className="text-sm text-white/70">All Workflows</p>
              </div>
            </>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-12 rounded-lg">
                    <NavLink 
                      to={item.url} 
                      className={`flex items-center gap-3 px-3 transition-all duration-200 ${getNavClassName(item.url)}`}
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-12 rounded-lg">
                    <NavLink 
                      to={item.url} 
                      className={`flex items-center gap-3 px-3 transition-all duration-200 ${getNavClassName(item.url)}`}
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
            Admin
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-12 rounded-lg">
                    <NavLink 
                      to={item.url} 
                      className={`flex items-center gap-3 px-3 transition-all duration-200 ${getNavClassName(item.url)}`}
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Button 
          className="w-full bg-gradient-secondary hover:opacity-90 transition-opacity btn-glow"
          size={collapsed ? "icon" : "default"}
        >
          {collapsed ? <Crown className="h-4 w-4" /> : (
            <>
              <Crown className="h-4 w-4 mr-2" />
              Upgrade to Pro
            </>
          )}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}