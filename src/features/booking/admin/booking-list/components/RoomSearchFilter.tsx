"use client";
import { Users, BedDouble, CalendarDays } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useGetRoomTypesQuery } from "@/features/room/api/lookupApi";
type Props = {
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  roomType: string;
  onCheckInChange: (v: string) => void;
  onCheckOutChange: (v: string) => void;
  onGuestsChange: (v: number) => void;
  onRoomTypeChange: (v: string) => void;
};
export default function RoomSearchFilter({
  checkInDate,
  checkOutDate,
  guests,
  roomType,
  onCheckInChange,
  onCheckOutChange,
  onGuestsChange,
  onRoomTypeChange,
}: Props) {
  const { data: roomTypesData } = useGetRoomTypesQuery();
  const roomTypes = roomTypesData?.data || [];
  const today = new Date().toISOString().split("T")[0];
  return (
    <div className="flex flex-wrap items-center gap-1 rounded-2xl border border-gray-100 bg-white p-2 shadow-sm md:flex-nowrap">
      <div className="group relative min-w-[150px] flex-1">
        <label className="absolute top-2 left-4 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
          Nhận phòng
        </label>
        <div className="flex items-center">
          <CalendarDays size={14} className="absolute top-[26px] left-4 text-[#0D99FF]" />
          <Input
            type="date"
            value={checkInDate}
            min={today}
            onChange={(e) => onCheckInChange(e.target.value)}
            className="h-14 cursor-pointer border-transparent bg-transparent pt-6 pr-3 pb-2 pl-10 text-sm focus:border-transparent focus:ring-0"
          />
        </div>
      </div>
      <div className="hidden h-10 w-px bg-gray-100 md:block" />
      <div className="group relative min-w-[150px] flex-1">
        <label className="absolute top-2 left-4 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
          Trả phòng
        </label>
        <div className="flex items-center">
          <CalendarDays size={14} className="absolute top-[26px] left-4 text-[#0D99FF]" />
          <Input
            type="date"
            value={checkOutDate}
            min={checkInDate || today}
            onChange={(e) => onCheckOutChange(e.target.value)}
            className="h-14 cursor-pointer border-transparent bg-transparent pt-6 pr-3 pb-2 pl-10 text-sm focus:border-transparent focus:ring-0"
          />
        </div>
      </div>
      <div className="hidden h-10 w-px bg-gray-100 md:block" />
      <div className="group relative min-w-[120px] flex-1">
        <label className="absolute top-2 left-4 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
          Khách
        </label>
        <div className="flex items-center">
          <Users size={14} className="pointer-events-none absolute top-[26px] left-4 text-[#0D99FF]" />
          <select
            value={guests}
            onChange={(e) => onGuestsChange(Number(e.target.value))}
            className="h-14 w-full cursor-pointer appearance-none border-transparent bg-transparent pt-5 pr-8 pb-1 pl-10 text-sm focus:border-transparent focus:outline-none"
          >
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} Người lớn
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="hidden h-10 w-px bg-gray-100 md:block" />
      <div className="group relative min-w-[160px] flex-1">
        <label className="absolute top-2 left-4 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
          Loại phòng
        </label>
        <div className="flex items-center">
          <BedDouble size={14} className="pointer-events-none absolute top-[26px] left-4 text-[#0D99FF]" />
          <select
            value={roomType}
            onChange={(e) => onRoomTypeChange(e.target.value)}
            className="h-14 w-full cursor-pointer appearance-none border-transparent bg-transparent pt-5 pr-8 pb-1 pl-10 text-sm focus:border-transparent focus:outline-none"
          >
            <option value="all">Tất cả loại phòng</option>
            {roomTypes.map((type) => (
              <option key={type.code} value={type.code}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
