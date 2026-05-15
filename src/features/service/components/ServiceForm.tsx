"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, Loader2, X } from "lucide-react";

import { serviceSchema, ServiceFormValues } from "../schemas/service.schema";

import { useGetServiceCategoriesQuery } from "../api/serviceApi";

interface Props {
  mode: "create" | "edit";
  defaultValues?: Partial<ServiceFormValues>;
  onSubmit: (data: ServiceFormValues) => Promise<void> | void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  currentImageUrl?: string | null;
}

type ServiceCategory = {
  id: string;
  name: string;
};

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

export default function ServiceForm({
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
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),

    defaultValues: {
      name: "",
      serviceCategoryId: "",
      basePrice: 0,
      unit: "",
      description: "",
      ...defaultValues,
    },
  });

  const { data: categoryResponse } = useGetServiceCategoriesQuery();

  const categories: ServiceCategory[] = categoryResponse?.data ?? [];

  const imageInputRef = useRef<HTMLInputElement>(null);

  const image = watch("imageUrl");
  const basePrice = watch("basePrice");

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentImageUrl ?? null,
  );

  useEffect(() => {
    if (!image) return;

    const blobUrl = URL.createObjectURL(image);

    setPreviewUrl(blobUrl);

    return () => {
      URL.revokeObjectURL(blobUrl);
    };
  }, [image]);

  const formattedPrice = useMemo(() => {
    return new Intl.NumberFormat("vi-VN").format(basePrice || 0);
  }, [basePrice]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setValue("imageUrl", file, {
      shouldValidate: true,
    });
  };

  const handleRemoveImage = () => {
    setValue("imageUrl", undefined);

    setPreviewUrl(null);

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <fieldset disabled={isSubmitting} className="m-0 min-w-0 border-0 p-0">
        <div className="grid grid-cols-3 items-stretch gap-6">
          {/* Left */}
          <div className="col-span-2">
            <div className="h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-5">
                <h2 className="text-sm font-bold text-gray-800">
                  Thông tin cơ bản
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  Quản lý thông tin hiển thị của dịch vụ.
                </p>
              </div>

              <div className="space-y-5">
                <FormField
                  label="Tên dịch vụ"
                  required
                  error={errors.name?.message}
                >
                  <input
                    {...register("name")}
                    placeholder="VD: Spa thư giãn cao cấp"
                    className={inputClass}
                  />
                </FormField>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="Danh mục"
                    required
                    error={errors.serviceCategoryId?.message}
                  >
                    <select
                      {...register("serviceCategoryId")}
                      className={inputClass}
                    >
                      <option value="">Chọn danh mục</option>

                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </FormField>

                  <FormField
                    label="Đơn vị"
                    required
                    error={errors.unit?.message}
                  >
                    <input
                      {...register("unit")}
                      placeholder="VD: lần, giờ, người..."
                      className={inputClass}
                    />
                  </FormField>
                </div>

                <FormField
                  label="Đơn giá"
                  required
                  error={errors.basePrice?.message}
                >
                  <div className="relative">
                    <input
                      {...register("basePrice", {
                        valueAsNumber: true,
                      })}
                      type="number"
                      min={0}
                      step={1000}
                      placeholder="150000"
                      className={`${inputClass} pr-16`}
                    />

                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <span className="text-xs font-semibold text-gray-400">
                        VNĐ
                      </span>
                    </div>
                  </div>

                  <p className="mt-2 text-xs font-medium text-gray-400">
                    {formattedPrice} VNĐ
                  </p>
                </FormField>

                <FormField label="Mô tả" error={errors.description?.message}>
                  <textarea
                    {...register("description")}
                    rows={5}
                    placeholder="Mô tả ngắn về dịch vụ..."
                    className={`${inputClass} resize-none`}
                  />
                </FormField>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="col-span-1">
            <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              {/* Content */}
              <div className="flex-1">
                <div className="mb-5">
                  <h2 className="text-sm font-bold text-gray-800">
                    Hình ảnh dịch vụ
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
                        alt="Service preview"
                        width={500}
                        height={300}
                        unoptimized
                        className="aspect-[4/3] w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        aria-label="Xóa ảnh"
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
                      <p className="text-sm font-semibold">Chọn ảnh dịch vụ</p>

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
              </div>

              {/* ACTION */}
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
                      ? "Thêm dịch vụ"
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
