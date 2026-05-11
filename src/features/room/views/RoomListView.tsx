"use client";

import Breadcrumb from "@/components/shared/Breadcrumb";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Pagination from "@/components/shared/Pagination";
import { RoomCard } from "../components/RoomCard";
import RoomFilter from "../components/RoomFilter";
import { useRooms } from "../hooks/useRooms";

export default function RoomListView() {
  const { rooms, isLoading, page, setPage, totalPages } = useRooms();

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
