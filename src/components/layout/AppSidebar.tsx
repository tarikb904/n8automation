"use client";

import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarHeader 
} from "../ui/sidebar";
import { cn } from "../../lib/utils";
import { 
  LayoutDashboard, 
  Workflow, 
  Search, 
  Settings, 
  DollarSign,
  Bot 
} from "lucide-react";

const AppSidebar = () => {
  const location = useLocation();

  const items = [
    { id: "dashboard", label: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { id: "workflows", label: "Workflows", url: "/workflows", icon: Workflow },
    { id: "search", label: "Search", url: "/workflows/search", icon: Search },
    { id: "pricing", label: "Pricing", url: "/pricing", icon: DollarSign },
    { id: "settings", label: "Settings", url: "/settings", icon: Settings },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <Bot className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-white">BotLibrary</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <NavLink to={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;