"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { BookingHistory, BookingHistoryStatus } from "@/features/user/mock/bookingHistoryMock";

// ── Status badge config ────────────────────────────────────────
const STATUS_CFG: Record<
  BookingHistoryStatus,
  { label: string; className: string }
> = {
  completed: { label: "Đã hoàn thành",       className: "bg-emerald-100 text-emerald-700" },
  paid:      { label: "Đã thanh toán",        className: "bg-orange-100 text-orange-700"  },
  cancelled: { label: "Đã huỷ và hoàn tiền", className: "bg-red-100 text-red-600"        },
};

// ── Star rating component ──────────────────────────────────────
function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="p-0.5 transition-transform hover:scale-110"
        >
          <Star
            size={18}
            className={
              star <= (hovered || value)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }
          />
        </button>
      ))}
    </div>
  );
}

// ── Review section (chỉ hiện khi completed) ───────────────────
function ReviewSection({ bookingId }: { bookingId: string }) {
  const [rating, setRating] = useState(4);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!review.trim()) return;
    // TODO (BE): POST /bookings/:id/review { rating, comment }
    console.log("TODO (BE): Submit review for", bookingId, { rating, review });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mt-4 border-t border-gray-100 pt-4">
        <p className="text-sm text-emerald-600 font-medium">✓ Cảm ơn bạn đã gửi đánh giá!</p>
      </div>
    );
  }

  return (
    <div className="mt-4 border-t border-gray-100 pt-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-700">Trải nghiệm của bạn thế nào?</p>
        <StarRating value={rating} onChange={setRating} />
      </div>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Chia sẻ trải nghiệm của bạn tại khách sạn..."
        rows={3}
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:border-[#0D99FF] focus:outline-none focus:ring-1 focus:ring-[#0D99FF] resize-none"
      />
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="rounded-xl px-6 py-2 text-sm font-semibold text-white transition-colors"
          style={{ backgroundColor: "#0B30A7" }}
        >
          Gửi đánh giá
        </button>
      </div>
    </div>
  );
}

// ── Main card ──────────────────────────────────────────────────
type Props = { booking: BookingHistory };

export default function BookingHistoryCard({ booking }: Props) {
  const status = STATUS_CFG[booking.status];

  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
      {/* ── Card header ── */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
        <div className="flex items-center gap-3">
          <p className="font-semibold text-gray-800 text-sm">
            Đơn đặt phòng {booking.id}
          </p>
          <span className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${status.className}`}>
            {status.label}
          </span>
        </div>
        {/* TODO (BE): Navigate /bookings/:id hoặc mở modal chi tiết */}
        <button className="rounded-lg border border-[#0D99FF] px-4 py-1.5 text-xs font-semibold text-[#0D99FF] hover:bg-blue-50 transition-colors">
          Xem chi tiết
        </button>
      </div>

      {/* ── Card body ── */}
      <div className="px-6 py-5">
        {/* Date */}
        <p className="text-xs text-gray-400 mb-4">
          {booking.startDate} – {booking.endDate}
        </p>

        {/* Two-column: rooms | services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* DANH SÁCH PHÒNG */}
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
              Danh sách phòng
            </p>
            <div className="space-y-3">
              {booking.rooms.map((room, i) => (
                <div key={i} className="flex items-center gap-3">
                  <img
                    src={room.imageUrl}
                    alt={room.name}
                    className="h-10 w-14 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 flex items-center justify-between">
                    <p className="text-sm text-gray-700">
                      {room.name}{" "}
                      <span className="text-gray-400">({room.nights} đêm)</span>
                    </p>
                    <p className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                      {room.price.toLocaleString("vi-VN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DỊCH VỤ ĐI KÈM */}
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
              Dịch vụ đi kèm
            </p>
            <ul className="space-y-2">
              {booking.services.map((svc, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400 shrink-0" />
                  {svc.quantity}x {svc.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Review section – chỉ hiện khi đã hoàn thành */}
        {booking.status === "completed" && (
          <ReviewSection bookingId={booking.id} />
        )}
      </div>
    </div>
  );
}
