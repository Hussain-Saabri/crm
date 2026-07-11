import React, { useState, useEffect } from 'react';
import { Search } from "lucide-react";

export function SearchBar({ 
  value, 
  onSearch, 
  onChange, 
  placeholder = "Search...", 
  className = "w-full",
  errorMessage = "Please enter a value to search."
}) {
  const [inputValue, setInputValue] = useState(value ?? "");
  const [error, setError] = useState(false);

  useEffect(() => {
    setInputValue(value ?? "");
  }, [value]);

  const handleSearch = () => {
    if (!inputValue.trim()) {
      setError(true);
      return;
    }
    setError(false);
    if (onSearch) onSearch(inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`relative flex flex-col justify-center mb-5 sm:mb-0 ${className}`}>
      <div className="flex w-full border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden focus-within:border-gray-300 dark:focus-within:border-gray-600 transition-colors bg-white dark:bg-gray-950 ">
        <input
          type="text"
          className="w-full pl-4 pr-3 py-2 text-[13px] text-gray-600 dark:text-white focus:outline-none bg-transparent dark:placeholder-gray-400 "
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (error) setError(false);
            if (onChange) onChange(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        <button 
          onClick={handleSearch}
          className="px-3.5 bg-[#25B990] hover:bg-[#1e9574] text-white flex items-center justify-center cursor-pointer transition-colors focus:outline-none"
        >
          <Search size={16} strokeWidth={2.5} />
        </button>
      </div>
      
      {error && (
        <span className="absolute -bottom-5 left-1 text-[11px] text-red-500 font-medium">
          {errorMessage}
        </span>
      )}
    </div>
  );
}
