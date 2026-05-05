"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Mail, ArrowLeft } from "lucide-react";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/features/auth/schemas/auth.schema";
import { useForgotPasswordMutation } from "@/features/auth/api/authApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
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
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { colors } from "@/constants/colors";
import { useRouter } from "next/navigation";

export default function ForgotPasswordForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const router = useRouter();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await forgotPassword(data).unwrap();
      setIsSubmitted(true);
    } catch (error) {
      const err = error as FetchBaseQueryError & {
        data?: { message?: string };
      };
      toast.error(err?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  // Handle submit successfully
  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md border border-gray-100 bg-white shadow-xl rounded-2xl">
        <CardHeader className="space-y-2 pb-6 text-center">
          <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-2">
            <Mail className="w-8 h-8" style={{ color: colors.primary.blue }} />
          </div>
          <CardTitle
            className="text-2xl font-bold"
            style={{ color: colors.primary.darkBlue }}
          >
            Kiểm tra email của bạn
          </CardTitle>
          <CardDescription className="text-gray-500">
            Nếu email tồn tại trong hệ thống, chúng tôi đã gửi link đặt lại mật
            khẩu. Link có hiệu lực trong <strong>15 phút</strong>.
          </CardDescription>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-gray-500">
              Không nhận được email? Kiểm tra thư mục spam.
            </p>
            <Button
              type="button"
              onClick={() => router.push("/login")}
              className="w-full h-11 rounded-lg text-base font-semibold text-white cursor-pointer
            bg-[#0D99FF] transition-all duration-200 ease-in-out
            hover:bg-[#0B84E6] hover:shadow-md active:scale-[0.98]"
            >
              Quay lại trang đăng nhập
            </Button>
          </CardContent>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md border border-gray-100 bg-white shadow-xl rounded-2xl">
      <CardHeader className="space-y-2 pb-3">
        <div className="relative flex items-center justify-center">
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="absolute left-0 p-1 rounded-md hover:bg-gray-100 cursor-pointer"
            aria-label="Quay lại đăng nhập"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <CardTitle
            className="text-3xl font-bold text-center"
            style={{ color: colors.primary.darkBlue }}
          >
            Quên mật khẩu
          </CardTitle>
        </div>
        <CardDescription className="text-center text-gray-500 text-sm">
          Nhập email để nhận link đặt lại mật khẩu
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-11 rounded-lg border-gray-300 focus:border-blue-500 text-gray-700"
                      type="email"
                      placeholder="example@gmail.com"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full h-11 rounded-lg text-base font-semibold text-white cursor-pointer
                        bg-[#0D99FF] transition-all duration-200 ease-in-out
                        hover:bg-[#0B84E6] hover:shadow-md active:scale-[0.98]
                        disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Đang gửi..." : "Gửi link đặt lại mật khẩu"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
