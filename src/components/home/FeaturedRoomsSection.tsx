"use client";

import Link from "next/link";
import { parseAsString, useQueryState } from "nuqs";
import { useGetRoomsQuery } from "@/store/feature/room/roomApi";
import { RoomCard } from "../rooms/RoomCard";

export default function FeaturedRoomsSection() {
  const [type] = useQueryState("type", parseAsString.withDefault(""));
  const [checkIn] = useQueryState("checkIn", parseAsString.withDefault(""));
  const [checkOut] = useQueryState("checkOut", parseAsString.withDefault(""));
  const [guests] = useQueryState("guests", parseAsString.withDefault(""));

  const hasFilter = !!(type || guests || checkIn || checkOut);

  const { data, isLoading } = useGetRoomsQuery({
    roomTypeCode: type ? type.toUpperCase() : "VIP",
    guests: guests ? Number(guests) : undefined,
    checkIn: checkIn || undefined,
    checkOut: checkOut || undefined,
    limit: hasFilter ? undefined : 4,
  });

  const rooms = data?.data ?? [];

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#0D99FF]">
          {type === "vip" || !type
            ? "Phòng VIP tiêu biểu"
            : "Phòng phù hợp với yêu cầu"}
        </p>
        <h2 className="mt-2 text-3xl font-bold text-gray-900">
          Khám phá không gian sang trọng bậc nhất tại Bullman Hotel
        </h2>
        <div className="mt-3 flex justify-end">
          <Link
            href="/rooms"
            className="group flex items-center gap-1.5 text-sm font-semibold text-[#0D99FF] transition-colors hover:text-[#0B84E6]"
          >
            Xem tất cả
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
      {isLoading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-80 animate-pulse rounded-2xl bg-gray-100"
            />
          ))}
        </div>
      )}
      {!isLoading && rooms.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}
      {!isLoading && rooms.length === 0 && (
        <p className="text-center py-10 text-gray-500">
          Không tìm thấy phòng phù hợp. Thử thay đổi bộ lọc!
        </p>
      )}
    </section>
  );
}