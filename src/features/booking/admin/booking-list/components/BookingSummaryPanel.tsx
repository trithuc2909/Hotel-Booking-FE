"use client";

import { useState } from "react";
import { User, Phone, Plus, X, CheckCircle2, Banknote, CreditCard, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { colors } from "@/constants/colors";
import { formatCurrency } from "@/lib/utils";
import { AvailableRoomResponse } from "@/features/room/types/room.type";
import { useCreateBookingMutation, useCreateVNPayPaymentMutation } from "@/features/booking/api/bookingApi";
import { useGetServicesQuery } from "@/features/service/api/serviceApi";
import { ServiceResponse } from "@/features/service/types/service.type";
import { TAX_RATE } from "@/constants/common";
import { usePaymentHandlers } from "../../../hooks/usePaymentHandlers";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type PaymentMethod = "CASH" | "BANK_TRANSFER";

type Props = {
  selectedRooms: AvailableRoomResponse[];
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  guests: number;
  onSuccess?: () => void;
};
export default function BookingSummaryPanel({
  selectedRooms,
  checkInDate,
  checkOutDate,
  nights,
  guests,
  onSuccess,
}: Props) {
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [editingGuest, setEditingGuest] = useState(true);

  const [selectedServices, setSelectedServices] = useState<(ServiceResponse & { quantity: number })[]>([]);
  const [showServicePicker, setShowServicePicker] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CASH");

  const { data: servicesData } = useGetServicesQuery();
  const services = servicesData?.data || [];

  const [createBooking, { isLoading: isCreating }] = useCreateBookingMutation();
  const roomSubtotal = selectedRooms.reduce((sum, r) => sum + r.basePrice * Math.max(nights, 1), 0);
  const [createVNPayPayment, { isLoading: isPaying }] = useCreateVNPayPaymentMutation();
  const isLoading = isCreating || isPaying;

  const serviceSubtotal = selectedServices.reduce((s, sv) => s + sv.basePrice * sv.quantity, 0);
  const tax = Math.round((roomSubtotal + serviceSubtotal) * TAX_RATE);
  const total = roomSubtotal + serviceSubtotal + tax;
  const removeService = (id: string) => setSelectedServices((prev) => prev.filter((s) => s.id !== id));
  const addService = (svc: ServiceResponse) => {
    setSelectedServices((prev) => {
      const existing = prev.find((s) => s.id === svc.id);
      if (existing) {
        return prev.map((s) => (s.id === svc.id ? { ...s, quantity: s.quantity + 1 } : s));
      }
      return [...prev, { ...svc, quantity: 1 }];
    });
    setShowServicePicker(false);
  };

  const updateQuantity = (id: string, delta: number) => {
    setSelectedServices((prev) =>
      prev
        .map((s) => (s.id === id ? { ...s, quantity: Math.max(0, s.quantity + delta) } : s))
        .filter((s) => s.quantity > 0),
    );
  };

  const { handleConfirmBooking, ConfirmModal } = usePaymentHandlers({
    guestName,
    guestPhone,
    total,
    onSuccess,
    checkInDate,
    checkOutDate,
    guests,
    selectedRooms,
    selectedServices,
    paymentMethod,
  });
  return (
    <div className="flex w-full flex-col gap-3">
      {/* Header */}
      <div
        className="flex items-center gap-3 rounded-xl p-4 text-white"
        style={{
          background: "linear-gradient(135deg, #0D99FF 0%, #0B30A7 100%)",
        }}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
          <CheckCircle2 size={20} className="text-white" />
        </div>
        <div>
          <p className="text-base leading-tight font-bold">Thông tin đặt phòng</p>
          <p className="mt-0.5 text-xs text-blue-200">Vui lòng điền đầy đủ thông tin khách hàng</p>
        </div>
      </div>

      <div className="space-y-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="mb-1 flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-700">Thông tin khách hàng</p>
          <button
            onClick={() => setEditingGuest((v) => !v)}
            className="flex cursor-pointer items-center gap-1 text-xs text-[#0D99FF] hover:underline"
          >
            <Pencil size={11} />
            {editingGuest ? "Xong" : "Sửa"}
          </button>
        </div>
        <div className="relative">
          <User size={14} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
          <Input
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            disabled={!editingGuest}
            placeholder="Tên khách hàng"
            className="h-9 border-gray-200 pl-8 text-sm disabled:bg-gray-50 disabled:text-gray-600"
          />
        </div>
        <div className="relative">
          <Phone size={14} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
          <Input
            value={guestPhone}
            onChange={(e) => setGuestPhone(e.target.value)}
            disabled={!editingGuest}
            placeholder="Số điện thoại"
            className="h-9 border-gray-200 pl-8 text-sm disabled:bg-gray-50 disabled:text-gray-600"
          />
        </div>
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div>
            <label className="text-[10px] font-semibold text-gray-400 uppercase">Ngày nhận phòng</label>
            <div className="mt-0.5 flex flex-col rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-700">
              <span className="font-medium">{checkInDate || "—"}</span>
              <span className="text-[10px] text-gray-400">Sau 14:00</span>{" "}
            </div>
          </div>
          <div>
            <label className="text-[10px] font-semibold text-gray-400 uppercase">Ngày trả phòng</label>
            <div className="mt-0.5 flex flex-col rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-700">
              <span className="font-medium">{checkOutDate || "—"}</span>
              <span className="text-[10px] text-gray-400">Trước 12:00</span>{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <p className="mb-2 text-sm font-semibold text-gray-700">Phòng đã chọn</p>
        {selectedRooms.length === 0 ? (
          <p className="text-xs text-gray-400 italic">Chưa chọn phòng nào</p>
        ) : (
          <div className="space-y-1.5">
            {selectedRooms.map((r, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="max-w-[150px] truncate text-xs text-gray-600">{r.roomName}</span>
                <span className="text-xs font-semibold text-gray-800">
                  {formatCurrency(r.basePrice * Math.max(nights, 1))}đ
                  <span className="font-normal text-gray-400"> ×{Math.max(nights, 1)}đ</span>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="space-y-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <p className="text-sm font-semibold text-gray-700">Dịch vụ đã chọn</p>
        <Popover open={showServicePicker} onOpenChange={setShowServicePicker}>
          <PopoverTrigger asChild>
            <button className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-dashed border-[#0D99FF] px-3 py-1.5 text-xs text-[#0D99FF] transition-colors hover:bg-blue-50">
              <Plus size={13} />
              Thêm dịch vụ
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[var(--radix-popover-trigger-width)] rounded-lg border border-gray-200 bg-white p-0 shadow-md"
            align="start"
          >
            <div className="max-h-40 overflow-y-auto">
              {services.length === 0 ? (
                <p className="p-3 text-center text-xs text-gray-400">Không có dịch vụ</p>
              ) : (
                services.map((svc) => (
                  <button
                    key={svc.id}
                    onClick={() => addService(svc)}
                    className="flex w-full cursor-pointer items-center justify-between px-3 py-2 text-xs transition-colors hover:bg-blue-50"
                  >
                    <span className="text-gray-700">{svc.name}</span>
                    <span className="font-semibold text-[#0D99FF]">{formatCurrency(svc.basePrice)}đ</span>
                  </button>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>
        {selectedServices.map((svc) => (
          <div key={svc.id} className="flex items-center justify-between text-xs">
            <span className="text-gray-600">{svc.name}</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(svc.id, -svc.quantity)}
                className="cursor-pointer text-gray-300 transition-colors hover:text-red-400"
              >
                <X size={13} />
              </button>
            </div>
          </div>
        ))}
        <div className="mt-1 flex items-center justify-between border-t border-dashed border-gray-100 pt-2 text-xs">
          <span className="text-gray-500">Thuế {TAX_RATE * 100}%</span>
          <span className="font-medium text-gray-700">{formatCurrency(tax)}đ</span>
        </div>
      </div>
      <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
        <div>
          <p className="text-xs font-bold tracking-wide text-gray-800 uppercase">Tổng cộng</p>
          <p className="mt-0.5 text-[10px] text-gray-400">Đã bao gồm thuế {TAX_RATE * 100}%</p>
        </div>
        <p className="text-xl font-extrabold text-[#0D99FF]">{formatCurrency(total)}đ</p>
      </div>
      <div className="space-y-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <p className="text-sm font-semibold text-gray-700">Phương thức thanh toán</p>
        <div className="grid grid-cols-2 gap-2">
          {(
            [
              { key: "CASH", label: "Tiền mặt", Icon: Banknote },
              { key: "BANK_TRANSFER", label: "Chuyển khoản", Icon: CreditCard },
            ] as const
          ).map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => setPaymentMethod(key)}
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border py-2 text-sm font-medium transition-all ${
                paymentMethod === key
                  ? "border-[#0D99FF] bg-blue-50 text-[#0D99FF]"
                  : "border-gray-200 text-gray-600 hover:border-gray-400"
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>
      </div>
      <Button
        onClick={handleConfirmBooking}
        disabled={selectedRooms.length === 0 || isLoading}
        className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white disabled:opacity-50"
        style={{ backgroundColor: colors.primary.blue }}
      >
        <CheckCircle2 size={16} />
        {isLoading ? "Đang xử lý..." : "Xác nhận đặt phòng"}
      </Button>
      <ConfirmModal />
    </div>
  );
}
