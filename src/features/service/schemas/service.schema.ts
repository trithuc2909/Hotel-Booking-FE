import { z } from "zod";

export const serviceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Tên dịch vụ từ 2 đến 100 ký tự")
    .max(100, "Tên dịch vụ tối đa 100 ký tự"),

  serviceCategoryId: z
    .string()
    .trim()
    .min(1, "Vui lòng chọn danh mục"),

  basePrice: z
    .number()
    .min(0, "Giá không được âm")
    .max(100_000_000, "Giá tối đa 100 triệu"),

  unit: z
    .string()
    .trim()
    .min(1, "Đơn vị không được để trống")
    .max(50, "Đơn vị tối đa 50 ký tự"),

  description: z
    .string()
    .trim()
    .max(500, "Mô tả tối đa 500 ký tự")
    .optional(),

  imageUrl: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Ảnh tối đa 5MB",
    )
    .refine(
      (file) =>
        [
          "image/jpeg",
          "image/png",
          "image/webp",
        ].includes(file.type),
      "Chỉ hỗ trợ JPG, PNG, WEBP",
    )
    .optional(),
});

export type ServiceFormValues =
  z.infer<typeof serviceSchema>;

