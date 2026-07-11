import React from "react";

export const statusOptions = [
  { label: "Sale Done", value: "SALE_DONE" },
  { label: "Bad Lead", value: "BAD_LEAD" },
  { label: "Did Not Connect", value: "DID_NOT_CONNECT" },
  { label: "Good Lead Follow Up", value: "GOOD_LEAD_FOLLOW_UP" },
];

export const sourceOptions = [
  { label: "Leads On Demand", value: "leads_on_demand" },
  { label: "Meridian Tower", value: "meridian_tower" },
  { label: "Eden Park", value: "eden_park" },
  { label: "Varah Swamy", value: "varah_swamy" },
  { label: "Sarjapur Plots", value: "sarjapur_plots" },
];

export const columns = [
  { accessorKey: "name", header: "Lead name" },
  { accessorKey: "email", header: "Primary email" },
  { accessorKey: "country_code", header: "Country code" },
  { accessorKey: "mobile_without_country_code", header: "Mobile number" },
  { accessorKey: "company", header: "Company name" },
  { accessorKey: "city", header: "City" },
  { accessorKey: "state", header: "State" },
  { accessorKey: "country", header: "Country" },
  { accessorKey: "lead_owner", header: "Lead owner" },
  {
    accessorKey: "crm_status", header: "Lead status", 
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    cell: ({ row }) => {
      const status = row.getValue("crm_status");
      if (!status) return <span className="text-gray-400">-</span>;

      let style = "bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700";
      if (status === "SALE_DONE") style = "bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/20";
      else if (status === "BAD_LEAD") style = "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/20";
      else if (status === "DID_NOT_CONNECT") style = "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20";
      else if (status === "GOOD_LEAD_FOLLOW_UP") style = "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20";

      return (
        <span className={`inline-block whitespace-nowrap px-2.5 py-1.5 text-[11px] font-bold tracking-wide rounded-full border ${style}`}>
          {status.replace(/_/g, ' ')}
        </span>
      )
    }
  },
  { accessorKey: "crm_note", header: "Notes/remarks" },
  { 
    accessorKey: "data_source", header: "Source", 
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    cell: ({ row }) => {
      const source = row.getValue("data_source");
      if (!source) return <span className="text-gray-400">-</span>;

      let style = "bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700";
      if (source === "leads_on_demand") style = "bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-500/20";
      else if (source === "meridian_tower") style = "bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-200 dark:border-cyan-500/20";
      else if (source === "eden_park") style = "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20";
      else if (source === "varah_swamy") style = "bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-500/20";
      else if (source === "sarjapur_plots") style = "bg-pink-50 dark:bg-pink-500/10 text-pink-700 dark:text-pink-400 border-pink-200 dark:border-pink-500/20";

      return (
        <span className={`inline-block whitespace-nowrap px-2.5 py-1.5 text-[11px] font-bold tracking-wide rounded-full border ${style}`}>
          {source.replace(/_/g, ' ').toUpperCase()}
        </span>
      )
    }
  },
  { accessorKey: "possession_time", header: "Property possession time" },
  { accessorKey: "description", header: "Additional description" },
  { accessorKey: "created_at", header: "Lead creation date" },
];
