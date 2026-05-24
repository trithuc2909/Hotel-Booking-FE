"use client";

import { useState } from "react";
import Breadcrumb from "@/components/shared/Breadcrumb";
import Pagination from "@/components/shared/Pagination";
import BookingTable from "@/features/booking/admin/booking-list/components/BookingTable";
import BookingFilterBar from "@/features/booking/admin/booking-list/components/BookingFilterBar";
import { useGetAdminBookingsQuery, useLazyGetAdminBookingsExportQuery } from "@/features/booking/api/bookingApi";
import { AdminBookingsFilter } from "@/features/booking/types/booking.type";
import { Button } from "@/components/ui/button";
import { Download, PlusCircle } from "lucide-react";
import BookingAnalytics from "@/features/booking/admin/booking-list/components/BookingAnalytics";
import Link from "next/link";
import { exportBookingsToExcel } from "@/features/booking/admin/export/exportExcel";
import { toast } from "sonner";
import { columns } from "@/features/booking/admin/booking-list/Columns";

export default function AdminBookingsPage() {
  const [filter, setFilter] = useState<AdminBookingsFilter>({
    pageNum: 1,
    pageSize: 5,
    search: "",
    status: undefined,
  });

  const { data, isLoading, isError } = useGetAdminBookingsQuery(filter, {
    refetchOnMountOrArgChange: true,
  });

  const [triggerExport, { isFetching: isExporting }] = useLazyGetAdminBookingsExportQuery();

  const bookings = data?.data?.data || [];
  const total = data?.data?.total || 0;
  const totalPages = Math.ceil(total / (filter.pageSize || 5));

  const handlePageChange = (page: number) => {
    setFilter((prev) => ({ ...prev, pageNum: page }));
  };

  const handlePageSizeChange = (size: number) => {
    setFilter((prev) => ({ ...prev, pageSize: size, pageNum: 1 }));
  };

  const handleExport = async () => {
    try {
      const res = await triggerExport(filter).unwrap();
      if (res?.data) {
        exportBookingsToExcel(res.data);
        toast.success("Xuất file Excel thành công");
      }
    } catch (error) {
      toast.error("Xuất file Excel thất bại. Vui lòng hử lại.");
    }
  };

  const breadcrumbItems = [
    { label: "Quản lý đặt phòng", href: "/dashboard/bookings" },
    { label: "Danh sách đặt phòng" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="mt-2 text-2xl font-extrabold text-gray-900">Quản lý đặt phòng</h1>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
        <BookingFilterBar
          filter={filter}
          onFilterChange={setFilter}
          onClearFilter={() =>
            setFilter({
              pageNum: 1,
              pageSize: 5,
              search: "",
              status: undefined,
              checkInDate: undefined,
              checkOutDate: undefined,
            })
          }
        />

        <div className="flex shrink-0 flex-wrap items-center gap-2.5">
          <Button
            variant="outline"
            className="flex h-9 cursor-pointer items-center gap-2 rounded-lg border-[#0D99FF] text-xs text-[#0D99FF] hover:bg-blue-50"
            onClick={handleExport}
            disabled={isExporting}
          >
            <Download size={14} />
            {isExporting ? "Đang tải dữ liệu..." : "Xuất excel"}
          </Button>

          <Button
            asChild
            className="flex h-9 cursor-pointer items-center gap-2 rounded-lg bg-[#0D99FF] text-xs text-white hover:bg-[#0B84E6]"
          >
            <Link href="/dashboard/bookings/create">
              <PlusCircle size={14} />
              Đặt Phòng Ngay
            </Link>
          </Button>
        </div>
      </div>

      {isLoading ? (
        <p className="py-16 text-center text-sm text-gray-400">Đang tải dữ liệu...</p>
      ) : isError ? (
        <p className="py-16 text-center text-sm text-red-400">Lỗi khi tải dữ liệu từ máy chủ</p>
      ) : (
        <div className="space-y-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <BookingTable bookings={bookings} columns={columns} />

          <Pagination
            page={filter.pageNum || 1}
            totalPages={totalPages || 1}
            onPageChange={handlePageChange}
            total={total}
            pageSize={filter.pageSize || 5}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      )}

      <BookingAnalytics />
    </div>
  );
}
