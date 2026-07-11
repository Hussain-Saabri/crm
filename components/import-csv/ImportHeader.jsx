import React from "react";
import { Download } from "lucide-react";

export function ImportHeader() {
  return (
    <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-6">
      <div>
        <h1 className="text-[32px] font-bold text-gray-900 tracking-tight mb-2">Import Leads</h1>
        <p className="text-gray-500 text-[15px] max-w-lg leading-relaxed">
          Upload any CSV file. <br className="hidden sm:block" />
          Our AI automatically detects and maps your columns into CRM fields.
        </p>
      </div>
      
      <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-transparent border border-gray-300 hover:bg-gray-100 text-gray-700 rounded-xl font-semibold text-sm transition-colors shrink-0 w-full md:w-auto">
        <Download size={18} />
        Download Sample CSV
      </button>
    </div>);

}