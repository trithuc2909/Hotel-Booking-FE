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
                    {room.rating && (
                      <span className="text-sm text-gray-500">
                        {room.rating} đánh giá
                      </span>
                    )}
                  </div>
                </div>

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
