"use client";

import Breadcrumb from "@/components/shared/Breadcrumb";
import Pagination from "@/components/shared/Pagination";
import ServiceTable from "@/features/service/components/ServiceTable";
import ServiceFilterBar from "@/features/service/components/ServiceFilterBar";
import ServiceStatsSection from "@/features/service/components/ServiceStatsSection";
import { ServiceDeleteModal } from "@/features/service/modals/ServiceDeleteModal";
import {
  useGetAdminServicesQuery,
  useDeleteServiceMutation,
  useUpdateServiceStatusMutation,
} from "@/features/service/api/serviceApi";
import type { ServiceResponse } from "@/features/service/types/service.type";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ModalType = "delete" | null;

export default function AdminServicesPage() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [selectedService, setSelectedService] =
    useState<ServiceResponse | null>(null);
  const [modalType, setModalType] = useState<ModalType>(null);

  const { data, isLoading, isError } = useGetAdminServicesQuery({
    search: search || undefined,
    categoryId: categoryId || undefined,
    status: status || undefined,
    pageNum,
    pageSize,
  });

  const [deleteService, { isLoading: isDeleting }] = useDeleteServiceMutation();
  const [updateServiceStatus] = useUpdateServiceStatusMutation();

  const services = data?.data ?? [];
  const meta = data?.meta;

  const closeModal = () => {
    setModalType(null);
    setSelectedService(null);
  };

  const handleToggleStatus = async (service: ServiceResponse) => {
    const newStatus = service.status === "ACT" ? "INA" : "ACT";
    try {
      await updateServiceStatus({ id: service.id, status: newStatus }).unwrap();
      toast.success(
        newStatus === "ACT"
          ? "Đã kích hoạt dịch vụ"
          : "Đã ngưng hoạt động dịch vụ",
      );
    } catch (err: any) {
      toast.error(err?.data?.message ?? "Có lỗi xảy ra");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedService) return;
    try {
      await deleteService({ id: selectedService.id }).unwrap();
      toast.success("Xóa dịch vụ thành công");
      closeModal();
    } catch (err: any) {
      toast.error(err?.data?.message ?? "Có lỗi xảy ra");
    }
  };

  return (
    <div className="space-y-5">
      <Breadcrumb
        items={[
          { label: "Quản lý dịch vụ", href: "/dashboard/services" },
          { label: "Danh sách dịch vụ" },
        ]}
      />
      <h1 className="text-2xl font-bold text-gray-900">Quản lý dịch vụ</h1>

      <ServiceStatsSection />

      <ServiceFilterBar
        search={search}
        categoryId={categoryId}
        status={status}
        onSearchChange={setSearch}
        onCategoryChange={(v) => {
          setCategoryId(v);
          setPageNum(1);
        }}
        onStatusChange={(v) => {
          setStatus(v);
          setPageNum(1);
        }}
        onAdd={() => router.push("/dashboard/services/create")}
      />

      {isLoading ? (
        <p className="py-16 text-center text-sm text-gray-400">Đang tải...</p>
      ) : isError ? (
        <p className="py-16 text-center text-sm text-red-400">
          Lỗi khi tải dữ liệu
        </p>
      ) : (
        <>
          <ServiceTable
            data={services}
            onView={(s) => router.push(`/dashboard/services/${s.id}`)}
            onToggleStatus={handleToggleStatus}
            onDelete={(s) => {
              setSelectedService(s);
              setModalType("delete");
            }}
          />
          <Pagination
            page={pageNum}
            totalPages={meta?.totalPages || 1}
            onPageChange={setPageNum}
            total={meta?.total}
            pageSize={pageSize}
            onPageSizeChange={(s) => {
              setPageSize(s);
              setPageNum(1);
            }}
          />
        </>
      )}

      {selectedService && modalType === "delete" && (
        <ServiceDeleteModal
          service={selectedService}
          onClose={closeModal}
          onConfirm={handleDeleteConfirm}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
}
