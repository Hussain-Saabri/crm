import React, { useState, useRef } from "react";
import { CloudUpload, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import CustomToast from "@/components/ui/CustomToast";
export function UploadDropzone({ onFileAccepted }) {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const[showUploadButton,setShowUploadButton] = useState(false);
  const handleFile = (file) => {
    if (!file) {
      toast.error("No file selected", { description: "Please select a file first." });
      return;
    }
    
    // Validate file type (allow CSV or Excel formats typically used for CSV exports)
    const validTypes = ['text/csv', 'application/vnd.ms-excel', 'application/csv', 'text/x-csv', 'application/x-csv', 'text/comma-separated-values', 'text/x-comma-separated-values'];
    const validExtensions = ['.csv'];
    
    // Check if the file name ends with .csv OR if the MIME type matches
    const isValidExtension = validExtensions.some(ext => file.name?.toLowerCase().endsWith(ext));
    const isValidType = validTypes.includes(file.type);

    if (!isValidType && !isValidExtension) {
      toast.error("Invalid file format", { 
        description: "Please upload a valid CSV file."
      });
      return;
    }
    
    onFileAccepted(file);
  };

  const handleMobileFileSelect = (e) => {
    const files = (e && e.target && e.target.files) || (fileInputRef.current && fileInputRef.current.files);
    
    if (files && files.length > 0) {
      setShowUploadButton(true);
    } else {
      setShowUploadButton(false);
    }
  };

  const handleMobileManualUpload = () => {
    const files = fileInputRef.current && fileInputRef.current.files;
    
    if (files && files.length > 0) {
      handleFile(files[0]);
    } else {
      toast.error("No file chosen", { description: "Please tap 'Choose File' first before uploading." });
    }
  };

  const onChange = (e) => {
    // For desktop (and mobiles where it actually works)
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full">
      
      {/* DESKTOP UI (Drag & Drop) */}
      <label
        htmlFor="csv-upload-input-desktop"
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={cn(
          "hidden md:flex flex-col items-center justify-center w-full h-[320px] rounded-2xl border-2 border-dashed transition-all duration-200 outline-none relative overflow-hidden cursor-pointer",
          isDragActive ?
          "border-blue-500 bg-blue-50 dark:bg-blue-900/20" :
          "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500"
        )}>
        
        <input 
          id="csv-upload-input-desktop"
          type="file"
          onChange={onChange}
          accept=".csv, text/csv, application/vnd.ms-excel"
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4 pointer-events-none w-full h-full">
          <div className="w-14 h-14 mb-4 rounded-xl bg-[#25B990] flex items-center justify-center text-green-300">
            <CloudUpload size={28} className={isDragActive ? "text-blue-500" : ""} />
          </div>
          <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
            Drag & Drop your CSV
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            or click anywhere in this box to browse
          </p>
          
          <div className="flex items-center gap-4 text-xs text-gray-400 mb-6 font-medium justify-center">
            <span className="flex items-center gap-1">
              Supported File: <strong className="text-gray-600">.csv only</strong>
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="flex items-center gap-1">
              Maximum size: <strong className="text-gray-600">10 MB</strong>
            </span>
          </div>
          
          <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
            Required fields will be detected automatically using AI.
          </p>
        </div>
      </label>

      {/* MOBILE PREMIUM UI WITH MANUAL BUTTON */}
      <div className="flex flex-col items-center justify-center py-10 px-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm md:hidden w-full">
        <div className="w-16 h-16 mb-4 rounded-full bg-green-100 flex items-center justify-center text-green-400 shadow-inner">
          <CloudUpload size={28} className="ml-1" />
        </div>
        
        <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
          Upload CSV
        </h3>
        
        <p className="text-sm text-gray-500 mb-6 text-center leading-relaxed">
          1. Choose file &nbsp; • &nbsp; 2. Tap Upload
        </p>

        <div className="w-full flex flex-col gap-4 max-w-[280px]">
          {/* File Picker */}
          <div className="w-full">
            <input 
              ref={fileInputRef}
              type="file" 
              accept=".csv,text/csv,application/vnd.ms-excel"
              onChange={handleMobileFileSelect}
              className="block w-full text-sm text-gray-600
                         file:mr-4 file:py-3 file:px-5 
                         file:rounded-xl file:border-0 
                         file:text-sm file:font-semibold 
                         file:bg-[#25B990] file:text-gray-800 
                         file:cursor-pointer hover:file:bg-gray-200 
                         file:transition-all"
            />
          </div>

          {/* Manual Upload Button */}
          {showUploadButton && (
          <button 
            onClick={handleMobileManualUpload}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors shadow-md active:scale-95"
          >
            <CheckCircle2 size={18} />
            Upload File
          </button>
          )}
        </div>
        
        <div className="flex items-center gap-3 text-xs text-gray-400 mt-8 font-medium">
          <span className="flex items-center gap-1">
            <strong className="text-gray-600">.csv</strong> format
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="flex items-center gap-1">
            Max <strong className="text-gray-600">10 MB</strong>
          </span>
        </div>
      </div>

    </div>
  );
}