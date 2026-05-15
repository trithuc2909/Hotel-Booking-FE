"use client";

import Breadcrumb from "@/components/shared/Breadcrumb";
import PromotionForm from "@/features/promotion/components/PromotionForm";
import { useCreatePromotionMutation } from "@/features/promotion/api/promotionApi";
import type { PromotionFormValues } from "@/features/promotion/schemas/promotion.schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CreatePromotionPage() {
  const router = useRouter();
  const [createPromotion, { isLoading }] = useCreatePromotionMutation();

  const handleSubmit = async (data: PromotionFormValues) => {
    const formData = new FormData();
    formData.append("code", data.code.toUpperCase());
    formData.append("title", data.title);
    formData.append("discountType", data.discountType);
    formData.append("discountValue", String(data.discountValue));
    if (data.description) formData.append("description", data.description);
    if (data.minOrderValue)
      formData.append("minOrderValue", String(data.minOrderValue));
    if (data.maxDiscount)
      formData.append("maxDiscount", String(data.maxDiscount));
    if (data.startDate) formData.append("startDate", data.startDate);
    if (data.endDate) formData.append("endDate", data.endDate);
    if (data.usageLimit) formData.append("usageLimit", String(data.usageLimit));
    if (data.maxUsagePerUser)
      formData.append("maxUsagePerUser", String(data.maxUsagePerUser));
    if (data.imageUrl) formData.append("imageUrl", data.imageUrl);

    try {
      await createPromotion(formData).unwrap();
      toast.success("Tạo ưu đãi thành công!");
      router.push("/dashboard/promotions");
    } catch (err: any) {
      const code = err?.data?.code;
      if (code === "PROMOTION_CODE_EXISTED") {
        toast.error("Mã ưu đãi đã tồn tại, vui lòng dùng mã khác");
      } else {
        toast.error(err?.data?.message ?? "Có lỗi xảy ra");
      }
    }
  };

  return (
    <div className="space-y-5">
      <Breadcrumb
        items={[
          { label: "Quản lý ưu đãi", href: "/dashboard/promotions" },
          { label: "Thêm ưu đãi mới" },
        ]}
      />
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Thêm ưu đãi mới</h1>
        <p className="mt-0.5 text-sm text-gray-400">
          Điền thông tin để tạo ưu đãi mới
        </p>
      </div>
      <PromotionForm
        mode="create"
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
        isSubmitting={isLoading}
      />
    </div>
  );
}
