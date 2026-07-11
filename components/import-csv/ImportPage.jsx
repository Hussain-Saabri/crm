"use client";


import Papa from "papaparse";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { UploadCard } from "./UploadCard";

import { UploadedFileCard } from "./UploadedFileCard";
import { CsvPreviewTable } from "./CsvPreviewTable";
import { MappingPreview } from "./MappingPreview";
import { ImportProgress } from "./ImportProgress";
import { ImportSummary } from "./ImportSummary";
import { SkippedRecordsTable } from "./SkippedRecordsTable";

export function ImportPage() {
  const [step, setStep] = useState(1);
  // 1: Upload (2-col)
  // 2: Preview & Confirm (2-col + Table)
  // 3: Processing (Center Card)
  // 4: Success (Center Summary + Skipped)

  const [file, setFile] = useState(null);
  const [csvData, setCsvData] = useState([]);
  const [mappings, setMappings] = useState([]);
  const [apiResponse, setApiResponse] = useState(null);

  const uploadMutation = useMutation({
    mutationFn: async (fileToUpload) => {
      const formData = new FormData();
      formData.append("file", fileToUpload);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await axios.post(`${apiUrl}/api/upload-csv`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      setApiResponse(data);
      setStep(4);
    },
    onError: (error) => {
      toast.error("Upload failed", {
        description: error.response?.data?.message || error.message
      });
      setStep(2);
    }
  });

  const handleFileAccepted = (acceptedFile) => {
    setFile(acceptedFile);

    Papa.parse(acceptedFile, {
      complete: (results) => {
        setCsvData(results.data);
        console.log(results.data);
        // Simulate basic AI mapping logic
        const headers = results.data[0] || [];
        const detectedMappings = headers.map((header) => {
          let crmField = "Custom Field";
          const h = header.toLowerCase();
          if (h.includes("name")) crmField = "Name";
          if (h.includes("mail")) crmField = "Email";
          if (h.includes("phone") || h.includes("mobile")) crmField = "Mobile";
          if (h.includes("company")) crmField = "Company";
          if (h.includes("city")) crmField = "City";
          if (h.includes("state")) crmField = "State";
          if (h.includes("country")) crmField = "Country";
          if (h.includes("owner")) crmField = "Lead Owner";
          if (h.includes("status")) crmField = "Lead Status";
          if (h.includes("note") || h.includes("remark")) crmField = "CRM Notes";

          return { csvHeader: header, crmField };
        });

        setMappings(detectedMappings);
        setStep(2);
        toast.success("File analyzed", { description: "AI has mapped your columns automatically." });
      },
      error: (error) => {
        toast.error("Error parsing CSV", {
          description: error.message
        });
        setFile(null);
      },
      skipEmptyLines: true
    });
  };

  const handleImport = () => {
    setStep(3);
    uploadMutation.mutate(file);
  };

  const resetFlow = () => {
    setFile(null);
    setCsvData([]);
    setMappings([]);
    setApiResponse(null);
    setStep(1);
  };

  const totalRows = csvData.length > 0 ? csvData.length - 1 : 0;
  const importedCount = apiResponse?.data?.length || 0;
  const skippedCount = totalRows - importedCount > 0 ? totalRows - importedCount : 0;

  // We can't get exactly which rows were skipped without backend changes, so we show an empty array or dummy data if it fails.
  const skippedRecords = [];


  return (
    <div className="w-full flex flex-col items-center pb-20 relative min-h-[600px]">
      <AnimatePresence mode="wait">
        
        {/* STEP 1 & 2: Upload / Preview */}
        {(step === 1 || step === 2) &&
        <motion.div
          key="upload-preview"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          className="w-full flex flex-col gap-8">
          
            {/* Top 2-Column Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-auto lg:h-[420px]">
              <div className="h-full">
                {step === 1 || !file ?
              <UploadCard onFileAccepted={handleFileAccepted} /> :

              <UploadedFileCard
                file={file}
                csvDataLength={csvData.length - 1}
                csvColumnsLength={csvData[0]?.length || 0}
                onReplace={resetFlow}
                onRemove={resetFlow} />

              }
              </div>
              
            </div>

            {/* Bottom Section (Preview & Mapping) - Only visible in Step 2 */}
            {step === 2 && file &&
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-8">
            
                <MappingPreview mappings={mappings} />
                
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight px-2">Data Preview</h3>
                  <CsvPreviewTable data={csvData} />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-6 rounded-3xl border border-gray-200 shadow-sm gap-4 mt-4">
                  <button
                onClick={resetFlow}
                className="w-full sm:w-auto px-8 py-3.5 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-xl font-bold text-[15px] transition-colors shadow-sm">
                
                    Cancel
                  </button>
                  <button
                onClick={handleImport}
                className="w-full sm:w-auto px-10 py-3.5 text-white bg-[#25B990] hover:bg-[#20a37e] rounded-xl font-bold text-[15px] transition-all shadow-sm shadow-[#25B990]/20">
                
                    Import with AI
                  </button>
                </div>
              </motion.div>
          }
          </motion.div>
        }

        {/* STEP 3: Processing */}
        {step === 3 &&
        <motion.div
          key="processing"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          className="absolute inset-0 flex items-start justify-center pt-20">
          
            <ImportProgress onComplete={() => setStep(4)} />
          </motion.div>
        }

        {/* STEP 4: Success */}
        {step === 4 &&
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full flex flex-col gap-8 items-center">
          
            <ImportSummary
            stats={{
              total: totalRows,
              imported: importedCount,
              skipped: skippedCount,
              failed: 0,
              time: "AI Processed"
            }}
            onReset={resetFlow} />
          
            
            <div className="w-full max-w-4xl">
              <SkippedRecordsTable records={skippedRecords} />
            </div>
          </motion.div>
        }

      </AnimatePresence>
    </div>);

}