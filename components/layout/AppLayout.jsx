"use client";

import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";
import { NAVIGATION_ITEMS } from "@/constants/navigation";
import Link from "next/link";
import { ModeToggle } from "../ui/dark-button";
import { usePathname } from "next/navigation";

export function AppLayout({ children }) {
  const pathname = usePathname();

  const activeItem = NAVIGATION_ITEMS.find((item) => item.href === pathname);
  const activeLabel = activeItem ? activeItem.label : "CRM";

  return (
    <div className="flex min-h-[100dvh]  text-gray-900 w-full overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-[100dvh] shrink-0">
        <Sidebar />
      </div>


      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-[100dvh] overflow-hidden w-full">
        {/* Mobile Top Nav */}
        <div className="md:hidden flex items-center justify-between h-14 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 px-5 shrink-0 relative z-30 mb-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-[6px] bg-black flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-sm leading-none">L</span>
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">Logo</span>
          </div>
          <ModeToggle />
        </div>

        {/* Desktop Top Header */}
        <div className="hidden md:flex items-center justify-between h-16 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-8 shrink-0 w-full">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{activeLabel}</h2>
          <ModeToggle />
        </div>
        
        <main className="flex-1 overflow-y-auto w-full pb-16 md:pb-0">
          {children}
        </main>

        {/* Standard Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 z-50 flex justify-around items-center px-2 pb-safe dark:text-white">
          {NAVIGATION_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center flex-1 h-full transition-all duration-300",
                  isActive ? "text-[#25B990] dark:text-white" : "text-gray-400 hover:text-gray-600 dark:text-gray-400 hover:text-gray-600"
                )}
              >
                <Icon size={22} className={cn("mb-1", isActive ? "stroke-[2.5px]" : "stroke-[2px]")} />
                <span className={cn(
                  "text-[10px] leading-none transition-all duration-300",
                  isActive ? "font-bold" : "font-medium"
                )}>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>);

}