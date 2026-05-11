import { CheckCircle2, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { fmtDateTime } from "@/lib/utils";
import { BookingDetailPayment } from "@/features/booking/types/booking.type";

interface Props {
  roomTotal: number;
  totalService: number;
  taxAmount: number;
  discount: number;
  totalAmount: number;
  statusCode: string;
  payments: BookingDetailPayment[];
}

export default function PaymentSummaryCard({
  roomTotal,
  totalService,
  taxAmount,
  discount,
  totalAmount,
  statusCode,
  payments,
}: Props) {
  const paidPayment = payments?.find((p) => p.paymentStatus === "SCS");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-700">
          <CreditCard size={14} className="text-[#0D99FF]" />
          Chi tiết thanh toán
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Tiền phòng</span>
          <span>{formatCurrency(roomTotal)}</span>
        </div>

        {totalService > 0 && (
          <div className="flex justify-between text-gray-600">
            <span>Dịch vụ đi kèm</span>
            <span>{formatCurrency(totalService)}</span>
          </div>
        )}

        {taxAmount > 0 && (
          <div className="flex justify-between text-gray-600">
            <span>Thuế (10%)</span>
            <span>{formatCurrency(taxAmount)}</span>
          </div>
        )}

        {discount > 0 && (
          <div className="flex justify-between text-emerald-600">
            <span>Giảm giá</span>
            <span>-{formatCurrency(discount)}</span>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <span className="font-semibold text-gray-700">Tổng cộng</span>
          <span className="text-xl font-extrabold text-[#0B30A7]">
            {formatCurrency(totalAmount)}
          </span>
        </div>

        {/* Payment status badge */}
        {paidPayment ? (
          <div className="mt-3 flex items-start gap-2.5 rounded-xl bg-emerald-50 p-3">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-600" />
            <div>
              <p className="text-sm font-medium text-emerald-700">Đã thanh toán</p>
              {paidPayment.paidAt && (
                <p className="text-xs text-emerald-600">
                  Thanh toán lúc {fmtDateTime(paidPayment.paidAt)}
                </p>
              )}
            </div>
          </div>
        ) : (
          statusCode === "PPY" && (
            <div className="mt-3 flex items-start gap-2.5 rounded-xl bg-orange-50 p-3">
              <CreditCard size={16} className="mt-0.5 shrink-0 text-orange-500" />
              <p className="text-sm font-medium text-orange-600">Chờ thanh toán</p>
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
}
