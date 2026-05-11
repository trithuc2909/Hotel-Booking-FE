import { Metadata } from "next";
import { Suspense } from "react";
import VerifyOTPForm from "@/features/auth/components/verify-otp-form";

export const metadata: Metadata = {
  title: "Xác thực OTP - BullManHotel",
  description: "Xác thực tài khản khoản bằng mã OTP được gửi qua email",
};

export default function VerifyOTPPage() {
  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <VerifyOTPForm />
    </Suspense>
  );
}
