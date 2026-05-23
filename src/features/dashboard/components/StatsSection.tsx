"use client";

import { TrendingUp, BedDouble, DollarSign, Loader2 } from "lucide-react";
import { useGetDashboardStatsQuery } from "../api/dashboardApi";
import { format } from "date-fns";

type StatCardProps = {
  title: string;
  value: string;
  change?: number;
  icon: React.ReactNode;
  highlight?: boolean;
};

function StatCard({ title, value, change, icon, highlight }: StatCardProps) {
  const isPositive = (change ?? 0) >= 0;

  return (
    <div
      className={`rounded-xl border p-5 flex flex-col gap-3 shadow-sm transition-shadow hover:shadow-md ${highlight
          ? "bg-gradient-to-br from-[#0D99FF] to-[#0B30A7] border-transparent text-white"
          : "bg-white border-gray-100 text-gray-800"
        }`}
    >
      <div className="flex items-center justify-between">
        <p
          className={`text-xs font-semibold uppercase tracking-wider ${highlight ? "text-blue-100" : "text-gray-500"
            }`}
        >
          {title}
        </p>
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${highlight ? "bg-white/20" : "bg-blue-50"
            }`}
        >
          <span className={highlight ? "text-white" : "text-[#0D99FF]"}>
            {icon}
          </span>
        </div>
      </div>

      <div className="flex items-end gap-2">
        <span
          className={`text-3xl font-bold ${highlight ? "text-white" : "text-gray-900"}`}
        >
          {value}
        </span>
      </div>

      {change !== undefined && (
        <div className="flex items-center gap-1">
          <TrendingUp
            size={13}
            className={`${isPositive
                ? highlight
                  ? "text-green-300"
                  : "text-green-500"
                : "text-red-400 rotate-180"
              }`}
          />
          <span
            className={`text-xs font-medium ${isPositive
                ? highlight
                  ? "text-green-300"
                  : "text-green-600"
                : "text-red-500"
              }`}
          >
            {isPositive ? "+" : ""}
            {change}% so với kỳ trước
          </span>
        </div>
      )}
    </div>
  );
}

export default function StatsSection({
  currentDate,
}: {
  currentDate: Date;
}) {
  const { data, isLoading } = useGetDashboardStatsQuery({
    month: format(currentDate, "yyyy-MM")
  });

  if (isLoading || !data) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-32 rounded-xl bg-gray-100 animate-pulse flex items-center justify-center"
          >
            <Loader2 className="animate-spin text-gray-400" />
          </div>
        ))}
      </div>
    );
  }

  const formatMoney = (val: number) => {
    if (val >= 1000000) return (val / 1000000).toFixed(3) + "M VNĐ";
    if (val >= 1000) return (val / 1000).toFixed(1) + "K VNĐ";
    return val.toString() + " VNĐ";
  };

  const formatNumber = (val: number) =>
    new Intl.NumberFormat("vi-VN").format(val);

  const stats = data.data;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard
        title="Tổng doanh thu"
        value={formatMoney(stats.totalRevenue.value)}
        change={stats.totalRevenue.change}
        icon={<DollarSign size={18} />}
        highlight
      />
      <StatCard
        title="Tổng đặt phòng"
        value={formatNumber(stats.totalBookings.value)}
        change={stats.totalBookings.change}
        icon={<BedDouble size={18} />}
      />
      <StatCard
        title="Giá thuê trung bình"
        value={formatMoney(stats.avgRoomRate.value)}
        change={stats.avgRoomRate.change}
        icon={<TrendingUp size={18} />}
      />
    </div>
  );
}
