"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
// Import validation schema
import {
  verifyOTPSchema,
  type VerifyOTPFormData,
} from "@/features/auth/schemas/auth.schema";
// Import Redux mutations
import {
  useVerifyOTPMutation,
  useResendOTPMutation,
} from "@/features/auth/api/authApi";
// Import UI components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// Import OTP Input component
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ArrowLeft } from "lucide-react";

export default function VerifyOTPForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const userId = searchParams.get("userId");

  const [verifyOTP, { isLoading: isVerifying }] = useVerifyOTPMutation();
  const [resendOTP, { isLoading: isResending }] = useResendOTPMutation();

  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Set up form
  const form = useForm<VerifyOTPFormData>({
    resolver: zodResolver(verifyOTPSchema),
    mode: "onChange",
    defaultValues: {
      otp: "",
    },
  });

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      // countdown = 0
      setCanResend(true);
    }
  }, [countdown]);

  // Check userId
  useEffect(() => {
    if (!userId) {
      toast.error("Không tìm thấy thông tin xác thực. Vui lòng đăng ký lại.");
      return;
    }
  }, [userId, router]);

  // Handle form submit
  const onSubmit = async (data: VerifyOTPFormData) => {
    if (!userId) {
      toast.error("Không tìm thấy thông tin xác thực");
      return;
    }

    try {
      await verifyOTP({
        userId,
        otp: data.otp,
      }).unwrap();

      // Success toast
      toast.success("Xác thực tài khoản thành công! Vui lòng đăng nhập.");

      // Redirect to login page
      router.push("/login");
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || "Mã OTP không hợp lệ. Vui lòng thử lại.";
      toast.error(errorMessage);

      // Reset OTP input on error
      form.reset();
    }
  };

  // Handle resend OTP
  const handleResendOTP = async () => {
    if (!userId) {
      toast.error("Không tìm thấy thông tin xác thực");
      return;
    }

    try {
      await resendOTP({ userId }).unwrap();

      // Success
      toast.success("Mã OTP đã được gửi đến email của bạn");

      // Reset countdown
      setCountdown(60);
      setCanResend(false);
    } catch (error: any) {
      const errorMessage =
        error?.data?.message ||
        "Không thể gửi lại mã OTP. Vui lòng thử lại sau.";
      toast.error(errorMessage);
    }
  };

  // Render UI
  return (
    <Card className="w-full max-w-md border border-gray-100 bg-white shadown-xl rounded-2xl">
      {/* Header */}
      <CardHeader className="space-y-2 pb-6 relative">
        {/* Back Button */}
        <Link
          href="/register"
          className="absolute left-4 top-0 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600 hover:text-gray-900 transition-colors" />
        </Link>
        <CardTitle
          className="text-3xl font-bold text-center"
          style={{ color: "#0B30A7" }}
        >
          Xác thực tài khoản
        </CardTitle>
        <CardDescription className="text-center text-gray-500 text-sm">
          Nhập mã OTP gồm 6 số đã được gửi đến email của bạn
        </CardDescription>
      </CardHeader>

      {/* Form content */}
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* OTP Input */}
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Mã OTP
                  </FormLabel>
                  <FormControl>
                    <div className="flex justify-center">
                      <InputOTP
                        maxLength={6}
                        value={field.value}
                        onChange={field.onChange}
                        disabled={isVerifying}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-11 rounded-lg text-base font-semibold text-white
                        bg-[#0D99FF]
                        transition-all duration-200
                        hover:bg-[#0B84E6]
                        hover:shadow-md
                        active:scale-[0.98]
                        disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              disabled={isVerifying || form.watch("otp").length !== 6}
            >
              {isVerifying ? "Đang xác thức..." : "Xác thực"}
            </Button>

            {/* Resend OTP */}
            <div className="text-center">
              {canResend ? (
                <p className="text-sm text-gray-600">
                  Bạn chưa nhận được mã OTP?{" "}
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={isResending}
                    className="font-semibold hover:underline transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ color: "#0D99FF" }}
                  >
                    {isResending ? "Đang gửi lại..." : "Bấm để gửi lại"}
                  </button>
                </p>
              ) : (
                <p className="text-sm text-gray-500">
                  Gửi lại mã sau{" "}
                  <span className="font-semibold" style={{ color: "#0D99FF" }}>
                    {countdown}s
                  </span>
                </p>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
