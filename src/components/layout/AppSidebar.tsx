"use client";

import React, { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";

const navItems = [
  { label: "Dashboard", url: "/" },
  { label: "Workflows", url: "/workflows" },
  { label: "Profile", url: "/profile" },
  { label: "Settings", url: "/settings" },
  // Add other nav items here as needed
];

function getNavClassName(url: string) {
  return ({ isActive }: { isActive: boolean }) =>
    cn(
      "w-full rounded-lg py-2 text-sm font-medium transition-colors block px-3",
      isActive
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
    );
}

export function AppSidebar() {
  const [search, setSearch] = useState("");

  const filteredNavItems = useMemo(() => {
    if (!search.trim()) return navItems;
    const lowerSearch = search.toLowerCase();
    return navItems.filter((item) =>
      item.label.toLowerCase().includes(lowerSearch)
    );
  }, [search]);

  return (
    <aside className="flex flex-col w-64 h-full border-r border-border bg-background p-4">
      <div className="mb-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
            aria-label="Search navigation"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
        </div>
      </div>

      <nav className="flex flex-col space-y-1 overflow-y-auto">
        {filteredNavItems.length > 0 ? (
          filteredNavItems.map((item) => (
            <NavLink
              key={item.url}
              to={item.url}
              className={getNavClassName(item.url)}
            >
              {item.label}
            </NavLink>
          ))
        ) : (
          <p className="text-sm text-muted-foreground px-3">No results found.</p>
        )}
      </nav>
    </aside>
  );
}