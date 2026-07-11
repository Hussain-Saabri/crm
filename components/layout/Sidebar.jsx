"use client";

import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { NAVIGATION_ITEMS } from "@/constants/navigation";
import { SidebarHeader } from "./SidebarHeader";
import { NavItem } from "./NavItem";
import { SidebarToggle } from "./SidebarToggle";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Sidebar({ collapsed: controlledCollapsed, onToggle: controlledOnToggle }) {
  const [internalCollapsed, setInternalCollapsed] = useState(false);

  const isControlled = controlledCollapsed !== undefined;
  const collapsed = isControlled ? controlledCollapsed : internalCollapsed;

  const handleToggle = () => {
    if (isControlled && controlledOnToggle) {
      controlledOnToggle();
    } else {
      setInternalCollapsed(!collapsed);
    }
  };

  return (
    <aside
      className={cn(
        "relative flex flex-col h-screen shrink-0",
        "bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800",
        "transition-all duration-300 ease-in-out z-40",
        collapsed ? "w-[72px]" : "w-[210px]",
       
        "hidden md:flex"
      )}>
      
      <SidebarHeader collapsed={collapsed} />
      
      <SidebarToggle collapsed={collapsed} onToggle={handleToggle} />

      <div className="flex-1 overflow-y-auto py-6">
        <TooltipProvider delayDuration={0}>
          <nav className="flex flex-col gap-1">
            {NAVIGATION_ITEMS.map((item) =>
            <NavItem key={item.href} item={item} collapsed={collapsed} />
            )}
          </nav>
        </TooltipProvider>
      </div>
    </aside>
  );
}