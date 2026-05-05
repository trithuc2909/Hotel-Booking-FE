// ─────────────────────────────────────────────────────────────
// TODO (BE): Thay bằng data từ API
// GET /admin/promotions?page=1&limit=5
// ─────────────────────────────────────────────────────────────

export type PromoStatus    = "active" | "inactive" | "expired";
export type DiscountType   = "fixed" | "percent";

export type Promotion = {
  id: string;
  name: string;
  code: string;
  discountType: DiscountType;
  discountValue: number;       // VNĐ hoặc %
  startDate: string;           // "DD/MM/YYYY"
  endDate: string;
  usedCount: number;
  totalLimit: number;
  status: PromoStatus;
  imageUrl: string;
};

// Ảnh hardcode – TODO (BE): dùng imageUrl thực từ API
const IMGS = {
  summer  : "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=120&h=80&fit=crop",
  saving  : "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=120&h=80&fit=crop",
  feb     : "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=120&h=80&fit=crop",
  newyear : "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=120&h=80&fit=crop",
  weekend : "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=120&h=80&fit=crop",
  vip     : "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=120&h=80&fit=crop",
};

export const MOCK_PROMOTIONS: Promotion[] = [
  {
    id: "p1",
    name: "Mùa hè rực rỡ",
    code: "SUMMER24",
    discountType: "fixed",
    discountValue: 100_000,
    startDate: "03/02/2026",
    endDate: "01/05/2026",
    usedCount: 100,
    totalLimit: 200,
    status: "active",
    imageUrl: IMGS.summer,
  },
  {
    id: "p2",
    name: "Hành trình tiết kiệm",
    code: "SAVING24",
    discountType: "percent",
    discountValue: 15,
    startDate: "15/03/2026",
    endDate: "15/05/2026",
    usedCount: 45,
    totalLimit: 100,
    status: "inactive",
    imageUrl: IMGS.saving,
  },
  {
    id: "p3",
    name: "Tuần lễ khai trương",
    code: "9FEB58",
    discountType: "percent",
    discountValue: 50,
    startDate: "01/01/2026",
    endDate: "07/01/2026",
    usedCount: 150,
    totalLimit: 150,
    status: "expired",
    imageUrl: IMGS.feb,
  },
  {
    id: "p4",
    name: "Chào năm mới 2026",
    code: "NEW2026",
    discountType: "fixed",
    discountValue: 200_000,
    startDate: "01/01/2026",
    endDate: "15/01/2026",
    usedCount: 80,
    totalLimit: 300,
    status: "expired",
    imageUrl: IMGS.newyear,
  },
  {
    id: "p5",
    name: "Cuối tuần vui vẻ",
    code: "WEEKEND",
    discountType: "percent",
    discountValue: 10,
    startDate: "01/05/2026",
    endDate: "31/05/2026",
    usedCount: 20,
    totalLimit: 500,
    status: "active",
    imageUrl: IMGS.weekend,
  },
  {
    id: "p6",
    name: "Thành viên VIP",
    code: "VIP2026",
    discountType: "percent",
    discountValue: 20,
    startDate: "01/01/2026",
    endDate: "31/12/2026",
    usedCount: 60,
    totalLimit: 100,
    status: "active",
    imageUrl: IMGS.vip,
  },
];

// ── Stat summary – TODO (BE): GET /admin/promotions/stats ──────
export const MOCK_PROMO_STATS = {
  totalUsed:   124,
  activeCount: 18,
};
