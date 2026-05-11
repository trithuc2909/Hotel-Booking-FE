import ForgotPasswordForm from "@/features/auth/components/forgot-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quên mật khẩu - BullManHotel",
  description: "Đặt lại mật khẩu tài khoản của bạn",
};

export default function ForgotPasswordPage() {
  return (
    <div className="reverse-layout">
      <ForgotPasswordForm />
    </div>
  );
}
