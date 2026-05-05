// ─────────────────────────────────────────────────────────────
// TODO (BE): Thay toàn bộ file này bằng data từ API
// GET /admin/bookings?page=1&limit=5&search=...&dateFrom=...&dateTo=...
// ─────────────────────────────────────────────────────────────

export type BookingStatus =
  | "paid"
  | "pending"
  | "deposit"
  | "cancelled";

export type ServiceItem = {
  name: string;
  status: "pending" | "done" | "cancelled";
};

export type Booking = {
  id: string;
  guestName: string;
  guestEmail: string;
  room: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  totalPrice: number;
  status: BookingStatus;
  services: ServiceItem[];
};

export type RecentService = {
  icon: "car" | "ring" | "spa";
  name: string;
  guest: string;
  bookingId: string;
  status: "pending" | "done" | "cancelled";
};

// ── Mock bookings table ────────────────────────────────────────
export const MOCK_BOOKINGS: Booking[] = [
  {
    id: "BK-28042601",
    guestName: "Lê Thanh Thảo",
    guestEmail: "thanhthao@email.com",
    room: "Royal Lotus",
    checkIn: "12/10",
    checkOut: "15/10",
    nights: 3,
    totalPrice: 7_500_000,
    status: "paid",
    services: [
      { name: "Đưa đón sân bay", status: "done" },
      { name: "Dịch vụ khác", status: "pending" },
      { name: "Spa", status: "done" },
    ],
  },
  {
    id: "BK-28042602",
    guestName: "Nguyễn Anh Quân",
    guestEmail: "aquan.ng@email.com",
    room: "Royal Lotus",
    checkIn: "14/10",
    checkOut: "16/10",
    nights: 2,
    totalPrice: 3_200_000,
    status: "deposit",
    services: [
      { name: "Thuê xe máy", status: "pending" },
      { name: "Tour tham quan", status: "pending" },
      { name: "Massage", status: "done" },
    ],
  },
  {
    id: "BK-28042603",
    guestName: "Nguyễn Anh Quân",
    guestEmail: "aquan.ng@email.com",
    room: "Royal Lotus",
    checkIn: "14/10",
    checkOut: "16/10",
    nights: 2,
    totalPrice: 3_200_000,
    status: "pending",
    services: [
      { name: "Trang trí sinh nhật", status: "pending" },
    ],
  },
  {
    id: "BK-28042603",
    guestName: "Nguyễn Anh Quân",
    guestEmail: "aquan.ng@email.com",
    room: "Royal Lotus",
    checkIn: "14/10",
    checkOut: "16/10",
    nights: 2,
    totalPrice: 3_200_000,
    status: "paid",
    services: [
      { name: "Trang trí sinh nhật", status: "done" },
    ],
  },
  {
    id: "BK-28042603",
    guestName: "Nguyễn Anh Quân",
    guestEmail: "aquan.ng@email.com",
    room: "Royal Lotus",
    checkIn: "14/10",
    checkOut: "16/10",
    nights: 2,
    totalPrice: 3_200_000,
    status: "paid",
    services: [
      { name: "Trang trí sinh nhật", status: "done" },
    ],
  },
];

// ── Mock recent services ───────────────────────────────────────
export const MOCK_RECENT_SERVICES: RecentService[] = [
  {
    icon: "car",
    name: "Đưa đón sân bay",
    guest: "LÊ MINH HOÀNG",
    bookingId: "BK-9012",
    status: "pending",
  },
  {
    icon: "ring",
    name: "Trang trí cầu hôn",
    guest: "BÙI ANH TUẤN",
    bookingId: "BK-9827",
    status: "done",
  },
  {
    icon: "spa",
    name: "Massage Thái Trị Liệu",
    guest: "BÙI ANH TUẤN",
    bookingId: "BK-4601",
    status: "done",
  },
];

// ── Mock room capacity ─────────────────────────────────────────
// TODO (BE): GET /admin/dashboard/room-capacity?date=today
export const MOCK_ROOM_CAPACITY = { occupied: 12, total: 20 };
