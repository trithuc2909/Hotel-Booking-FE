// ─────────────────────────────────────────────────────────────
// TODO (BE): Thay bằng data từ API sau khi có bảng booking_history
// GET /users/me/bookings?status=...&page=...
// ─────────────────────────────────────────────────────────────

export type BookingHistoryStatus =
  | "paid"        // Đã thanh toán – chờ nhận phòng
  | "completed"   // Đã hoàn thành
  | "cancelled";  // Đã huỷ và hoàn tiền

export type BookingRoom = {
  name: string;
  nights: number;
  price: number;
  imageUrl: string;
};

export type BookingService = {
  quantity: number;
  name: string;
};

export type BookingHistory = {
  id: string;
  startDate: string;
  endDate: string;
  status: BookingHistoryStatus;
  rooms: BookingRoom[];
  services: BookingService[];
};

const ROOM_IMG = "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=80&h=60&fit=crop";

export const MOCK_BOOKING_HISTORY: BookingHistory[] = [
  {
    id: "BK-29052501",
    startDate: "25/04/2026",
    endDate: "27/04/2026",
    status: "completed",
    rooms: [
      { name: "Phòng Deluxe Suite", nights: 2, price: 3_200_000, imageUrl: ROOM_IMG },
      { name: "Phòng Executive",    nights: 2, price: 2_000_000, imageUrl: ROOM_IMG },
    ],
    services: [
      { quantity: 1, name: "Đưa đón sân bay"   },
      { quantity: 1, name: "Trang trí cầu hôn" },
      { quantity: 3, name: "Xông hơi thư giãn" },
    ],
  },
  {
    id: "BK-29052502",
    startDate: "25/04/2026",
    endDate: "27/04/2026",
    status: "paid",
    rooms: [
      { name: "Phòng Deluxe Suite", nights: 2, price: 3_200_000, imageUrl: ROOM_IMG },
      { name: "Phòng Executive",    nights: 2, price: 2_000_000, imageUrl: ROOM_IMG },
    ],
    services: [
      { quantity: 1, name: "Đưa đón sân bay"   },
      { quantity: 1, name: "Trang trí cầu hôn" },
      { quantity: 3, name: "Xông hơi thư giãn" },
    ],
  },
  {
    id: "BK-29052503",
    startDate: "20/04/2026",
    endDate: "23/04/2026",
    status: "cancelled",
    rooms: [
      { name: "Phòng Deluxe Suite", nights: 2, price: 3_200_000, imageUrl: ROOM_IMG },
      { name: "Phòng Executive",    nights: 2, price: 2_000_000, imageUrl: ROOM_IMG },
    ],
    services: [
      { quantity: 1, name: "Đưa đón sân bay"   },
      { quantity: 1, name: "Trang trí cầu hôn" },
      { quantity: 3, name: "Xông hơi thư giãn" },
    ],
  },
];
