import { IMAGE_MAX_SIZE } from "@/constants/common";
import { z } from "zod";

export const roomSchema = z
  .object({
    roomName: z
      .string()
      .trim()
      .min(3, "Tên phòng phải từ 3 ký tự")
      .max(100, "Tối đa 100 ký tự"),
    roomNumber: z.string().regex(/^[0-9]{3}$/, "Mã phòng phải gồm 3 chữ số"),
    roomTypeId: z.string().min(1, "Vui lòng chọn loại phòng"),
    basePrice: z.coerce
      .number()
      .positive("Giá phòng phải lớn hơn 0")
      .max(100_000_000, "Giá tối đa 100 triệu"),
    description: z.string().max(1000).optional(),
    notes: z.string().max(255).optional(),
    maxGuests: z.coerce.number().min(1).max(10),
    floor: z.coerce
      .number()
      .min(1, "Tầng phải lớn hơn 0")
      .max(10, "Số tầng vượt quá giới hạn của khách sạn"),
    size: z.coerce.number().min(10).max(200).optional(),
    bedType: z.string().optional(),
    view: z.string().optional(),
    balcony: z.boolean().default(false),
    amenityIds: z.array(z.string()).max(20).default([]),
    thumbnailUrl: z.instanceof(File).optional(),
    imageUrls: z
      .array(
        z
          .instanceof(File)
          .refine((file) => file.size <= IMAGE_MAX_SIZE, "Ảnh tối đa 5MB")
          .refine(
            (file) => ["image/jpeg", "image/png"].includes(file.type),
            "Chỉ chấp nhận JPG/PNG",
          ),
      )
      .max(4, "Tối đa 4 ảnh")
      .default([]),
    existingThumbnail: z.string().optional(),
    existingImages: z
      .array(
        z.object({
          id: z.string(),
          imageUrl: z.string(),
          displayOrder: z.number(),
        }),
      )
      .default([]),
    deleteImageIds: z.array(z.string()).default([]),
  })
  .superRefine((data, ctx) => {
    if (data.roomNumber && data.floor && /^\d{3}$/.test(data.roomNumber)) {
      const firstDigit = parseInt(data.roomNumber[0]);
      if (firstDigit !== data.floor) {
        ctx.addIssue({
          path: ["roomNumber"],
          code: z.ZodIssueCode.custom,
          message: `Số đầu mã phòng phải khớp với tầng (${data.floor})`,
        });
      }
    }
  });

export type RoomFormValues = z.infer<typeof roomSchema>;
