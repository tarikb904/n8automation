"use client";

import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { Bot, LayoutDashboard, Workflow, Search, Settings, DollarSign } from "lucide-react";

const AppSidebar = () => {
  const location = useLocation();
  
  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      id: "workflows",
      label: "Workflows",
      url: "/workflows",
      icon: <Workflow className="h-5 w-5" />,
    },
    {
      id: "search",
      label: "Search",
      url: "/workflows/search",
      icon: <Search className="h-5 w-5" />,
    },
    {
      id: "pricing",
      label: "Pricing",
      url: "/pricing",
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      id: "settings",
      label: "Settings",
      url: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex h-full w-64 flex-col bg-sidebar border-r">
      {/* Header */}
      <div className="flex h-16 items-center px-4 border-b">
        <div className="flex items-center gap-2">
          <Bot className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-sidebar-foreground">BotLibrary</span>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.url;
          return (
            <Button
              key={item.id}
              variant={isActive ? "secondary" : "ghost"}
              size="sm"
              className={cn(
                "w-full justify-start gap-3 h-12",
                isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
              )}
              asChild
            >
              <NavLink to={item.url}>
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            </Button>
          );
        })}
      </nav>
    </div>
  );
};

export default AppSidebar;