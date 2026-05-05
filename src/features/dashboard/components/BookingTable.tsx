"use client";

import { MoreVertical } from "lucide-react";
import { Booking, BookingStatus } from "@/features/dashboard/mock/bookingsMock";

// ── Status badge config ────────────────────────────────────────
const STATUS_CONFIG: Record<
  BookingStatus,
  { label: string; className: string }
> = {
  paid:      { label: "Đã thanh toán",     className: "bg-emerald-100 text-emerald-700" },
  pending:   { label: "Chờ thanh toán",    className: "bg-yellow-100 text-yellow-700"  },
  deposit:   { label: "Đặt cọc & nhận tiền", className: "bg-orange-100 text-orange-700" },
  cancelled: { label: "Đã huỷ",            className: "bg-red-100 text-red-600"        },
};

function StatusBadge({ status }: { status: BookingStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold whitespace-nowrap ${cfg.className}`}
    >
      {cfg.label}
    </span>
  );
}

function ServiceCell({ services }: { services: Booking["services"] }) {
  if (!services.length) return <span className="text-gray-300 text-xs">—</span>;

  const first = services[0];
  const extra = services.length - 1;

  return (
    <div className="flex items-center gap-1.5">
      <span className="inline-block rounded-full bg-blue-50 text-[#0D99FF] text-[11px] font-medium px-2 py-0.5 truncate max-w-[110px]">
        {first.name}
      </span>
      {extra > 0 && (
        <span className="text-[11px] text-gray-400 font-medium shrink-0">
          +{extra}
        </span>
      )}
    </div>
  );
}

type Props = {
  bookings: Booking[];
  totalCount: number;
  page: number;
  pageSize: number;
  onPageChange: (p: number) => void;
};

export default function BookingTable({
  bookings,
  totalCount,
  page,
  pageSize,
  onPageChange,
}: Props) {
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {/* ── Head ── */}
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {["Mã Booking", "Khách Hàng", "Phòng", "Thời Gian", "Tổng Tiền", "Trạng Thái", "Dịch Vụ", ""].map(
                (col, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap"
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>

          {/* ── Body ── */}
          <tbody className="divide-y divide-gray-50">
            {bookings.map((b, i) => (
              <tr
                key={`${b.id}-${i}`}
                className="hover:bg-gray-50/60 transition-colors"
              >
                {/* Mã booking */}
                <td className="px-4 py-3 font-mono text-xs font-semibold text-[#0D99FF] whitespace-nowrap">
                  {b.id}
                </td>

                {/* Khách hàng */}
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-800 whitespace-nowrap">{b.guestName}</p>
                  <p className="text-xs text-gray-400">{b.guestEmail}</p>
                </td>

                {/* Phòng */}
                <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{b.room}</td>

                {/* Thời gian */}
                <td className="px-4 py-3 whitespace-nowrap">
                  <p className="text-gray-800">
                    {b.checkIn} – {b.checkOut}
                  </p>
                  <p className="text-xs text-gray-400">{b.nights} đêm</p>
                </td>

                {/* Tổng tiền */}
                <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">
                  {b.totalPrice.toLocaleString("vi-VN")}đ
                </td>

                {/* Trạng thái */}
                <td className="px-4 py-3">
                  <StatusBadge status={b.status} />
                </td>

                {/* Dịch vụ */}
                <td className="px-4 py-3">
                  <ServiceCell services={b.services} />
                </td>

                {/* Actions */}
                <td className="px-3 py-3">
                  {/* TODO (BE): Dropdown menu sửa / huỷ booking */}
                  <button className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Footer / Pagination ── */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-50 text-xs text-gray-500">
        <span>
          Hiển thị {bookings.length} trên số {totalCount}...
        </span>

        <div className="flex items-center gap-1">
          {/* Prev */}
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="px-2 py-1 rounded border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors"
          >
            ‹
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`px-2.5 py-1 rounded border text-xs font-medium transition-colors ${
                p === page
                  ? "bg-[#0D99FF] text-white border-[#0D99FF]"
                  : "border-gray-200 hover:bg-gray-50 text-gray-600"
              }`}
            >
              {p}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            className="px-2 py-1 rounded border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
