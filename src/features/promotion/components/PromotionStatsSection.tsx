"use client";

import { Tag, Zap, BarChart2 } from "lucide-react";
import { useGetPromotionStatsQuery } from "../api/promotionApi";

const StatCard = ({ icon, iconBg, label, value }: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
      {icon}
    </div>
    <div>
      <p className="text-xs font-medium text-gray-400">{label}</p>
      <p className="mt-0.5 text-xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

export default function PromotionStatsSection() {
  const { data } = useGetPromotionStatsQuery();
  const stats = data?.data;

  return (
    <div className="grid grid-cols-3 gap-4">
      <StatCard
        iconBg="bg-blue-50"
        icon={<Tag size={22} className="text-blue-500" />}
        label="Tổng ưu đãi"
        value={stats?.total ?? 0}
      />
      <StatCard
        iconBg="bg-green-50"
        icon={<Zap size={22} className="text-green-500" />}
        label="Đang hoạt động"
        value={stats?.active ?? 0}
      />
      <StatCard
        iconBg="bg-purple-50"
        icon={<BarChart2 size={22} className="text-purple-500" />}
        label="Tổng lượt sử dụng"
        value={stats?.totalUsage ?? 0}
      />
    </div>
  );
}
