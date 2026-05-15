export const discountType = {
  FIXED: "FIXED",
  PERCENT: "PERCENT",
} as const;

export type PromotionResponse = {
  id: string;
  code: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  discountType: DiscountType;
  discountValue: number;
  minOrderValue: number | null;
  maxDiscount: number | null;
  startDate: string | null;
  endDate: string | null;
  usageLimit: number | null;
  maxUsagePerUser: number | null;
  usageCount: number;
  status: string;
  displayAs?: string;
};

export type ValidatePromoResponse = {
  promotionId: string;
  title: string;
  code: string;
  discountType: string;
  discountValue: number;
  discountAmount: number;
  originalAmount: number;
  finalAmount: number;
};

export type PromotionStatsResponse = {
  total: number;
  active: number;
  totalUsage: number;
};

export type AdminPromotionFilter = {
  search?: string;
  status?: string;
  discountType?: DiscountType;
  pageNum?: number;
  pageSize?: number;
};

export type DiscountType = (typeof discountType)[keyof typeof discountType];
