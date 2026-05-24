"use client";

import { useState } from "react";
import StatsSection from "@/features/dashboard/components/StatsSection";
import RevenueChart from "@/features/dashboard/components/RevenueChart";
import RoomTimeline from "@/features/dashboard/components/RoomTimeline";

export default function DashboardPage() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const now = new Date();
  const isCurrentMonth = currentDate.getMonth() === now.getMonth() && currentDate.getFullYear() === now.getFullYear();

  const prevMonthDate = new Date();
  prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
  const isPreviousMonth =
    currentDate.getMonth() === prevMonthDate.getMonth() && currentDate.getFullYear() === prevMonthDate.getFullYear();

  const handleSetCurrentPeriod = () => {
    setCurrentDate(new Date());
  };

  const handleSetPreviousPeriod = () => {
    const d = new Date();
    d.setMonth(d.getMonth() - 1);
    setCurrentDate(d);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold tracking-wide text-gray-900 uppercase">Tổng quan hiệu suất</h1>
        </div>

        <div className="flex items-center overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <button
            onClick={handleSetCurrentPeriod}
            className={`cursor-pointer px-4 py-2 text-sm font-medium transition-colors ${
              isCurrentMonth ? "bg-[#0D99FF] text-white" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Tháng Này
          </button>
          <button
            onClick={handleSetPreviousPeriod}
            className={`cursor-pointer border-l border-gray-200 px-4 py-2 text-sm font-medium transition-colors ${
              isPreviousMonth ? "bg-[#0D99FF] text-white" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Tháng Trước
          </button>
        </div>
      </div>

      <StatsSection currentDate={currentDate} />
      <RevenueChart currentDate={currentDate} />
      <RoomTimeline currentDate={currentDate} onChangeDate={setCurrentDate} />
    </div>
  );
}
