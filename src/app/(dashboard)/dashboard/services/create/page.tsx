"use client";

import Breadcrumb from "@/components/shared/Breadcrumb";
import ServiceForm from "@/features/service/components/ServiceForm";
import { useCreateServiceMutation } from "@/features/service/api/serviceApi";
import type { ServiceFormValues } from "@/features/service/schemas/service.schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CreateServicePage() {
  const router = useRouter();
  const [createService, { isLoading }] = useCreateServiceMutation();

  const handleSubmit = async (data: ServiceFormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("serviceCategoryId", data.serviceCategoryId);
    formData.append("basePrice", String(data.basePrice));
    formData.append("unit", data.unit);
    if (data.description) formData.append("description", data.description);
    if (data.imageUrl) formData.append("imageUrl", data.imageUrl);

    try {
      await createService(formData).unwrap();
      toast.success("Tạo dịch vụ thành công!");
      router.push("/dashboard/services");
    } catch (err: any) {
      const code = err?.data?.code;
      if (code === "SERVICE_NAME_EXISTED") {
        toast.error("Tên dịch vụ đã tồn tại, vui lòng đặt tên khác");
      } else {
        toast.error(err?.data?.message ?? "Có lỗi xảy ra");
      }
    }
  };

  return (
    <div className="space-y-5">
      <Breadcrumb
        items={[
          { label: "Quản lý dịch vụ", href: "/dashboard/services" },
          { label: "Thêm dịch vụ mới" },
        ]}
      />

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Thêm dịch vụ mới</h1>
        <p className="mt-0.5 text-sm text-gray-400">
          Điền thông tin để tạo dịch vụ mới
        </p>
      </div>

      <ServiceForm
        mode="create"
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
        isSubmitting={isLoading}
      />
    </div>
  );
}
