import React from 'react';
import { SearchBar } from "@/components/ui/SearchBar";

export function LeadsTableSearch({ globalFilter, setGlobalFilter }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-end pb-5 bg-transparent w-full">     
      <div className="flex items-center gap-3 w-full sm:w-auto ">
        <SearchBar 
          value={globalFilter}
          onSearch={setGlobalFilter}
          placeholder="Enter email or phone number.."
          className="w-full sm:w-[320px]"
          errorMessage="Please enter an email or phone number."
        />
      </div>
    </div>
  );
}
