import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export function NavItem({ item, collapsed }) {
  const pathname = usePathname();

  
  const isActive = pathname === item.href || pathname === '/' && item.href === '/dashboard';
  const Icon = item.icon;

  const linkElement = (
    <Link
      href={item.href}
      className={cn(
        "relative flex items-center h-[46px] rounded-[14px] transition-all duration-300 group focus:outline-none",
        collapsed ? "justify-center px-0 mx-2" : "px-3.5 mx-3 gap-3.5",
        isActive ?
        "bg-[#25B990]/10 text-[#25B990] font-bold" :
        "bg-transparent text-gray-800 dark:text-white hover:text-gray-900 font-bold"
      )}
    > 
      <Icon
        size={20}
        strokeWidth={isActive ? 2.5 : 2}
        className={cn(
          "shrink-0 transition-all duration-300",
          isActive ? "text-[#25B990] " : "text-gray-900 dark:text-[#25B990] "
        )} />      
      {!collapsed &&
      <span className="truncate text-gray-900 dark:text-white">{item.label}</span>
      }
    </Link>
  );

  if (!collapsed) {
    return linkElement;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {linkElement}
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={12} className="bg-gray-900 text-gray-50 border border-gray-800 shadow-xl px-3 py-2 text-xs font-semibold rounded-md">
        {item.label}
      </TooltipContent>
    </Tooltip>
  );
}