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
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-2 flex items-center gap-1 flex-wrap md:flex-nowrap">
      <div className="flex-1 min-w-[150px] relative group">
        <label className="absolute left-4 top-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          Nhận phòng
        </label>
        <div className="flex items-center">
          <CalendarDays
            size={14}
            className="absolute left-4 top-[26px] text-[#0D99FF]"
          />
          <Input
            type="date"
            value={checkInDate}
            min={today}
            onChange={(e) => onCheckInChange(e.target.value)}
            className="h-14 pt-6 pb-2 pl-10 pr-3 text-sm border-transparent bg-transparent focus:border-transparent focus:ring-0 cursor-pointer"
          />
        </div>
      </div>
      <div className="hidden md:block w-px h-10 bg-gray-100" />
      <div className="flex-1 min-w-[150px] relative group">
        <label className="absolute left-4 top-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          Trả phòng
        </label>
        <div className="flex items-center">
          <CalendarDays
            size={14}
            className="absolute left-4 top-[26px] text-[#0D99FF]"
          />
          <Input
            type="date"
            value={checkOutDate}
            min={checkInDate || today}
            onChange={(e) => onCheckOutChange(e.target.value)}
            className="h-14 pt-6 pb-2 pl-10 pr-3 text-sm border-transparent bg-transparent focus:border-transparent focus:ring-0 cursor-pointer"
          />
        </div>
      </div>
      <div className="hidden md:block w-px h-10 bg-gray-100" />
      <div className="flex-1 min-w-[120px] relative group">
        <label className="absolute left-4 top-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          Khách
        </label>
        <div className="flex items-center">
          <Users
            size={14}
            className="absolute left-4 top-[26px] text-[#0D99FF] pointer-events-none"
          />
          <select
            value={guests}
            onChange={(e) => onGuestsChange(Number(e.target.value))}
            className="h-14 pt-5 pb-1 pl-10 pr-8 w-full appearance-none border-transparent bg-transparent text-sm focus:border-transparent focus:outline-none cursor-pointer"
          >
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} Người lớn
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="hidden md:block w-px h-10 bg-gray-100" />
      <div className="flex-1 min-w-[160px] relative group">
        <label className="absolute left-4 top-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          Loại phòng
        </label>
        <div className="flex items-center">
          <BedDouble
            size={14}
            className="absolute left-4 top-[26px] text-[#0D99FF] pointer-events-none"
          />
          <select
            value={roomType}
            onChange={(e) => onRoomTypeChange(e.target.value)}
            className="h-14 pt-5 pb-1 pl-10 pr-8 w-full appearance-none border-transparent bg-transparent text-sm focus:border-transparent focus:outline-none cursor-pointer"
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
