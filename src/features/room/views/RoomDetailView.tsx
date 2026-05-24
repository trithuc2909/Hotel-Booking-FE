"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { Maximize2, BedDouble, Compass, Wind } from "lucide-react";
import RoomGallery from "../components/RoomGallery";
import RoomAmenities from "../components/RoomAmenities";
import HotelRules from "../components/HotelRules";
import BookingWidget from "../components/BookingWidget";
import { StarRating } from "../components/RoomCard";
import { useRoomDetail, VIEW_LABELS, BED_TYPE_LABELS } from "../hooks/useRoomDetail";

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
        <div className="h-80 w-80 shrink-0 rounded-2xl bg-gray-200" />
      </div>
    </div>
  );
}

export default function RoomDetailView() {
  const { room, isLoading, isError } = useRoomDetail();

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />

      <div className="sticky top-16 z-10 border-b border-gray-100 bg-white shadow-sm">
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

        {isError && <p className="py-24 text-center text-gray-500">Không tìm thấy phòng này.</p>}

        {room && (
          <div className="space-y-6">
            <RoomGallery thumbnailUrl={room.thumbnailUrl} imageUrls={room.imageUrls} roomName={room.roomName} />

            <div className="flex items-start gap-8">
              <div className="min-w-0 flex-1 space-y-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{room.roomName}</h1>
                  <div className="mt-1 flex items-center gap-2">
                    <StarRating rating={room.rating} />
                  </div>
                </div>

                <section>
                  <h2 className="mb-4 text-lg font-semibold text-gray-800">Tổng quan không gian</h2>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {room.size && (
                      <div className="flex flex-col items-center gap-1.5 rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm">
                        <Maximize2 size={22} className="text-[#0D99FF]" />
                        <span className="text-[10px] font-medium tracking-wide text-gray-400 uppercase">Diện tích</span>
                        <span className="text-sm font-bold text-gray-900">{room.size} m²</span>
                      </div>
                    )}
                    {room.bedType && (
                      <div className="flex flex-col items-center gap-1.5 rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm">
                        <BedDouble size={22} className="text-[#0D99FF]" />
                        <span className="text-[10px] font-medium tracking-wide text-gray-400 uppercase">Giường</span>
                        <span className="text-sm font-bold text-gray-900">
                          {BED_TYPE_LABELS[room.bedType] ?? room.bedType}
                        </span>
                      </div>
                    )}
                    {room.view && (
                      <div className="flex flex-col items-center gap-1.5 rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm">
                        <Compass size={22} className="text-[#0D99FF]" />
                        <span className="text-[10px] font-medium tracking-wide text-gray-400 uppercase">Hướng</span>
                        <span className="text-sm font-bold text-gray-900">{VIEW_LABELS[room.view] ?? room.view}</span>
                      </div>
                    )}
                    <div className="flex flex-col items-center gap-1.5 rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm">
                      <Wind size={22} className="text-[#0D99FF]" />
                      <span className="text-[10px] font-medium tracking-wide text-gray-400 uppercase">Ban công</span>
                      <span className="text-sm font-bold text-gray-900">
                        {room.balcony ? "Có ban công" : "Không có"}
                      </span>
                    </div>
                  </div>
                </section>

                {/* Description */}
                {room.description && (
                  <section>
                    <h2 className="mb-2 text-lg font-semibold text-gray-800">Mô tả chi tiết</h2>
                    <p className="leading-relaxed whitespace-pre-line text-gray-600">{room.description}</p>
                  </section>
                )}

                <RoomAmenities amenities={room.amenities} />
                <HotelRules />
              </div>

              {/* RIGHT: Booking widget sticky */}
              <div className="sticky top-[108px] w-80 shrink-0 self-start">
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
