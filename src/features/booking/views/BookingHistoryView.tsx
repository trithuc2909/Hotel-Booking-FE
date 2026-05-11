"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/shared/Breadcrumb";
import BookingHistoryCard from "@/features/user/components/BookingHistoryCard";
import { useGetBookingHistoryQuery } from "../api/bookingApi";
import { BOOKING_HISTORY_TABS } from "../constants/booking.constants";

export default function BookingHistoryView() {
  const [activeTab, setActiveTab] = useState("ALL");
  const { data, isLoading, isError } = useGetBookingHistoryQuery({
    status: activeTab === "ALL" ? undefined : activeTab,
  });

  const bookingList = data?.data ?? [];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="sticky top-16 z-10 bg-white border-b border-gray-100 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Lịch sử đặt phòng" }]} />
        </div>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 space-y-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-extrabold text-gray-900">
          Lịch sử đặt phòng của tôi
        </h1>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          {BOOKING_HISTORY_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all border cursor-pointer ${
                activeTab === tab.key
                  ? "bg-[#0D99FF] text-white border-[#0D99FF]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#0D99FF] hover:text-[#0D99FF]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-5">
          {isLoading ? (
            <div className="py-16 text-center text-gray-400 text-sm bg-white rounded-2xl border border-gray-100">
              Đang tải...
            </div>
          ) : isError ? (
            <div className="py-16 text-center text-red-400 text-sm bg-white rounded-2xl border border-gray-100">
              Có lỗi xảy ra, vui lòng thử lại.
            </div>
          ) : bookingList.length > 0 ? (
            bookingList.map((booking) => (
              <BookingHistoryCard key={booking.id} booking={booking} />
            ))
          ) : (
            <div className="py-16 text-center text-gray-400 text-sm bg-white rounded-2xl border border-gray-100">
              Không có đơn đặt phòng nào.
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
