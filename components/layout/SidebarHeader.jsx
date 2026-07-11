import React from 'react';
import { cn } from "@/lib/utils";
import { ModeToggle } from '../ui/dark-button';
export function SidebarHeader({ collapsed }) {
  return (
    <div className={cn(
      "flex items-center h-[64px] px-4 border-b border-gray-100 dark:border-gray-800",
      collapsed ? "justify-center" : "justify-start gap-3"
    )}>
      <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center shrink-0 shadow-sm">
        <span className="text-white font-bold text-lg leading-none">L</span>
      </div>
      {!collapsed &&
        <span className="font-semibold text-lg text-gray-900 dark:text-white tracking-tight">Logo</span>
      }
    </div>);
}