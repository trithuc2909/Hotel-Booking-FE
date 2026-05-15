"use client";

import { LayoutGrid, CheckCircle2, WalletCards } from "lucide-react";
import { useGetServiceStatsQuery } from "../api/serviceApi";
import { formatCurrency } from "@/lib/utils";

const StatCard = ({
  icon,
  iconBg,
  label,
  value,
}: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
    <div
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
    >
      {icon}
    </div>
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
        {label}
      </p>
      <p className="mt-0.5 text-2xl font-extrabold text-gray-900">{value}</p>
    </div>
  </div>
);

export default function ServiceStatsSection() {
  const { data, isLoading } = useGetServiceStatsQuery();
  const stats = data?.data;

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-2xl bg-gray-100" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      <StatCard
        iconBg="bg-blue-50"
        icon={<LayoutGrid size={22} className="text-blue-500" />}
        label="Tổng số dịch vụ"
        value={stats?.total ?? 0}
      />
      <StatCard
        iconBg="bg-green-50"
        icon={<CheckCircle2 size={22} className="text-green-500" />}
        label="Đang hoạt động"
        value={stats?.active ?? 0}
      />
      <StatCard
        iconBg="bg-orange-50"
        icon={<WalletCards size={22} className="text-orange-500" />}
        label="Doanh thu tháng này"
        value={
          <div className="flex items-baseline gap-1">
            <span>{stats ? formatCurrency(stats.revenue) : "0"}</span>

            <span className="text-xs font-semibold text-gray-400">VNĐ</span>
          </div>
        }
      />
    </div>
  );
}
