import React from "react";
import { CheckCircle2, Users, AlertCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";

export function ImportSummary({ stats, onReset }) {
  const statCards = [
  { label: "Total Records", value: stats.total, icon: Users, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
  { label: "Imported", value: stats.imported, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50", border: "border-green-100" },
  { label: "Skipped / Failed", value: stats.skipped + stats.failed, icon: AlertCircle, color: "text-red-600", bg: "bg-red-50", border: "border-red-100" }];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full bg-white rounded-3xl border border-gray-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] p-8 md:p-12 flex flex-col items-center">
      
      <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-8 relative shadow-sm">
        <CheckCircle2 size={48} />
        <div className="absolute inset-0 border-4 border-green-100 rounded-full" />
      </div>
      
      <h2 className="text-[32px] font-bold text-gray-900 tracking-tight mb-3">Imported Successfully</h2>
      <p className="text-gray-500 text-[15px] mb-12 flex items-center gap-2 font-medium">
        <Clock size={16} /> Processed in {stats.time}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-12">
        {statCards.map((stat, i) =>
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.1 }}
          className={`flex flex-col items-center justify-center p-8 bg-white border ${stat.border} rounded-2xl shadow-sm relative overflow-hidden`}>
          
            <div className={`absolute top-0 left-0 w-full h-1 ${stat.bg.replace('bg-', 'bg-').replace('50', '500')}`} />
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon size={24} />
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value.toLocaleString()}</div>
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{stat.label}</div>
          </motion.div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
        <button
          onClick={onReset}
          className="w-full py-3.5 bg-white text-gray-700 border border-gray-300 rounded-xl text-[15px] font-bold hover:bg-gray-50 transition-colors shadow-sm">
          
          Import Another CSV
        </button>
        <button
          className="w-full py-3.5 bg-blue-600 text-white rounded-xl text-[15px] font-bold hover:bg-blue-700 transition-all shadow-sm shadow-blue-600/20">
          
          View Leads
        </button>
      </div>
    </motion.div>);

}