// ── Types ──────────────────────────────────────────────────────
export type ServiceCategory = "spa" | "transport" | "food" | "laundry" | "other";

export type Service = {
  id: string;
  name: string;
  imageUrl: string;
  category: ServiceCategory;
  pricePerUnit: number;
  unit: string;
  status: "active" | "inactive";
};

// ── Category config ────────────────────────────────────────────
export const CATEGORY_CONFIG: Record<
  ServiceCategory,
  { label: string; className: string }
> = {
  spa:       { label: "Spa & Thư giãn",  className: "bg-purple-100 text-purple-700" },
  transport: { label: "Đưa đón",         className: "bg-blue-100 text-blue-700"    },
  food:      { label: "Ẩm thực",         className: "bg-orange-100 text-orange-700" },
  laundry:   { label: "Giặt ủi",         className: "bg-green-100 text-green-700"   },
  other:     { label: "Khác",            className: "bg-gray-100 text-gray-600"     },
};

// ── Stats (TODO: replace with API) ────────────────────────────
export const MOCK_SERVICE_STATS = {
  total: 12,
  active: 10,
  revenue: "45,200,000",
};

// ── Sample data ───────────────────────────────────────────────
export const MOCK_SERVICES: Service[] = [
  {
    id: "svc-1",
    name: "Massage toàn thân 60 phút",
    imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80",
    category: "spa",
    pricePerUnit: 450000,
    unit: "lần",
    status: "active",
  },
  {
    id: "svc-2",
    name: "Đưa đón sân bay",
    imageUrl: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80",
    category: "transport",
    pricePerUnit: 300000,
    unit: "lượt",
    status: "active",
  },
  {
    id: "svc-3",
    name: "Bữa sáng buffet",
    imageUrl: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=400&q=80",
    category: "food",
    pricePerUnit: 180000,
    unit: "người",
    status: "active",
  },
  {
    id: "svc-4",
    name: "Giặt ủi đồ",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    category: "laundry",
    pricePerUnit: 80000,
    unit: "kg",
    status: "active",
  },
  {
    id: "svc-5",
    name: "Thuê xe đạp",
    imageUrl: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=400&q=80",
    category: "transport",
    pricePerUnit: 120000,
    unit: "ngày",
    status: "inactive",
  },
  {
    id: "svc-6",
    name: "Chăm sóc da mặt",
    imageUrl: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&q=80",
    category: "spa",
    pricePerUnit: 350000,
    unit: "lần",
    status: "active",
  },
];
