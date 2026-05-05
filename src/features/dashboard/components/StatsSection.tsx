"use client";

import { TrendingUp, BedDouble, DollarSign } from "lucide-react";

// ─────────────────────────────────────────────────────────────
// TODO (BE): Thay MOCK_STATS bằng data thực từ API
// GET /admin/dashboard/stats?period=current|previous
// ─────────────────────────────────────────────────────────────
const MOCK_STATS = {
  totalRevenue: { value: "482.5M", unit: "VND", change: 12.5 },
  totalBookings: { value: "1,248", change: 8.3 },
  avgRoomRate: { value: "1.8M", unit: "VND", change: -2.1 },
};

type StatCardProps = {
  title: string;
  value: string;
  unit?: string;
  change?: number;
  icon: React.ReactNode;
  highlight?: boolean;
};

function StatCard({ title, value, unit, change, icon, highlight }: StatCardProps) {
  const isPositive = (change ?? 0) >= 0;

  return (
    <div
      className={`rounded-xl border p-5 flex flex-col gap-3 shadow-sm transition-shadow hover:shadow-md ${
        highlight
          ? "bg-gradient-to-br from-[#0D99FF] to-[#0B30A7] border-transparent text-white"
          : "bg-white border-gray-100 text-gray-800"
      }`}
    >
      <div className="flex items-center justify-between">
        <p
          className={`text-xs font-semibold uppercase tracking-wider ${
            highlight ? "text-blue-100" : "text-gray-500"
          }`}
        >
          {title}
        </p>
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${
            highlight ? "bg-white/20" : "bg-blue-50"
          }`}
        >
          <span className={highlight ? "text-white" : "text-[#0D99FF]"}>{icon}</span>
        </div>
      </div>

      <div className="flex items-end gap-2">
        <span className={`text-3xl font-bold ${highlight ? "text-white" : "text-gray-900"}`}>
          {value}
        </span>
        {unit && (
          <span className={`text-sm mb-1 ${highlight ? "text-blue-200" : "text-gray-400"}`}>
            {unit}
          </span>
        )}
      </div>

      {change !== undefined && (
        <div className="flex items-center gap-1">
          <TrendingUp
            size={13}
            className={`${
              isPositive
                ? highlight
                  ? "text-green-300"
                  : "text-green-500"
                : "text-red-400 rotate-180"
            }`}
          />
          <span
            className={`text-xs font-medium ${
              isPositive
                ? highlight
                  ? "text-green-300"
                  : "text-green-600"
                : "text-red-500"
            }`}
          >
            {isPositive ? "+" : ""}
            {change}% so với tháng trước
          </span>
        </div>
      )}
    </div>
  );
}

export default function StatsSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard
        title="Tổng doanh thu"
        value={MOCK_STATS.totalRevenue.value}
        unit={MOCK_STATS.totalRevenue.unit}
        change={MOCK_STATS.totalRevenue.change}
        icon={<DollarSign size={18} />}
        highlight
      />
      <StatCard
        title="Tổng đặt phòng"
        value={MOCK_STATS.totalBookings.value}
        change={MOCK_STATS.totalBookings.change}
        icon={<BedDouble size={18} />}
      />
      <StatCard
        title="Giá thuê trung bình"
        value={MOCK_STATS.avgRoomRate.value}
        unit={MOCK_STATS.avgRoomRate.unit}
        change={MOCK_STATS.avgRoomRate.change}
        icon={<TrendingUp size={18} />}
      />
    </div>
  );
}
