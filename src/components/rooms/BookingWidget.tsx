"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { RoomDetailResponse } from "@/features/room/types/room.type";
import { formatCurrency } from "@/lib/utils/formatCurrency";

type Props = { room: RoomDetailResponse };

const toStr = (d: Date) => d.toISOString().split("T")[0];

export default function BookingWidget({ room }: Props) {
  const router = useRouter();
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const [checkIn, setCheckIn] = useState(toStr(today));
  const [checkOut, setCheckOut] = useState(toStr(tomorrow));

  const nights = Math.max(
    1,
    Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86_400_000)
  );

  const subtotal = room.basePrice * nights;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  const handleBook = () => {
    router.push(`/bookings/create?roomId=${room.id}&checkInDate=${checkIn}&checkOutDate=${checkOut}&guests=${room.maxGuests}`);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md space-y-5">
      {/* Price */}
      <div>
        <span className="text-2xl font-bold text-[#0D99FF]">{formatCurrency(room.basePrice)}</span>
        <span className="text-sm text-gray-400"> / đêm</span>
      </div>

      <hr className="border-gray-100" />

      {/* Date pickers */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "Nhận phòng", value: checkIn, min: toStr(today), onChange: (v: string) => {
              setCheckIn(v);
              if (v >= checkOut) {
                const next = new Date(v);
                next.setDate(next.getDate() + 1);
                setCheckOut(toStr(next));
              }
            }
          },
          { label: "Trả phòng", value: checkOut, min: checkIn, onChange: (v: string) => setCheckOut(v) },
        ].map(({ label, value, min, onChange }) => (
          <div key={label} className="space-y-1">
            <label className="block text-xs font-medium text-gray-500">{label}</label>
            <div className="relative">
              <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="date"
                value={value}
                min={min}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-lg border border-gray-200 pl-4 pr-2 py-2 text-sm focus:outline-none focus:border-[#0D99FF]"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Number of guests */}
      <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700">
        <Users size={14} className="text-gray-400" />
        <span>Số lượng khách</span>
        <span className="ml-auto text-sm font-medium text-gray-700">{room.maxGuests} người lớn</span>
      </div>

      <hr className="border-gray-100" />

      {/* Price table */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>{formatCurrency(room.basePrice)} × {nights} đêm</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Thuế GT (10%)</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        <hr className="border-gray-100" />
        <div className="flex justify-between font-semibold text-gray-800">
          <span>Tổng cộng</span>
          <span className="text-[#0D99FF]">{formatCurrency(total)}</span>
        </div>
      </div>

      {/* Book now button */}
      <button onClick={handleBook} className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl bg-[#0D99FF] py-3 text-sm font-semibold text-white hover:bg-[#0B84E6] transition-colors">
        Đặt phòng ngay
      </button>
    </div>
  );
}
