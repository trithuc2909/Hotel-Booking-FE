"use client";

import { ImagePlus, Star, X } from "lucide-react";
import React from "react";
import { useFormContext } from "react-hook-form";
import { RoomFormValues } from "../../schemas/room.schema";
import Image from "next/image";

export default function RoomFormImagesSection() {
  const { setValue, watch } = useFormContext<RoomFormValues>();

  const newThumbnail = watch("thumbnailUrl");
  const existingThumbnail = watch("existingThumbnail");

  const newImages = watch("imageUrls") ?? [];
  const existingImages = watch("existingImages") ?? [];
  const deleteImageIds = watch("deleteImageIds") ?? [];

  const totalSubImages = existingImages.length + newImages.length;
  const hasThumbnail = !!newThumbnail || !!existingThumbnail;

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("thumbnailUrl", file, { shouldValidate: true });
      setValue("existingThumbnail", undefined);
    }
  };

  const removeNewThumbnail = () => setValue("thumbnailUrl", undefined);

  const removeExistingThumbnail = () => {
    setValue("existingThumbnail", undefined);
    setValue("thumbnailUrl", undefined);
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const remaining = 4 - totalSubImages;
    const newFiles = files.slice(0, remaining);
    setValue("imageUrls", [...newImages, ...newFiles], {
      shouldValidate: true,
    });
  };

  const removeNewImage = (index: number) => {
    setValue(
      "imageUrls",
      newImages.filter((_, i) => i !== index),
    );
  };

  const removeExistingImage = (img: {
    id: string;
    imageUrl: string;
    displayOrder: number;
  }) => {
    setValue(
      "existingImages",
      existingImages.filter((i) => i.id !== img.id),
    );
    setValue("deleteImageIds", [...deleteImageIds, img.id]);
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 space-y-4 sticky top-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase text-gray-400 tracking-wide">
          Hình ảnh
        </h2>
        <span
          className={`text-xs font-medium ${
            (hasThumbnail ? 1 : 0) + totalSubImages >= 5
              ? "text-red-400"
              : "text-gray-400"
          }`}
        >
          {(hasThumbnail ? 1 : 0) + totalSubImages}/5
        </span>
      </div>

      <div className="relative">
        {newThumbnail ? (
          <div className="relative h-40 rounded-xl overflow-hidden">
            <Image
              src={URL.createObjectURL(newThumbnail)}
              alt="Ảnh chính"
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={removeNewThumbnail}
              className="absolute top-2 right-2 rounded-full bg-black/50 p-1 text-white hover:bg-black/70 cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
        ) : existingThumbnail ? (
          <div className="relative h-40 rounded-xl overflow-hidden">
            <Image
              src={existingThumbnail}
              alt="Ảnh chính hiện tại"
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={removeExistingThumbnail}
              className="absolute top-2 right-2 rounded-full bg-black/50 p-1 text-white hover:bg-black/70 cursor-pointer"
            >
              <X size={14} />
            </button>
            <label className="absolute inset-0 cursor-pointer opacity-0 hover:opacity-100 flex items-center justify-center bg-black/30 transition">
              <span className="text-white text-xs font-medium">
                Đổi ảnh chính
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleThumbnailChange}
              />
            </label>
          </div>
        ) : (
          <label className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-gray-100 transition">
            <Star size={20} className="mb-1 text-yellow-400" />
            <p className="text-xs font-medium text-gray-400">Ảnh chính</p>
            <p className="text-[10px] text-gray-300">Click để chọn</p>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleThumbnailChange}
            />
          </label>
        )}

        <span className="absolute left-2 top-2 rounded-full bg-yellow-400 px-2 py-0.5 text-[10px] font-bold text-white pointer-events-none">
          CHÍNH
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {existingImages.map((img) => (
          <div
            key={img.id}
            className="relative h-20 rounded-lg overflow-hidden"
          >
            <Image
              src={img.imageUrl}
              alt={`Ảnh phụ ${img.displayOrder}`}
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => removeExistingImage(img)}
              className="absolute top-1 right-1 rounded-full bg-black/50 p-0.5 text-white hover:bg-black/70 cursor-pointer"
            >
              <X size={12} />
            </button>
          </div>
        ))}

        {newImages.map((file, i) => (
          <div
            key={`new-${i}`}
            className="relative h-20 rounded-lg overflow-hidden"
          >
            <Image
              src={URL.createObjectURL(file)}
              alt={`Ảnh mới ${i + 1}`}
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => removeNewImage(i)}
              className="absolute top-1 right-1 rounded-full bg-black/50 p-0.5 text-white hover:bg-black/70 cursor-pointer"
            >
              <X size={12} />
            </button>
          </div>
        ))}

        {Array.from({ length: Math.max(0, 4 - totalSubImages) }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className="flex h-20 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 text-xs text-gray-300"
          >
            Ảnh phụ {existingImages.length + newImages.length + i + 1}
          </div>
        ))}
      </div>

      {totalSubImages < 4 && (
        <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-[#0D99FF] py-3 text-sm text-[#0D99FF] hover:bg-blue-50 transition">
          <ImagePlus size={16} />
          Thêm ảnh phụ
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleImagesChange}
          />
        </label>
      )}

      <div className="rounded-lg bg-gray-50 p-3 text-xs text-gray-500 space-y-1">
        <p className="font-semibold text-gray-600">Lưu ý</p>
        <p>• 1 ảnh chính + tối đa 4 ảnh phụ</p>
        <p>• Dung lượng tối đa 5MB/ảnh</p>
        <p>• Định dạng: JPG, PNG, WEBP</p>
      </div>
    </div>
  );
}
