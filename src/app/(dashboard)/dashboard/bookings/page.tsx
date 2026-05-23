"use client";

import { useState } from "react";
import Breadcrumb from "@/components/shared/Breadcrumb";
import Pagination from "@/components/shared/Pagination";
import { columns } from "@/features/booking/admin/components/Columns";
import BookingTable from "@/features/booking/admin/components/BookingTable";
import BookingFilterBar from "@/features/booking/admin/components/BookingFilterBar";
import {
  useGetAdminBookingsQuery,
  useLazyGetAdminBookingsExportQuery,
} from "@/features/booking/api/bookingApi";
import { AdminBookingsFilter } from "@/features/booking/types/booking.type";
import { Button } from "@/components/ui/button";
import { Download, PlusCircle } from "lucide-react";
import BookingAnalytics from "@/features/booking/admin/components/BookingAnalytics";
import Link from "next/link";
import { exportBookingsToExcel } from "@/features/booking/admin/export/exportExcel";
import { toast } from "sonner";

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

  const [triggerExport, { isFetching: isExporting }] =
    useLazyGetAdminBookingsExportQuery();

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
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="text-2xl font-extrabold text-gray-900 mt-2">
            Quản lý đặt phòng
          </h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
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

        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          <Button
            variant="outline"
            className="flex items-center gap-2 border-[#0D99FF] text-[#0D99FF] hover:bg-blue-50 rounded-lg cursor-pointer h-9 text-xs"
            onClick={handleExport}
            disabled={isExporting}
          >
            <Download size={14} />
            {isExporting ? "Đang tải dữ liệu..." : "Xuất excel"}
          </Button>

          <Button
            asChild
            className="flex items-center gap-2 text-white rounded-lg bg-[#0D99FF] hover:bg-[#0B84E6] cursor-pointer h-9 text-xs"
          >
            <Link href="/dashboard/bookings/create">
              <PlusCircle size={14} />
              Đặt Phòng Ngay
            </Link>
          </Button>
        </div>
      </div>

      {isLoading ? (
        <p className="py-16 text-center text-sm text-gray-400">
          Đang tải dữ liệu...
        </p>
      ) : isError ? (
        <p className="py-16 text-center text-sm text-red-400">
          Lỗi khi tải dữ liệu từ máy chủ
        </p>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
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
