"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

import { resetPasswordSchema, type ResetPasswordFormData } from "@/features/auth/schemas/auth.schema";

import { useResetPasswordMutation, useValidateResetTokenQuery } from "@/features/auth/api/authApi";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RESET_TOKEN_INVALID_CODES } from "@/constants/auth";
import { colors } from "@/constants/colors";

type ApiError = {
  data?: {
    message?: string;
    code?: string;
  };
};

function InvalidTokenCard() {
  const router = useRouter();
  return (
    <Card className="w-full max-w-md rounded-2xl border border-gray-100 shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-red-500">Link không hợp lệ</CardTitle>
        <CardDescription>Link đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <Button
          onClick={() => router.push("/forgot-password")}
          className="h-11 w-full cursor-pointer rounded-lg bg-[#0D99FF] text-base font-semibold text-white transition-all duration-200 hover:bg-[#0B84E6]"
        >
          Yêu cầu link mới
        </Button>
      </CardContent>
    </Card>
  );
}

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token")?.trim() ?? "";
  const { data, isLoading: isValidating } = useValidateResetTokenQuery(token, {
    skip: !token,
  });

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  // cleanup timeout khi unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Non token
  if (!token) {
    return <InvalidTokenCard />;
  }

  // checking Token UI
  if (isValidating) {
    return (
      <Card className="w-full max-w-md rounded-2xl border border-gray-100 shadow-xl">
        <CardHeader className="text-center">
          <CardDescription>Đang kiểm tra đường dẫn...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Invalid token
  if (!data?.valid) {
    return <InvalidTokenCard />;
  }

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      await resetPassword({
        token,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      }).unwrap();

      toast.success("Đặt lại mật khẩu thành công!");

      timeoutRef.current = setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      const err = error as ApiError;

      const message = err?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại.";

      toast.error(message);

      if (RESET_TOKEN_INVALID_CODES.includes(err?.data?.code ?? "")) {
        timeoutRef.current = setTimeout(() => {
          router.push("/forgot-password");
        }, 2000);
      }
    }
  };

  return (
    <Card className="w-full max-w-md rounded-2xl border border-gray-100 shadow-xl">
      <CardHeader className="space-y-2 text-center">
        <div className="relative flex items-center justify-center">
          <button
            type="button"
            onClick={() => router.push("/forgot-password")}
            className="absolute left-0 cursor-pointer rounded-md p-1 hover:bg-gray-100"
            aria-label="Quay lại đăng nhập"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>
          <CardTitle className="text-3xl font-bold" style={{ color: colors.primary.darkBlue }}>
            Đặt lại mật khẩu
          </CardTitle>
        </div>
        <CardDescription>Tạo mật khẩu mới cho tài khoản của bạn</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* new password */}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Mật khẩu mới</FormLabel>

                  <FormControl>
                    <div className="relative">
                      <Input
                        className="h-11 rounded-lg border-gray-300 text-gray-700 focus:border-blue-500 focus:ring-blue-500"
                        {...field}
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Nhập mật khẩu mới"
                        autoComplete="new-password"
                        disabled={isLoading}
                      />

                      <button
                        type="button"
                        aria-label="Toggle password visibility"
                        onClick={() => setShowNewPassword((prev) => !prev)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-700 hover:text-gray-900"
                      >
                        {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* confirm password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Xác nhận mật khẩu</FormLabel>

                  <FormControl>
                    <div className="relative">
                      <Input
                        className="h-11 rounded-lg border-gray-300 text-gray-700 focus:border-blue-500 focus:ring-blue-500"
                        {...field}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Nhập lại mật khẩu"
                        autoComplete="new-password"
                        disabled={isLoading}
                      />

                      <button
                        type="button"
                        aria-label="Toggle password visibility"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-700 hover:text-gray-900"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="h-11 w-full cursor-pointer rounded-lg bg-[#0D99FF] text-base font-semibold text-white transition-all duration-200 ease-in-out hover:bg-[#0B84E6] hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              disabled={isLoading}
            >
              {isLoading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
