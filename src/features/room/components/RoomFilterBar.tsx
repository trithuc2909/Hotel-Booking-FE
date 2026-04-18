"use client";

const ROOM_TYPES = [
  { value: "", label: "Tất cả" },
  { value: "VIP", label: "Phòng VIP" },
  { value: "STD", label: "Tiêu chuẩn" },
];
const ROOM_STATUSES = [
  { value: "", label: "Tất cả" },
  { value: "AVL", label: "Còn trống" },
  { value: "OCP", label: "Đang ở" },
  { value: "CLN", label: "Đang dọn dẹp" },
];
const SORT_OPTIONS = [
  { value: "", label: "Giá mặc định" },
  { value: "asc", label: "Giá tăng dần" },
  { value: "desc", label: "Giá giảm dần" },
];

interface Props {
  type: string;
  status: string;
  sortPrice: string;
  onTypeChange: (v: string) => void;
  onStatusChange: (v: string) => void;
  onSortPriceChange: (v: string) => void;
}

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
        <svg
          className="pointer-events-none absolute right-2 h-3 w-3 text-gray-400"
          viewBox="0 0 12 12" fill="none"
        >
          <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}

export default function RoomFilterBar({
  type, status, sortPrice,
  onTypeChange, onStatusChange, onSortPriceChange,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-gray-100 bg-white px-5 py-2.5 shadow-sm">
      <FilterSelect label="Loại phòng" value={type} options={ROOM_TYPES} onChange={onTypeChange} />

      <div className="mx-1 h-5 w-px bg-gray-100" />

      <FilterSelect label="Trạng thái" value={status} options={ROOM_STATUSES} onChange={onStatusChange} />

      <div className="mx-1 h-5 w-px bg-gray-100" />

      <FilterSelect label="Sắp xếp" value={sortPrice} options={SORT_OPTIONS} onChange={onSortPriceChange} />

      <div className="ml-auto flex items-center gap-3">
        {[
          { color: "bg-green-400", label: "Còn trống" },
          { color: "bg-orange-400", label: "Dọn dẹp" },
          { color: "bg-red-400", label: "Đang ở" },
        ].map(({ color, label }) => (
          <span key={label} className="flex items-center gap-1.5 text-[11px] text-gray-400">
            <span className={`h-1.5 w-1.5 rounded-full ${color}`} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}