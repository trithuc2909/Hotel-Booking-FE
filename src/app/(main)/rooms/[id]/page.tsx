"use client";

import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/shared/Breadcrumb";
import RoomGallery from "@/components/rooms/RoomGallery";
import RoomAmenities from "@/components/rooms/RoomAmenities";
import HotelRules from "@/components/rooms/HotelRules";
import BookingWidget from "@/components/rooms/BookingWidget";
import { StarRating } from "@/components/rooms/RoomCard";
import { useGetRoomByIdQuery } from "@/features/room/api/roomApi";
import {
  Maximize2,
  BedDouble,
  Compass,
  Wind,
} from "lucide-react";

function Skeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-[420px] rounded-2xl bg-gray-200" />
      <div className="flex gap-8">
        <div className="flex-1 space-y-4">
          <div className="h-8 w-1/2 rounded bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-3/4 rounded bg-gray-200" />
        </div>
        <div className="w-80 shrink-0 h-80 rounded-2xl bg-gray-200" />
      </div>
    </div>
  );
}

export default function RoomDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetRoomByIdQuery({ id });
  const room = data?.data;

  const VIEW_LABELS: Record<string, string> = {
    Sea: "Hướng biển",
    City: "Hướng thành phố",
    Garden: "Hướng vườn",
    Pool: "Hướng hồ bơi",
  };

  const BED_TYPE_LABELS: Record<string, string> = {
    Single: "Giường đơn",
    Double: "Giường đôi",
    Triple: "Giường ba",
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="sticky top-16 z-10 bg-white border-b border-gray-100 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Phòng & Giá", href: "/rooms" },
              { label: "Chi tiết phòng", href: "/rooms" },
              { label: room?.roomName ?? "..." },
            ]}
          />
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {isLoading && <Skeleton />}

        {isError && (
          <p className="py-24 text-center text-gray-500">
            Không tìm thấy phòng này.
          </p>
        )}

        {room && (
          <div className="space-y-6">
            <RoomGallery
              thumbnailUrl={room.thumbnailUrl}
              imageUrls={room.imageUrls}
              roomName={room.roomName}
            />

            <div className="flex gap-8 items-start">
              {/* LEFT: information */}
              <div className="flex-1 min-w-0 space-y-8">
                {/* Name + rating */}
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {room.roomName}
                  </h1>
                  <div className="mt-1 flex items-center gap-2">
                    <StarRating rating={room.rating} />
                  </div>
                </div>

                <section>
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Tổng quan không gian
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {room.size && (
                      <div className="flex flex-col items-center gap-1.5 p-4 rounded-xl bg-white border border-gray-100 shadow-sm text-center">
                        <Maximize2 size={22} className="text-[#0D99FF]" />
                        <span className="text-[10px] uppercase tracking-wide text-gray-400 font-medium">
                          Diện tích
                        </span>
                        <span className="text-sm font-bold text-gray-900">
                          {room.size} m²
                        </span>
                      </div>
                    )}
                    {room.bedType && (
                      <div className="flex flex-col items-center gap-1.5 p-4 rounded-xl bg-white border border-gray-100 shadow-sm text-center">
                        <BedDouble size={22} className="text-[#0D99FF]" />
                        <span className="text-[10px] uppercase tracking-wide text-gray-400 font-medium">
                          Giường
                        </span>
                        <span className="text-sm font-bold text-gray-900">
                          {BED_TYPE_LABELS[room.bedType] ?? room.bedType}
                        </span>
                      </div>
                    )}
                    {room.view && (
                      <div className="flex flex-col items-center gap-1.5 p-4 rounded-xl bg-white border border-gray-100 shadow-sm text-center">
                        <Compass size={22} className="text-[#0D99FF]" />
                        <span className="text-[10px] uppercase tracking-wide text-gray-400 font-medium">
                          Hướng
                        </span>
                        <span className="text-sm font-bold text-gray-900">
                          {VIEW_LABELS[room.view] ?? room.view}
                        </span>
                      </div>
                    )}
                    <div className="flex flex-col items-center gap-1.5 p-4 rounded-xl bg-white border border-gray-100 shadow-sm text-center">
                      <Wind size={22} className="text-[#0D99FF]" />
                      <span className="text-[10px] uppercase tracking-wide text-gray-400 font-medium">
                        Ban công
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        {room.balcony ? "Có ban công" : "Không có"}
                      </span>
                    </div>
                  </div>
                </section>

                {/* Description */}
                {room.description && (
                  <section>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                      Mô tả chi tiết
                    </h2>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {room.description}
                    </p>
                  </section>
                )}

                {/* Amenities */}
                <RoomAmenities amenities={room.amenities} />

                {/* Rules */}
                <HotelRules />
              </div>

              {/* RIGHT: Booking widget sticky */}
              <div className="w-80 shrink-0 sticky top-[108px] self-start">
                <BookingWidget room={room} />
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
