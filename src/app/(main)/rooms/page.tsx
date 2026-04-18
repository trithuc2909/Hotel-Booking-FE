"use client";

import Breadcrumb from "@/components/shared/Breadcrumb";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Pagination from "@/components/shared/Pagination";
import { RoomCard } from "@/components/rooms/RoomCard";
import RoomFilter from "@/components/rooms/RoomFilter";
import { useGetRoomsQuery } from "@/features/room/api/roomApi";
import { PaginationMeta } from "@/types/common";
import { RoomResponse } from "@/features/room/types/room.type";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { useEffect } from "react";

export default function RoomsPage() {
  const [type] = useQueryState("type", parseAsString.withDefault(""));
  const [guests] = useQueryState("guests", parseAsString.withDefault(""));
  const [price] = useQueryState(
    "price",
    parseAsString.withDefault("0-2200000"),
  );
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const [minPrice, maxPrice] = price.split("-").map(Number);
  const isDefault = minPrice === 0 && maxPrice === 2200000;

  const { data, isLoading } = useGetRoomsQuery({
    roomTypeCode: type || undefined,
    guests: guests ? Number(guests) : undefined,
    minPrice: isDefault ? undefined : minPrice,
    maxPrice: isDefault ? undefined : maxPrice,
    pageNum: page,
    pageSize: 9,
  });

  const rooms: RoomResponse[] = data?.data ?? [];
  const meta        = data?.meta as PaginationMeta | undefined;
  const totalPages  = meta?.totalPages ?? 1;
  const total       = meta?.total ?? 0;

  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
  }, [type, guests, price]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="sticky top-16 z-10 bg-white border-b border-gray-100 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Phòng & Giá" }]} />
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex gap-6 items-start">
          <aside className="w-72 shrink-0 sticky top-[108px] self-start">
            <RoomFilter />
          </aside>

          <main className="flex-1 min-w-0">
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">
                Tất cả các phòng
              </h1>
              {!isLoading && (
                <span className="text-sm text-gray-500">{rooms.length} kết quả</span>
              )}
            </div>

            {/* Skeleton */}
            {isLoading && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-80 animate-pulse rounded-2xl bg-gray-200"
                  />
                ))}
              </div>
            )}

            {!isLoading && rooms.length > 0 && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {rooms.map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>
            )}

            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={(p) => setPage(p)}
            />

            {/* Empty state */}
            {!isLoading && rooms.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                <p className="text-lg font-medium text-gray-500">
                  Không tìm thấy phòng phù hợp
                </p>
                <p className="mt-1 text-sm">Thử thay đổi bộ lọc tìm kiếm</p>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
