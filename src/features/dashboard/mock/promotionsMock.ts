// ── Types ──────────────────────────────────────────────────────
export type PromoStatus = "active" | "inactive" | "expired";

export type Promotion = {
  id: string;
  name: string;
  imageUrl: string;
  code: string;
  discountType: "fixed" | "percentage";
  discountValue: number;
  startDate: string;
  endDate: string;
  usedCount: number;
  totalLimit: number;
  status: PromoStatus;
};

// ── Stats (TODO: replace with API) ────────────────────────────
export const MOCK_PROMO_STATS = {
  totalUsed: 348,
  activeCount: 5,
};

// ── Sample data ───────────────────────────────────────────────
export const MOCK_PROMOTIONS: Promotion[] = [
  {
    id: "promo-1",
    name: "Hè Rực Rỡ 2026",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
    code: "SUMMER26",
    discountType: "percentage",
    discountValue: 20,
    startDate: "01/06/2026",
    endDate: "31/08/2026",
    usedCount: 87,
    totalLimit: 200,
    status: "active",
  },
  {
    id: "promo-2",
    name: "Tuần Trăng Mật",
    imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=80",
    code: "HONEY50",
    discountType: "fixed",
    discountValue: 500,
    startDate: "01/01/2026",
    endDate: "31/12/2026",
    usedCount: 43,
    totalLimit: 100,
    status: "active",
  },
  {
    id: "promo-3",
    name: "Cuối Tuần Thư Giãn",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
    code: "WEEKEND15",
    discountType: "percentage",
    discountValue: 15,
    startDate: "01/03/2026",
    endDate: "30/04/2026",
    usedCount: 120,
    totalLimit: 120,
    status: "expired",
  },
  {
    id: "promo-4",
    name: "Khai Trương Chi Nhánh Mới",
    imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80",
    code: "GRAND100",
    discountType: "fixed",
    discountValue: 100,
    startDate: "15/05/2026",
    endDate: "15/07/2026",
    usedCount: 18,
    totalLimit: 300,
    status: "active",
  },
  {
    id: "promo-5",
    name: "Khách Hàng Thân Thiết",
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80",
    code: "LOYAL25",
    discountType: "percentage",
    discountValue: 25,
    startDate: "01/01/2026",
    endDate: "31/12/2026",
    usedCount: 80,
    totalLimit: 500,
    status: "inactive",
  },
];
