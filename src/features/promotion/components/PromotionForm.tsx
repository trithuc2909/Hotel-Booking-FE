"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, Loader2, X } from "lucide-react";
import {
  promotionSchema,
  PromotionFormValues,
} from "../schemas/promotion.schema";
import { discountType } from "../types/promotion.type";
import z from "zod";
import { formatCurrency } from "@/lib/utils";

interface Props {
  mode: "create" | "edit";
  defaultValues?: Partial<PromotionFormValues>;
  onSubmit: (data: PromotionFormValues) => Promise<void> | void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  currentImageUrl?: string | null;
}

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#0D99FF] focus:ring-4 focus:ring-[#0D99FF]/10";
const labelClass =
  "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400";
const errorClass = "mt-1.5 text-xs font-medium text-red-500";

function FormField({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={labelClass}>
        {label}
        {required && <span className="ml-1 text-red-400">*</span>}
      </label>
      {children}
      {error && <p className={errorClass}>{error}</p>}
    </div>
  );
}

export default function PromotionForm({
  mode,
  defaultValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
  currentImageUrl,
}: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.input<typeof promotionSchema>, any, PromotionFormValues>({
    resolver: zodResolver(promotionSchema),
    defaultValues: {
      code: "",
      title: "",
      description: "",
      discountType: discountType.FIXED,
      discountValue: 0,
      ...defaultValues,
    },
  });

  const imageInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentImageUrl ?? null,
  );
  const imageUrl = watch("imageUrl");
  const selectedDiscountType = watch("discountType");
  const isPercent = selectedDiscountType === discountType.PERCENT;

  useEffect(() => {
    if (!imageUrl) return;
    const blobUrl = URL.createObjectURL(imageUrl);
    setPreviewUrl(blobUrl);
    return () => URL.revokeObjectURL(blobUrl);
  }, [imageUrl]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setValue("imageUrl", file, { shouldValidate: true });
  };

  const handleRemoveImage = () => {
    setValue("imageUrl", undefined);
    setPreviewUrl(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <fieldset disabled={isSubmitting} className="m-0 min-w-0 border-0 p-0">
        <div className="grid grid-cols-3 items-stretch gap-6">
          {/* Left */}
          <div className="col-span-2 space-y-5">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-5">
                <h2 className="text-sm font-bold text-gray-800">
                  Thông tin ưu đãi
                </h2>
                <p className="mt-1 text-xs text-gray-400">
                  Mã code, tiêu đề và mô tả ưu đãi.
                </p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="Mã ưu đãi"
                    required
                    error={errors.code?.message}
                  >
                    <input
                      {...register("code")}
                      placeholder="VD: SUMMER2025"
                      className={`${inputClass} font-mono uppercase`}
                    />
                  </FormField>
                  <FormField
                    label="Tiêu đề"
                    required
                    error={errors.title?.message}
                  >
                    <input
                      {...register("title")}
                      placeholder="VD: Giảm 20% mùa hè"
                      className={inputClass}
                    />
                  </FormField>
                </div>
                <FormField label="Mô tả" error={errors.description?.message}>
                  <textarea
                    {...register("description")}
                    rows={3}
                    placeholder="Mô tả ngắn về ưu đãi..."
                    className={`${inputClass} resize-none`}
                  />
                </FormField>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-5">
                <h2 className="text-sm font-bold text-gray-800">
                  Loại giảm giá
                </h2>
                <p className="mt-1 text-xs text-gray-400">
                  Chọn cách tính giảm và các giới hạn áp dụng.
                </p>
              </div>
              <div className="space-y-4">
                <FormField
                  label="Loại giảm"
                  required
                  error={errors.discountType?.message}
                >
                  <div className="flex gap-3">
                    {[
                      { value: "FIXED", label: "Cố định (VNĐ)" },
                      { value: "PERCENT", label: "Phần trăm (%)" },
                    ].map((opt) => (
                      <label
                        key={opt.value}
                        className={`flex flex-1 cursor-pointer items-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-medium transition ${
                          selectedDiscountType === opt.value
                            ? "border-[#0D99FF] bg-blue-50 text-[#0D99FF]"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          {...register("discountType")}
                          value={opt.value}
                          className="accent-[#0D99FF]"
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </FormField>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label={
                      isPercent ? "Giá trị giảm (%)" : "Giá trị giảm (VNĐ)"
                    }
                    required
                    error={errors.discountValue?.message}
                  >
                    <div className="relative">
                      <input
                        {...register("discountValue")}
                        type="number"
                        min={0}
                        max={isPercent ? 100 : undefined}
                        step={isPercent ? 1 : 1000}
                        placeholder={isPercent ? "20" : "100000"}
                        className={`${inputClass} pr-14`}
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <span className="text-xs font-semibold text-gray-400">
                          {isPercent ? "%" : "VNĐ"}
                        </span>
                      </div>
                    </div>
                  </FormField>

                  <FormField
                    label="Đơn hàng tối thiểu"
                    error={errors.minOrderValue?.message}
                  >
                    <div className="relative">
                      <input
                        {...register("minOrderValue")}
                        type="number"
                        min={0}
                        step={1000}
                        placeholder="Không giới hạn"
                        className={`${inputClass} pr-14`}
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <span className="text-xs font-semibold text-gray-400">
                          VNĐ
                        </span>
                      </div>
                    </div>
                  </FormField>
                </div>

                {isPercent && (
                  <FormField
                    label="Giảm tối đa (VNĐ)"
                    required
                    error={errors.maxDiscount?.message}
                  >
                    <div className="relative">
                      <input
                        {...register("maxDiscount")}
                        type="number"
                        min={0}
                        step={1000}
                        placeholder="VD: 200000"
                        className={`${inputClass} pr-14`}
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <span className="text-xs font-semibold text-gray-400">
                          VNĐ
                        </span>
                      </div>
                    </div>
                  </FormField>
                )}
              </div>
            </div>

            {/* startDate & endDate */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-5">
                <h2 className="text-sm font-bold text-gray-800">
                  Thời hạn & Giới hạn
                </h2>
                <p className="mt-1 text-xs text-gray-400">
                  Thời gian hiệu lực và số lần sử dụng.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  label="Ngày bắt đầu"
                  error={errors.startDate?.message}
                >
                  <input
                    {...register("startDate")}
                    type="date"
                    className={inputClass}
                  />
                </FormField>
                <FormField
                  label="Ngày kết thúc"
                  error={errors.endDate?.message}
                >
                  <input
                    {...register("endDate")}
                    type="date"
                    className={inputClass}
                  />
                </FormField>
                <FormField
                  label="Tổng lượt dùng"
                  error={errors.usageLimit?.message}
                >
                  <input
                    {...register("usageLimit")}
                    type="number"
                    min={1}
                    step={1}
                    placeholder="Không giới hạn"
                    className={inputClass}
                  />
                </FormField>
                <FormField
                  label="Lượt dùng / người"
                  error={errors.maxUsagePerUser?.message}
                >
                  <input
                    {...register("maxUsagePerUser")}
                    type="number"
                    min={1}
                    step={1}
                    placeholder="Không giới hạn"
                    className={inputClass}
                  />
                </FormField>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="col-span-1">
            <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex-1">
                <div className="mb-5">
                  <h2 className="text-sm font-bold text-gray-800">
                    Hình ảnh ưu đãi
                  </h2>
                  <p className="mt-1 text-xs text-gray-400">
                    JPG, PNG hoặc WEBP tối đa 5MB.
                  </p>
                </div>

                {previewUrl ? (
                  <div className="space-y-3">
                    <div className="relative overflow-hidden rounded-2xl border border-gray-100">
                      <Image
                        src={previewUrl}
                        alt="Promotion preview"
                        width={500}
                        height={300}
                        unoptimized
                        className="aspect-[4/3] w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="cursor-pointer absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-red-500"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => imageInputRef.current?.click()}
                      className="cursor-pointer w-full rounded-xl border border-gray-200 py-2.5 text-xs font-semibold text-gray-500 transition hover:bg-gray-50"
                    >
                      Chọn ảnh khác
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 py-12 text-gray-400 transition hover:border-[#0D99FF] hover:text-[#0D99FF]"
                  >
                    <ImagePlus size={30} />
                    <div className="space-y-1 text-center">
                      <p className="text-sm font-semibold">Chọn ảnh ưu đãi</p>
                      <p className="text-[11px]">PNG, JPG hoặc WEBP</p>
                    </div>
                  </button>
                )}

                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                />

                <div className="mt-4 rounded-xl bg-green-50 px-3 py-2">
                  <p className="text-xs font-medium text-green-700">
                    Mặc định trạng thái: Đang hoạt động
                  </p>
                </div>
                <div className="mt-5 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Xem trước ưu đãi
                  </p>

                  <div className="mt-3 rounded-xl bg-white p-4 shadow-sm">
                    {/* Code */}
                    <p className="font-mono text-sm font-bold text-[#0D99FF]">
                      {watch("code").toUpperCase() || "PROMO2025"}
                    </p>

                    {/* Title */}
                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      {watch("title") || "Tên ưu đãi"}
                    </p>

                    {/* Description */}
                    <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                      {watch("description") || "Mô tả ưu đãi sẽ hiển thị ở đây"}
                    </p>

                    <div className="my-4 h-px bg-gray-100" />

                    {/* Discount */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Giảm giá</span>

                      <span className="font-semibold text-gray-800">
                        {isPercent
                          ? `${watch("discountValue") || 0}%`
                          : `${formatCurrency(Number(watch("discountValue")) || 0)} VNĐ`}
                      </span>
                    </div>

                    {/* Min Order */}
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        Đơn tối thiểu
                      </span>

                      <span className="text-sm font-medium text-gray-700">
                        {watch("minOrderValue")
                          ? `${formatCurrency(Number(watch("minOrderValue")))} VNĐ`
                          : "Không giới hạn"}
                      </span>
                    </div>

                    {/* Max Discount */}
                    {isPercent && (
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          Giảm tối đa
                        </span>

                        <span className="text-sm font-medium text-gray-700">
                          {watch("maxDiscount")
                            ? `${formatCurrency(Number(watch("maxDiscount")))} VNĐ`
                            : ""}
                        </span>
                      </div>
                    )}

                    {/* Date */}
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-gray-500">Hiệu lực</span>

                      <span className="text-right text-xs text-gray-700">
                        {watch("startDate")} →{" "}
                        {watch("endDate")}
                      </span>
                    </div>

                    {/* Badge */}
                    <div className="mt-4">
                      <span className="inline-flex rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-600">
                        Đang hoạt động
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex gap-3 border-t border-gray-100 pt-6">
                {onCancel && (
                  <button
                    type="button"
                    onClick={onCancel}
                    className="cursor-pointer flex-1 rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                  >
                    Hủy
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-pointer flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0D99FF] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0B84E6] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting && (
                    <Loader2 size={16} className="animate-spin" />
                  )}
                  {isSubmitting
                    ? "Đang lưu..."
                    : mode === "create"
                      ? "Thêm ưu đãi"
                      : "Cập nhật"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </fieldset>
    </form>
  );
}
