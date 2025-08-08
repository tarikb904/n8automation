"use client";

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { cn } from "../lib/utils";
import { LucideSearch } from "lucide-react";

const sampleWorkflows = [
  "Email Marketing Automation",
  "Social Media Scheduler",
  "Lead Generation Funnel",
  "E-commerce Order Processing",
  "Customer Support Ticketing",
  "Data Backup and Sync",
  "Finance Invoice Automation",
  "Content Publishing Workflow",
  "Slack Notification Bot",
  "Webhook Integration",
];

const WorkflowsSearch = () => {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim() === "") {
      setFiltered([]);
      return;
    }
    const lower = query.toLowerCase();
    setFiltered(
      sampleWorkflows.filter((w) => w.toLowerCase().includes(lower)).slice(0, 5)
    );
  }, [query]);

  const handleSelect = (workflowName: string) => {
    // Navigate to workflow detail or search results page
    // For now, just navigate to /workflows with query param
    navigate(`/workflows?search=${encodeURIComponent(workflowName)}`);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-8 bg-background">
      <div className="relative w-full max-w-4xl">
        <div
          className={cn(
            "flex items-center border border-border rounded-lg bg-input px-4 py-3 transition-transform duration-300",
            query ? "scale-110 shadow-lg" : "scale-100"
          )}
        >
          <LucideSearch className="mr-3 h-6 w-6 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="search"
            placeholder="Search workflows..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="text-lg font-semibold bg-transparent focus:outline-none"
          />
        </div>
        {filtered.length > 0 && (
          <Card className="absolute top-full mt-2 w-full max-h-60 overflow-auto border border-border bg-background shadow-lg z-50">
            <ul>
              {filtered.map((item) => (
                <li
                  key={item}
                  className="cursor-pointer px-4 py-2 hover:bg-accent hover:text-accent-foreground"
                  onClick={() => handleSelect(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WorkflowsSearch;