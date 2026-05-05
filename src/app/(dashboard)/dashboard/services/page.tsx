"use client";

import { useState, useMemo } from "react";
import ServiceStatsSection from "@/features/dashboard/components/ServiceStatsSection";
import ServiceFilterBar from "@/features/dashboard/components/ServiceFilterBar";
import ServiceTable from "@/features/dashboard/components/ServiceTable";
import {
  MOCK_SERVICES,
  Service,
  ServiceCategory,
} from "@/features/dashboard/mock/servicesMock";

export default function ServicesPage() {
  const [search, setSearch]       = useState("");
  const [category, setCategory]   = useState("all");
  // Local state để toggle trạng thái mà không cần reload
  // TODO (BE): Xoá services state, dùng RTK Query invalidate tags thay thế
  const [services, setServices]   = useState<Service[]>(MOCK_SERVICES);

  // ── Filter client-side (TODO (BE): chuyển thành query params) ──
  const filtered = useMemo(() => {
    return services.filter((svc) => {
      const matchSearch   = svc.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "all" || svc.category === (category as ServiceCategory);
      return matchSearch && matchCategory;
    });
  }, [services, search, category]);

  // Toggle active/inactive locally
  // TODO (BE): Gọi PATCH /admin/services/:id/toggle-status
  const handleStatusToggle = (id: string) => {
    setServices((prev) =>
      prev.map((svc) =>
        svc.id === id
          ? { ...svc, status: svc.status === "active" ? "inactive" : "active" }
          : svc
      )
    );
  };

  // TODO (BE): Mở modal / navigate sang trang tạo dịch vụ mới
  const handleAdd = () => {
    alert("TODO: Mở form thêm dịch vụ mới");
  };

  return (
    <div className="space-y-5">
      {/* ── Breadcrumb + Title ── */}
      <div>
        <p className="text-xs text-gray-400 mb-1">
          Quản trị &rsaquo;{" "}
          <span className="text-[#0D99FF]">Quản lý dịch vụ</span>
        </p>
        <h1 className="text-2xl font-extrabold text-gray-900">Quản lý dịch vụ</h1>
      </div>

      {/* ── Stat cards ── */}
      <ServiceStatsSection />

      {/* ── Filter bar + nút thêm ── */}
      <ServiceFilterBar
        search={search}
        category={category}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onSearch={() => {}} // client-side filter, không cần trigger thêm
        onAdd={handleAdd}
      />

      {/* ── Bảng dịch vụ ── */}
      <ServiceTable services={filtered} onStatusToggle={handleStatusToggle} />
    </div>
  );
}
