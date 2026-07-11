"use client";

import React, { useState, useEffect } from "react";
import { LeadsTable } from "@/components/manage-leads/LeadsTable";

export default function ManageLeads() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col pt-4 px-4 sm:px-4 lg:px-8 w-full pb-20">         
      <LeadsTable globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} isLoading={isLoading} />
    </div>
  );
}