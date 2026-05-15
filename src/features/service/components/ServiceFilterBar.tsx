"use client";

import { Search, Plus } from "lucide-react";
import { useGetServiceCategoriesQuery } from "../api/serviceApi";

const SERVICE_STATUSES = [
  { value: "", label: "Tất cả" },
  { value: "ACT", label: "Đang hoạt động" },
  { value: "INA", label: "Ngưng hoạt động" },
];

const selectClass =
  "appearance-none rounded-lg border border-gray-200 bg-gray-50 pl-2.5 pr-7 py-1.5 text-xs font-medium text-gray-700 outline-none transition hover:border-gray-300 hover:bg-white focus:border-[#0D99FF] focus:ring-2 focus:ring-[#0D99FF]/15 cursor-pointer";

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-gray-400 whitespace-nowrap">{label}</span>
      <div className="relative flex items-center">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={selectClass}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <svg className="pointer-events-none absolute right-2 h-3 w-3 text-gray-400" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

interface Props {
  search: string;
  categoryId: string;
  status: string;
  onSearchChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
  onStatusChange: (v: string) => void;
  onAdd: () => void;
}

export default function ServiceFilterBar({
  search,
  categoryId,
  status,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onAdd,
}: Props) {
  const { data: catData } = useGetServiceCategoriesQuery();
  const categories = [
    { value: "", label: "Tất cả" },
    ...(catData?.data ?? []).map((c: any) => ({ value: c.id, label: c.name })),
  ];

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Filter bar */}
      <div className="flex flex-1 flex-wrap items-center gap-2 rounded-xl border border-gray-100 bg-white px-5 py-2.5 shadow-sm">
        {/* Search input */}
        <div className="flex items-center gap-2">
          <Search size={13} className="text-gray-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm kiếm tên dịch vụ,..."
            className="w-120 text-xs text-gray-700 outline-none placeholder:text-gray-400 bg-transparent"
          />
        </div>

        <div className="mx-1 h-5 w-px bg-gray-100" />

        <FilterSelect
          label="Danh mục"
          value={categoryId}
          options={categories}
          onChange={onCategoryChange}
        />

        <div className="mx-1 h-5 w-px bg-gray-100" />

        <FilterSelect
          label="Trạng thái"
          value={status}
          options={SERVICE_STATUSES}
          onChange={onStatusChange}
        />
      </div>

      {/* Add button */}
      <button
        onClick={onAdd}
        className="flex shrink-0 cursor-pointer items-center gap-2 rounded-lg bg-[#0D99FF] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0B84E6] transition-colors"
      >
        <Plus size={16} />
        Thêm dịch vụ mới
      </button>
    </div>
  );
}
