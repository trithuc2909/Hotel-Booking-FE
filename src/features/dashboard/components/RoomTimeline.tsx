"use client";

import { useState, useMemo, useEffect } from "react";
import { startOfWeek, endOfWeek, addDays, format, differenceInCalendarDays, isSameDay } from "date-fns";
import { useGetRoomTimelineQuery } from "../api/dashboardApi";
import { Loader2, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Lightbulb } from "lucide-react";
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
  } as Record<string, string>,
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
      a.roomCode.localeCompare(b.roomCode, undefined, { numeric: true, sensitivity: "base" }),
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
    <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `,
        }}
      />

      {(isLoading || isFetching) && (
        <div className="absolute inset-0 z-30 flex items-center justify-center rounded-xl bg-white/60 backdrop-blur-[2px]">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      )}

      <div
        className="scrollbar-none overflow-x-hidden overflow-y-auto"
        style={{ maxHeight: `calc(100vh - ${SCROLL_HEIGHT_OFFSET})` }}
      >
        <div className="sticky top-0 z-20 border-b border-gray-100 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 pt-4 pb-3">
            <div>
              <h3 className="text-base font-semibold text-gray-800">{TIMELINE_TEXTS.title}</h3>
              <div className="mt-1.5 flex items-center gap-3">
                <div className="flex items-center overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
                  <button
                    onClick={() => handleDateChange(addDays(currentDate, -7))}
                    className="cursor-pointer p-1 text-gray-600 transition-colors hover:bg-gray-50"
                    title={TIMELINE_TEXTS.prevWeek}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => handleDateChange(new Date())}
                    className="flex cursor-pointer items-center gap-1.5 border-x border-gray-200 px-3 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    <CalendarIcon size={12} />
                    {TIMELINE_TEXTS.today}
                  </button>
                  <button
                    onClick={() => handleDateChange(addDays(currentDate, 7))}
                    className="cursor-pointer p-1 text-gray-600 transition-colors hover:bg-gray-50"
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
                  className="cursor-pointer rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-700 shadow-sm transition-colors outline-none hover:bg-gray-50"
                >
                  {monthOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                <p className="text-xs font-medium text-gray-500">
                  {format(fromDate, "dd/MM")} – {format(toDate, "dd/MM/yyyy")}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {LEGEND.map(({ label, status }) => (
                <div key={status} className="flex items-center gap-1.5">
                  <span className={`inline-block h-2.5 w-2.5 rounded-sm ${STATUS_STYLES[status]?.dot}`} />
                  <span className="text-xs text-gray-500">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid px-5" style={{ gridTemplateColumns: GRID_COLS }}>
            <div className="py-2 pr-3 text-xs font-medium tracking-wide text-gray-400 uppercase">
              {TIMELINE_TEXTS.roomLabel}
            </div>
            {days.map((d, i) => {
              const isToday = isSameDay(d.fullDate, today);
              return (
                <div
                  key={i}
                  className={`py-2 text-center select-none ${isToday ? "text-blue-500" : "text-gray-500"}`}
                  style={{ gridColumn: `${i * 2 + 2} / ${i * 2 + 4}` }}
                >
                  <div className="text-[10px] font-semibold tracking-widest uppercase">{d.label}</div>
                  <div
                    className={`mx-auto mt-0.5 flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${
                      isToday ? "bg-blue-500 text-white" : "text-gray-800"
                    }`}
                  >
                    {d.date}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="px-5 pb-5">
          {rooms.length === 0 && !isLoading && (
            <div className="py-12 text-center text-sm text-gray-400">{TIMELINE_TEXTS.noRooms}</div>
          )}

          {rooms.map((room, roomIdx) => (
            <div
              key={room.roomCode}
              className="grid border-b border-gray-50 transition-colors hover:bg-gray-50/40"
              style={{ gridTemplateColumns: GRID_COLS, minHeight: ROOM_ROW_MIN_HEIGHT }}
            >
              <div className="flex flex-col justify-center py-1 pr-3">
                <span className="text-xs leading-none font-bold text-gray-800">{room.roomCode}</span>
                <span className="mt-0.5 truncate text-[10px] tracking-wide text-gray-400">{room.roomType}</span>
              </div>

              {Array.from({ length: 7 }, (_, i) => (
                <div
                  key={i}
                  className="group/cell relative border-l border-gray-100 px-0.5 py-1"
                  style={{ gridColumn: `${i * 2 + 2} / ${i * 2 + 4}`, gridRow: 1 }}
                >
                  <div className="relative h-10 overflow-hidden rounded-md border border-dashed border-gray-100 bg-gray-50/40">
                    <div className="absolute inset-y-0 left-1/2 border-l border-dashed border-gray-200/80" />
                    <div className="absolute inset-0 flex items-center justify-between px-1.5 text-[8px] font-bold text-gray-300 opacity-0 transition-opacity duration-300 select-none group-hover/cell:opacity-100">
                      <span>AM</span>
                      <span>PM</span>
                    </div>
                  </div>
                </div>
              ))}

              {room.bookings.map((booking) => {
                const checkIn = new Date(booking.checkInDate);
                const checkOut = new Date(booking.checkOutDate);

                if (differenceInCalendarDays(checkOut, fromDate) <= 0 || differenceInCalendarDays(checkIn, toDate) > 0)
                  return null;

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
                    className="group relative px-0.5 py-1"
                    style={{ gridColumn, gridRow: 1, zIndex: 1 }}
                  >
                    <div
                      onClick={() => setActiveBookingUpdate(booking)}
                      className={`flex h-10 cursor-pointer flex-col justify-center overflow-hidden rounded-md px-2.5 transition-opacity hover:opacity-90 ${style.bar}`}
                    >
                      <p className="truncate text-[11px] leading-tight font-semibold">{booking.guestName}</p>
                      <p className="truncate text-[10px] leading-tight opacity-75">{booking.bookingCode}</p>
                    </div>

                    <div
                      className={`absolute ${tooltipVerticalClass} ${tooltipAlignClass} pointer-events-none z-50 hidden w-60 flex-col gap-1.5 rounded-lg border border-slate-700/60 bg-slate-900/95 p-3 text-xs text-white shadow-xl backdrop-blur-sm transition-all group-hover:flex`}
                    >
                      <div className="mb-0.5 flex items-center justify-between border-b border-slate-800 pb-1.5">
                        <span className="font-bold text-[#0D99FF]">{booking.bookingCode}</span>
                        <span
                          className={`rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wider uppercase ${
                            booking.status === "CHECKED_IN"
                              ? "bg-blue-500/20 text-blue-300"
                              : booking.status === "CONFIRMED"
                                ? "bg-amber-500/20 text-amber-300"
                                : booking.status === "PENDING_PAYMENT"
                                  ? "bg-orange-500/20 text-orange-300"
                                  : "bg-gray-500/20 text-gray-300"
                          }`}
                        >
                          {TIMELINE_TEXTS.status[booking.status] || booking.status}
                        </span>
                      </div>
                      <p className="truncate font-semibold text-white/95">
                        {TIMELINE_TEXTS.guest}: {booking.guestName}
                      </p>
                      <p className="flex items-center gap-1 text-slate-300">
                        📅 {TIMELINE_TEXTS.checkIn}:{" "}
                        <span className="font-medium text-white">
                          {format(new Date(booking.checkInDate), "dd/MM/yyyy")}
                        </span>
                      </p>
                      <p className="flex items-center gap-1 text-slate-300">
                        📅 {TIMELINE_TEXTS.checkOut}:{" "}
                        <span className="font-medium text-white">
                          {format(new Date(booking.checkOutDate), "dd/MM/yyyy")}
                        </span>
                      </p>
                      <div className="mt-0.5 flex items-center justify-between border-t border-slate-800 pt-1 text-[10px] text-slate-400">
                        <span>{TIMELINE_TEXTS.duration}</span>
                        <span className="font-bold text-amber-400">
                          {differenceInCalendarDays(new Date(booking.checkOutDate), new Date(booking.checkInDate))}{" "}
                          {TIMELINE_TEXTS.nightUnit}
                        </span>
                      </div>
                      <div
                        className={`absolute h-0 w-0 border-r-[6px] border-l-[6px] border-r-transparent border-l-transparent ${arrowVerticalClass} ${arrowAlignClass}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-start justify-between gap-5 border-t border-gray-100 bg-gray-50/30 px-5 py-4 md:flex-row md:items-center">
        <div className="flex-1">
          <h4 className="mb-2.5 text-[10px] font-bold tracking-wider text-gray-400 uppercase">CHÚ THÍCH</h4>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="flex items-start gap-2">
              <span className="h-5 w-5 flex-shrink-0 rounded bg-blue-500" />
              <div>
                <p className="text-[11px] leading-tight font-semibold text-gray-700">Đang ở</p>
                <p className="mt-0.5 text-[9px] text-gray-400">Khách đã nhận phòng</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="h-5 w-5 flex-shrink-0 rounded bg-amber-400" />
              <div>
                <p className="text-[11px] leading-tight font-semibold text-gray-700">Chờ nhận phòng</p>
                <p className="mt-0.5 text-[9px] text-gray-400">Khách sẽ đến nhận phòng</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="h-5 w-5 flex-shrink-0 rounded bg-orange-400" />
              <div>
                <p className="text-[11px] leading-tight font-semibold text-gray-700">Chờ thanh toán</p>
                <p className="mt-0.5 text-[9px] text-gray-400">Đã đặt, chờ thanh toán</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border border-dashed border-gray-300 bg-gray-100">
                <span className="h-2.5 w-2.5 rounded bg-gray-300/40" />
              </span>
              <div>
                <p className="text-[11px] leading-tight font-semibold text-gray-700">Đã trả phòng</p>
                <p className="mt-0.5 text-[9px] text-gray-400">Đã check-out</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full max-w-sm items-start gap-2.5 rounded-xl border border-blue-100/60 bg-blue-50/40 p-3 md:w-auto">
          <Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500" />
          <div>
            <h5 className="text-[10px] font-bold tracking-wider text-blue-800 uppercase">GIẢI THÍCH</h5>
            <p className="mt-1 text-[11px] leading-normal font-medium text-blue-600">
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
