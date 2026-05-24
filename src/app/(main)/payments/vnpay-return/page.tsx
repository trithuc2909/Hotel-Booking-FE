"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useGetPaymentStatusQuery, useProcessVNPayReturnMutation } from "@/features/booking/api/bookingApi";

function VNPayReturnContent() {
  const params = useSearchParams();
  const router = useRouter();

  const responseCode = params.get("vnp_ResponseCode");
  const orderId = params.get("vnp_TxnRef") ?? "";
  const bookingId = params.get("bookingId") ?? "";

  const isSuccess = responseCode === "00";

  const [processReturn] = useProcessVNPayReturnMutation();
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!isSuccess || !orderId) return;
    const vnpParams = new URLSearchParams();
    params.forEach((value, key) => {
      if (key.startsWith("vnp_")) vnpParams.set(key, value);
    });
    processReturn(vnpParams.toString());
  }, []);

  const { data, isLoading } = useGetPaymentStatusQuery(
    { orderId },
    { skip: !orderId || !isSuccess || isDone, pollingInterval: 3000 },
  );

  const paymentStatus = data?.data?.paymentStatus;
  const confirmed = paymentStatus === "SUCCESS";

  useEffect(() => {
    if (confirmed) setIsDone(true);
  }, [confirmed]);

  const shouldPoll = isSuccess && !confirmed;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-5 rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
        {/* Icon */}
        {!isSuccess ? (
          <XCircle size={56} className="mx-auto text-red-400" />
        ) : isLoading || shouldPoll ? (
          <Loader2 size={56} className="mx-auto animate-spin text-[#0D99FF]" />
        ) : (
          <CheckCircle size={56} className="mx-auto text-green-500" />
        )}
        {/* Title */}
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            {!isSuccess ? "Thanh toán thất bại" : confirmed ? "Thanh toán thành công!" : "Đang xác nhận thanh toán..."}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {!isSuccess
              ? "Giao dịch không được thực hiện. Vui lòng thử lại."
              : confirmed
                ? "Đặt phòng của bạn đã được xác nhận."
                : "Hệ thống đang xử lý, vui lòng đợi..."}
          </p>
        </div>
        {/* Order info */}
        {orderId && (
          <div className="space-y-2 rounded-xl bg-gray-50 p-4 text-left text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Mã giao dịch</span>
              <span className="max-w-[180px] truncate font-medium text-gray-800">
                {params.get("vnp_TransactionNo") ?? "—"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Ngân hàng</span>
              <span className="font-medium text-gray-800">{params.get("vnp_BankCode") ?? "—"}</span>
            </div>
          </div>
        )}
        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => router.push("/")}
            className="flex-1 cursor-pointer rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
          >
            Về trang chủ
          </button>
          {isSuccess && confirmed && (
            <button
              onClick={() => router.push("/booking-history")}
              className="flex-1 cursor-pointer rounded-xl bg-[#0D99FF] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0B84E6]"
            >
              Xem lịch sử đặt phòng
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VNPayReturnPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Đang tải...</div>}>
      <VNPayReturnContent />
    </Suspense>
  );
}
