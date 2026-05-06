"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BookingHistoryCard from "@/features/user/components/BookingHistoryCard";
import {
  MOCK_BOOKING_HISTORY,
  BookingHistory,
  BookingHistoryStatus,
} from "@/features/user/mock/bookingHistoryMock";

// ── Filter tabs ────────────────────────────────────────────────
type TabKey = "all" | BookingHistoryStatus;
const TABS: { key: TabKey; label: string }[] = [
  { key: "all",       label: "Tất cả"        },
  { key: "paid",      label: "Đã thanh toán" },
  { key: "completed", label: "Đã hoàn thành" },
  { key: "cancelled", label: "Đã huỷ"        },
];

export default function BookingHistoryPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("all");

  // TODO (BE): Thay MOCK_BOOKING_HISTORY bằng useGetMyBookingsQuery({ status: activeTab })
  const filtered: BookingHistory[] = useMemo(() => {
    if (activeTab === "all") return MOCK_BOOKING_HISTORY;
    return MOCK_BOOKING_HISTORY.filter((b) => b.status === activeTab);
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8 space-y-6">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 flex items-center gap-1">
          <a href="/" className="hover:text-[#0D99FF] transition-colors">Trang chủ</a>
          <span>›</span>
          <span className="text-[#0D99FF] font-medium">Lịch sử đặt phòng</span>
        </nav>

        {/* Title */}
        <h1 className="text-2xl font-extrabold text-gray-900">
          Lịch sử đặt phòng của tôi
        </h1>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all border ${
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
          {filtered.length > 0 ? (
            filtered.map((booking) => (
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
