"use client";

import { useState } from "react";
import { Download, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { colors } from "@/constants/colors";
import BookingFilterBar from "@/features/dashboard/components/BookingFilterBar";
import BookingTable from "@/features/dashboard/components/BookingTable";
import BookingBottomSection from "@/features/dashboard/components/BookingBottomSection";
import { MOCK_BOOKINGS } from "@/features/dashboard/mock/bookingsMock";

const PAGE_SIZE = 5;

export default function BookingsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // TODO (BE): Thay logic filter dưới đây bằng query params gửi lên API
  const filtered = MOCK_BOOKINGS.filter(
    (b) =>
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.guestName.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = () => {
    setPage(1); // reset về trang đầu khi tìm kiếm
  };

  return (
    <div className="space-y-5">
      {/* ── Page header ── */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <p className="text-xs text-gray-400 mb-1">
            Quản trị &rsaquo; Quản lý đặt phòng
          </p>
          <h1 className="text-2xl font-extrabold text-gray-900">
            Quản lý đặt phòng
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Giám sát các lượt lưu trú hiện tại và khách sắp đến.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* TODO (BE): Xuất excel gọi GET /admin/bookings/export */}
          <Button
            id="export-excel-btn"
            variant="outline"
            className="flex items-center gap-2 border-[#0D99FF] text-[#0D99FF] hover:bg-blue-50 rounded-lg"
          >
            <Download size={15} />
            Xuất excel
          </Button>

          <Button
            id="new-booking-btn"
            asChild
            className="flex items-center gap-2 text-white rounded-lg"
            style={{ backgroundColor: colors.primary.blue }}
          >
            <Link href="/dashboard/bookings/new">
              <PlusCircle size={15} />
              Đặt Phòng Mới
            </Link>
          </Button>
        </div>
      </div>

      {/* ── Filter bar ── */}
      <BookingFilterBar
        search={search}
        onSearchChange={setSearch}
        onSearch={handleSearch}
      />

      {/* ── Bookings table ── */}
      <BookingTable
        bookings={paginated}
        totalCount={filtered.length}
        page={page}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
      />

      {/* ── Bottom: Recent services + Room capacity ── */}
      <BookingBottomSection />
    </div>
  );
}
