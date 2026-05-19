"use client";
import { useState, useMemo } from "react";
import RoomSearchFilter from "@/features/booking/admin/components/RoomSearchFilter";
import RoomGrid from "@/features/booking/admin/components/RoomGrid";
import BookingSummaryPanel from "@/features/booking/admin/components/BookingSummaryPanel";
import { useGetAvailableRoomsQuery } from "@/features/room/api/roomApi";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { useGetRoomTypesQuery } from "@/features/room";

function calcNights(checkInDate: string, checkOutDate: string): number {
  if (!checkInDate || !checkOutDate) return 1;
  const diff =
    new Date(checkOutDate).getTime() - new Date(checkInDate).getTime();
  return Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24)));
}

export default function NewBookingPage() {
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(tomorrow);
  const [guests, setGuests] = useState(2);
  const [roomType, setRoomType] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const { data: availableRoomsData, isLoading } = useGetAvailableRoomsQuery({
    checkInDate,
    checkOutDate,
    guests,
  });

  const availableRooms = availableRoomsData?.data || [];

  const { data: roomTypesData } = useGetRoomTypesQuery();
  const roomTypes = roomTypesData?.data || [];
  const filteredRooms = useMemo(() => {
    const targetType = roomTypes.find((t) => t.code === roomType);
    if (!targetType) return availableRooms;
    if (roomType === "all") return availableRooms;

    return availableRooms.filter((r) => r.roomTypeId === targetType.id);
  }, [availableRooms, roomType, roomTypes]);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const selectedRooms = useMemo(
    () => availableRooms.filter((r) => selectedIds.includes(r.id)),
    [selectedIds, availableRooms],
  );
  const handleToggleRoom = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };
  const nights = calcNights(checkInDate, checkOutDate);

  const breadcrumbItems = [
    { label: "Quản lý đặt phòng", href: "/dashboard/bookings" },
    { label: "Đặt phòng ngay" },
  ];

  return (
    <div className="space-y-5">
      <div>
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="text-2xl font-extrabold text-gray-900 mt-2">
          Đặt phòng ngay
        </h1>
      </div>
      <RoomSearchFilter
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        guests={guests}
        roomType={roomType}
        onCheckInChange={setCheckInDate}
        onCheckOutChange={setCheckOutDate}
        onGuestsChange={setGuests}
        onRoomTypeChange={setRoomType}
      />
      <div className="flex gap-5 items-start">
        <div className="flex-1 min-w-0">
          {isLoading ? (
            <div className="text-center py-10 text-gray-500">
              Đang tìm phòng trống...
            </div>
          ) : (
            <RoomGrid
              rooms={filteredRooms}
              selectedIds={selectedIds}
              onToggle={handleToggleRoom}
              totalCount={availableRooms.length}
              page={page}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          )}
        </div>
        <div className="w-80 shrink-0 sticky top-4">
          <BookingSummaryPanel
            selectedRooms={selectedRooms}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            nights={nights}
            guests={guests}
            onSuccess={() => {
              setSelectedIds([]);
            }}
          />
        </div>
      </div>
    </div>
  );
}
