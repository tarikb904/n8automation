"use client";

import React from "react";
import { NavLink } from "react-router-dom";
import { SidebarMenuButton } from "../ui/sidebar-menu-button";
import { getNavClassName } from "../../lib/utils";

const AppSidebar = ({ items }) => {
  return (
    <nav className="flex flex-col space-y-1">
      {items.map((item) => {
        if (item.id === "search") {
          return (
            <SidebarMenuButton asChild className="h-12 rounded-lg" key={item.id}>
              <NavLink
                to="/workflows/search"
                className={`flex items-center gap-3 px-3 transition-all duration-200 ${getNavClassName("/workflows/search")}`}
              >
                {item.icon}
                <span className="sr-only">{item.label}</span>
              </NavLink>
            </SidebarMenuButton>
          );
        }
        return (
          <SidebarMenuButton asChild className="h-12 rounded-lg" key={item.id}>
            <NavLink
              to={item.url}
              className={`flex items-center gap-3 px-3 transition-all duration-200 ${getNavClassName(item.url)}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          </SidebarMenuButton>
        );
      })}
    </nav>
  );
};

export default AppSidebar;