"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { BookingHistoryItem } from "@/features/booking/types/booking.type";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { STATUS_COLOR } from "@/constants/colors";
import Link from "next/link";

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
          className="transition-transform hover:scale-110"
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

function ReviewSection({ bookingId }: { bookingId: string }) {
  const [rating, setRating] = useState(4);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!review.trim()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
        <p className="text-sm font-medium text-emerald-700">
          ✓ Cảm ơn bạn đã gửi đánh giá!
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="text-sm font-semibold text-gray-800">
            Trải nghiệm của bạn thế nào?
          </h4>

          <p className="mt-1 text-xs text-gray-500">
            Chia sẻ cảm nhận để giúp khách sạn cải thiện dịch vụ tốt hơn.
          </p>
        </div>

        <StarRating value={rating} onChange={setRating} />
      </div>

      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Chia sẻ trải nghiệm của bạn tại khách sạn..."
        rows={4}
        className="mt-4 w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#0B30A7]"
      />

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSubmit}
          className="cursor-pointer rounded-lg bg-[#083344] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Gửi đánh giá
        </button>
      </div>
    </div>
  );
}

type Props = {
  booking: BookingHistoryItem;
};

export default function BookingHistoryCard({ booking }: Props) {
  const colorClass =
    STATUS_COLOR[booking.status.code] ||
    "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <div className="overflow-hidden rounded-md border border-gray-300 bg-white">
      <div className="flex items-start justify-between border-b border-gray-200 px-5 py-4">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-[18px] font-bold text-[#1E3A5F]">
              Đơn đặt phòng: {booking.bookingCode}
            </h3>

            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${colorClass}`}
            >
              {booking.status.displayAs}
            </span>
          </div>

          <p className="mt-1 text-xs text-gray-500">
            {new Date(booking.checkInDate).toLocaleDateString("vi-VN")} -{" "}
            {new Date(booking.checkOutDate).toLocaleDateString("vi-VN")}
          </p>
        </div>

        <Link
          href={`/booking-history/${booking.id}`}
          className="cursor-pointer rounded-md bg-[#1696F9] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0D8AE9]"
        >
          Xem chi tiết
        </Link>
      </div>

      <div className="px-5 py-5">
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
          <div className="md:border-r md:border-gray-200 md:pr-6">
            <p className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-700">
              Danh sách phòng
            </p>

            <div className="space-y-4">
              {booking.rooms.map((room) => (
                <div key={room.roomId} className="flex items-start gap-3">
                  <img
                    src={room.thumbnailUrl || "/images/room-placeholder.png"}
                    alt={room.roomName}
                    className="h-12 w-12 rounded object-cover"
                  />

                  <div className="flex flex-1 items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {room.roomName} ({room.nights} đêm)
                      </p>
                    </div>

                    <p className="text-sm font-bold text-gray-800 whitespace-nowrap">
                      {formatCurrency(room.pricePerNight)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-700">
              Dịch vụ đi kèm
            </p>

            {booking.services.length > 0 ? (
              <ul className="space-y-3">
                {booking.services.map((svc, i) => (
                  <li key={i} className="text-sm text-gray-700">
                    • {svc.quantity}x {svc.serviceName}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400">Không có dịch vụ đi kèm</p>
            )}
          </div>
        </div>

        {booking.status.code === "CKO" && (
          <ReviewSection bookingId={booking.id} />
        )}
      </div>
    </div>
  );
}
