import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from "@/lib/utils";

export function SidebarToggle({ collapsed, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "absolute -right-3 top-6 z-50",
        "flex items-center justify-center w-6 h-6",
        "bg-white border border-gray-200 rounded-full",
        "text-gray-500 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-300",
        "transition-all duration-200 shadow-sm outline-none"
      )}>
      
      {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
    </button>);

}