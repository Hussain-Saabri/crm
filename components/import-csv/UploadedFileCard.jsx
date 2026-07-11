import React from "react";
import { FileSpreadsheet, CheckCircle2, RefreshCw, Trash2 } from "lucide-react";
import { motion } from "framer-motion";


export function UploadedFileCard({ file, csvDataLength, csvColumnsLength, onReplace, onRemove }) {
  const formatBytes = (bytes, decimals = 2) => {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  const uploadTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full h-full bg-white rounded-3xl border border-gray-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] p-8 flex flex-col relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-1.5 bg-green-500" />
      
      <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-6">File Ready</h3>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-[20px] bg-green-50 text-green-600 flex items-center justify-center mb-6 relative shadow-sm">
          <FileSpreadsheet size={40} />
          <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm">
            <CheckCircle2 size={24} className="text-green-500" />
          </div>
        </div>

        <h4 className="text-[22px] font-bold text-gray-900 mb-2 truncate w-full text-center px-4">
          {file.name}
        </h4>
        
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-gray-500 mb-8 max-w-sm">
          <span className="bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">{formatBytes(file.size)}</span>
          <span className="bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">{csvDataLength} Rows</span>
          <span className="bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">{csvColumnsLength} Columns</span>
          <span className="w-full text-center mt-1">Uploaded at {uploadTime}</span>
        </div>

        <div className="flex items-center gap-4 w-full justify-center">
          <button
            onClick={onReplace}
            className="flex items-center gap-2 px-6 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm">
            
            <RefreshCw size={18} />
            Replace
          </button>
          
          <button
            onClick={onRemove}
            className="flex items-center justify-center w-11 h-11 bg-white text-red-600 border border-gray-200 rounded-xl hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors shadow-sm"
            aria-label="Remove file">
            
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </motion.div>);

}