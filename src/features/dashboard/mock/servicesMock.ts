// ─────────────────────────────────────────────────────────────
// TODO (BE): Thay bằng data từ API
// GET /admin/services?page=1&search=...&category=...
// ─────────────────────────────────────────────────────────────

export type ServiceCategory = "DI_CHUYEN" | "TRANG_TRI" | "THU_GIAN" | "KHAM_PHA";
export type ServiceStatus    = "active" | "inactive";
export type PriceUnit        = "lượt" | "phòng / ngày" | "lượt / người" | "ngày";

export type Service = {
  id: string;
  name: string;
  category: ServiceCategory;
  pricePerUnit: number;
  unit: PriceUnit;
  status: ServiceStatus;
  imageUrl: string;
};

// Ảnh hardcode dùng chung – TODO (BE): mỗi dịch vụ sẽ có imageUrl riêng
const IMGS = {
  airport : "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=120&h=80&fit=crop",
  motorbike: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=120&h=80&fit=crop",
  birthday : "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=120&h=80&fit=crop",
  proposal : "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=120&h=80&fit=crop",
  massage  : "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=120&h=80&fit=crop",
  sauna    : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=80&fit=crop",
  tour     : "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=120&h=80&fit=crop",
};

export const MOCK_SERVICES: Service[] = [
  { id: "sv1", name: "Đưa đón sân bay",       category: "DI_CHUYEN",  pricePerUnit: 400_000, unit: "lượt",          status: "active",   imageUrl: IMGS.airport   },
  { id: "sv2", name: "Thuê xe máy",            category: "DI_CHUYEN",  pricePerUnit: 150_000, unit: "ngày",          status: "active",   imageUrl: IMGS.motorbike },
  { id: "sv3", name: "Trang trí sinh nhật",    category: "TRANG_TRI",  pricePerUnit: 1_200_000, unit: "lượt",        status: "active",   imageUrl: IMGS.birthday  },
  { id: "sv4", name: "Trang trí cầu hôn",      category: "TRANG_TRI",  pricePerUnit: 2_500_000, unit: "lượt",        status: "active",   imageUrl: IMGS.proposal  },
  { id: "sv5", name: "Massage toàn thân",       category: "THU_GIAN",   pricePerUnit: 600_000, unit: "phòng / ngày", status: "active",   imageUrl: IMGS.massage   },
  { id: "sv6", name: "Xông hơi thư giãn",       category: "THU_GIAN",   pricePerUnit: 200_000, unit: "lượt / người", status: "inactive", imageUrl: IMGS.sauna     },
  { id: "sv7", name: "Hướng dẫn viên du lịch", category: "KHAM_PHA",  pricePerUnit: 500_000, unit: "ngày",          status: "active",   imageUrl: IMGS.tour      },
];

// ── Stat summary (mock) ────────────────────────────────────────
// TODO (BE): GET /admin/services/stats
export const MOCK_SERVICE_STATS = {
  total:    24,
  active:   18,
  revenue:  "145.2M",
};

// ── Category display config ────────────────────────────────────
export const CATEGORY_CONFIG: Record<ServiceCategory, { label: string; className: string }> = {
  DI_CHUYEN : { label: "DI CHUYỂN", className: "bg-blue-100 text-blue-700"   },
  TRANG_TRI : { label: "TRANG TRÍ", className: "bg-purple-100 text-purple-700" },
  THU_GIAN  : { label: "THƯ GIÃN",  className: "bg-green-100 text-green-700" },
  KHAM_PHA  : { label: "KHÁM PHÁ",  className: "bg-orange-100 text-orange-700" },
};
