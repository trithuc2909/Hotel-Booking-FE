"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { CalendarDays, Users } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import { RoomDetailResponse } from "@/features/room/types/room.type";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { useGetOccupiedDateRangesForRoomQuery } from "@/features/room/api/roomApi";

type Props = { room: RoomDetailResponse };

const toStr = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

function hasConflict(
  reqIn: string,
  reqOut: string,
  ranges: { checkInDate: string; checkOutDate: string }[],
) {
  return ranges.some(
    (r) =>
      reqIn < r.checkOutDate.split("T")[0] &&
      reqOut > r.checkInDate.split("T")[0],
  );
}

function buildDisabledDates(
  ranges: { checkInDate: string; checkOutDate: string }[],
): Date[] {
  const days: Date[] = [];
  ranges.forEach(({ checkInDate, checkOutDate }) => {
    const cur = new Date(checkInDate + "T00:00:00");
    const end = new Date(checkOutDate + "T00:00:00");
    while (cur < end) {
      days.push(new Date(cur));
      cur.setDate(cur.getDate() + 1);
    }
  });
  return days;
}

export default function BookingWidget({ room }: Props) {
  const router = useRouter();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const [range, setRange] = useState<DateRange | undefined>({
    from: today,
    to: tomorrow,
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const { data: bookedData } = useGetOccupiedDateRangesForRoomQuery(room.id);
  const bookedRanges = bookedData?.data ?? [];

  const disabledDates = useMemo(
    () => buildDisabledDates(bookedRanges),
    [bookedRanges],
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        calendarRef.current &&
        !e.composedPath().includes(calendarRef.current)
      ) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const nights =
    range?.from && range?.to
      ? Math.max(
          1,
          Math.round((range.to.getTime() - range.from.getTime()) / 86_400_000),
        )
      : 1;

  const checkIn = range?.from ? toStr(range.from) : "";
  const checkOut = range?.to ? toStr(range.to) : "";

  const subtotal = room.basePrice * nights;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  const rangeRef = useRef(range);
  useEffect(() => {
    rangeRef.current = range;
  }, [range]);

  const handleBook = () => {
    const current = rangeRef.current;

    if (!checkIn || !checkOut) return;
    if (hasConflict(checkIn, checkOut, bookedRanges)) {
      toast.error(
        "Khoảng thời gian này đã có booking. Vui lòng chọn ngày khác.",
      );
      return;
    }
    router.push(
      `/bookings/create?roomId=${room.id}&checkInDate=${checkIn}&checkOutDate=${checkOut}&guests=${room.maxGuests}`,
    );
  };

  const formatDate = (d: Date | undefined) =>
    d
      ? d.toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : "Chọn ngày";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md space-y-5">
      {/* Price */}
      <div>
        <span className="text-2xl font-bold text-[#0D99FF]">
          {formatCurrency(room.basePrice)}
        </span>
        <span className="text-sm text-gray-400"> / đêm</span>
      </div>

      <hr className="border-gray-100" />

      {/* Date picker trigger */}
      <div ref={calendarRef} className="relative">
        <button
          onClick={() => setShowCalendar((v) => !v)}
          className="cursor-pointer w-full grid grid-cols-2 gap-0 rounded-xl border border-gray-200 overflow-hidden text-left hover:border-[#0D99FF] transition-colors"
        >
          <div className="px-4 py-3 border-r border-gray-200">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-0.5">
              Nhận phòng
            </p>
            <p className="text-sm font-medium text-gray-800">
              {formatDate(range?.from)}
            </p>
          </div>
          <div className="px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-0.5">
              Trả phòng
            </p>
            <p className="text-sm font-medium text-gray-800">
              {formatDate(range?.to)}
            </p>
          </div>
        </button>

        {/* Floating calendar */}
        {showCalendar && (
          <div className="absolute z-50 top-full mt-2 left-0 bg-white rounded-2xl shadow-xl border border-gray-100 p-3">
            <DayPicker
              mode="range"
              selected={range}
              onSelect={(r) => {
                setRange(r);
                if (r?.from && r?.to) {
                  setTimeout(() => setShowCalendar(false), 0);
                  const inStr = toStr(r.from);
                  const outStr = toStr(r.to);
                  if (hasConflict(inStr, outStr, bookedRanges)) {
                    toast.error(
                      "Khoảng thời gian này đã có booking. Vui lòng chọn ngày khác.",
                    );
                  }
                }
              }}
              disabled={[{ before: today }, ...disabledDates]}
              numberOfMonths={1}
              showOutsideDays={false}
              style={{ "--rdp-accent-color": "#0D99FF" } as React.CSSProperties}
            />
            <p className="text-xs text-gray-400 px-2 pb-1">
              🔴 Ngày đã có booking - không thể chọn check-in
            </p>
          </div>
        )}
      </div>

      {/* Number of guests */}
      <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700">
        <Users size={14} className="text-gray-400" />
        <span>Số lượng khách</span>
        <span className="ml-auto text-sm font-medium text-gray-700">
          {room.maxGuests} người lớn
        </span>
      </div>

      <hr className="border-gray-100" />

      {/* Price table */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>
            {formatCurrency(room.basePrice)} × {nights} đêm
          </span>
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
      <button
        onClick={handleBook}
        disabled={!checkIn || !checkOut}
        className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl bg-[#0D99FF] py-3 text-sm font-semibold text-white hover:bg-[#0B84E6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <CalendarDays size={16} />
        Đặt phòng ngay
      </button>
    </div>
  );
}
