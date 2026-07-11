import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { CloudUpload } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function UploadCard({ onFileAccepted }) {
  const onDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        const rejection = fileRejections[0];
        if (rejection.errors[0].code === "file-invalid-type") {
          toast.error("Invalid file type", {
            description: "Please upload a CSV file."
          });
        } else if (rejection.errors[0].code === "file-too-large") {
          toast.error("File too large", {
            description: "Maximum file size is 10MB."
          });
        } else {
          toast.error("Upload failed", {
            description: rejection.errors[0].message
          });
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        onFileAccepted(acceptedFiles[0]);
      }
    },
    [onFileAccepted]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"]
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false
  });

  return (
    <div className="w-full h-full bg-white rounded-3xl border border-gray-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] p-8 flex flex-col">
      <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-6">Upload CSV</h3>
      
      <div
        {...getRootProps()}
        className={cn(
          "flex-1 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 outline-none p-6 min-h-[300px]",
          isDragActive ?
          "border-blue-500 bg-blue-50" :
          "border-gray-200 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-300"
        )}>
        
        <input {...getInputProps()} />
        <div className="w-16 h-16 mb-5 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-700 shadow-sm">
          <CloudUpload size={32} className={isDragActive ? "text-blue-600" : ""} />
        </div>
        
        <h4 className="text-[22px] font-bold text-gray-900 mb-2">
          Drop your CSV here
        </h4>
        <p className="text-[15px] text-gray-500 mb-8">
          or browse from your computer
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 text-sm font-medium text-gray-500 mb-6">
          <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
            Supported: <strong className="text-gray-900">CSV only</strong>
          </span>
          <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-300" />
          <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
            Max size: <strong className="text-gray-900">10 MB</strong>
          </span>
        </div>
        
        <button
          onClick={(e) => e.stopPropagation()}
          className="mt-2 px-6 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 rounded-xl font-semibold text-sm transition-colors shadow-sm pointer-events-none">          
          Browse Files
        </button>
      </div>
    </div>);

}