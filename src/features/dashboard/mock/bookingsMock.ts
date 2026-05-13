// ── Types ──────────────────────────────────────────────────────
export type BookingStatus = "paid" | "pending" | "deposit" | "cancelled";

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
  services: { name: string }[];
};

export type RecentService = {
  name: string;
  icon: "car" | "ring" | "spa";
  status: "pending" | "done" | "cancelled";
  guest: string;
  bookingId: string;
};

// ── Room capacity (TODO: replace with API) ────────────────────
export const MOCK_ROOM_CAPACITY = {
  occupied: 18,
  total: 24,
};

// ── Recent services (TODO: replace with API) ──────────────────
export const MOCK_RECENT_SERVICES: RecentService[] = [
  {
    name: "Đưa đón sân bay",
    icon: "car",
    status: "pending",
    guest: "Nguyễn Văn A",
    bookingId: "BK-20260513-001",
  },
  {
    name: "Nhẫn cưới & trang trí",
    icon: "ring",
    status: "done",
    guest: "Trần Thị B",
    bookingId: "BK-20260512-007",
  },
  {
    name: "Massage Spa 60 phút",
    icon: "spa",
    status: "done",
    guest: "Lê Minh C",
    bookingId: "BK-20260511-003",
  },
  {
    name: "Đưa đón sân bay",
    icon: "car",
    status: "cancelled",
    guest: "Phạm Hồng D",
    bookingId: "BK-20260510-012",
  },
];

// ── Sample bookings (TODO: replace with API) ──────────────────
export const MOCK_BOOKINGS: Booking[] = [
  {
    id: "BK-20260513-001",
    guestName: "Nguyễn Văn A",
    guestEmail: "nguyenvana@email.com",
    room: "Deluxe Ocean View - 201",
    checkIn: "13/05/2026",
    checkOut: "16/05/2026",
    nights: 3,
    totalPrice: 3600000,
    status: "paid",
    services: [{ name: "Massage Spa" }, { name: "Đưa đón" }],
  },
  {
    id: "BK-20260513-002",
    guestName: "Trần Thị B",
    guestEmail: "tranthib@email.com",
    room: "Suite VIP - 501",
    checkIn: "14/05/2026",
    checkOut: "17/05/2026",
    nights: 3,
    totalPrice: 9000000,
    status: "pending",
    services: [{ name: "Bữa sáng buffet" }],
  },
  {
    id: "BK-20260512-007",
    guestName: "Lê Minh C",
    guestEmail: "leminhc@email.com",
    room: "Standard - 102",
    checkIn: "12/05/2026",
    checkOut: "14/05/2026",
    nights: 2,
    totalPrice: 1800000,
    status: "deposit",
    services: [],
  },
  {
    id: "BK-20260510-012",
    guestName: "Phạm Hồng D",
    guestEmail: "phamhongd@email.com",
    room: "Deluxe Garden - 305",
    checkIn: "10/05/2026",
    checkOut: "12/05/2026",
    nights: 2,
    totalPrice: 2400000,
    status: "cancelled",
    services: [{ name: "Giặt ủi" }],
  },
  {
    id: "BK-20260509-005",
    guestName: "Hoàng Văn E",
    guestEmail: "hoangvane@email.com",
    room: "Suite VIP - 502",
    checkIn: "09/05/2026",
    checkOut: "13/05/2026",
    nights: 4,
    totalPrice: 12000000,
    status: "paid",
    services: [{ name: "Massage Spa" }, { name: "Đưa đón" }, { name: "Bữa sáng" }],
  },
];
