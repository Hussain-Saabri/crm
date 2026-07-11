import React from "react";
import { FileSpreadsheet, CheckCircle2, RefreshCw, Trash2, Eye } from "lucide-react";

export function FileCard({ file, onReplace, onRemove, onPreview }) {
  // Format bytes helper (can also be moved to lib/utils)
  console.log("inside file card", file);
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
    <div
      className="w-full h-[320px] rounded-2xl border border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800 shadow-sm flex flex-col justify-center items-center p-8 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="absolute top-0 left-0 w-full h-1 bg-[#25B990] dark:bg-white" />
      
      <div className="flex flex-col items-center justify-center text-center max-w-md w-full">
        <div className="w-16 h-16 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-6 relative">
          <FileSpreadsheet size={32} />
          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
            <CheckCircle2 size={16} className="text-green-500" />
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate w-full px-4">
          {file.name}
        </h3>
        
        <div className="flex items-center dark:text-white justify-center gap-3 text-sm text-gray-500 mb-6 w-full">
          <span>{formatBytes(file.size)}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span>Uploaded at {uploadTime}</span>
        </div>

        <div className="flex items-center gap-3 w-full justify-center">
          <button
            onClick={onPreview}
            className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm">
            
            <Eye size={16} />
            Preview File
          </button>
          
          <button
            onClick={onReplace}
            className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
            
            <RefreshCw size={16} />
            Replace
          </button>
          
          
        </div>
      </div>
    </div>);
}