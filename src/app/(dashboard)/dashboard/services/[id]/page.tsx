"use client";

import Breadcrumb from "@/components/shared/Breadcrumb";
import ServiceForm from "@/features/service/components/ServiceForm";
import {
  useGetAdminServiceByIdQuery,
  useUpdateServiceMutation,
} from "@/features/service/api/serviceApi";
import type { ServiceFormValues } from "@/features/service/schemas/service.schema";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";

export default function ServiceDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useGetAdminServiceByIdQuery(id);
  const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();

  const service = data?.data;

  const handleSubmit = async (values: ServiceFormValues) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("serviceCategoryId", values.serviceCategoryId);
    formData.append("basePrice", String(values.basePrice));
    formData.append("unit", values.unit);
    if (values.description) formData.append("description", values.description);
    if (values.imageUrl) formData.append("imageUrl", values.imageUrl);

    try {
      await updateService({ id, data: formData }).unwrap();
      toast.success("Cập nhật dịch vụ thành công!");
      router.push("/dashboard/services");
    } catch (err: any) {
      const code = err?.data?.code;
      if (code === "SERVICE_NAME_EXISTED") {
        toast.error("Tên dịch vụ đã tồn tại");
      } else {
        toast.error(err?.data?.message ?? "Có lỗi xảy ra");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-sm text-gray-400">Đang tải...</p>
      </div>
    );
  }

  if (isError || !service) {
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-sm text-red-400">Không tìm thấy dịch vụ</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <Breadcrumb
        items={[
          { label: "Quản lý dịch vụ", href: "/dashboard/services" },
          { label: "Chi tiết dịch vụ" },
          { label: service.name },
        ]}
      />

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Chi tiết dịch vụ</h1>
        <p className="mt-0.5 text-sm text-gray-400">
          Chỉnh sửa thông tin dịch vụ trực tiếp
        </p>
      </div>

      <ServiceForm
        mode="edit"
        defaultValues={{
          name: service.name,
          serviceCategoryId: service.category.id,
          basePrice: service.basePrice,
          unit: service.unit,
          description: service.description ?? "",
        }}
        currentImageUrl={service.imageUrl}
        onSubmit={handleSubmit}
        onCancel={() => router.push("/dashboard/services")}
        isSubmitting={isUpdating}
      />
    </div>
  );
}
