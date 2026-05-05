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
import {
  Room,
  SelectedService,
  MOCK_SERVICES,
  TAX_RATE,
} from "@/features/dashboard/mock/newBookingMock";
import { colors } from "@/constants/colors";

type PaymentMethod = "cash" | "transfer";

type Props = {
  selectedRooms: Room[];
  checkIn: string;
  checkOut: string;
  nights: number;
};

export default function BookingSummaryPanel({
  selectedRooms,
  checkIn,
  checkOut,
  nights,
}: Props) {
  const [guestName, setGuestName] = useState("Nguyễn Văn A");
  const [guestPhone, setGuestPhone] = useState("080 123 4567");
  const [editingGuest, setEditingGuest] = useState(false);
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([
    MOCK_SERVICES[0],
    MOCK_SERVICES[1],
  ]);
  const [showServicePicker, setShowServicePicker] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");

  // ── Tính tiền ──────────────────────────────────────────────
  const roomSubtotal = selectedRooms.reduce(
    (sum, r) => sum + r.pricePerNight * Math.max(nights, 1),
    0
  );
  const serviceSubtotal = selectedServices.reduce((s, sv) => s + sv.price, 0);
  const tax = Math.round((roomSubtotal + serviceSubtotal) * TAX_RATE);
  const total = roomSubtotal + serviceSubtotal + tax;

  const removeService = (id: string) =>
    setSelectedServices((prev) => prev.filter((s) => s.id !== id));

  const addService = (svc: SelectedService) => {
    if (!selectedServices.find((s) => s.id === svc.id)) {
      setSelectedServices((prev) => [...prev, svc]);
    }
    setShowServicePicker(false);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* ── Blue header card ── */}
      <div
        className="rounded-xl p-4 text-white flex items-center gap-3"
        style={{ background: "linear-gradient(135deg, #0D99FF 0%, #0B30A7 100%)" }}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
          <CheckCircle2 size={20} className="text-white" />
        </div>
        <div>
          <p className="font-bold text-base leading-tight">Thông tin đặt phòng</p>
          <p className="text-xs text-blue-200 mt-0.5">
            Vui lòng điền đầy đủ thông tin khách hàng
          </p>
        </div>
      </div>

      {/* ── Guest info ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-2">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-semibold text-gray-700">Thông tin khách hàng</p>
          <button
            onClick={() => setEditingGuest((v) => !v)}
            className="flex items-center gap-1 text-xs text-[#0D99FF] hover:underline"
          >
            <Pencil size={11} />
            {editingGuest ? "Xong" : "Sửa"}
          </button>
        </div>

        {/* Name */}
        <div className="relative">
          <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <Input
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            disabled={!editingGuest}
            placeholder="Tên khách hàng"
            className="pl-8 h-9 text-sm border-gray-200 disabled:bg-gray-50 disabled:text-gray-600"
          />
        </div>

        {/* Phone */}
        <div className="relative">
          <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <Input
            value={guestPhone}
            onChange={(e) => setGuestPhone(e.target.value)}
            disabled={!editingGuest}
            placeholder="Số điện thoại"
            className="pl-8 h-9 text-sm border-gray-200 disabled:bg-gray-50 disabled:text-gray-600"
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] text-gray-400 font-semibold uppercase">Ngày check-in</label>
            <div className="mt-0.5 flex items-center gap-1.5 rounded-lg border border-gray-200 px-2 py-1.5 text-xs text-gray-700 bg-gray-50">
              {checkIn || "—"}
            </div>
          </div>
          <div>
            <label className="text-[10px] text-gray-400 font-semibold uppercase">Ngày check-out</label>
            <div className="mt-0.5 flex items-center gap-1.5 rounded-lg border border-gray-200 px-2 py-1.5 text-xs text-gray-700 bg-gray-50">
              {checkOut || "—"}
            </div>
          </div>
        </div>
      </div>

      {/* ── Rooms selected ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <p className="text-sm font-semibold text-gray-700 mb-2">Phòng đã chọn</p>
        {selectedRooms.length === 0 ? (
          <p className="text-xs text-gray-400 italic">Chưa chọn phòng nào</p>
        ) : (
          <div className="space-y-1.5">
            {selectedRooms.map((r, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-gray-600 text-xs">
                  {r.name} – {r.roomNumber}
                </span>
                <span className="text-gray-800 font-semibold text-xs">
                  {(r.pricePerNight * Math.max(nights, 1)).toLocaleString("vi-VN")}đ
                  <span className="text-gray-400 font-normal"> ×{Math.max(nights, 1)}</span>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Services selected ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-2">
        <p className="text-sm font-semibold text-gray-700">Dịch vụ đã chọn</p>

        {/* Add service button */}
        <button
          onClick={() => setShowServicePicker((v) => !v)}
          className="flex items-center gap-1.5 text-xs text-[#0D99FF] border border-dashed border-[#0D99FF] rounded-lg px-3 py-1.5 w-full justify-center hover:bg-blue-50 transition-colors"
        >
          <Plus size={13} />
          Thêm dịch vụ
        </button>

        {/* Service picker dropdown */}
        {showServicePicker && (
          <div className="border border-gray-200 rounded-lg bg-white shadow-md overflow-hidden">
            {MOCK_SERVICES.map((svc) => (
              <button
                key={svc.id}
                onClick={() => addService(svc)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs hover:bg-blue-50 transition-colors"
              >
                <span className="text-gray-700">{svc.name}</span>
                <span className="text-[#0D99FF] font-semibold">
                  {svc.price.toLocaleString("vi-VN")}đ
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Selected service list */}
        {selectedServices.map((svc) => (
          <div key={svc.id} className="flex items-center justify-between text-xs">
            <span className="text-gray-600">{svc.name}</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-800">
                {svc.price.toLocaleString("vi-VN")}đ
              </span>
              <button
                onClick={() => removeService(svc.id)}
                className="text-gray-300 hover:text-red-400 transition-colors"
              >
                <X size={13} />
              </button>
            </div>
          </div>
        ))}

        {/* Tax row */}
        <div className="flex items-center justify-between text-xs border-t border-dashed border-gray-100 pt-2 mt-1">
          <span className="text-gray-500">Thuế {TAX_RATE * 100}%</span>
          <span className="text-gray-700 font-medium">{tax.toLocaleString("vi-VN")}đ</span>
        </div>
      </div>

      {/* ── Total ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Tổng cộng</p>
          <p className="text-[10px] text-gray-400 mt-0.5">Có tính giá thuế {TAX_RATE * 100}%</p>
        </div>
        <p className="text-xl font-extrabold text-[#0D99FF]">
          {total.toLocaleString("vi-VN")}đ
        </p>
      </div>

      {/* ── Payment method ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-2">
        <p className="text-sm font-semibold text-gray-700">Phương thức thanh toán</p>
        <div className="grid grid-cols-2 gap-2">
          {(
            [
              { key: "cash",     label: "Tiền mặt",    Icon: Banknote    },
              { key: "transfer", label: "Chuyển khoản", Icon: CreditCard },
            ] as const
          ).map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => setPaymentMethod(key)}
              className={`flex items-center justify-center gap-2 py-2 rounded-lg border text-sm font-medium transition-all ${
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

      {/* ── Confirm button ── */}
      <Button
        disabled={selectedRooms.length === 0}
        className="w-full flex items-center justify-center gap-2 text-white h-11 text-sm font-semibold rounded-xl disabled:opacity-50"
        style={{ backgroundColor: colors.primary.blue }}
        // TODO (BE): Submit booking – POST /admin/bookings với payload đầy đủ
      >
        <CheckCircle2 size={16} />
        Xác nhận đặt phòng
      </Button>
    </div>
  );
}
