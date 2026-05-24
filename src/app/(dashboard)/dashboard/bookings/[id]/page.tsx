"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useGetBookingByIdQuery, useCancelBookingMutation } from "@/features/booking/api/bookingApi";

import Breadcrumb from "@/components/shared/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Printer, X, RefreshCw, Copy } from "lucide-react";
import { STATUS_CONFIG, DEFAULT_CONFIG } from "@/constants/colors";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";

import UpdateStatusModal from "@/features/booking/admin/modals/UpdateStatusModal";
import CustomerInfoCard from "@/features/booking/admin/booking-detail/components/CustomerInfoCard";
import BookingInfoCard from "@/features/booking/admin/booking-detail/components/BookingInfoCard";
import RoomListCard from "@/features/booking/admin/booking-detail/components/RoomListCard";
import ServiceListCard from "@/features/booking/admin/booking-detail/components/ServiceListCard";
import PaymentSummaryCard from "@/features/booking/admin/booking-detail/components/PaymentSummaryCard";
import PaymentHistoryCard from "@/features/booking/admin/booking-detail/components/PaymentHistoryCard";

const CANCELLABLE_STATUSES = ["PPY", "CFM"];

export default function AdminBookingDetailPage() {
  const params = useParams();
  const bookingId = params.id as string;

  const { data, isLoading, isError, refetch } = useGetBookingByIdQuery(bookingId);
  const [cancelBooking, { isLoading: isCancelling }] = useCancelBookingMutation();
  const [showStatusModal, setShowStatusModal] = useState(false);

  const booking = data?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-sm text-gray-400">Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (isError || !booking) {
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-sm text-red-400">Không tìm thấy đơn đặt phòng</p>
      </div>
    );
  }

  const statusConfig = STATUS_CONFIG[booking.status.code] ?? DEFAULT_CONFIG;
  const StatusIcon = statusConfig.Icon;
  const canCancel = CANCELLABLE_STATUSES.includes(booking.status.code);

  const breadcrumbItems = [
    { label: "Quản lý đặt phòng", href: "/dashboard/bookings" },
    { label: `Chi tiết: ${booking.bookingCode}` },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(booking.bookingCode);
      toast.success("Đã copy mã booking");
    } catch {
      toast.error("Không thể copy mã booking");
    }
  };

  const handleCancel = async () => {
    if (!window.confirm("Bạn chắc chắn muốn hủy đơn đặt phòng này?")) return;
    try {
      await cancelBooking(booking.id).unwrap();
      toast.success("Đã hủy đơn đặt phòng");
      refetch();
    } catch {
      toast.error("Không thể hủy đơn đặt phòng");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Breadcrumb items={breadcrumbItems} />
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-extrabold text-gray-900">Chi tiết đặt phòng</h1>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${statusConfig.bg} ${statusConfig.text}`}
            >
              <StatusIcon size={12} />
              {booking.status.displayAs}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-sm font-semibold text-[#0D99FF]">Mã booking: {booking.bookingCode}</span>
            <button
              onClick={handleCopy}
              title="Copy mã booking"
              className="cursor-pointer text-gray-400 transition-colors hover:text-[#0D99FF]"
            >
              <Copy size={13} />
            </button>
          </div>
          {booking.createdOn && (
            <p className="mt-0.5 text-xs text-gray-400">
              Ngày đặt: {formatDate(booking.createdOn, "dd/MM/yyyy • HH:mm")}
            </p>
          )}
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => window.print()}
            className="cursor-pointer gap-1.5 border-gray-200 text-xs text-gray-600 hover:bg-gray-50"
          >
            <Printer size={13} />
            In hóa đơn
          </Button>

          <Button
            size="sm"
            onClick={() => setShowStatusModal(true)}
            className="cursor-pointer gap-1.5 bg-[#0D99FF] text-xs text-white hover:bg-[#0B84E6]"
          >
            <RefreshCw size={13} />
            Cập nhật trạng thái
          </Button>

          {canCancel && (
            <Button
              size="sm"
              variant="outline"
              disabled={isCancelling}
              onClick={handleCancel}
              className="cursor-pointer gap-1.5 border-red-200 text-xs text-red-500 hover:bg-red-50"
            >
              <X size={13} />
              {isCancelling ? "Đang hủy..." : "Hủy đặt phòng"}
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <CustomerInfoCard customer={booking.customer} />
          <BookingInfoCard
            checkInDate={booking.checkInDate}
            checkOutDate={booking.checkOutDate}
            totalNights={booking.totalNights}
            numberOfGuests={booking.numberOfGuests}
            notes={booking.notes}
          />
          <RoomListCard rooms={booking.rooms} />
          <ServiceListCard services={booking.services} totalService={booking.totalService} />
        </div>

        <div className="space-y-4">
          <PaymentSummaryCard
            rooms={booking.rooms}
            totalNights={booking.totalNights}
            totalService={booking.totalService}
            taxAmount={booking.taxAmount}
            discount={booking.discount}
            totalAmount={booking.totalAmount}
            payments={booking.payments}
          />
          <PaymentHistoryCard payments={booking.payments} />
        </div>
      </div>

      <UpdateStatusModal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        bookingId={booking.id}
        bookingCode={booking.bookingCode}
        currentStatus={booking.status.code}
        onSuccess={() => refetch()}
      />
    </div>
  );
}
