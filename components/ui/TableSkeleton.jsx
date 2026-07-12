import React from "react";
import { motion } from "framer-motion";

export function TableSkeleton({ rows = 5, columns = 5 }) {
  return (
    <div className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[12px] overflow-hidden">
      <div className="w-full overflow-x-auto pb-2">
        <table className="w-full text-sm text-left whitespace-nowrap">
          {/* Header Skeleton */}
          <thead className="bg-gray-50/80 dark:bg-gray-800/80 border-b border-gray-100 dark:border-gray-800">
            <tr>
              {Array.from({ length: columns }).map((_, colIdx) => (
                <th key={colIdx} className="px-6 py-4 min-w-[150px]">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
                </th>
              ))}
            </tr>
          </thead>
          
          {/* Body Skeleton */}
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {Array.from({ length: rows }).map((_, rowIdx) => (
              <motion.tr 
                key={rowIdx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: rowIdx * 0.05 }}
              >
                {Array.from({ length: columns }).map((_, colIdx) => {
                  // Create a deterministic width based on row and column index between 40% and 90%
                  const pseudoRandomWidth = 40 + ((rowIdx * 7 + colIdx * 13) % 51);
                  return (
                    <td key={colIdx} className="px-6 py-4 min-w-[150px]">
                      <div 
                        className="h-4 bg-gray-100 dark:bg-gray-800 rounded animate-pulse"
                        style={{ width: `${pseudoRandomWidth}%` }}
                      ></div>
                    </td>
                  );
                })}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
