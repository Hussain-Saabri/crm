"use client";

import React, { useState, useRef } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getFacetedUniqueValues,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from '@tanstack/react-virtual';
import { SearchX, RefreshCw, ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { SearchBar } from "@/components/ui/SearchBar";
import { TableSkeleton } from "@/components/ui/TableSkeleton";

import { statusOptions, columns } from "./columns";
import { mockData } from "./mock-data";
import { useLeadsStore } from "@/store/useLeadsStore";

export function LeadsTable({ globalFilter, setGlobalFilter, isLoading }) {
  const leads = useLeadsStore((state) => state.leads);
  
  const data = leads.length > 0 ? leads : mockData;
  console.log("leads data", data);
  const [sorting, setSorting] = useState([]);
  const tableContainerRef = useRef(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
  });

  const activeStatusFilter = table.getColumn("crm_status")?.getFilterValue() || [];
  
  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 50,
    overscan: 5,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const paddingTop = virtualRows.length > 0 ? virtualRows[0]?.start || 0 : 0;
  const paddingBottom = virtualRows.length > 0
    ? rowVirtualizer.getTotalSize() - (virtualRows[virtualRows.length - 1]?.end || 0)
    : 0;

  // isLoading check removed from here

  return (
    <TooltipProvider delayDuration={300}>
      <div className="w-full flex flex-col gap-4">
        
        {/* Custom Toolbar matching the UI design */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full">
          
          {/* Left Side: Status Tabs */}
          <div className="flex space-x-6 overflow-x-auto w-full sm:w-auto scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {[{ label: "All", value: "ALL" }, ...statusOptions].map((tab) => {
              const isActive = tab.value === "ALL" 
                ? activeStatusFilter.length === 0 
                : activeStatusFilter.includes(tab.value);
              
              return (
                <button
                  key={tab.value}
                  onClick={() => {
                    if (tab.value === "ALL") {
                      table.getColumn("crm_status")?.setFilterValue(undefined);
                    } else {
                      table.getColumn("crm_status")?.setFilterValue([tab.value]);
                    }
                  }}
                  className={`py-3 text-sm font-semibold transition-colors focus:outline-none whitespace-nowrap border-b-[3px] -mb-[1px] ${
                    isActive 
                      ? "border-[#25B990] text-gray-900 dark:text-gray-100" 
                      : "border-transparent text-gray-900 hover:border-gray-300 dark:text-gray-100 dark:hover:border-gray-600"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Right Side: Search */}
          <div className="flex items-center gap-3 w-full sm:w-auto py-2 sm:py-0">
            <SearchBar 
              value={globalFilter}
              onSearch={setGlobalFilter}
              placeholder="Search by Company Name..."
              className="w-full sm:w-[320px] h-[40px]"
            />
          </div>
        </div>

        {/* Clear Filters (if search is active) */}
        {globalFilter && (
          <div className="flex justify-end w-full">
            <button 
              onClick={() => {
                setGlobalFilter("");
              }}
              className="text-xs font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              Clear filters
            </button>
          </div>
        )}

        {isLoading ? (
          <TableSkeleton rows={6} columns={7} />
        ) : (
          <div className="w-full relative bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-[12px] overflow-hidden">
          {/* Patch to extend header background behind the scrollbar track */}
          <div className="absolute top-0 right-0 w-3 h-[49px] bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 pointer-events-none z-10" aria-hidden="true" />
          
          <div 
            ref={tableContainerRef}
            className="w-full relative z-20 overflow-x-auto overflow-y-auto max-h-[65vh] pb-0 focus:outline-none
        [&::-webkit-scrollbar]:h-1.5 
        [&::-webkit-scrollbar]:w-1.5
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-gray-700
        [&::-webkit-scrollbar-thumb]:rounded-full 
        [&::-webkit-scrollbar-thumb]:cursor-pointer
        hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 dark:hover:[&::-webkit-scrollbar-thumb]:bg-gray-600
        transition-colors"
        >
          <table className="w-full text-sm text-left whitespace-nowrap outline-none focus:outline-none">
            <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-950 sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 outline-none focus:outline-none">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} >
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        className="px-6 py-4 font-bold text-gray-900 dark:text-gray-100 tracking-wider transition-colors "
                      >
                        <div className="flex items-center gap-2 outline-none focus:outline-none">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/50">
              {paddingTop > 0 && (
                <tr>
                  <td style={{ height: `${paddingTop}px` }} />
                </tr>
              )}
              {virtualRows.map((virtualRow) => {
                const row = rows[virtualRow.index];
                return (
                <tr key={row.id} className="hover:bg-[#25B990]/5 hover:cursor-pointer transition-colors">
                  {row.getVisibleCells().map((cell) => {
                    const cellValue = cell.getValue();
                    const isEmpty = cellValue === null || cellValue === undefined || cellValue === "";
                    const tooltipText = (cell.column.id === "crm_note" || cell.column.id === "description") && typeof cellValue === 'string' && cellValue.length > 30 ? cellValue : undefined;
                    
                    return (
                      <td 
                        key={cell.id} 
                        className="px-6 py-3 text-sm text-gray-700 dark:text-gray-300 max-w-[250px]"
                      >
                        {isEmpty ? (
                          <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800/80 text-gray-500 dark:text-gray-400 text-[12px] font-medium">
                            Not provided
                          </span>
                        ) : tooltipText ? (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="truncate cursor-pointer w-full focus:outline-none" tabIndex={0}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-[320px] whitespace-pre-line break-words border border-gray-800 bg-gray-900 text-gray-50 p-3 shadow-xl">
                              <p className="text-[13px] font-medium leading-relaxed tracking-wide opacity-90">{tooltipText}</p>
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          <div className="truncate w-full">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              )})}
              {paddingBottom > 0 && (
                <tr>
                  <td style={{ height: `${paddingBottom}px` }} />
                </tr>
              )}
            </tbody>
          </table>
          
          {table.getRowModel().rows.length === 0 && (
            <div className="flex flex-col items-center justify-center text-gray-500 py-20 w-full sticky left-0">
              <SearchX size={48} strokeWidth={1.5} className="text-gray-300 dark:text-gray-700 mb-4" />
              <p className="text-base font-semibold text-gray-900 dark:text-gray-100">No leads found</p>
              <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">We couldn't find anything matching your search.</p>
            </div>
          )}
        </div>
        </div>
        )}
      </div>
    </TooltipProvider>
  );
}
