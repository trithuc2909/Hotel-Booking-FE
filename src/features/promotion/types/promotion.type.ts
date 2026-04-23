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
  status: string;
};

export type DiscountType = (typeof discountType)[keyof typeof discountType];

