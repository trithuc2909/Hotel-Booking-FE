"use client";

import { useState, useMemo, useEffect } from "react";
import {
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  differenceInCalendarDays,
  isSameDay,
} from "date-fns";
import { useGetRoomTimelineQuery } from "../api/dashboardApi";
import {
  Loader2,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Lightbulb,
} from "lucide-react";
import UpdateStatusModal from "../../booking/admin/modals/UpdateStatusModal";

const COLS_PER_DAY = 2;
const ROOM_NAME_COL_WIDTH = "128px";
const ROOM_ROW_MIN_HEIGHT = 56;
const SCROLL_HEIGHT_OFFSET = "260px";
const GRID_COLS = `${ROOM_NAME_COL_WIDTH} repeat(${7 * COLS_PER_DAY}, 1fr)`;

const STATUS_STYLES: Record<string, { bar: string; dot: string }> = {
  CHECKED_IN: { bar: "bg-blue-500 text-white", dot: "bg-blue-500" },
  CONFIRMED: { bar: "bg-amber-400 text-white", dot: "bg-amber-400" },
  PENDING: { bar: "bg-amber-400 text-white", dot: "bg-amber-400" },
  PENDING_PAYMENT: { bar: "bg-orange-400 text-white", dot: "bg-orange-400" },
  CHECKED_OUT: { bar: "bg-gray-200 text-gray-600 border border-gray-300", dot: "bg-gray-400" },
};

const LEGEND = [
  { label: "Đang ở", status: "CHECKED_IN" },
  { label: "Chờ nhận phòng", status: "CONFIRMED" },
  { label: "Chờ thanh toán", status: "PENDING_PAYMENT" },
  { label: "Đã trả phòng", status: "CHECKED_OUT" },
];

const TIMELINE_TEXTS = {
  title: "Thời gian Đặt Phòng",
  prevWeek: "Tuần trước",
  today: "Hôm nay",
  nextWeek: "Tuần sau",
  roomLabel: "Phòng",
  noRooms: "Chưa có dữ liệu phòng nào.",
  guest: "Khách",
  checkIn: "Nhận",
  checkOut: "Trả",
  duration: "Thời gian lưu trú:",
  nightUnit: "đêm",

  status: {
    CHECKED_IN: "Đang ở",
    CONFIRMED: "Chờ nhận",
    PENDING_PAYMENT: "Chờ thanh toán",
    CHECKED_OUT: "Đã trả",
  } as Record<string, string>
};

