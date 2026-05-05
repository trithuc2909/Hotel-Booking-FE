"use client";

import { useState, useRef, useEffect } from "react";
import { MoreVertical, Eye, Pencil, PowerOff, Power } from "lucide-react";
import {
  Promotion,
  PromoStatus,
} from "@/features/dashboard/mock/promotionsMock";

// ── Status badge ───────────────────────────────────────────────
const STATUS_CFG: Record<PromoStatus, { label: string; className: string }> = {
  active:   { label: "Đang hoạt động",  className: "text-emerald-600" },
  inactive: { label: "Ngưng hoạt động", className: "text-red-500"     },
  expired:  { label: "Hết hạn",         className: "text-gray-400"    },
};

// ── Promo code badge ───────────────────────────────────────────
const CODE_COLORS = [
  "bg-orange-100 text-orange-700",
  "bg-blue-100 text-blue-700",
  "bg-purple-100 text-purple-700",
  "bg-green-100 text-green-700",
  "bg-pink-100 text-pink-700",
  "bg-yellow-100 text-yellow-700",
];

function CodeBadge({ code, index }: { code: string; index: number }) {
  const color = CODE_COLORS[index % CODE_COLORS.length];
  return (
    <span className={`inline-block rounded px-2 py-0.5 text-xs font-bold tracking-wide ${color}`}>
      {code}
    </span>
  );
}

// ── Usage progress bar ─────────────────────────────────────────
function UsageBar({ used, total }: { used: number; total: number }) {
  const pct = total > 0 ? Math.round((used / total) * 100) : 0;
  const isAlmostFull = pct >= 90;

  return (
    <div className="space-y-1 min-w-[80px]">
      <p className="text-xs text-gray-700 font-medium">
        {used.toLocaleString("vi-VN")}/{total.toLocaleString("vi-VN")}
      </p>
      <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${
            isAlmostFull ? "bg-red-400" : "bg-[#0D99FF]"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ── 3-dot action menu ──────────────────────────────────────────
function ActionMenu({
  promo,
  onStatusToggle,
}: {
  promo: Promotion;
  onStatusToggle: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
        <div className="absolute right-0 top-8 z-20 w-52 rounded-xl border border-gray-100 bg-white shadow-xl py-1">
          {/* TODO (BE): Mở modal xem chi tiết */}
          <button
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Eye size={14} className="text-gray-400" />
            Xem chi tiết
          </button>

          {/* TODO (BE): Mở modal chỉnh sửa ưu đãi */}
          <button
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Pencil size={14} className="text-gray-400" />
            Chỉnh sửa khuyến mãi
          </button>

          <div className="my-1 border-t border-gray-100" />

          {/* Toggle trạng thái */}
          {promo.status !== "expired" && (
            promo.status === "active" ? (
              <button
                onClick={() => { onStatusToggle(promo.id); setOpen(false); }}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
              >
                <PowerOff size={14} />
                Ngưng hoạt động
              </button>
            ) : (
              <button
                onClick={() => { onStatusToggle(promo.id); setOpen(false); }}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-emerald-600 hover:bg-emerald-50 transition-colors"
              >
                <Power size={14} />
                Kích hoạt
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}

// ── Main table ─────────────────────────────────────────────────
const PAGE_SIZE = 3;

type Props = {
  promotions: Promotion[];
  onStatusToggle: (id: string) => void;
};

export default function PromotionTable({ promotions, onStatusToggle }: Props) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(promotions.length / PAGE_SIZE);
  const paginated  = promotions.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {/* Head */}
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {["Chiến Dịch", "Mã Ưu Đãi", "Giá Trị", "Thời Gian Áp Dụng", "Số Lượng Còn Lại", "Trạng Thái", "Thao Tác"].map(
                (col, i) => (
                  <th
                    key={i}
                    className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap"
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-50">
            {paginated.map((promo, i) => (
              <tr key={promo.id} className="hover:bg-gray-50/60 transition-colors">
                {/* Chiến dịch */}
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={promo.imageUrl}
                      alt={promo.name}
                      className="h-10 w-16 rounded-lg object-cover shrink-0"
                    />
                    <span className="font-medium text-gray-800 whitespace-nowrap">
                      {promo.name}
                    </span>
                  </div>
                </td>

                {/* Mã ưu đãi */}
                <td className="px-5 py-3">
                  <CodeBadge code={promo.code} index={(page - 1) * PAGE_SIZE + i} />
                </td>

                {/* Giá trị */}
                <td className="px-5 py-3 font-semibold text-gray-800 whitespace-nowrap">
                  {promo.discountType === "fixed"
                    ? `-${(promo.discountValue).toLocaleString("vi-VN")}k`
                    : `-${promo.discountValue}%`}
                </td>

                {/* Thời gian */}
                <td className="px-5 py-3 whitespace-nowrap">
                  <p className="text-gray-700 text-xs">{promo.startDate} –</p>
                  <p className="text-gray-700 text-xs">{promo.endDate}</p>
                </td>

                {/* Số lượng còn lại */}
                <td className="px-5 py-3">
                  <UsageBar used={promo.usedCount} total={promo.totalLimit} />
                </td>

                {/* Trạng thái */}
                <td className="px-5 py-3">
                  <span className={`text-sm font-medium ${STATUS_CFG[promo.status].className}`}>
                    {STATUS_CFG[promo.status].label}
                  </span>
                </td>

                {/* Thao tác */}
                <td className="px-5 py-3">
                  <ActionMenu promo={promo} onStatusToggle={onStatusToggle} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-gray-50 text-xs text-gray-500">
        <span>
          Hiển thị {paginated.length} trên số {promotions.length} ưu đãi
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="px-2 py-1 rounded border border-gray-200 disabled:opacity-40 hover:bg-gray-50"
          >
            ‹
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-2.5 py-1 rounded border text-xs font-medium transition-colors ${
                p === page
                  ? "bg-[#0D99FF] text-white border-[#0D99FF]"
                  : "border-gray-200 hover:bg-gray-50 text-gray-600"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
            className="px-2 py-1 rounded border border-gray-200 disabled:opacity-40 hover:bg-gray-50"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
