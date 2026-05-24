"use client";

import { Check, Users, BedSingle } from "lucide-react";
import { AvailableRoomResponse } from "@/features/room/types/room.type";
import { formatCurrency } from "@/lib/utils";
import Pagination from "@/components/shared/Pagination";

type Props = {
  rooms: AvailableRoomResponse[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  totalCount: number;
  page: number;
  pageSize: number;
  onPageChange: (p: number) => void;
  onPageSizeChange: (size: number) => void;
};
export default function RoomGrid({
  rooms,
  selectedIds,
  onToggle,
  totalCount,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: Props) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const start = (page - 1) * pageSize;
  const paginated = rooms.slice(start, start + pageSize);
  const pageSizeOptions = [6, 9, 18];
  return (
    <div className="space-y-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-gray-700">
        Danh sách phòng trống <span className="font-normal text-gray-400">({totalCount} phòng)</span>
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {paginated.map((room) => {
          const isSelected = selectedIds.includes(room.id);
          return (
            <div
              key={room.id}
              className={`overflow-hidden rounded-xl border-2 bg-white shadow-sm transition-all ${
                isSelected ? "border-[#0D99FF] shadow-blue-100" : "border-gray-100 hover:border-gray-300"
              }`}
            >
              <div className="relative">
                <img
                  src={
                    room.thumbnailUrl ||
                    "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
                  }
                  alt={room.roomName}
                  className="h-36 w-full object-cover"
                />
                <span className="absolute top-2 left-2 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                  {room.roomTypeName}
                </span>
                {isSelected && (
                  <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#0D99FF] shadow">
                    <Check size={13} className="text-white" strokeWidth={3} />
                  </div>
                )}
              </div>
              <div className="space-y-2 p-3">
                <p className="text-sm leading-tight font-semibold text-gray-800">{room.roomName}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <BedSingle size={12} /> {room.bedType || "Tiêu chuẩn"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={12} /> {room.maxGuests} Người
                  </span>
                </div>
                <p className="text-sm font-bold text-[#0D99FF]">
                  {formatCurrency(room.basePrice)}đ <span className="font-normal text-gray-400">/ đêm</span>
                </p>
                <button
                  onClick={() => onToggle(room.id)}
                  className={`w-full cursor-pointer rounded-lg py-2 text-sm font-semibold transition-colors ${
                    isSelected
                      ? "bg-[#0D99FF] text-white hover:bg-[#0B80D4]"
                      : "border border-[#0D99FF] text-[#0D99FF] hover:bg-blue-50"
                  }`}
                >
                  {isSelected ? "Đã chọn" : "Chọn phòng"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
        total={totalCount}
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChange}
        pageSizeOptions={pageSizeOptions}
      />
    </div>
  );
}
