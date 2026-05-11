"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { Card, CardContent } from "@/components/ui/card";

import { useBookingDetail } from "../hooks/useBookingDetail";
import BookingHeader from "../components/BookingHeader";
import StayInfoCard from "../components/StayInfoCard";
import CustomerCard from "../components/CustomerCard";
import BookingRoomsTable from "../components/BookingRoomsTable";
import PaymentSummaryCard from "../components/PaymentSummaryCard";
import { ServicesCard, NotesCard } from "../components/ServicesCard";
import SupportCard from "../components/SupportCard";
import CancelBookingDialog from "../components/CancelBookingDialog";

interface Props {
  id: string;
}

export default function BookingDetailView({ id }: Props) {
  const { booking, isLoading, isError, canCancel, roomTotal } =
    useBookingDetail(id);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <p className="animate-pulse text-sm text-gray-400">Đang tải...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (isError || !booking) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <Navbar />
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <p className="text-gray-500">Không tìm thấy đơn đặt phòng.</p>
          <Link
            href="/booking-history"
            className="text-sm text-[#0D99FF] hover:underline"
          >
            ← Quay lại lịch sử
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />

      <div className="sticky top-16 z-10 border-b border-gray-100 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Lịch sử đặt phòng", href: "/booking-history" },
              { label: `Đơn đặt phòng ${booking.bookingCode}` },
            ]}
          />
        </div>
      </div>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <BookingHeader
          bookingCode={booking.bookingCode}
          createdOn={booking.createdOn}
          status={booking.status}
        />

        <div className="flex flex-col items-start gap-6 lg:flex-row">
          {/* Left column */}
          <div className="flex-1 space-y-5">
            <StayInfoCard
              checkInDate={booking.checkInDate}
              checkOutDate={booking.checkOutDate}
              totalNights={booking.totalNights}
              numberOfGuests={booking.numberOfGuests}
              rooms={booking.rooms}
            />

            {booking.customer && <CustomerCard customer={booking.customer} />}

            <BookingRoomsTable
              rooms={booking.rooms}
              totalAmount={booking.totalAmount}
            />

            {/* Cancellation policy */}
            <Card className="border-emerald-100 bg-emerald-50/50">
              <CardContent className="pt-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    size={18}
                    className="mt-0.5 shrink-0 text-emerald-600"
                  />
                  <div>
                    <p className="text-sm font-semibold text-emerald-800">
                      Chính sách hủy phòng
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-emerald-700">
                      Miễn phí hủy phòng trước 48 giờ trước ngày nhận phòng.
                      Sau thời gian này, phí hủy sẽ là 100% tổng tiền phòng.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column */}
          <div className="w-full shrink-0 space-y-5 lg:sticky lg:top-32 lg:w-80">
            <PaymentSummaryCard
              roomTotal={roomTotal}
              totalService={booking.totalService}
              taxAmount={booking.taxAmount}
              discount={booking.discount}
              totalAmount={booking.totalAmount}
              statusCode={booking.status.code}
              payments={booking.payments ?? []}
            />

            <ServicesCard services={booking.services} />

            <NotesCard notes={booking.notes} />

            <SupportCard />

            <CancelBookingDialog
              bookingId={id}
              bookingCode={booking.bookingCode}
              canCancel={canCancel}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
