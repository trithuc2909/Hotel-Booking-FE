"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/shared/Breadcrumb";
import Pagination from "@/components/shared/Pagination";
import {
  useGetAdminPromotionsQuery,
  useUpdatePromotionStatusMutation,
  useDeletePromotionMutation,
} from "@/features/promotion/api/promotionApi";
import type { PromotionResponse } from "@/features/promotion/types/promotion.type";
import PromotionStatsSection from "@/features/promotion/components/PromotionStatsSection";
import PromotionFilterBar from "@/features/promotion/components/PromotionFilterBar";
import PromotionTable from "@/features/promotion/components/PromotionTable";
import PromotionDeleteModal from "@/features/promotion/modals/PromotionDeleteModal";
import { toast } from "sonner";
import { STATUS } from "@/constants/common";

type ModalType = "delete" | null;

export default function PromotionsPage() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [selectedPromotion, setSelectedPromotion] =
    useState<PromotionResponse | null>(null);
  const [modalType, setModalType] = useState<ModalType>(null);

  const { data, isLoading, isError } = useGetAdminPromotionsQuery({
    search: search || undefined,
    status: status || undefined,
    discountType: (discountType as any) || undefined,
    pageNum,
    pageSize,
  });

  const [updateStatus] = useUpdatePromotionStatusMutation();
  const [deletePromotion, { isLoading: isDeleting }] =
    useDeletePromotionMutation();

  const promotions = data?.data ?? [];
  const meta = data?.meta;

  const closeModal = () => {
    setModalType(null);
    setSelectedPromotion(null);
  };

  const handleToggleStatus = async (p: PromotionResponse) => {
    const newStatus =
      p.status === STATUS.ACTIVE ? STATUS.INACTIVE : STATUS.ACTIVE;
    try {
      await updateStatus({ id: p.id, status: newStatus }).unwrap();
      toast.success(
        newStatus === STATUS.ACTIVE ? "Đã kích hoạt ưu đãi" : "Đã ngưng ưu đãi",
      );
    } catch {
      toast.error("Cập nhật trạng thái thất bại");
    }
  };

  const handleDelete = async () => {
    if (!selectedPromotion) return;
    try {
      await deletePromotion(selectedPromotion.id).unwrap();
      toast.success("Xóa ưu đãi thành công");
      closeModal();
    } catch (err: any) {
      toast.error(err?.data?.message ?? "Xóa thất bại");
    }
  };

  return (
    <div className="space-y-5">
      <Breadcrumb
        items={[
          { label: "Quản lý ưu đãi", href: "/dashboard/promotions" },
          { label: "Danh sách ưu đãi" },
        ]}
      />
      <h1 className="text-2xl font-bold text-gray-900">Quản lý ưu đãi</h1>

      <PromotionStatsSection />

      <PromotionFilterBar
        search={search}
        status={status}
        discountType={discountType}
        onSearchChange={setSearch}
        onStatusChange={(v) => {
          setStatus(v);
          setPageNum(1);
        }}
        onDiscountTypeChange={(v) => {
          setDiscountType(v);
          setPageNum(1);
        }}
        onAdd={() => router.push("/dashboard/promotions/create")}
      />

      {isLoading ? (
        <p className="py-16 text-center text-sm text-gray-400">Đang tải...</p>
      ) : isError ? (
        <p className="py-16 text-center text-sm text-red-400">
          Lỗi khi tải dữ liệu
        </p>
      ) : (
        <>
          <PromotionTable
            data={promotions}
            onView={(p) => router.push(`/dashboard/promotions/${p.id}`)}
            onToggleStatus={handleToggleStatus}
            onDelete={(p) => {
              setSelectedPromotion(p);
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

      {modalType === "delete" && selectedPromotion && (
        <PromotionDeleteModal
          promotion={selectedPromotion}
          isDeleting={isDeleting}
          onConfirm={handleDelete}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
