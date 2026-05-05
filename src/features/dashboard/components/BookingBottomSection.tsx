"use client";

import { Car, Gem, Sparkles, MoreVertical } from "lucide-react";
import { RecentService, MOCK_ROOM_CAPACITY, MOCK_RECENT_SERVICES } from "@/features/dashboard/mock/bookingsMock";

// ── Service icon map ───────────────────────────────────────────
const ICON_MAP = {
  car:  { Icon: Car,      bg: "bg-blue-100",   color: "text-[#0D99FF]" },
  ring: { Icon: Gem,      bg: "bg-pink-100",   color: "text-pink-500"  },
  spa:  { Icon: Sparkles, bg: "bg-purple-100", color: "text-purple-500" },
};

const SERVICE_STATUS: Record<RecentService["status"], { label: string; className: string }> = {
  pending:   { label: "CHƯA THỰC HIỆN", className: "bg-yellow-100 text-yellow-700" },
  done:      { label: "HOÀN THÀNH",     className: "bg-emerald-100 text-emerald-700" },
  cancelled: { label: "ĐÃ HUỶ",         className: "bg-red-100 text-red-600" },
};

// ── Room capacity ring ─────────────────────────────────────────
function RoomCapacityCard() {
  const { occupied, total } = MOCK_ROOM_CAPACITY;
  const pct = Math.round((occupied / total) * 100);

  return (
    <div
      className="flex-1 rounded-xl flex flex-col items-center justify-center gap-2 py-8 text-white min-h-[180px]"
      style={{ background: "linear-gradient(135deg, #0D99FF 0%, #0B30A7 100%)" }}
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-blue-200">
        Công suất phòng hôm nay
      </p>
      {/* Big number */}
      <p className="text-6xl font-extrabold leading-none">
        {occupied}
        <span className="text-3xl font-semibold text-blue-200">/{total}</span>
      </p>
      {/* Progress bar */}
      <div className="w-32 h-1.5 bg-white/30 rounded-full overflow-hidden mt-1">
        <div
          className="h-full bg-white rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-blue-200">{pct}% công suất</p>
    </div>
  );
}

// ── Recent services list ───────────────────────────────────────
function RecentServicesCard() {
  return (
    <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <div className="mb-3">
        <h3 className="font-semibold text-gray-800">Dịch vụ Gần đây</h3>
        <p className="text-xs text-gray-400 mt-0.5">Cập nhật yêu cầu từ khách lưu trú</p>
      </div>

      <div className="space-y-3">
        {/* TODO (BE): Thay MOCK_RECENT_SERVICES bằng API GET /admin/services/recent */}
        {MOCK_RECENT_SERVICES.map((svc, i) => {
          const { Icon, bg, color } = ICON_MAP[svc.icon];
          const statusCfg = SERVICE_STATUS[svc.status];
          return (
            <div key={i} className="flex items-center gap-3">
              {/* Icon */}
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${bg}`}>
                <Icon size={16} className={color} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-medium text-gray-800 truncate">{svc.name}</p>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${statusCfg.className}`}>
                    {statusCfg.label}
                  </span>
                </div>
                <p className="text-xs text-gray-400 truncate">
                  {svc.guest} • {svc.bookingId}
                </p>
              </div>

              {/* TODO (BE): Action menu cho từng dịch vụ */}
              <button className="shrink-0 p-1 rounded hover:bg-gray-100 text-gray-400 transition-colors">
                <MoreVertical size={15} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function BookingBottomSection() {
  return (
    <div className="flex gap-4 flex-wrap">
      <div className="flex-1 min-w-[260px]">
        <RecentServicesCard />
      </div>
      <div className="w-52 shrink-0">
        <RoomCapacityCard />
      </div>
    </div>
  );
}
