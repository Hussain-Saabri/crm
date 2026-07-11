import React, { useState, useRef } from "react";

import { motion } from "framer-motion";
import { TableSkeleton } from "@/components/ui/TableSkeleton";
import { SearchBar } from "@/components/ui/SearchBar";
import { useVirtualizer } from '@tanstack/react-virtual';

export function CsvPreviewTable({ data, isLoading = false }) {
  const [searchTerm, setSearchTerm] = useState("");
  const tableContainerRef = useRef(null);

  if (isLoading) {
    return <TableSkeleton columns={4} rows={6} />;
  }

  if (!data || data.length === 0) return null;

  const headers = data[0];
  const allRows = data.slice(1);

  // Filter if search term exists (basic filter on any column)
  const filteredRows = searchTerm ?
  allRows.filter((row) =>
  row.some((cell) => String(cell).toLowerCase().includes(searchTerm.toLowerCase()))
  ) :
  allRows;

  const rowVirtualizer = useVirtualizer({
    count: filteredRows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 40,
    overscan: 5,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const paddingTop = virtualRows.length > 0 ? virtualRows[0]?.start || 0 : 0;
  const paddingBottom = virtualRows.length > 0
    ? rowVirtualizer.getTotalSize() - (virtualRows[virtualRows.length - 1]?.end || 0)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex flex-col">
      
      {/* Toolbar */}
      <div className="flex flex-col  sm:flex-row-reverse items-center justify-between pb-4 gap-4 w-full  bg-transparent">
        <SearchBar 
          value={searchTerm}
          onSearch={setSearchTerm}
          onChange={(val) => {
            if (val === "") setSearchTerm("");
          }}
          placeholder="Search rows..."
          className="w-full sm:w-[320px]"
        />
        
        <div className="text-sm font-medium text-gray-500 bg-gray-50 dark:text-gray-400 dark:bg-black px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700">
          Showing {filteredRows.length.toLocaleString()} rows
        </div>
      </div>

      {/* Table Container */}
      <div className="w-full relative bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-[12px] overflow-hidden">
        {/* Patch to extend header background behind the scrollbar track */}
        <div className="absolute top-0 right-0 w-3 h-[41px] bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 pointer-events-none z-10" aria-hidden="true" />

        <div 
          ref={tableContainerRef}
          className="w-full relative z-20 overflow-y-auto overflow-x-auto max-h-[61vh] pb-0 focus:outline-none outline-none
        [&::-webkit-scrollbar]:h-1.5 
        [&::-webkit-scrollbar]:w-1.5
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-gray-700
        [&::-webkit-scrollbar-thumb]:rounded-full 
        [&::-webkit-scrollbar-thumb]:cursor-pointer
        hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 dark:hover:[&::-webkit-scrollbar-thumb]:bg-gray-600
        transition-colors"
      >
        <table className="w-full  text-left border-collapse whitespace-nowrap outline-none focus:outline-none">
          <thead className="bg-gray-50 dark:bg-gray-900 sticky top-0 z-10 outline-none focus:outline-none">
            <tr className="outline-none focus:outline-none">
              {/* Row index column */}
              <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 font-semibold text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider w-16 text-center outline-none focus:outline-none">
                #
              </th>
              {headers.map((header, idx) =>
              <th
                key={idx}
                className="px-6 py-3 border-b border-gray-200 dark:border-gray-800 font-bold text-xs text-gray-900 dark:text-gray-200 uppercase tracking-wider outline-none focus:outline-none">            
                  {header}
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 outline-none focus:outline-none">
            {paddingTop > 0 && (
              <tr>
                <td style={{ height: `${paddingTop}px` }} colSpan={headers.length + 1} />
              </tr>
            )}
            {virtualRows.length > 0 ?
            virtualRows.map((virtualRow) => {
              const row = filteredRows[virtualRow.index];
              const rowIdx = virtualRow.index;
              return (
            <tr
              key={rowIdx}
              className="hover:bg-[#25B990]/5 dark:hover:bg-[#25B990]/10 transition-colors">
              
                  <td className="px-4 py-3 text-xs text-gray-400 dark:text-gray-500 text-center border-r border-gray-50 dark:border-gray-800/50 font-medium bg-gray-50/30 dark:bg-gray-900/50">
                    {rowIdx + 1}
                  </td>
                  {row.map((cell, cellIdx) =>
              <td
                key={cellIdx}
                className="px-6 py-3 text-sm text-gray-700 dark:text-gray-300 truncate max-w-xs">
                
                      {cell}
                    </td>
              )}
                </tr>
            )}) : allRows.length === 0 ? (
              <tr>
                <td colSpan={headers.length + 1} className="p-0 relative">
                  <div className="sticky left-1/2 -translate-x-1/2 flex flex-col items-center justify-center min-h-[300px] w-fit text-center text-gray-500 dark:text-gray-400">
                    <p className="text-base font-semibold text-gray-900 dark:text-gray-200">No data rows found</p>
                    <p className="text-sm mt-1">This CSV file appears to only contain headers or is empty.</p>
                  </div>
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan={headers.length + 1} className="p-0 relative">
                  <div className="sticky left-1/2 -translate-x-1/2 flex flex-col items-center justify-center min-h-[300px] w-fit text-center text-gray-500 dark:text-gray-400">
                    <p className="text-base font-semibold text-gray-900 dark:text-gray-200">No matching records found</p>
                    <p className="text-sm mt-1">Try adjusting your search term</p>
                  </div>
                </td>
              </tr>
            )}
            {paddingBottom > 0 && (
              <tr>
                <td style={{ height: `${paddingBottom}px` }} colSpan={headers.length + 1} />
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </motion.div>);

}