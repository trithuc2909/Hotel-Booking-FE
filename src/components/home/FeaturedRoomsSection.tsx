"use client";

import Image from "next/image";
import Link from "next/link";
import { Users, BedDouble, Star } from "lucide-react";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import AmenityIcon from "../common/AmenityIcon";
import { parseAsString, useQueryState } from "nuqs";
import { useGetRoomsQuery } from "@/store/feature/room/roomApi";
import { RoomResponse } from "@/types/response/room";

export default function FeaturedRoomsSection() {
    const [type] = useQueryState("type", parseAsString.withDefault(""));
    const [checkIn] = useQueryState("checkIn", parseAsString.withDefault(""));
    const [checkOut] = useQueryState("checkOut", parseAsString.withDefault(""));
    const [guests] = useQueryState("guests", parseAsString.withDefault(""));

    const hasFilter = !!(type || guests || checkIn || checkOut);

    const { data, isLoading } = useGetRoomsQuery({
      roomTypeCode: type ? type.toUpperCase() : "VIP",
      guests:  guests  ? Number(guests) : undefined,
      checkIn:  checkIn  || undefined,
      checkOut: checkOut || undefined,
      limit: hasFilter ? undefined : 4,
    });


    const rooms = data?.data ?? [];


  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#0D99FF]">
          {type === "vip" || !type ? "Phòng VIP tiêu biểu" : "Phòng phù hợp với yêu cầu"}
        </p>
        <h2 className="mt-2 text-3xl font-bold text-gray-900">
          Khám phá không gian sang trọng bậc nhất tại Bullman Hotel
        </h2>
      </div>
      {isLoading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-80 animate-pulse rounded-2xl bg-gray-100" />
          ))}
        </div>
      )}
      {!isLoading && rooms.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {rooms.map((room) => <RoomCard key={room.id} room={room} />)}
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

function StarRating({ rating }: { rating: number | null }) {
  if (!rating) return null;
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={13}
          className={
            i <= full
              ? "fill-amber-400 text-amber-400"
              : i === full + 1 && hasHalf
              ? "fill-amber-200 text-amber-400"
              : "fill-gray-200 text-gray-200"
          }
        />
      ))}
      <span className="text-xs font-semibold text-amber-600">{rating}</span>
    </div>
  );
}

function RoomCard({ room }: { room: RoomResponse }) {
  const DEFAULT_IMAGE =
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800";

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
      {/* Thumbnail */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={room.thumbnailUrl ?? DEFAULT_IMAGE}
          alt={room.roomName}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <span className="absolute left-3 top-3 rounded-full bg-[#0D99FF] px-3 py-1 text-xs font-semibold text-white">
          {room.roomTypeName}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        {/* Tên phòng */}
        <h3 className="text-base font-bold text-gray-900 leading-snug">
          {room.roomName}
        </h3>

        {/* Rating */}
        <div className="mt-1">
          <StarRating rating={room.rating} />
        </div>

        {/* Mô tả ngắn */}
        {room.notes && (
          <p className="mt-2 line-clamp-2 text-sm text-gray-500">
            {room.notes}
          </p>
        )}

        {/* Số khách */}
        <div className="mt-3 flex items-center gap-1 text-xs text-gray-500">
          <Users size={13} />
          <span>Tối đa {room.maxGuests} khách</span>
        </div>

        {/* Amenities với icon */}
        {room.amenities.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {room.amenities.slice(0, 4).map((a) => (
              <AmenityIcon key={a.id} icon={a.icon} name={a.name} />
            ))}
            {room.amenities.length > 4 && (
              <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-400">
                +{room.amenities.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Giá + nút */}
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
          <div>
            <p className="text-xs text-gray-400">Từ</p>
            <p className="text-lg font-bold text-[#0D99FF]">
              {formatCurrency(room.basePrice)}
              <span className="text-xs font-normal text-gray-400">/đêm</span>
            </p>
          </div>
          <Link
            href={`/rooms/${room.id}`}
            className="rounded-lg bg-[#0D99FF] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0B84E6]"
          >
            Đặt ngay
          </Link>
        </div>
      </div>
    </div>
  );
}
