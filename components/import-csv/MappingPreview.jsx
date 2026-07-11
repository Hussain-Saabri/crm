import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function MappingPreview({ mappings }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-white rounded-3xl border border-gray-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
      
      <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <h3 className="text-xl font-bold text-gray-900 tracking-tight">AI Mapping Preview</h3>
        <span className="flex items-center gap-1.5 text-sm font-semibold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200/50">
          <CheckCircle2 size={16} />
          {mappings.length} Fields Mapped
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead className="bg-white border-b border-gray-200">
            <tr>
              <th className="px-8 py-4 font-semibold text-sm text-gray-500 uppercase tracking-wider w-[45%]">
                CSV Column
              </th>
              <th className="px-4 py-4 w-[10%]"></th>
              <th className="px-8 py-4 font-semibold text-sm text-blue-600 uppercase tracking-wider w-[45%]">
                CRM Field
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mappings.map((mapping, idx) =>
            <motion.tr
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="hover:bg-gray-50/50 transition-colors group">
              
                <td className="px-8 py-4">
                  <div className="inline-flex px-3 py-1.5 bg-gray-100 border border-gray-200 text-gray-700 font-medium text-sm rounded-lg">
                    {mapping.csvHeader}
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <ArrowRight size={20} className="text-gray-400 group-hover:text-blue-500 transition-colors inline-block" />
                </td>
                <td className="px-8 py-4">
                  <div className="inline-flex px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 font-semibold text-sm rounded-lg shadow-sm">
                    {mapping.crmField}
                  </div>
                </td>
              </motion.tr>
            )}
            {mappings.length === 0 &&
            <tr>
                <td colSpan={3} className="px-8 py-12 text-center text-gray-500 text-sm">
                  No fields mapped.
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </motion.div>);

}