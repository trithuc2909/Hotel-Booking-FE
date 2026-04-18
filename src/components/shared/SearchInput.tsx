"use client";

import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  debounce?: number;
  className?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Tìm kiếm...",
  debounce = 400,
  className = "",
}: Props) {
  const [localValue, setLocalValue] = useState(value);
  const debounceRef = useRef<number | null>(null);

  useEffect(() => { setLocalValue(value); }, [value]);

  useEffect(() => {
    if (localValue === value) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => onChange(localValue), debounce);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [localValue, debounce, onChange, value]);

  const handleClear = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setLocalValue("");
    onChange("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      onChange(localValue);
    }
    if (e.key === "Escape") handleClear();
  };

  return (
    <div className={`relative ${className}`}>
      <Search
        size={15}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label="Search"
        className="w-full rounded-[10px] border border-gray-200 bg-white py-2 pl-[34px] pr-8 text-[13px] text-gray-700 outline-none transition-all placeholder:text-gray-400 focus:border-[#0D99FF] focus:ring-[3px] focus:ring-[#0D99FF]/10"
      />
      {localValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-gray-100 text-gray-400 transition hover:bg-gray-200 hover:text-gray-600"
        >
          <X size={9} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}