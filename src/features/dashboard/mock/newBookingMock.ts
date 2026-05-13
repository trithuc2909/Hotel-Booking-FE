// ── Types ──────────────────────────────────────────────────────
export type Room = {
  id: string;
  name: string;
  roomNumber: string;
  type: "VIP" | "standard";
  imageUrl: string;
  bed: string;
  maxGuests: number;
  amenities: ("wifi" | "ac" | "tv" | "fridge" | "bathtub" | "breakfast")[];
  pricePerNight: number;
};

export type SelectedService = {
  id: string;
  name: string;
  price: number;
};

// ── Constants ─────────────────────────────────────────────────
export const TAX_RATE = 0.1; // 10% VAT

// ── Mock add-on services for booking panel ────────────────────
export const MOCK_SERVICES: SelectedService[] = [
  { id: "s1", name: "Massage Spa 60 phút",  price: 450000 },
  { id: "s2", name: "Đưa đón sân bay",       price: 300000 },
  { id: "s3", name: "Bữa sáng buffet",       price: 180000 },
  { id: "s4", name: "Giặt ủi đồ (5kg)",     price: 120000 },
  { id: "s5", name: "Thuê xe đạp (1 ngày)",  price: 120000 },
];

// ── Mock available rooms ───────────────────────────────────────
export const MOCK_ROOMS: Room[] = [
  {
    id: "r1",
    name: "Deluxe Ocean View",
    roomNumber: "201",
    type: "standard",
    imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=80",
    bed: "King Bed",
    maxGuests: 2,
    amenities: ["wifi", "ac", "tv", "fridge"],
    pricePerNight: 1200000,
  },
  {
    id: "r2",
    name: "Suite VIP Penthouse",
    roomNumber: "501",
    type: "VIP",
    imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80",
    bed: "Super King Bed",
    maxGuests: 4,
    amenities: ["wifi", "ac", "tv", "fridge", "bathtub", "breakfast"],
    pricePerNight: 3000000,
  },
  {
    id: "r3",
    name: "Standard Garden",
    roomNumber: "102",
    type: "standard",
    imageUrl: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&q=80",
    bed: "Queen Bed",
    maxGuests: 2,
    amenities: ["wifi", "ac", "tv"],
    pricePerNight: 900000,
  },
  {
    id: "r4",
    name: "Deluxe Garden View",
    roomNumber: "305",
    type: "standard",
    imageUrl: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&q=80",
    bed: "Twin Bed",
    maxGuests: 2,
    amenities: ["wifi", "ac", "tv", "fridge"],
    pricePerNight: 1100000,
  },
  {
    id: "r5",
    name: "Suite VIP Junior",
    roomNumber: "502",
    type: "VIP",
    imageUrl: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&q=80",
    bed: "King Bed",
    maxGuests: 3,
    amenities: ["wifi", "ac", "tv", "fridge", "bathtub"],
    pricePerNight: 2500000,
  },
  {
    id: "r6",
    name: "Standard Pool View",
    roomNumber: "203",
    type: "standard",
    imageUrl: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=400&q=80",
    bed: "Double Bed",
    maxGuests: 2,
    amenities: ["wifi", "ac", "tv", "breakfast"],
    pricePerNight: 1000000,
  },
];
