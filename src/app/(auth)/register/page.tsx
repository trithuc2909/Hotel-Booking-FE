import RegisterForm from "@/features/auth/components/register-form";
import { Metadata } from "next";

// Meta data
export const metadata: Metadata = {
  title: "Đăng ký - BullManHotel",
  description: "Đăng ký tài khoản mới để đặt phòng khách sạn",
};

// Register page component
export default function RegisterPage() {
  return <RegisterForm />;
}
