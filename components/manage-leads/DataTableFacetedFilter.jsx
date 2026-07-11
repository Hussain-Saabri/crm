import * as React from "react";
import { Check, PlusCircle, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DataTableFacetedFilter({ column, title, options, variant = "default" }) {
  // Extract facets for showing counts if available
  const facets = column?.getFacetedUniqueValues?.();
  const filterValue = column?.getFilterValue();
  const selectedValues = new Set(Array.isArray(filterValue) ? filterValue : []);

  const isDark = variant === "dark";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button 
          className={cn(
            "flex items-center gap-2 transition-all shadow-sm focus:outline-none",
            isDark 
              ? "h-[40px] px-4 bg-black text-white hover:bg-gray-800 rounded-md text-sm font-medium border border-black" 
              : "h-[36px] px-3 border border-gray-200 border-dashed bg-white text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium"
          )}
        >
          {isDark ? (
            <Filter className="h-4 w-4" />
          ) : (
            <PlusCircle className="h-4 w-4 text-gray-400" />
          )}
          {title}
          {selectedValues?.size > 0 && (
            <>
              <div className="mx-1 h-4 w-[1px] bg-gray-200" />
              <div className="flex space-x-1">
                {selectedValues.size > 2 ? (
                  <span className="px-1.5 py-0.5 rounded bg-gray-100 text-[11px] font-bold text-gray-800">
                    {selectedValues.size} selected
                  </span>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <span
                        key={option.value}
                        className="px-1.5 py-0.5 rounded bg-gray-100 text-[11px] font-bold text-gray-800 whitespace-nowrap"
                      >
                        {option.label}
                      </span>
                    ))
                )}
              </div>
            </>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[220px] p-1 border-gray-200 rounded-[12px] shadow-lg" align="start">
        <div className="p-1">
          {options.map((option) => {
            const isSelected = selectedValues.has(option.value);
            return (
              <DropdownMenuItem
                key={option.value}
                onSelect={(e) => {
                  e.preventDefault();
                  if (isSelected) {
                    selectedValues.delete(option.value);
                  } else {
                    selectedValues.add(option.value);
                  }
                  const filterValues = Array.from(selectedValues);
                  column?.setFilterValue(
                    filterValues.length ? filterValues : undefined
                  );
                }}
                className="flex items-center gap-2.5 px-2.5 py-2 text-sm cursor-pointer rounded-md hover:bg-gray-50 transition-colors"
              >
                <div
                  className={cn(
                    "flex h-4 w-4 items-center justify-center rounded-[4px] border transition-colors",
                    isSelected
                      ? "bg-[#25B990] border-[#25B990] text-white"
                      : "border-gray-300 bg-transparent"
                  )}
                >
                  {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                </div>
                <span className="text-gray-700 font-medium text-[13px] flex-1">{option.label}</span>
                {facets?.get(option.value) !== undefined && (
                  <span className="flex h-5 items-center justify-center rounded-full bg-gray-100 px-2 font-mono text-[10px] font-medium text-gray-600">
                    {facets.get(option.value)}
                  </span>
                )}
              </DropdownMenuItem>
            );
          })}
        </div>
        {selectedValues.size > 0 && (
          <>
            <DropdownMenuSeparator className="bg-gray-100" />
            <DropdownMenuItem
              onSelect={() => column?.setFilterValue(undefined)}
              className="justify-center text-center font-semibold text-[13px] text-gray-900 hover:text-gray-900 hover:bg-gray-100 cursor-pointer py-2 rounded-md m-1"
            >
              Clear filters
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
