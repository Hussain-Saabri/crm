import React from "react";
import { AlertCircle } from "lucide-react";
export function SkippedRecordsTable({ records }) {
  if (!records || records.length === 0) return null;

  return (
    <div className="w-full bg-white rounded-3xl border border-red-200 shadow-[0_2px_10px_-4px_rgba(239,68,68,0.05)] overflow-hidden mt-6">
      <div className="p-6 border-b border-red-100 flex items-center justify-between bg-red-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-red-600">
            <AlertCircle size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Skipped Records</h3>
            <p className="text-sm text-gray-500 mt-0.5">These rows were not imported due to errors.</p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 text-sm font-semibold text-red-600 bg-white px-3 py-1.5 rounded-lg border border-red-200">
          {records.length} Failed
        </span>
      </div>

      <div className="w-full overflow-auto max-h-[300px]">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead className="bg-white border-b border-gray-200 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4 font-semibold text-xs text-gray-500 uppercase tracking-wider w-20 text-center">
                Row #
              </th>
              <th className="px-6 py-4 font-semibold text-xs text-gray-500 uppercase tracking-wider w-[40%]">
                Original Data
              </th>
              <th className="px-6 py-4 font-semibold text-xs text-gray-500 uppercase tracking-wider w-[40%]">
                Reason
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {records.map((record, idx) =>
            <tr key={idx} className="hover:bg-red-50/30 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-500 font-medium text-center border-r border-gray-50">
                  {record.rowNum}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 font-mono truncate max-w-xs">
                  {record.data}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-red-50 text-red-700 border border-red-100">
                    {record.reason}
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>);

}