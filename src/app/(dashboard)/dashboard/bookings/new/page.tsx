// "use client";

// import { useState, useMemo } from "react";
// import RoomSearchFilter from "@/features/dashboard/components/RoomSearchFilter";
// import RoomGrid from "@/features/dashboard/components/RoomGrid";
// import BookingSummaryPanel from "@/features/dashboard/components/BookingSummaryPanel";
// // import { MOCK_ROOMS, Room } from "@/features/dashboard/mock/newBookingMock";

// const PAGE_SIZE = 6;

// function calcNights(checkIn: string, checkOut: string): number {
//   if (!checkIn || !checkOut) return 1;
//   const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
//   return Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24)));
// }

// export default function NewBookingPage() {
//   // ── Filter state ────────────────────────────────────────────
//   const today = new Date().toISOString().split("T")[0];
//   const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

//   const [checkIn, setCheckIn] = useState(today);
//   const [checkOut, setCheckOut] = useState(tomorrow);
//   const [guests, setGuests] = useState(2);
//   const [roomType, setRoomType] = useState("all");
//   const [page, setPage] = useState(1);

//   // ── Selected rooms ──────────────────────────────────────────
//   const [selectedIds, setSelectedIds] = useState<string[]>([]);
//   const selectedRooms = useMemo(
//     () => MOCK_ROOMS.filter((r) => selectedIds.includes(r.id)),
//     [selectedIds]
//   );

//   // ── Filtered rooms ──────────────────────────────────────────
//   // TODO (BE): Bỏ filter client-side, thay bằng API call khi nhấn Tìm
//   const filteredRooms: Room[] = useMemo(() => {
//     return MOCK_ROOMS.filter((r) => {
//       if (roomType !== "all" && r.type !== roomType) return false;
//       if (r.maxGuests < guests) return false;
//       return true;
//     });
//   }, [roomType, guests]);

//   const handleToggleRoom = (id: string) => {
//     setSelectedIds((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
//     );
//   };

//   const nights = calcNights(checkIn, checkOut);

//   return (
//     <div className="space-y-5">
//       {/* ── Page header ── */}
//       <div>
//         <p className="text-xs text-gray-400 mb-1">
//           Quản trị &rsaquo; Quản lý đặt phòng &rsaquo;{" "}
//           <span className="text-[#0D99FF]">Đặt phòng mới</span>
//         </p>
//         <h1 className="text-2xl font-extrabold text-gray-900">Đặt phòng mới</h1>
//       </div>

//       {/* ── Search filter ── */}
//       <RoomSearchFilter
//         checkIn={checkIn}
//         checkOut={checkOut}
//         guests={guests}
//         roomType={roomType}
//         onCheckInChange={setCheckIn}
//         onCheckOutChange={setCheckOut}
//         onGuestsChange={setGuests}
//         onRoomTypeChange={setRoomType}
//         onSearch={() => setPage(1)}
//       />

//       {/* ── Main 2-column layout ── */}
//       <div className="flex gap-5 items-start">
//         {/* Left – Room grid */}
//         <div className="flex-1 min-w-0">
//           <RoomGrid
//             rooms={filteredRooms}
//             selectedIds={selectedIds}
//             onToggle={handleToggleRoom}
//             totalCount={filteredRooms.length}
//             page={page}
//             pageSize={PAGE_SIZE}
//             onPageChange={setPage}
//           />
//         </div>

//         {/* Right – Booking summary panel */}
//         <div className="w-72 shrink-0 sticky top-4">
//           <BookingSummaryPanel
//             selectedRooms={selectedRooms}
//             checkIn={checkIn}
//             checkOut={checkOut}
//             nights={nights}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
