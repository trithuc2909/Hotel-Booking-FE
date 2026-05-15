import { z } from "zod";
import { discountType } from "../types/promotion.type";
import { ALLOWED_TYPES, IMAGE_MAX_SIZE } from "@/constants/common";

export const DISCOUNT_TYPES = Object.values(discountType) as [
  string,
  ...string[],
];

const optionalNumber = z.preprocess((value) => {
  if (value === "" || value === null || value === undefined) {
    return undefined;
  }

  return Number(value);
}, z.number().min(0).optional());

export const promotionSchema = z
  .object({
    code: z
      .string()
      .trim()
      .min(1, "Mã ưu đãi không được để trống")
      .max(50, "Mã ưu đãi tối đa 50 ký tự"),

    title: z
      .string()
      .trim()
      .min(2, "Tiêu đề từ 2 đến 200 ký tự")
      .max(200, "Tiêu đề tối đa 200 ký tự"),

    description: z
      .string()
      .trim()
      .max(1000, "Mô tả tối đa 1000 ký tự")
      .optional(),

    discountType: z.enum(DISCOUNT_TYPES, {
      message: "Vui lòng chọn loại giảm giá",
    }),

    discountValue: z.preprocess(
      (value) => Number(value),
      z.number().positive("Giá trị giảm phải lớn hơn 0"),
    ),

    minOrderValue: optionalNumber,

    maxDiscount: optionalNumber,

    usageLimit: z.preprocess(
      (value) => (value === "" ? undefined : Number(value)),
      z.number().int().min(1, "Giới hạn sử dụng phải >= 1").optional(),
    ),

    maxUsagePerUser: z.preprocess(
      (value) => (value === "" ? undefined : Number(value)),
      z.number().int().min(1, "Giới hạn mỗi user phải >= 1").optional(),
    ),

    startDate: z.string().optional(),

    endDate: z.string().optional(),

    imageUrl: z
      .instanceof(File)
      .optional()
      .refine((file) => !file || file.size <= IMAGE_MAX_SIZE, "Ảnh tối đa 5MB")
      .refine(
        (file) => !file || ALLOWED_TYPES.includes(file.type),
        "Chỉ hỗ trợ JPG, PNG, WEBP",
      ),
  })
  .superRefine((data, ctx) => {
    if (
      data.discountType === discountType.PERCENT &&
      data.discountValue > 100
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["discountValue"],
        message: "Giảm phần trăm tối đa là 100%",
      });
    }

    if (data.startDate && data.endDate) {
      const start = new Date(data.startDate);

      const end = new Date(data.endDate);

      if (end <= start) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["endDate"],
          message: "Ngày kết thúc phải sau ngày bắt đầu",
        });
      }
    }

    if (data.discountType === discountType.PERCENT && !data.maxDiscount) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["maxDiscount"],
        message: "Vui lòng nhập mức giảm tối đa",
      });
    }
  });

export type PromotionFormValues = z.infer<typeof promotionSchema>;
