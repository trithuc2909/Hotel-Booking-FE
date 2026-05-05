"use client";

import { FileText, CheckCircle2, DollarSign } from "lucide-react";
import { MOCK_SERVICE_STATS } from "@/features/dashboard/mock/servicesMock";

type StatCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit?: string;
  iconBg: string;
  iconColor: string;
};

function StatCard({ icon, label, value, unit, iconBg, iconColor }: StatCardProps) {
  return (
    <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 flex items-center gap-4 min-w-[160px]">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
        <span className={iconColor}>{icon}</span>
      </div>
      <div>
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
        <p className="text-2xl font-extrabold text-gray-900 leading-tight mt-0.5">
          {value}
          {unit && <span className="text-sm font-normal text-gray-400 ml-1">{unit}</span>}
        </p>
      </div>
    </div>
  );
}

export default function ServiceStatsSection() {
  // TODO (BE): Thay MOCK_SERVICE_STATS bằng useGetServiceStatsQuery()
  const stats = MOCK_SERVICE_STATS;

  return (
    <div className="flex gap-4 flex-wrap">
      <StatCard
        icon={<FileText size={20} />}
        label="Tổng số dịch vụ"
        value={stats.total}
        iconBg="bg-blue-50"
        iconColor="text-[#0D99FF]"
      />
      <StatCard
        icon={<CheckCircle2 size={20} />}
        label="Đang hoạt động"
        value={stats.active}
        iconBg="bg-emerald-50"
        iconColor="text-emerald-500"
      />
      <StatCard
        icon={<DollarSign size={20} />}
        label="Doanh thu tháng này"
        value={stats.revenue}
        unit="VND"
        iconBg="bg-orange-50"
        iconColor="text-orange-500"
      />
    </div>
  );
}
