"use client";

import { useState, useRef, useEffect } from "react";
import { MoreVertical, Eye, Pencil, PowerOff, Power } from "lucide-react";
import {
  Service,
  ServiceCategory,
  CATEGORY_CONFIG,
} from "@/features/dashboard/mock/servicesMock";

// ── Status badge ───────────────────────────────────────────────
function StatusBadge({ status }: { status: Service["status"] }) {
  return status === "active" ? (
    <span className="text-sm font-medium text-emerald-600">Đang hoạt động</span>
  ) : (
    <span className="text-sm font-medium text-red-500">Ngưng hoạt động</span>
  );
}

// ── Category badge ─────────────────────────────────────────────
function CategoryBadge({ category }: { category: ServiceCategory }) {
  const cfg = CATEGORY_CONFIG[category];
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold ${cfg.className}`}>
      {cfg.label}
    </span>
  );
}

// ── 3-dot action menu ──────────────────────────────────────────
function ActionMenu({ service, onStatusToggle }: {
  service: Service;
  onStatusToggle: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Đóng khi click ngoài
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <MoreVertical size={16} />
      </button>

      {open && (
        <div className="absolute right-0 top-8 z-20 w-48 rounded-xl border border-gray-100 bg-white shadow-xl py-1">
          {/* TODO (BE): Mở modal xem chi tiết dịch vụ */}
          <button
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Eye size={14} className="text-gray-400" />
            Xem chi tiết
          </button>

          {/* TODO (BE): Mở modal chỉnh sửa dịch vụ */}
          <button
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Pencil size={14} className="text-gray-400" />
            Chỉnh sửa khuyến mãi
          </button>

          <div className="my-1 border-t border-gray-100" />

          {/* Toggle active / inactive */}
          {service.status === "active" ? (
            <button
              onClick={() => { onStatusToggle(service.id); setOpen(false); }}
              className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
            >
              <PowerOff size={14} />
              Ngưng hoạt động
            </button>
          ) : (
            <button
              onClick={() => { onStatusToggle(service.id); setOpen(false); }}
              className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-emerald-600 hover:bg-emerald-50 transition-colors"
            >
              <Power size={14} />
              Kích hoạt
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main table ─────────────────────────────────────────────────
type Props = {
  services: Service[];
  onStatusToggle: (id: string) => void;
};

export default function ServiceTable({ services, onStatusToggle }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {/* Head */}
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {["Dịch Vụ", "Danh Mục", "Đơn Giá", "Trạng Thái", "Thao Tác"].map((col, i) => (
                <th
                  key={i}
                  className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-50">
            {services.map((svc) => (
              <tr key={svc.id} className="hover:bg-gray-50/60 transition-colors">
                {/* Tên dịch vụ + ảnh */}
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={svc.imageUrl}
                      alt={svc.name}
                      className="h-10 w-16 rounded-lg object-cover shrink-0"
                    />
                    <span className="font-medium text-gray-800 whitespace-nowrap">
                      {svc.name}
                    </span>
                  </div>
                </td>

                {/* Danh mục */}
                <td className="px-5 py-3">
                  <CategoryBadge category={svc.category} />
                </td>

                {/* Đơn giá */}
                <td className="px-5 py-3 whitespace-nowrap">
                  <p className="font-semibold text-gray-900">
                    {svc.pricePerUnit.toLocaleString("vi-VN")} VNĐ
                  </p>
                  <p className="text-xs text-gray-400">mỗi {svc.unit}</p>
                </td>

                {/* Trạng thái */}
                <td className="px-5 py-3">
                  <StatusBadge status={svc.status} />
                </td>

                {/* Thao tác */}
                <td className="px-5 py-3">
                  <ActionMenu service={svc} onStatusToggle={onStatusToggle} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {services.length === 0 && (
        <div className="py-12 text-center text-gray-400 text-sm">
          Không tìm thấy dịch vụ nào.
        </div>
      )}
    </div>
  );
}
