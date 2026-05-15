"use client";

import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import PromotionForm from "@/features/promotion/components/PromotionForm";
import {
  useGetAdminPromotionByIdQuery,
  useUpdatePromotionMutation,
} from "@/features/promotion/api/promotionApi";
import type { PromotionFormValues } from "@/features/promotion/schemas/promotion.schema";

export default function PromotionDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const { data: response, isLoading, isError } = useGetAdminPromotionByIdQuery(id);
  const [updatePromotion, { isLoading: isUpdating }] = useUpdatePromotionMutation();

  const promotion = response?.data;

  const formatDateForInput = (dateStr: string | null | undefined) => {
    if (!dateStr) return "";
    return dateStr.split("T")[0];
  };

  const handleSubmit = async (data: PromotionFormValues) => {
    const formData = new FormData();
    
    formData.append("code", data.code.toUpperCase());
    formData.append("title", data.title);
    formData.append("discountType", data.discountType);
    formData.append("discountValue", String(data.discountValue));

    if (data.description !== undefined) formData.append("description", data.description);
    
    if (data.minOrderValue) formData.append("minOrderValue", String(data.minOrderValue));
    if (data.maxDiscount) formData.append("maxDiscount", String(data.maxDiscount));
    if (data.usageLimit) formData.append("usageLimit", String(data.usageLimit));
    if (data.maxUsagePerUser) formData.append("maxUsagePerUser", String(data.maxUsagePerUser));
    
    if (data.startDate) formData.append("startDate", data.startDate);
    if (data.endDate) formData.append("endDate", data.endDate);

    if (data.imageUrl instanceof File) {
      formData.append("imageUrl", data.imageUrl);
    }

    try {
      await updatePromotion({ id, data: formData }).unwrap();
      toast.success("Cập nhật ưu đãi thành công!");
      router.push("/dashboard/promotions");
    } catch (err: any) {
      toast.error(err?.data?.message ?? "Có lỗi xảy ra khi cập nhật");
    }
  };

  if (isLoading) return <div className="py-10 text-center text-sm text-gray-400">Đang tải dữ liệu...</div>;
  if (isError || !promotion) return <div className="py-10 text-center text-sm text-red-500">Không tìm thấy thông tin ưu đãi</div>;

  const defaultValues: Partial<PromotionFormValues> = {
    code: promotion.code,
    title: promotion.title,
    description: promotion.description || "",
    discountType: promotion.discountType as any,
    discountValue: promotion.discountValue,
    minOrderValue: promotion.minOrderValue || 0,
    maxDiscount: promotion.maxDiscount || 0,
    usageLimit: promotion.usageLimit || undefined,
    maxUsagePerUser: promotion.maxUsagePerUser || undefined,
    startDate: formatDateForInput(promotion.startDate),
    endDate: formatDateForInput(promotion.endDate),
  };

  return (
    <div className="space-y-5">
      <Breadcrumb
        items={[
          { label: "Quản lý ưu đãi", href: "/dashboard/promotions" },
          { label: "Chi tiết ưu đãi" },
          { label: promotion.code },
        ]}
      />

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Chi tiết ưu đãi</h1>
        <p className="mt-0.5 text-sm text-gray-400">Xem và chỉnh sửa thông tin mã giảm giá</p>
      </div>

      <PromotionForm
        mode="edit"
        defaultValues={defaultValues}
        currentImageUrl={promotion.imageUrl}
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
        isSubmitting={isUpdating}
      />
    </div>
  );
}
