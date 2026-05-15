"use client";

import { useState } from "react";
import StatsSection from "@/features/dashboard/components/StatsSection";
import RevenueChart from "@/features/dashboard/components/RevenueChart";
import RoomTimeline from "@/features/dashboard/components/RoomTimeline";

export default function DashboardPage() {
  const [period, setPeriod] = useState<"current" | "previous">("current");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-xs text-gray-400 mb-1">
            Quản trị &rsaquo; Quản lý doanh thu
          </p>
          <h1 className="text-xl font-extrabold tracking-wide text-gray-900 uppercase">
            Tổng quan hiệu suất
          </h1>
        </div>

        <div className="flex items-center rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm">
          <button
            onClick={() => setPeriod("current")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              period === "current"
                ? "bg-[#0D99FF] text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Tháng Này
          </button>
          <button
            onClick={() => setPeriod("previous")}
            className={`px-4 py-2 text-sm font-medium transition-colors border-l border-gray-200 ${
              period === "previous"
                ? "bg-[#0D99FF] text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Tháng Trước
          </button>
        </div>
      </div>

      {/* ── Stat cards ── */}
      {/* TODO (BE): Truyền prop period vào StatsSection để fetch đúng period */}
      <StatsSection />

      {/* ── Revenue chart ── */}
      {/* TODO (BE): Truyền prop period vào RevenueChart để fetch đúng period */}
      <RevenueChart />

      {/* ── Room timeline ── */}
      {/* TODO (BE): Thêm date-range picker để chọn tuần xem timeline */}
      <RoomTimeline />
    </div>
  );
}