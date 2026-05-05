// ─────────────────────────────────────────────────────────────
// TODO (BE): Thay bằng data từ API
// GET /admin/rooms/available?checkIn=...&checkOut=...&guests=...&type=...
// ─────────────────────────────────────────────────────────────

export type RoomType = "VIP" | "STANDARD";

export type Room = {
  id: string;
  name: string;
  roomNumber: string;
  type: RoomType;
  bed: string;
  maxGuests: number;
  pricePerNight: number;
  imageUrl: string;
  amenities: ("wifi" | "ac" | "tv" | "fridge" | "bathtub" | "breakfast")[];
};

export type SelectedService = {
  id: string;
  name: string;
  price: number;
};

// Ảnh phòng hardcode – TODO (BE): Thay bằng imageUrl thực từ API
const ROOM_IMG = "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600";
export const MOCK_ROOMS: Room[] = [
  {
    id: "r1",
    name: "Royal Lotus",
    roomNumber: "P.101",
    type: "VIP",
    bed: "1 King Size",
    maxGuests: 2,
    pricePerNight: 4_800_000,
    imageUrl: ROOM_IMG,
    amenities: ["wifi", "ac", "tv", "fridge"],
  },
  {
    id: "r2",
    name: "Royal Lotus",
    roomNumber: "P.101",
    type: "VIP",
    bed: "1 King Size",
    maxGuests: 2,
    pricePerNight: 4_800_000,
    imageUrl: ROOM_IMG,
    amenities: ["wifi", "ac", "tv", "fridge"],
  },
  {
    id: "r3",
    name: "Royal Lotus",
    roomNumber: "P.101",
    type: "STANDARD",
    bed: "1 King Size",
    maxGuests: 2,
    pricePerNight: 4_800_000,
    imageUrl: ROOM_IMG,
    amenities: ["wifi", "ac", "tv"],
  },
  {
    id: "r4",
    name: "Royal Lotus",
    roomNumber: "P.101",
    type: "STANDARD",
    bed: "1 King Size",
    maxGuests: 2,
    pricePerNight: 4_800_000,
    imageUrl: ROOM_IMG,
    amenities: ["wifi", "ac", "tv"],
  },
  {
    id: "r5",
    name: "Royal Lotus",
    roomNumber: "P.101",
    type: "VIP",
    bed: "1 King Size",
    maxGuests: 2,
    pricePerNight: 4_800_000,
    imageUrl: ROOM_IMG,
    amenities: ["wifi", "ac", "tv", "fridge", "bathtub"],
  },
  {
    id: "r6",
    name: "Royal Lotus",
    roomNumber: "P.101",
    type: "VIP",
    bed: "1 King Size",
    maxGuests: 2,
    pricePerNight: 4_800_000,
    imageUrl: ROOM_IMG,
    amenities: ["wifi", "ac", "tv", "fridge"],
  },
];

export const MOCK_SERVICES: SelectedService[] = [
  { id: "s1", name: "Xe máy (Tay ga)",   price: 150_000 },
  { id: "s2", name: "Đưa đón sân bay",   price: 400_000 },
  { id: "s3", name: "Trang trí sinh nhật", price: 300_000 },
  { id: "s4", name: "Massage Thái",       price: 250_000 },
];

export const TAX_RATE = 0.1; // 10%