export default function RoomTimeline({
  currentDate,
  onChangeDate,
}: {
  currentDate: Date;
  onChangeDate: (date: Date) => void;
}) {
  const monthOptions = useMemo(() => {
    const options = [];
    const base = new Date();
    for (let i = -12; i <= 6; i++) {
      const d = new Date(base.getFullYear(), base.getMonth() + i, 1);
      options.push({
        value: format(d, "yyyy-MM"),
        label: `Tháng ${format(d, "MM/yyyy")}`,
      });
    }
    return options;
  }, []);

  const [activeBookingUpdate, setActiveBookingUpdate] = useState<any | null>(null);

  const handleDateChange = (newDate: Date) => {
    onChangeDate(newDate);
  };

  const { fromDate, toDate, days } = useMemo(() => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    const end = endOfWeek(currentDate, { weekStartsOn: 1 });
    const daysArr = Array.from({ length: 7 }, (_, i) => {
      const d = addDays(start, i);
      return { label: format(d, "EEE").toUpperCase(), date: parseInt(format(d, "d")), fullDate: d };
    });
    return { fromDate: start, toDate: end, days: daysArr };
  }, [currentDate]);

  const { data, isLoading, isFetching, refetch } = useGetRoomTimelineQuery({
    from: format(fromDate, "yyyy-MM-dd"),
    to: format(toDate, "yyyy-MM-dd"),
  });

  const rooms = useMemo(() => {
    if (!data?.data) return [];
    return [...data.data].sort((a, b) =>
      a.roomCode.localeCompare(b.roomCode, undefined, { numeric: true, sensitivity: "base" })
    );
  }, [data]);

  const today = new Date();

  const getGridColumn = (checkInDate: string, checkOutDate: string) => {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    let startCol = differenceInCalendarDays(checkIn, fromDate) * COLS_PER_DAY + 3;
    let endCol = differenceInCalendarDays(checkOut, fromDate) * COLS_PER_DAY + 3;

    const maxCols = 7 * COLS_PER_DAY + 2;
    if (startCol < 2) startCol = 2;
    if (endCol > maxCols) endCol = maxCols;

    if (startCol >= endCol) {
      endCol = startCol + 1;
    }

    return `${startCol} / ${endCol}`;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm relative overflow-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      {(isLoading || isFetching) && (
        <div className="absolute inset-0 z-30 bg-white/60 backdrop-blur-[2px] flex items-center justify-center rounded-xl">
          <Loader2 className="animate-spin text-blue-500 w-8 h-8" />
        </div>
      )}

      <div
        className="overflow-y-auto overflow-x-hidden scrollbar-none"
        style={{ maxHeight: `calc(100vh - ${SCROLL_HEIGHT_OFFSET})` }}
      >
        <div className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">

          <div className="flex items-center justify-between px-5 pt-4 pb-3 flex-wrap gap-3">
            <div>
              <h3 className="font-semibold text-gray-800 text-base">{TIMELINE_TEXTS.title}</h3>
              <div className="flex items-center gap-3 mt-1.5">
                <div className="flex items-center rounded-md border border-gray-200 bg-white overflow-hidden shadow-sm">
                  <button
                    onClick={() => handleDateChange(addDays(currentDate, -7))}
                    className="cursor-pointer p-1 hover:bg-gray-50 text-gray-600 transition-colors"
                    title={TIMELINE_TEXTS.prevWeek}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => handleDateChange(new Date())}
                    className="cursor-pointer px-3 py-1 text-xs font-medium border-x border-gray-200 hover:bg-gray-50 text-gray-700 transition-colors flex items-center gap-1.5"
                  >
                    <CalendarIcon size={12} />
                    {TIMELINE_TEXTS.today}
                  </button>
                  <button
                    onClick={() => handleDateChange(addDays(currentDate, 7))}
                    className="cursor-pointer p-1 hover:bg-gray-50 text-gray-600 transition-colors"
                    title={TIMELINE_TEXTS.nextWeek}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                <select
                  value={format(currentDate, "yyyy-MM")}
                  onChange={(e) => {
                    const [year, month] = e.target.value.split("-");
                    const newDate = new Date(parseInt(year), parseInt(month) - 1, 1);
                    handleDateChange(newDate);
                  }}
                  className="cursor-pointer bg-white border border-gray-200 rounded-md px-2.5 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm outline-none"
                >
                  {monthOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                <p className="text-xs text-gray-500 font-medium">
                  {format(fromDate, "dd/MM")} – {format(toDate, "dd/MM/yyyy")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              {LEGEND.map(({ label, status }) => (
                <div key={status} className="flex items-center gap-1.5">
                  <span className={`inline-block h-2.5 w-2.5 rounded-sm ${STATUS_STYLES[status]?.dot}`} />
                  <span className="text-xs text-gray-500">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="grid px-5"
            style={{ gridTemplateColumns: GRID_COLS }}
          >
            <div className="text-xs font-medium text-gray-400 py-2 pr-3 uppercase tracking-wide">
              {TIMELINE_TEXTS.roomLabel}
            </div>
            {days.map((d, i) => {
              const isToday = isSameDay(d.fullDate, today);
              return (
                <div
                  key={i}
                  className={`text-center py-2 select-none ${isToday ? "text-blue-500" : "text-gray-500"}`}
                  style={{ gridColumn: `${i * 2 + 2} / ${i * 2 + 4}` }}
                >
                  <div className="text-[10px] font-semibold tracking-widest uppercase">
                    {d.label}
                  </div>
                  <div className={`text-sm font-bold mt-0.5 w-7 h-7 mx-auto flex items-center justify-center rounded-full ${isToday ? "bg-blue-500 text-white" : "text-gray-800"
                    }`}>
                    {d.date}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="px-5 pb-5">
          {rooms.length === 0 && !isLoading && (
            <div className="text-center py-12 text-gray-400 text-sm">
              {TIMELINE_TEXTS.noRooms}
            </div>
          )}

          {rooms.map((room, roomIdx) => (
            <div
              key={room.roomCode}
              className="grid border-b border-gray-50 hover:bg-gray-50/40 transition-colors"
              style={{ gridTemplateColumns: GRID_COLS, minHeight: ROOM_ROW_MIN_HEIGHT }}
            >
              <div className="flex flex-col justify-center pr-3 py-1">
                <span className="text-gray-800 font-bold text-xs leading-none">
                  {room.roomCode}
                </span>
                <span className="text-gray-400 text-[10px] mt-0.5 tracking-wide truncate">
                  {room.roomType}
                </span>
              </div>

              {Array.from({ length: 7 }, (_, i) => (
                <div
                  key={i}
                  className="border-l border-gray-100 py-1 px-0.5 relative group/cell"
                  style={{ gridColumn: `${i * 2 + 2} / ${i * 2 + 4}`, gridRow: 1 }}
                >
                  <div className="h-10 rounded-md bg-gray-50/40 border border-dashed border-gray-100 relative overflow-hidden">
                    <div className="absolute inset-y-0 left-1/2 border-l border-dashed border-gray-200/80" />
                    <div className="absolute inset-0 flex justify-between px-1.5 items-center text-[8px] font-bold text-gray-300 select-none opacity-0 group-hover/cell:opacity-100 transition-opacity duration-300">
                      <span>AM</span>
                      <span>PM</span>
                    </div>
                  </div>
                </div>
              ))}

              {room.bookings.map((booking) => {
                const checkIn = new Date(booking.checkInDate);
                const checkOut = new Date(booking.checkOutDate);

                if (
                  differenceInCalendarDays(checkOut, fromDate) <= 0 ||
                  differenceInCalendarDays(checkIn, toDate) > 0
                ) return null;

                const gridColumn = getGridColumn(booking.checkInDate, booking.checkOutDate);
                const style = STATUS_STYLES[booking.status] ?? STATUS_STYLES.CONFIRMED;

                const startColVal = differenceInCalendarDays(checkIn, fromDate) * COLS_PER_DAY + 3;
                const endColVal = differenceInCalendarDays(checkOut, fromDate) * COLS_PER_DAY + 3;

                const isTopRow = roomIdx < 2;
                const isNearLeft = startColVal < 6;
                const isNearRight = endColVal > 12;

                let tooltipAlignClass = "left-1/2 -translate-x-1/2";
                let arrowAlignClass = "left-1/2 -translate-x-1/2";

                if (isNearLeft) {
                  tooltipAlignClass = "left-0 translate-x-0";
                  arrowAlignClass = "left-6 translate-x-0";
                } else if (isNearRight) {
                  tooltipAlignClass = "right-0 left-auto translate-x-0";
                  arrowAlignClass = "right-6 left-auto";
                }

                let tooltipVerticalClass = "bottom-full mb-2";
                let arrowVerticalClass = "top-full border-t-[6px] border-t-slate-900/95";

                if (isTopRow) {
                  tooltipVerticalClass = "top-full mt-2";
                  arrowVerticalClass = "bottom-full border-b-[6px] border-b-slate-900/95";
                }

                return (
                  <div
                    key={booking.bookingCode}
                    className="py-1 px-0.5 group relative"
                    style={{ gridColumn, gridRow: 1, zIndex: 1 }}
                  >
                    <div
                      onClick={() => setActiveBookingUpdate(booking)}
                      className={`h-10 rounded-md px-2.5 flex flex-col justify-center overflow-hidden cursor-pointer hover:opacity-90 transition-opacity ${style.bar}`}
                    >
                      <p className="font-semibold truncate text-[11px] leading-tight">
                        {booking.guestName}
                      </p>
                      <p className="text-[10px] opacity-75 truncate leading-tight">
                        {booking.bookingCode}
                      </p>
                    </div>

                    <div className={`absolute ${tooltipVerticalClass} ${tooltipAlignClass} hidden group-hover:flex flex-col gap-1.5 bg-slate-900/95 text-white p-3 rounded-lg shadow-xl text-xs w-60 z-50 pointer-events-none backdrop-blur-sm border border-slate-700/60 transition-all`}>
                      <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-0.5">
                        <span className="font-bold text-[#0D99FF]">{booking.bookingCode}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${booking.status === 'CHECKED_IN' ? 'bg-blue-500/20 text-blue-300' :
                          booking.status === 'CONFIRMED' ? 'bg-amber-500/20 text-amber-300' :
                            booking.status === 'PENDING_PAYMENT' ? 'bg-orange-500/20 text-orange-300' :
                              'bg-gray-500/20 text-gray-300'
                          }`}>
                          {TIMELINE_TEXTS.status[booking.status] || booking.status}
                        </span>
                      </div>
                      <p className="font-semibold text-white/95 truncate">{TIMELINE_TEXTS.guest}: {booking.guestName}</p>
                      <p className="text-slate-300 flex items-center gap-1">
                        📅 {TIMELINE_TEXTS.checkIn}: <span className="font-medium text-white">{format(new Date(booking.checkInDate), "dd/MM/yyyy")}</span>
                      </p>
                      <p className="text-slate-300 flex items-center gap-1">
                        📅 {TIMELINE_TEXTS.checkOut}: <span className="font-medium text-white">{format(new Date(booking.checkOutDate), "dd/MM/yyyy")}</span>
                      </p>
                      <div className="text-slate-400 border-t border-slate-800 pt-1 mt-0.5 flex justify-between items-center text-[10px]">
                        <span>{TIMELINE_TEXTS.duration}</span>
                        <span className="font-bold text-amber-400">
                          {differenceInCalendarDays(new Date(booking.checkOutDate), new Date(booking.checkInDate))} {TIMELINE_TEXTS.nightUnit}
                        </span>
                      </div>
                      <div className={`absolute w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent ${arrowVerticalClass} ${arrowAlignClass}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 bg-gray-50/30 px-5 py-4 flex flex-col md:flex-row gap-5 justify-between items-start md:items-center">
        <div className="flex-1">
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5">
            CHÚ THÍCH
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded bg-blue-500 flex-shrink-0" />
              <div>
                <p className="text-[11px] font-semibold text-gray-700 leading-tight">Đang ở</p>
                <p className="text-[9px] text-gray-400 mt-0.5">Khách đã nhận phòng</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded bg-amber-400 flex-shrink-0" />
              <div>
                <p className="text-[11px] font-semibold text-gray-700 leading-tight">Chờ nhận phòng</p>
                <p className="text-[9px] text-gray-400 mt-0.5">Khách sẽ đến nhận phòng</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded bg-orange-400 flex-shrink-0" />
              <div>
                <p className="text-[11px] font-semibold text-gray-700 leading-tight">Chờ thanh toán</p>
                <p className="text-[9px] text-gray-400 mt-0.5">Đã đặt, chờ thanh toán</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded bg-gray-100 border border-dashed border-gray-300 flex-shrink-0 flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded bg-gray-300/40" />
              </span>
              <div>
                <p className="text-[11px] font-semibold text-gray-700 leading-tight">Đã trả phòng</p>
                <p className="text-[9px] text-gray-400 mt-0.5">Đã check-out</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50/40 border border-blue-100/60 rounded-xl p-3 flex gap-2.5 items-start max-w-sm w-full md:w-auto">
          <Lightbulb className="text-blue-500 w-4 h-4 flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="text-[10px] font-bold text-blue-800 uppercase tracking-wider">
              GIẢI THÍCH
            </h5>
            <p className="text-[11px] text-blue-600 mt-1 leading-normal font-medium">
              Hệ thống cho phép booking mới bắt đầu cùng ngày với booking cũ nếu sau 12:00.
            </p>
          </div>
        </div>
      </div>
      {activeBookingUpdate && (
        <UpdateStatusModal
          isOpen={!!activeBookingUpdate}
          onClose={() => setActiveBookingUpdate(null)}
          bookingId={activeBookingUpdate.id}
          bookingCode={activeBookingUpdate.bookingCode}
          currentStatus={activeBookingUpdate.status}
          onSuccess={refetch}
        />
      )}
    </div>
  );
}
