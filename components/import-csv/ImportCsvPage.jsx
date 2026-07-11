"use client";

import React, { useState } from "react";
import Papa from "papaparse";
import { toast } from "sonner";
import CustomToast from "@/components/ui/CustomToast";
import { StepIndicator } from "@/components/ui/StepIndicator";
import { UploadDropzone } from "./UploadDropzone";
import { FileCard } from "./FileCard";
import { CsvPreviewTable } from "./CsvPreviewTable";
import { ImportProgress } from "./ImportProgress";
import { SuccessScreen } from "./SuccessScreen";
import { useLeadsStore } from "@/store/useLeadsStore";

export function ImportCsvPage() {
  const [step, setStep] = useState(1); // 1: Upload, 2: Preview, 3: Success
  const [file, setFile] = useState(null);
  const [csvData, setCsvData] = useState([]);
  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [importMessage, setImportMessage] = useState("");
  const [importStats, setImportStats] = useState({
    total: 0,
    imported: 0,
    skipped: 0,
    failed: 0,
    time: "0s"
  });
  const setLeads = useLeadsStore((state) => state.setLeads);

  const handleFileAccepted = (acceptedFile) => {
    setFile(acceptedFile);
    toast.custom((t) => (
      <CustomToast
        type="success"
        title="File Selected"
        description={acceptedFile.name}
        onClose={() => toast.dismiss(t)}
      />
    ), { duration: 2000 });
  };

  const handlePreview = () => {
    if (!file) return;

    Papa.parse(file, {
      complete: (results) => {
        if (!results.data || results.data.length === 0) {
          toast.error("File is empty", {
            description: "The uploaded CSV file contains no headers or data."
          });
          return;
        }
        
        setCsvData(results.data);
        setStep(2);
      },
      error: (error) => {
        toast.error("Error parsing CSV", {
          description: error.message
        });
      },
      skipEmptyLines: "greedy"
    });
  };

  const handleImport = async () => {
    if (!file || csvData.length === 0) return;

    setIsImporting(true);
    setImportMessage("Uploading and Mapping CSV...");
    
    const startTime = performance.now(); // Measure upload time

    try {
      const formData = new FormData();
      formData.append("file", file);

      
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL ;
      const response = await fetch(`${apiUrl}/api/upload-csv`, {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);

      const data = await response.json();
      
      const endTime = performance.now();
      const timeTaken = ((endTime - startTime) / 1000).toFixed(1) + "s";

      if (response.ok && data.success) {
        console.log("data from the server :",data.data);
        
        setLeads(data.data);
        
        const totalRows = csvData.length - 1 > 0 ? csvData.length - 1 : 0;
        const importedRows = data.data.length;
        
        setImportStats({
          total: totalRows,
          imported: importedRows,
          skipped: totalRows > importedRows ? totalRows - importedRows : 0,
          failed: 0,
          time: timeTaken
        });

        setProgress(100);
        setIsImporting(false);
        setStep(3);
      } else {
        toast.error("Upload failed", {
          description: data.message || "Something went wrong",
        });
        setIsImporting(false);
      }
    } catch (error) {
      toast.error("Error connecting to server", {
        description: error.message,
      });
      setIsImporting(false);
    }
  };

  const resetFlow = () => {
    setFile(null);
    setCsvData([]);
    setStep(1);
    setProgress(0);
  };

  if (step === 3) {
    return (
      <SuccessScreen
        stats={importStats}
        onReset={resetFlow} 
      />
    );
  }

  if (step === 2) {
    return (
      <div className="flex flex-col min-h-full w-full bg-transparent relative animate-in fade-in slide-in-from-bottom-4 duration-500">
        {isImporting && (
          <ImportProgress progress={progress} message={importMessage} />
        )}
        <div className="flex-1 pb-20">
          <CsvPreviewTable data={csvData} />
        </div>
        
        <div className="sticky bottom-0 left-0 right-0 bg-white dark:bg-gray-950 px-6 py-4 flex flex-col sm:flex-row items-center justify-end gap-4 z-40">
          <button
            onClick={() => setStep(1)}
            className="w-full sm:w-auto px-6 py-2.5 text-gray-600 dark:text-gray-200 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-xl font-medium transition-colors cursor-pointer"
          >
            Back to Upload
          </button>
          
          <button
            onClick={handleImport}
            disabled={csvData.length <= 1 || isImporting}
            className={`w-full sm:w-auto px-8 py-2.5 text-white rounded-xl font-medium transition-all ${
              csvData.length <= 1 || isImporting
                ? "bg-gray-400 dark:bg-gray-700 cursor-not-allowed opacity-70"
                : "bg-[#25B990] hover:bg-[#1FA07D] cursor-pointer"
            }`}
          >
            Continue to Import
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <StepIndicator currentStep={step} />
      
      <div className="w-full max-w-[900px] bg-white dark:bg-gray-950 rounded-[18px] border border-gray-300 dark:border-gray-800 p-6 sm:p-10 relative overflow-hidden">
        {isImporting &&
          <ImportProgress progress={progress} message={importMessage} />
        }

        <div className="w-full relative transition-all duration-300">
          <div className="flex flex-col w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            {!file ?
              <UploadDropzone onFileAccepted={handleFileAccepted} /> :
              <FileCard
                file={file}
                onReplace={() => setFile(null)}
                onRemove={() => setFile(null)}
                onPreview={handlePreview} 
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
}