"use client";

import { useState } from "react";
import {
  User,
  Phone,
  Plus,
  X,
  CheckCircle2,
  Banknote,
  CreditCard,
  Pencil,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { colors } from "@/constants/colors";
import { formatCurrency } from "@/lib/utils";
import { AvailableRoomResponse } from "@/features/room/types/room.type";
import {
  useCreateBookingMutation,
  useCreateVNPayPaymentMutation,
} from "@/features/booking/api/bookingApi";
import { useGetServicesQuery } from "@/features/service/api/serviceApi";
import { ServiceResponse } from "@/features/service/types/service.type";
import { TAX_RATE } from "@/constants/common";
import { usePaymentHandlers } from "../../hooks/usePaymentHandlers";
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

  const [selectedServices, setSelectedServices] = useState<
    (ServiceResponse & { quantity: number })[]
  >([]);
  const [showServicePicker, setShowServicePicker] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CASH");

  const { data: servicesData } = useGetServicesQuery();
  const services = servicesData?.data || [];

  const [createBooking, { isLoading: isCreating }] = useCreateBookingMutation();
  const roomSubtotal = selectedRooms.reduce(
    (sum, r) => sum + r.basePrice * Math.max(nights, 1),
    0,
  );
  const [createVNPayPayment, { isLoading: isPaying }] =
    useCreateVNPayPaymentMutation();
  const isLoading = isCreating || isPaying;

  const serviceSubtotal = selectedServices.reduce(
    (s, sv) => s + sv.basePrice * sv.quantity,
    0,
  );
  const tax = Math.round((roomSubtotal + serviceSubtotal) * TAX_RATE);
  const total = roomSubtotal + serviceSubtotal + tax;
  const removeService = (id: string) =>
    setSelectedServices((prev) => prev.filter((s) => s.id !== id));
  const addService = (svc: ServiceResponse) => {
    setSelectedServices((prev) => {
      const existing = prev.find((s) => s.id === svc.id);
      if (existing) {
        return prev.map((s) =>
          s.id === svc.id ? { ...s, quantity: s.quantity + 1 } : s,
        );
      }
      return [...prev, { ...svc, quantity: 1 }];
    });
    setShowServicePicker(false);
  };

  const updateQuantity = (id: string, delta: number) => {
    setSelectedServices((prev) =>
      prev
        .map((s) =>
          s.id === id ? { ...s, quantity: Math.max(0, s.quantity + delta) } : s,
        )
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
    <div className="flex flex-col gap-3 w-full">
      {/* Header */}
      <div
        className="rounded-xl p-4 text-white flex items-center gap-3"
        style={{
          background: "linear-gradient(135deg, #0D99FF 0%, #0B30A7 100%)",
        }}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
          <CheckCircle2 size={20} className="text-white" />
        </div>
        <div>
          <p className="font-bold text-base leading-tight">
            Thông tin đặt phòng
          </p>
          <p className="text-xs text-blue-200 mt-0.5">
            Vui lòng điền đầy đủ thông tin khách hàng
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-2">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-semibold text-gray-700">
            Thông tin khách hàng
          </p>
          <button
            onClick={() => setEditingGuest((v) => !v)}
            className="flex items-center gap-1 text-xs text-[#0D99FF] hover:underline cursor-pointer"
          >
            <Pencil size={11} />
            {editingGuest ? "Xong" : "Sửa"}
          </button>
        </div>
        <div className="relative">
          <User
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <Input
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            disabled={!editingGuest}
            placeholder="Tên khách hàng"
            className="pl-8 h-9 text-sm border-gray-200 disabled:bg-gray-50 disabled:text-gray-600"
          />
        </div>
        <div className="relative">
          <Phone
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <Input
            value={guestPhone}
            onChange={(e) => setGuestPhone(e.target.value)}
            disabled={!editingGuest}
            placeholder="Số điện thoại"
            className="pl-8 h-9 text-sm border-gray-200 disabled:bg-gray-50 disabled:text-gray-600"
          />
        </div>
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div>
            <label className="text-[10px] text-gray-400 font-semibold uppercase">
              Ngày nhận phòng
            </label>
            <div className="mt-0.5 flex flex-col rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-700 bg-gray-50">
              <span className="font-medium">{checkInDate || "—"}</span>
              <span className="text-[10px] text-gray-400">Sau 14:00</span>{" "}
            </div>
          </div>
          <div>
            <label className="text-[10px] text-gray-400 font-semibold uppercase">
              Ngày trả phòng
            </label>
            <div className="mt-0.5 flex flex-col rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-700 bg-gray-50">
              <span className="font-medium">{checkOutDate || "—"}</span>
              <span className="text-[10px] text-gray-400">
                Trước 12:00
              </span>{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <p className="text-sm font-semibold text-gray-700 mb-2">
          Phòng đã chọn
        </p>
        {selectedRooms.length === 0 ? (
          <p className="text-xs text-gray-400 italic">Chưa chọn phòng nào</p>
        ) : (
          <div className="space-y-1.5">
            {selectedRooms.map((r, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-gray-600 text-xs truncate max-w-[150px]">
                  {r.roomName}
                </span>
                <span className="text-gray-800 font-semibold text-xs">
                  {formatCurrency(r.basePrice * Math.max(nights, 1))}đ
                  <span className="text-gray-400 font-normal">
                    {" "}
                    ×{Math.max(nights, 1)}đ
                  </span>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-2">
        <p className="text-sm font-semibold text-gray-700">Dịch vụ đã chọn</p>
        <Popover open={showServicePicker} onOpenChange={setShowServicePicker}>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-1.5 text-xs text-[#0D99FF] border border-dashed border-[#0D99FF] rounded-lg px-3 py-1.5 w-full justify-center hover:bg-blue-50 transition-colors cursor-pointer">
              <Plus size={13} />
              Thêm dịch vụ
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[var(--radix-popover-trigger-width)] p-0 bg-white border border-gray-200 rounded-lg shadow-md"
            align="start"
          >
            <div className="max-h-40 overflow-y-auto">
              {services.length === 0 ? (
                <p className="text-xs text-gray-400 p-3 text-center">
                  Không có dịch vụ
                </p>
              ) : (
                services.map((svc) => (
                  <button
                    key={svc.id}
                    onClick={() => addService(svc)}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    <span className="text-gray-700">{svc.name}</span>
                    <span className="text-[#0D99FF] font-semibold">
                      {formatCurrency(svc.basePrice)}đ
                    </span>
                  </button>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>
        {selectedServices.map((svc) => (
          <div
            key={svc.id}
            className="flex items-center justify-between text-xs"
          >
            <span className="text-gray-600">{svc.name}</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(svc.id, -svc.quantity)}
                className="text-gray-300 hover:text-red-400 transition-colors cursor-pointer"
              >
                <X size={13} />
              </button>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between text-xs border-t border-dashed border-gray-100 pt-2 mt-1">
          <span className="text-gray-500">Thuế {TAX_RATE * 100}%</span>
          <span className="text-gray-700 font-medium">
            {formatCurrency(tax)}đ
          </span>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-gray-800 uppercase tracking-wide">
            Tổng cộng
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5">
            Đã bao gồm thuế {TAX_RATE * 100}%
          </p>
        </div>
        <p className="text-xl font-extrabold text-[#0D99FF]">
          {formatCurrency(total)}đ
        </p>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-2">
        <p className="text-sm font-semibold text-gray-700">
          Phương thức thanh toán
        </p>
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
              className={`flex items-center justify-center gap-2 py-2 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
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
        className="w-full flex items-center justify-center gap-2 text-white h-11 text-sm font-semibold rounded-xl disabled:opacity-50 cursor-pointer"
        style={{ backgroundColor: colors.primary.blue }}
      >
        <CheckCircle2 size={16} />
        {isLoading ? "Đang xử lý..." : "Xác nhận đặt phòng"}
      </Button>
      <ConfirmModal />
    </div>
  );
}
