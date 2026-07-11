import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export function ImportProgress({ progress, message }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-gray-950/80 dark:backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border border-gray-200 shadow-xl rounded-2xl p-8 max-w-sm w-full flex flex-col items-center text-center dark:bg-gray-950 dark:border-gray-800">
        
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-[#25B990]/20 dark:bg-[#25B990]/20 rounded-full animate-ping opacity-20" />
          <div className="w-16 h-16 bg-[#25B990]/10 dark:bg-[#25B990]/20 text-[#25B990] dark:text-[#25B990] rounded-full flex items-center justify-center relative">
            <Loader2 size={32} className="animate-spin" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Importing Data</h3>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">{message}</p>
        
        <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mb-3">
          <motion.div
            className="h-full bg-[#25B990]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeInOut" }} />
          
        </div>
        <div className="mt-3 text-xs font-semibold text-gray-500">
          {progress}%
        </div>
      </motion.div>
    </div>);

}