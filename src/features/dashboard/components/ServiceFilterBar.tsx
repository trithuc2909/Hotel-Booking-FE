"use client";

import { Search, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { colors } from "@/constants/colors";
import { ServiceCategory, CATEGORY_CONFIG } from "@/features/dashboard/mock/servicesMock";

type Props = {
  search: string;
  category: string;
  onSearchChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
  onSearch: () => void;
  onAdd: () => void;
};

export default function ServiceFilterBar({
  search,
  category,
  onSearchChange,
  onCategoryChange,
  onSearch,
  onAdd,
}: Props) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Search + category + nút tìm */}
      <div className="flex items-center gap-3 flex-1 flex-wrap bg-white rounded-xl border border-gray-200 shadow-sm px-4 py-3">
        {/* Search input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <Input
            id="service-search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            placeholder="Tìm kiếm tên dịch vụ..."
            className="pl-9 h-9 text-sm border-gray-200 bg-gray-50 focus:border-[#0D99FF]"
          />
        </div>

        {/* Category dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500 whitespace-nowrap">Danh mục:</label>
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="h-9 rounded-lg border border-gray-200 bg-gray-50 px-2 text-sm text-gray-700 focus:border-[#0D99FF] focus:outline-none"
          >
            <option value="all">Tất cả</option>
            {(Object.keys(CATEGORY_CONFIG) as ServiceCategory[]).map((key) => (
              <option key={key} value={key}>
                {CATEGORY_CONFIG[key].label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Thêm mới – tách riêng ra ngoài card */}
      {/* TODO (BE): onClick mở modal/form tạo dịch vụ mới */}
      <Button
        id="service-add-btn"
        onClick={onAdd}
        className="h-[52px] px-5 text-white flex items-center gap-2 rounded-xl shrink-0"
        style={{ backgroundColor: colors.primary.blue }}
      >
        <PlusCircle size={16} />
        Thêm dịch vụ mới
      </Button>
    </div>
  );
}
