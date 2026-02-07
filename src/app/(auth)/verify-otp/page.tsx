import { Metadata } from "next";
import VerifyOTPForm from "@/components/auth/verify-otp-form";

export const metadata: Metadata = {
  title: "Xác thực OTP - BullManHotel",
  description: "Xác thực tài khản khoản bằng mã OTP được gửi qua email",
};

export default function VerifyOTPPage() {
  return <VerifyOTPForm />;
}
