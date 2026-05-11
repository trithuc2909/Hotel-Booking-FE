import { Suspense } from "react";
import ResetPasswordForm from "@/features/auth/components/reset-password-form";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Đặt lại mật khẩu - BullManHotel",
  description: "Tạo mật khẩu mới cho tài khoản của bạn",
};
export default function ResetPasswordPage() {
  return (
    <div className="reverse-layout">
      <Suspense fallback={<div>Đang tải...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}