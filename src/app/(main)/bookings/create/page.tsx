"use client";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { useGetRoomByIdQuery } from "@/features/room/api/roomApi";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import {
  BedDouble,
  Building2,
  CalendarDays,
  Plus,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import ServiceModal from "../components/ServiceModal";
import { SelectedService } from "../types/booking.type";
import { getIconComponent } from "@/lib/utils/icon";
import RoomSuggestionModal from "../components/RoomSuggestionModal";
import { SelectedRoom } from "@/features/room/types/room.type";

function BookingContent() {
  const params = useSearchParams();
  const roomId = params.get("roomId") ?? "";
  const checkIn = params.get("checkInDate") ?? "";
  const checkOut = params.get("checkOutDate") ?? "";
  const guests = Number(params.get("guests") ?? 1);

  const { data, isLoading } = useGetRoomByIdQuery(
    { id: roomId },
    { skip: !roomId },
  );
  const room = data?.data;

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [selectedServices, setSelectedServices] = useState<SelectedService[]>(
    [],
  );
  const [showServiceModal, setShowServiceModal] = useState(false);

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promotionId, setPromotionId] = useState<string | null>(null);

  const [selectedRooms, setSelectedRooms] = useState<SelectedRoom[]>([]);
  const [showRoomModal, setShowRoomModal] = useState(false);

  useEffect(() => {
    if (!room) return;
    setSelectedRooms((prev) => {
      if (prev.some((r) => r.roomId === room.id)) return prev;
      return [{
        roomId: room.id,
        roomName: room.roomName,
        thumbnailUrl: room.thumbnailUrl,
        basePrice: Number(room.basePrice),
        nights,
      }];
    });
  }, [room?.id]);

  const nights = Math.max(
    1,
    Math.round(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86_400_000,
    ),
  );

  const roomsTotal = selectedRooms.reduce((sum, r) => sum + r.basePrice * r.nights, 0);
  const servicesTotal = selectedServices.reduce((sum, s) => sum + s.basePrice, 0);
  const subtotal = roomsTotal + servicesTotal;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax - discount;

  if (isLoading)
    return <div className="py-24 text-center text-gray-400">Đang tải...</div>;
  if (!room)
    return (
      <div className="py-24 text-center text-gray-400">
        Không tìm thấy phòng.
      </div>
    );

  return (
    <div className="flex gap-8 items-start">
      {/* LEFT */}
      <div className="flex-1 min-w-0 space-y-6">
        {/* CustomerInfoSection */}
        <section className="rounded-2xl border border-gray-100 bg-white p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Users size={20} className="text-[#0D99FF]" />
            <h2 className="text-base font-bold text-gray-900">
              Thông tin khách hàng
            </h2>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nguyễn Văn A"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0D99FF]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Nhập số điện thoại"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0D99FF]"
              />
            </div>
          </div>
        </section>
        {/* SelectedRoomsSection */}
        <section className="rounded-2xl border border-gray-100 bg-white p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BedDouble size={20} className="text-[#0D99FF]" />
              <h2 className="text-base font-bold text-gray-900">
                Thông tin phòng đã chọn
              </h2>
            </div>
            <span className="text-xs text-gray-400">{selectedRooms.length} phòng</span>
          </div>

          {/* Unified room list */}
          <div className="space-y-3">
            {selectedRooms.map((r) => (
              <div key={r.roomId} className="relative flex gap-4 rounded-xl border border-gray-100 bg-gray-50 p-3">
                <div className="relative w-28 h-20 shrink-0 rounded-lg overflow-hidden bg-gray-200">
                  {r.thumbnailUrl && (
                    <Image src={r.thumbnailUrl} alt={r.roomName} fill className="object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-sm font-bold text-gray-900 truncate pr-6">{r.roomName}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Users size={11} />
                    <span>{guests} người lớn</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <CalendarDays size={11} />
                    <span>{checkIn} → {checkOut}</span>
                  </div>
                  <p className="text-xs font-semibold text-[#0D99FF]">
                    {r.nights} đêm · {formatCurrency(r.basePrice * r.nights)}
                  </p>
                </div>
                {/* Remove button */}
                <button
                  onClick={() => setSelectedRooms((prev) => prev.filter((x) => x.roomId !== r.roomId))}
                  className="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition-colors cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>
            ))}

            {selectedRooms.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">Chưa chọn phòng nào</p>
            )}
          </div>
        </section>

        {/* Button */}
        <button
          onClick={() => setShowRoomModal(true)}
          className="cursor-pointer w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-4 hover:border-[#0D99FF] hover:bg-blue-50 transition-colors"
        >
          <Plus size={18} className="text-gray-400" />
          <span className="text-sm text-gray-500">Thêm phòng khác vào đặt phòng</span>
        </button>

        {showRoomModal && (
          <RoomSuggestionModal
            checkInDate={checkIn}
            checkOutDate={checkOut}
            guests={guests}
            nights={nights}
            selected={selectedRooms}
            onConfirm={(rooms) => {
              setSelectedRooms(rooms);
              setShowRoomModal(false);
            }}
            onClose={() => setShowRoomModal(false)}
          />
        )}
        {/* SelectedServicesSection */}
        <section className="rounded-2xl border border-gray-100 bg-white p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-[#0D99FF]" />
            <h2 className="text-base font-bold text-gray-900">
              Dịch vụ đã chọn
            </h2>
          </div>
          {selectedServices.length > 0 && (
            <div className="space-y-2">
              {selectedServices.map((svc) => {
                const CategoryIcon = getIconComponent(svc.categoryIcon);
                return (
                  <div
                    key={svc.id}
                    className="flex items-center justify-between rounded-xl bg-gray-50 border border-gray-100 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {svc.name}
                      </p>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        {CategoryIcon && <CategoryIcon size={11} />}
                        {svc.categoryName} · {formatCurrency(svc.basePrice)} /{" "}
                        {svc.unit}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setSelectedServices((prev) =>
                          prev.filter((s) => s.id !== svc.id),
                        )
                      }
                      className="text-gray-300 hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <X size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
          <button
            onClick={() => setShowServiceModal(true)}
            className="w-full flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-5 hover:border-[#0D99FF] hover:bg-blue-50 transition-colors cursor-pointer"
          >
            <Plus size={20} className="text-gray-400" />
            <span className="text-sm text-gray-500">Thêm dịch vụ khác</span>
          </button>
        </section>
        {/* Service Modal */}
        {showServiceModal && (
          <ServiceModal
            selected={selectedServices}
            onSave={(services) => {
              setSelectedServices(services);
              setShowServiceModal(false);
            }}
            onClose={() => setShowServiceModal(false)}
          />
        )}
      </div>
      {/* RIGHT sticky */}
      <div className="w-80 shrink-0 sticky top-[108px] self-start">
        {/* PaymentSummary */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-4">
          <h3 className="text-base font-bold text-gray-900">
            Chi tiết thanh toán
          </h3>

          {/* Line items */}
          <div className="space-y-2.5 text-sm text-gray-600 border-t border-gray-100 pt-4">
            {selectedRooms.map((r) => (
              <div key={r.roomId} className="flex justify-between items-start gap-2">
                <span className="leading-snug">
                  {r.roomName}{" "}
                  <span className="text-gray-400">({r.nights} đêm)</span>
                </span>
                <span className="shrink-0 font-medium text-gray-800">
                  {formatCurrency(r.basePrice * r.nights)}
                </span>
              </div>
            ))}

            {/* Services */}
            {selectedServices.length > 0 && (
              <div className="flex justify-between items-center gap-2">
                <span>
                  Dịch vụ bổ sung{" "}
                  <span className="text-gray-400">({selectedServices.length})</span>
                </span>
                <span className="shrink-0 font-medium text-gray-800">
                  {formatCurrency(servicesTotal)}
                </span>
              </div>
            )}

            {/* Tax */}
            <div className="flex justify-between items-center gap-2">
              <span>Thuế (10%)</span>
              <span className="shrink-0 font-medium text-gray-800">
                {formatCurrency(tax)}
              </span>
            </div>

            {/* Discount */}
            {discount > 0 && (
              <div className="flex justify-between items-center gap-2 text-green-600">
                <span className="font-medium">Khuyến mãi</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-medium">- {formatCurrency(discount)}</span>
                  <button
                    onClick={() => { setDiscount(0); setPromoCode(""); setPromotionId(null); }}
                    className="p-0.5 rounded-full hover:bg-green-50 transition-colors cursor-pointer"
                  >
                    <X size={13} className="text-green-500" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Total */}
          <div className="border-t border-gray-100 pt-4">
            <div className="flex justify-between items-start gap-2">
              <span className="text-base font-bold text-gray-900">Tổng cộng</span>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#0D99FF] leading-tight">
                  {formatCurrency(total)}
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Đã bao gồm thuế giá trị gia tăng
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <p className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">
              Phương thức thanh toán
            </p>
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 cursor-pointer hover:border-[#0D99FF] transition-colors">
              <Building2 size={18} className="text-[#0D99FF] shrink-0" />
              <span className="flex-1 text-sm font-medium text-gray-800">
                Chuyển khoản ngân hàng
              </span>
              {/* Check icon */}
              <div className="w-5 h-5 rounded-full bg-[#0D99FF] flex items-center justify-center shrink-0">
                <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                  <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Confirm button */}
          <button className="cursor-pointer w-full rounded-xl bg-[#0D99FF] py-3.5 text-sm font-semibold text-white hover:bg-[#0B84E6] active:scale-[0.98] transition-all">
            Xác nhận thanh toán
          </button>

          {/* Disclaimer */}
          <p className="text-[11px] text-gray-400 text-center leading-relaxed">
            Bằng cách nhấn nút, bạn đồng ý với các{" "}
            <span className="text-[#0D99FF] underline cursor-pointer">Điều khoản và Điều kiện</span>{" "}
            của BullMan Hotel.
          </p>
        </div>

        {/* PromoCodeSection */}
        <div className="rounded-2xl border border-gray-100 bg-white p-4 space-y-3 mt-4">
          <h3 className="text-sm font-bold text-gray-900">
            Mã khuyến mãi / Voucher
          </h3>
          <div className="flex gap-2">
            <input
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Nhập mã khuyến mãi"
              className="flex-1 rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0D99FF]"
            />
            <button
              onClick={() => {}}
              className="rounded-lg border border-[#0D99FF] bg-white px-4 py-2 text-sm font-semibold text-[#0D99FF] hover:bg-[#0D99FF] hover:text-white transition-colors"
            >
              Áp dụng
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default function BookingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Xác nhận & thanh toán
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Vui lòng kiểm tra thông tin đặt phòng và các dịch vụ đi kèm (nếu có)
        </p>
        <Suspense fallback={<div>Đang tải...</div>}>
          <BookingContent />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
