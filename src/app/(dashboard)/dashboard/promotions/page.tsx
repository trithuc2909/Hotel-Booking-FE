"use client";

import { useState } from "react";
import PromotionStatsSection from "@/features/dashboard/components/PromotionStatsSection";
import PromotionTable from "@/features/dashboard/components/PromotionTable";
import { MOCK_PROMOTIONS, Promotion } from "@/features/dashboard/mock/promotionsMock";

export default function PromotionsPage() {
  // TODO (BE): Xoá local state, dùng RTK Query + invalidate tags thay thế
  const [promotions, setPromotions] = useState<Promotion[]>(MOCK_PROMOTIONS);

  // Toggle active / inactive locally
  // TODO (BE): Gọi PATCH /admin/promotions/:id/toggle-status
  const handleStatusToggle = (id: string) => {
    setPromotions((prev) =>
      prev.map((p) =>
        p.id === id && p.status !== "expired"
          ? { ...p, status: p.status === "active" ? "inactive" : "active" }
          : p
      )
    );
  };

  // TODO (BE): Navigate sang /dashboard/promotions/new hoặc mở modal
  const handleAdd = () => {
    alert("TODO: Mở form thêm ưu đãi mới");
  };

  return (
    <div className="space-y-5">
      {/* ── Breadcrumb + Title ── */}
      <div>
        <p className="text-xs text-gray-400 mb-1">
          Quản trị &rsaquo;{" "}
          <span className="text-[#0D99FF]">Quản lý ưu đãi</span>
        </p>
        <h1 className="text-2xl font-extrabold text-gray-900">Quản lý ưu đãi</h1>
      </div>

      {/* ── Stats + nút thêm ── */}
      <PromotionStatsSection onAdd={handleAdd} />

      {/* ── Bảng ưu đãi ── */}
      <PromotionTable promotions={promotions} onStatusToggle={handleStatusToggle} />
    </div>
  );
}
