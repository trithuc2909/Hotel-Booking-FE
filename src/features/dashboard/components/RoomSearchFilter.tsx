"use client";

import { Search, Users, BedDouble } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { colors } from "@/constants/colors";

type Props = {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
  onCheckInChange: (v: string) => void;
  onCheckOutChange: (v: string) => void;
  onGuestsChange: (v: number) => void;
  onRoomTypeChange: (v: string) => void;
  onSearch: () => void;
};

export default function RoomSearchFilter({
  checkIn,
  checkOut,
  guests,
  roomType,
  onCheckInChange,
  onCheckOutChange,
  onGuestsChange,
  onRoomTypeChange,
  onSearch,
}: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-end gap-3 flex-wrap">
      {/* Check-in */}
      <div className="flex flex-col gap-1 min-w-[130px]">
        <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
          Ngày check-in
        </label>
        <Input
          type="date"
          value={checkIn}
          onChange={(e) => onCheckInChange(e.target.value)}
          className="h-10 text-sm border-gray-300 focus:border-[#0D99FF]"
        />
      </div>

      {/* Check-out */}
      <div className="flex flex-col gap-1 min-w-[130px]">
        <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
          Ngày check-out
        </label>
        <Input
          type="date"
          value={checkOut}
          onChange={(e) => onCheckOutChange(e.target.value)}
          className="h-10 text-sm border-gray-300 focus:border-[#0D99FF]"
        />
      </div>

      {/* Số khách */}
      <div className="flex flex-col gap-1 min-w-[110px]">
        <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
          Số khách
        </label>
        <div className="relative">
          <Users size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <select
            value={guests}
            onChange={(e) => onGuestsChange(Number(e.target.value))}
            className="h-10 w-full appearance-none rounded-md border border-gray-300 pl-8 pr-3 text-sm bg-white focus:border-[#0D99FF] focus:outline-none"
          >
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} Người
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loại phòng */}
      <div className="flex flex-col gap-1 min-w-[120px]">
        <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
          Loại phòng
        </label>
        <div className="relative">
          <BedDouble size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <select
            value={roomType}
            onChange={(e) => onRoomTypeChange(e.target.value)}
            className="h-10 w-full appearance-none rounded-md border border-gray-300 pl-8 pr-3 text-sm bg-white focus:border-[#0D99FF] focus:outline-none"
          >
            <option value="all">Tất cả</option>
            <option value="VIP">VIP</option>
            <option value="STANDARD">Tiêu chuẩn</option>
          </select>
        </div>
      </div>

      {/* Tìm button */}
      <Button
        onClick={onSearch}
        className="h-10 px-6 text-white flex items-center gap-2 self-end"
        style={{ backgroundColor: colors.primary.blue }}
      >
        <Search size={14} />
        Tìm
      </Button>
    </div>
  );
}
