"use client";

import { Check, Wifi, Wind, Tv, Refrigerator, Bath, Coffee, Users, BedSingle } from "lucide-react";
import { Room } from "@/features/dashboard/mock/newBookingMock";

// ── Amenity icon map ───────────────────────────────────────────
const AMENITY_ICONS: Record<Room["amenities"][number], React.ElementType> = {
  wifi:      Wifi,
  ac:        Wind,
  tv:        Tv,
  fridge:    Refrigerator,
  bathtub:   Bath,
  breakfast: Coffee,
};

type Props = {
  rooms: Room[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  totalCount: number;
  page: number;
  pageSize: number;
  onPageChange: (p: number) => void;
};

export default function RoomGrid({
  rooms,
  selectedIds,
  onToggle,
  totalCount,
  page,
  pageSize,
  onPageChange,
}: Props) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const start = (page - 1) * pageSize;
  const paginated = rooms.slice(start, start + pageSize);

  return (
    <div className="flex flex-col gap-4">
      {/* Title */}
      <h2 className="font-semibold text-gray-700 text-sm">
        Danh sách phòng{" "}
        <span className="text-gray-400 font-normal">({totalCount} phòng)</span>
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {paginated.map((room) => {
          const isSelected = selectedIds.includes(room.id);
          return (
            <div
              key={room.id}
              className={`bg-white rounded-xl border-2 overflow-hidden shadow-sm transition-all ${
                isSelected
                  ? "border-[#0D99FF] shadow-blue-100"
                  : "border-gray-100 hover:border-gray-300"
              }`}
            >
              {/* Image + badges */}
              <div className="relative">
                <img
                  src={room.imageUrl}
                  alt={`${room.name} - ${room.roomNumber}`}
                  className="w-full h-36 object-cover"
                />

                {/* Type badge */}
                <span
                  className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    room.type === "VIP"
                      ? "bg-yellow-400 text-yellow-900"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {room.type === "VIP" ? "VIP" : "TIÊU CHUẨN"}
                </span>

                {/* Selected checkmark */}
                {isSelected && (
                  <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-[#0D99FF] flex items-center justify-center shadow">
                    <Check size={13} className="text-white" strokeWidth={3} />
                  </div>
                )}
              </div>

              {/* Card body */}
              <div className="p-3 space-y-2">
                {/* Name */}
                <p className="font-semibold text-gray-800 text-sm leading-tight">
                  {room.name} – {room.roomNumber}
                </p>

                {/* Bed + guests */}
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <BedSingle size={12} /> {room.bed}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={12} /> {room.maxGuests} Người
                  </span>
                </div>

                {/* Amenities */}
                <div className="flex items-center gap-2">
                  {room.amenities.map((key) => {
                    const Icon = AMENITY_ICONS[key];
                    return (
                      <span key={key} title={key}>
                        <Icon size={13} className="text-gray-400" />
                      </span>
                    );
                  })}
                </div>

                {/* Price */}
                <p className="text-[#0D99FF] font-bold text-sm">
                  {room.pricePerNight.toLocaleString("vi-VN")}đ{" "}
                  <span className="font-normal text-gray-400">/ đêm</span>
                </p>

                {/* Toggle button */}
                <button
                  onClick={() => onToggle(room.id)}
                  className={`w-full py-2 rounded-lg text-sm font-semibold transition-colors ${
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
          <span>Hiển thị {paginated.length} trên số {totalCount}...</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
              className="px-2 py-1 rounded border border-gray-200 disabled:opacity-40 hover:bg-gray-50"
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`px-2.5 py-1 rounded border text-xs font-medium transition-colors ${
                  p === page
                    ? "bg-[#0D99FF] text-white border-[#0D99FF]"
                    : "border-gray-200 hover:bg-gray-50 text-gray-600"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages}
              className="px-2 py-1 rounded border border-gray-200 disabled:opacity-40 hover:bg-gray-50"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
