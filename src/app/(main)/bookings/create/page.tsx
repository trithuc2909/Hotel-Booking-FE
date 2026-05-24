"use client";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { useGetRoomByIdQuery } from "@/features/room/api/roomApi";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { BedDouble, Building2, CalendarDays, Plus, Sparkles, Users, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { ServiceModal } from "@/features/service";
import { SelectedService } from "@/features/booking";
import { getIconComponent } from "@/lib/utils/icon";
import { RoomSuggestionModal } from "@/features/room";
import { SelectedRoom } from "@/features/room/types/room.type";
import { useGetMeQuery } from "@/features/user/api/userApi";
import { useCreateBookingMutation, useCreateVNPayPaymentMutation } from "@/features/booking/api/bookingApi";
import { toast } from "sonner";
import { useLazyValidatePromoCodeQuery } from "@/features/promotion/api/promotionApi";

function BookingContent() {
  const params = useSearchParams();
  const roomId = params.get("roomId") ?? "";
  const checkInDate = params.get("checkInDate") ?? "";
  const checkOutDate = params.get("checkOutDate") ?? "";
  const guests = Number(params.get("guests") ?? 1);

  const { data, isLoading } = useGetRoomByIdQuery({ id: roomId }, { skip: !roomId });
  const room = data?.data;

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [showServiceModal, setShowServiceModal] = useState(false);

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promotionId, setPromotionId] = useState<string | null>(null);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const [validatePromoCode] = useLazyValidatePromoCodeQuery();

  const [selectedRooms, setSelectedRooms] = useState<SelectedRoom[]>([]);
  const [showRoomModal, setShowRoomModal] = useState(false);

  useEffect(() => {
    if (!room) return;
    setSelectedRooms((prev) => {
      if (prev.some((r) => r.roomId === room.id)) return prev;
      return [
        {
          roomId: room.id,
          roomName: room.roomName,
          thumbnailUrl: room.thumbnailUrl,
          basePrice: Number(room.basePrice),
          nights,
        },
      ];
    });
  }, [room?.id]);

  const nights = Math.max(
    1,
    Math.round((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / 86_400_000),
  );

  const { data: meData } = useGetMeQuery();
  const profile = meData?.data;

  useEffect(() => {
    if (profile) {
      if (profile.fullName) setFullName(profile.fullName);
      if (profile.phone) setPhoneNumber(profile.phone);
    }
  }, [profile?.fullName, profile?.phone]);

  const roomsTotal = selectedRooms.reduce((sum, r) => sum + r.basePrice * r.nights, 0);
  const servicesTotal = selectedServices.reduce((sum, s) => sum + s.basePrice, 0);
  const subtotal = roomsTotal + servicesTotal;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax - discount;

  if (isLoading) return <div className="py-24 text-center text-gray-400">Đang tải...</div>;
  if (!room) return <div className="py-24 text-center text-gray-400">Không tìm thấy phòng.</div>;

  const router = useRouter();
  const [createBooking, { isLoading: isCreating }] = useCreateBookingMutation();
  const [createVNPayPayment, { isLoading: isPaying }] = useCreateVNPayPaymentMutation();

  const isSubmitting = isCreating || isPaying;

  const handleApplyPromo = async () => {
    const code = promoCode.trim().toUpperCase();
    if (!code) {
      toast.error("Vui lòng nhập mã khuyến mãi");
      return;
    }
    setIsApplyingPromo(true);
    try {
      const res = await validatePromoCode({
        code,
        orderValue: subtotal + tax,
      }).unwrap();
      const promo = res.data;
      setDiscount(promo.discountAmount);
      setPromotionId(promo.promotionId);
      setPromoCode(code);
      toast.success(`Áp dụng "${promo.title}" - giảm ${formatCurrency(promo.discountAmount)}`);
    } catch (err: any) {
      const msg = err?.data?.message ?? "Mã khuyến mãi không hợp lệ";
      toast.error(msg);
      setDiscount(0);
      setPromotionId(null);
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const handleConfirmPayment = async () => {
    if (selectedRooms.length === 0) {
      toast.error("Vui lòng chọn ít nhất 1 phòng");
      return;
    }

    if (!fullName.trim()) {
      toast.error("Vui lòng nhập họ và tên");
      return;
    }
    const vnPhoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;
    if (!vnPhoneRegex.test(phoneNumber.trim())) {
      toast.error("Số điện thoại không hợp lệ (phải là 10 số, bắt đầu bằng 03/05/07/08/09)");
      return;
    }

    let bookingId: string;

    try {
      const bookingRes = await createBooking({
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        numberOfGuests: guests,
        promotionId: promotionId ?? undefined,
        fullName: fullName.trim() || undefined,
        phone: phoneNumber.trim() || undefined,
        rooms: selectedRooms.map((r) => ({ roomId: r.roomId })),
        services: selectedServices.map((s) => ({
          serviceId: s.id,
          quantity: 1,
        })),
      }).unwrap();
      bookingId = bookingRes.data.bookingId;
    } catch (error: any) {
      const code = error?.data?.code;
      if (code === "ROOM_OCCUPIED" || code === "ROOM_RACE_CONDITION") {
        toast.error("Phòng này vừa được đặt trong khoảng thời gian bạn chọn. Vui lòng chọn ngày hoặc phòng khác.");
      } else {
        toast.error(error?.data?.message ?? "Không thể tạo booking. Vui lòng thử lại.");
      }
      return;
    }

    try {
      const paymentRes = await createVNPayPayment({ bookingId }).unwrap();
      window.location.href = paymentRes.data.payUrl;
    } catch (error: any) {
      toast.error("Không thể kết nối cổng thanh toán VNPay. Booking của bạn đã được lưu, vui lòng thử lại sau.");
    }
  };

  return (
    <div className="flex items-start gap-8">
      {/* LEFT */}
      <div className="min-w-0 flex-1 space-y-6">
        {/* CustomerInfoSection */}
        <section className="space-y-4 rounded-2xl border border-gray-100 bg-white p-6">
          <div className="flex items-center gap-2">
            <Users size={20} className="text-[#0D99FF]" />
            <h2 className="text-base font-bold text-gray-900">Thông tin khách hàng</h2>
          </div>
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
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
              <label className="mb-1 block text-sm font-medium text-gray-700">
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
        <section className="space-y-4 rounded-2xl border border-gray-100 bg-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BedDouble size={20} className="text-[#0D99FF]" />
              <h2 className="text-base font-bold text-gray-900">Thông tin phòng đã chọn</h2>
            </div>
            <span className="text-xs text-gray-400">{selectedRooms.length} phòng</span>
          </div>

          {/* Unified room list */}
          <div className="space-y-3">
            {selectedRooms.map((r) => (
              <div key={r.roomId} className="relative flex gap-4 rounded-xl border border-gray-100 bg-gray-50 p-3">
                <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-gray-200">
                  {r.thumbnailUrl && <Image src={r.thumbnailUrl} alt={r.roomName} fill className="object-cover" />}
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <p className="truncate pr-6 text-sm font-bold text-gray-900">{r.roomName}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Users size={11} />
                    <span>{guests} người lớn</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <CalendarDays size={11} />
                    <span>
                      {checkInDate} → {checkOutDate}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#0D99FF]">
                    {r.nights} đêm · {formatCurrency(r.basePrice * r.nights)}
                  </p>
                </div>
                {/* Remove button */}
                <button
                  onClick={() => setSelectedRooms((prev) => prev.filter((x) => x.roomId !== r.roomId))}
                  className="absolute top-3 right-3 cursor-pointer text-gray-300 transition-colors hover:text-red-500"
                >
                  <X size={15} />
                </button>
              </div>
            ))}

            {selectedRooms.length === 0 && (
              <p className="py-4 text-center text-sm text-gray-400">Chưa chọn phòng nào</p>
            )}
          </div>
        </section>

        {/* Button */}
        <button
          onClick={() => setShowRoomModal(true)}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-4 transition-colors hover:border-[#0D99FF] hover:bg-blue-50"
        >
          <Plus size={18} className="text-gray-400" />
          <span className="text-sm text-gray-500">Thêm phòng khác vào đặt phòng</span>
        </button>

        {showRoomModal && (
          <RoomSuggestionModal
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
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
        <section className="space-y-4 rounded-2xl border border-gray-100 bg-white p-6">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-[#0D99FF]" />
            <h2 className="text-base font-bold text-gray-900">Dịch vụ đã chọn</h2>
          </div>
          {selectedServices.length > 0 && (
            <div className="space-y-2">
              {selectedServices.map((svc) => {
                const CategoryIcon = getIconComponent(svc.categoryIcon);
                return (
                  <div
                    key={svc.id}
                    className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">{svc.name}</p>
                      <p className="flex items-center gap-1 text-xs text-gray-400">
                        {CategoryIcon && <CategoryIcon size={11} />}
                        {svc.categoryName} · {formatCurrency(svc.basePrice)} / {svc.unit}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedServices((prev) => prev.filter((s) => s.id !== svc.id))}
                      className="cursor-pointer text-gray-300 transition-colors hover:text-red-500"
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
            className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-5 transition-colors hover:border-[#0D99FF] hover:bg-blue-50"
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
      <div className="sticky top-[108px] w-80 shrink-0 self-start">
        {/* PaymentSummary */}
        <div className="space-y-4 rounded-2xl border border-gray-100 bg-white p-5">
          <h3 className="text-base font-bold text-gray-900">Chi tiết thanh toán</h3>

          {/* Line items */}
          <div className="space-y-2.5 border-t border-gray-100 pt-4 text-sm text-gray-600">
            {selectedRooms.map((r) => (
              <div key={r.roomId} className="flex items-start justify-between gap-2">
                <span className="leading-snug">
                  {r.roomName} <span className="text-gray-400">({r.nights} đêm)</span>
                </span>
                <span className="shrink-0 font-medium text-gray-800">{formatCurrency(r.basePrice * r.nights)}</span>
              </div>
            ))}

            {/* Services */}
            {selectedServices.length > 0 && (
              <div className="flex items-center justify-between gap-2">
                <span>
                  Dịch vụ bổ sung <span className="text-gray-400">({selectedServices.length})</span>
                </span>
                <span className="shrink-0 font-medium text-gray-800">{formatCurrency(servicesTotal)}</span>
              </div>
            )}

            {/* Tax */}
            <div className="flex items-center justify-between gap-2">
              <span>Thuế (10%)</span>
              <span className="shrink-0 font-medium text-gray-800">{formatCurrency(tax)}</span>
            </div>

            {/* Discount */}
            {discount > 0 && (
              <div className="flex items-center justify-between gap-2 text-green-600">
                <span className="font-medium">Khuyến mãi</span>
                <div className="flex shrink-0 items-center gap-1.5">
                  <span className="font-medium">- {formatCurrency(discount)}</span>
                  <button
                    onClick={() => {
                      setDiscount(0);
                      setPromoCode("");
                      setPromotionId(null);
                    }}
                    className="cursor-pointer rounded-full p-0.5 transition-colors hover:bg-green-50"
                  >
                    <X size={13} className="text-green-500" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Total */}
          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-start justify-between gap-2">
              <span className="text-base font-bold text-gray-900">Tổng cộng</span>
              <div className="text-right">
                <p className="text-2xl leading-tight font-bold text-[#0D99FF]">{formatCurrency(total)}</p>
                <p className="mt-0.5 text-[11px] text-gray-400">Đã bao gồm thuế giá trị gia tăng</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <p className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">Phương thức thanh toán</p>
            <div className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 transition-colors hover:border-[#0D99FF]">
              <Building2 size={18} className="shrink-0 text-[#0D99FF]" />
              <span className="flex-1 text-sm font-medium text-gray-800">Chuyển khoản ngân hàng</span>
              {/* Check icon */}
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0D99FF]">
                <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                  <path
                    d="M1 4L4 7L10 1"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Confirm button */}
          <button
            onClick={handleConfirmPayment}
            disabled={isSubmitting}
            className="w-full cursor-pointer rounded-xl bg-[#0D99FF] py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#0B84E6] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Đang xử lý..." : "Xác nhận thanh toán"}
          </button>

          {/* Disclaimer */}
          <p className="text-center text-[11px] leading-relaxed text-gray-400">
            Bằng cách nhấn nút, bạn đồng ý với các{" "}
            <span className="cursor-pointer text-[#0D99FF] underline">Điều khoản và Điều kiện</span> của BullMan Hotel.
          </p>
        </div>

        {/* PromoCodeSection */}
        <div className="mt-4 space-y-3 rounded-2xl border border-gray-100 bg-white p-4">
          <h3 className="text-sm font-bold text-gray-900">Mã khuyến mãi / Voucher</h3>
          <div className="flex gap-2">
            <input
              value={promoCode}
              onChange={(e) => {
                setPromoCode(e.target.value.toUpperCase());
                if (promotionId) {
                  setDiscount(0);
                  setPromotionId(null);
                }
              }}
              onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
              placeholder="Nhập mã khuyến mãi"
              className="flex-1 rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0D99FF]"
            />
            <button
              onClick={handleApplyPromo}
              disabled={isApplyingPromo || !!promotionId}
              className="cursor-pointer rounded-lg border border-[#0D99FF] bg-white px-4 py-2 text-sm font-semibold text-[#0D99FF] transition-colors hover:bg-[#0D99FF] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isApplyingPromo ? "..." : promotionId ? "Đã dùng" : "Áp dụng"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-1 text-2xl font-bold text-gray-900">Xác nhận & thanh toán</h1>
        <p className="mb-6 text-sm text-gray-500">
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
