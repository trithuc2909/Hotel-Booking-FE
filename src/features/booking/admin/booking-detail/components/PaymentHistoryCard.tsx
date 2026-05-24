import { BookingDetailPayment } from "@/features/booking/types/booking.type";
import { formatCurrency, formatDate } from "@/lib/utils";

type Props = {
  payments: BookingDetailPayment[];
};

const PAYMENT_STATUS_STYLE: Record<string, string> = {
  COMPLETED: "bg-green-100 text-green-600",
  PENDING: "bg-yellow-100 text-yellow-600",
};

const PAYMENT_STATUS_LABEL: Record<string, string> = {
  COMPLETED: "Đã thanh toán",
  PENDING: "Chờ xử lý",
};

export default function PaymentHistoryCard({ payments }: Props) {
  if (payments.length === 0) return null;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-sm font-bold text-gray-800">💳 Lịch sử thanh toán</h2>

      <div className="space-y-3">
        {payments.map((payment, index) => (
          <div key={payment.id} className="flex items-start gap-3">
            <div className="relative flex flex-col items-center">
              <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#0D99FF]" />
              {index < payments.length - 1 && (
                <div className="mt-1 w-px flex-1 bg-gray-200" style={{ minHeight: "24px" }} />
              )}
            </div>

            <div className="flex-1 pb-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-gray-700">
                  {payment.paymentMethod === "CASH" ? "Tiền mặt" : "Chuyển khoản"}
                </p>
                <span className="text-sm font-bold text-[#0D99FF]">+{formatCurrency(payment.amount)}đ</span>
              </div>

              {payment.paidAt && (
                <p className="mt-0.5 text-[10px] text-gray-400">{formatDate(payment.paidAt, "dd/MM/yyyy • HH:mm")}</p>
              )}

              <span
                className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[9px] font-bold tracking-wide uppercase ${
                  PAYMENT_STATUS_STYLE[payment.paymentStatus] ?? "bg-gray-100 text-gray-500"
                }`}
              >
                {PAYMENT_STATUS_LABEL[payment.paymentStatus] ?? payment.paymentStatus}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
