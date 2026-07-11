import React from "react";
import { ImportCsvPage } from "@/components/import-csv/ImportCsvPage";
import { Toaster } from "sonner";

export default function ImportCsvRoute() {
  return (
    <div className="min-h-screen  flex flex-col pt-6 px-4 sm:px-4 lg:px-8 w-full">
      <Toaster position="top-right" richColors /> 
      <ImportCsvPage />
    </div>);

}