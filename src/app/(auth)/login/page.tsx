import LoginForm from "@/features/auth/components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập - BullManHotel",
  description: "Đăng nhập tài khoản của bạn",
};

export default function LoginPage() {
  return (
    <div className="reverse-layout">
      <LoginForm />
    </div>
  );
}
