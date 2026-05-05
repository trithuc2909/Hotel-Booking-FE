"use client";

import { Search, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";

type Props = {
  search: string;
  onSearchChange: (v: string) => void;
  onSearch: () => void;
};

export default function BookingFilterBar({
  search,
  onSearchChange,
  onSearch,
}: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-center gap-3 flex-wrap">
      {/* Search input */}
      <div className="relative flex-1 min-w-[220px]">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <Input
          id="booking-search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          placeholder="Tìm kiếm theo mã booking hoặc tên khách hàng..."
          className="h-10 w-full pl-9 pr-3 text-sm bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* Date range */}
      <button className="h-10 flex-1 min-w-[220px] flex items-center gap-2 px-3 border border-gray-300 rounded-lg text-sm text-gray-600 bg-white hover:border-blue-500 transition-colors">
        <Calendar size={16} className="shrink-0 text-gray-400" />
        <span className="truncate">Ngày nhận – trả phòng</span>
      </button>
    </div>
  );
}
