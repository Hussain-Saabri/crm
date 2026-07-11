import React from "react";
import { CheckCircle, Users, AlertTriangle, XCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export function SuccessScreen({ stats, onReset }) {
  const router = useRouter();
  const statCards = [
  { label: "Total Rows", value: stats.total, icon: Users, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20" },
  { label: "Imported", value: stats.imported, icon: CheckCircle, color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-900/20" },
  { label: "Skipped", value: stats.skipped, icon: AlertTriangle, color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-50 dark:bg-yellow-900/20" },
  { label: "Failed", value: stats.failed, icon: XCircle, color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-900/20" }];
  
  const handleImportedLeads = () => {
    router.push("/manage-leads");
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center  px-4">
      
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6 shadow-sm">
        
        <CheckCircle size={40} />
      </motion.div>
      
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">CSV Imported Successfully</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-10 flex items-center justify-center gap-2 text-center">
        <Clock size={16} /> Processed in {stats.time}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-10">
        {statCards.map((stat, i) =>
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.1 }}
          className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm">
          
             <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-full flex items-center justify-center mb-3`}>
               <stat.icon size={20} />
             </div>
             <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value.toLocaleString()}</div>
             <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{stat.label}</div>
           </motion.div>
        )}
      </div>

      <div className="flex flex-col-reverse sm:flex-row items-center gap-4 w-full sm:w-auto mt-4 px-4 sm:px-0">
        <button
          onClick={onReset}
          className="w-full sm:w-auto px-6 py-3 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm cursor-pointer">
          
          Import Another File
        </button>
        <button
          onClick={handleImportedLeads}
          className="w-full sm:w-auto px-6 py-3 bg-[#25B990] text-white rounded-xl text-sm font-semibold hover:bg-[#1FA07D] transition-colors shadow-sm shadow-[#25B990]/20 cursor-pointer">
          View Imported Leads
        </button>
      </div>
    </motion.div>);

}