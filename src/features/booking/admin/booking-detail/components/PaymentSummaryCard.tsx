import { BookingDetailRoom, BookingDetailPayment } from "@/features/booking/types/booking.type";
import { formatCurrency } from "@/lib/utils";
import { CreditCard } from "lucide-react";

type Props = {
  rooms: BookingDetailRoom[];
  totalNights: number;
  totalService: number;
  taxAmount: number;
  discount: number;
  totalAmount: number;
  payments: BookingDetailPayment[];
};

export default function PaymentSummaryCard({
  rooms,
  totalNights,
  totalService,
  taxAmount,
  discount,
  totalAmount,
  payments,
}: Props) {
  const roomTotal = rooms.reduce((sum, r) => sum + r.pricePerNight * r.nights, 0);

  return (
    <div
      className="rounded-2xl p-5 text-white"
      style={{ background: "linear-gradient(135deg, #0D99FF 0%, #0B30A7 100%)" }}
    >
      <div className="mb-5 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
          <CreditCard className="h-4 w-4 text-white" />
        </div>
        <h2 className="text-sm font-bold">Chi tiết thanh toán</h2>
      </div>

      <div className="space-y-2.5 text-sm">
        <div className="flex justify-between">
          <span className="text-blue-200">
            Tiền phòng ({rooms.length} phòng, {totalNights} đêm)
          </span>
          <span className="font-semibold">{formatCurrency(roomTotal)}đ</span>
        </div>

        {totalService > 0 && (
          <div className="flex justify-between">
            <span className="text-blue-200">Tổng dịch vụ</span>
            <span className="font-semibold">{formatCurrency(totalService)}đ</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-blue-200">Thuế (10%)</span>
          <span className="font-semibold">{formatCurrency(taxAmount)}đ</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between">
            <span className="text-blue-200">Giảm giá</span>
            <span className="font-semibold text-green-300">- {formatCurrency(discount)}đ</span>
          </div>
        )}

        <div className="my-3 border-t border-white/20" />

        <div className="flex items-center justify-between">
          <span className="text-base font-bold">TỔNG CỘNG</span>
          <span className="text-xl font-extrabold">{formatCurrency(totalAmount)}đ</span>
        </div>
      </div>

      {payments.length > 0 && (
        <div className="mt-4 rounded-xl bg-white/10 px-4 py-3">
          <p className="mb-1 text-[10px] font-semibold tracking-widest text-blue-200 uppercase">
            Phương thức thanh toán
          </p>
          <p className="text-sm font-bold">
            {payments[0].paymentMethod === "CASH" ? "💵 Tiền mặt" : "🏦 Chuyển khoản"}
          </p>
        </div>
      )}
    </div>
  );
}
