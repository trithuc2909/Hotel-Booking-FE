"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { loginSchema, type LoginFormData } from "@/features/auth/schemas/auth.schema";
import { useLogin } from "../hooks/useLogin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const { onSubmit, isLoading } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Card className="w-full max-w-md rounded-2xl border border-gray-100 bg-white shadow-xl">
      {/* Header */}
      <CardHeader className="space-y-2 pb-6">
        <CardTitle className="text-center text-3xl font-bold" style={{ color: "#0B30A7" }}>
          Đăng nhập
        </CardTitle>
        <CardDescription className="text-center text-sm text-gray-500">
          Nhập thông tin để đăng nhập vào tài khoản
        </CardDescription>
      </CardHeader>

      {/* Form */}
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                  <FormControl>
                    <Input
                      className="h-11 rounded-lg border-gray-300 text-gray-700 focus:border-blue-500 focus:ring-blue-500"
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

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Mật khẩu</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="h-11 rounded-lg border-gray-300 text-gray-700 focus:border-blue-500 focus:ring-blue-500"
                        type={showPassword ? "text" : "password"}
                        placeholder="Nhập mật khẩu"
                        {...field}
                        disabled={isLoading}
                      />
                      {/* Eye icon */}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-700 hover:text-gray-900"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm font-medium hover:underline"
                style={{ color: "#0D99FF" }}
              >
                Quên mật khẩu?
              </Link>
            </div>
            {/* Submit Button */}
            <Button
              type="submit"
              className="h-11 w-full cursor-pointer rounded-lg bg-[#0D99FF] text-base font-semibold text-white transition-all duration-200 ease-in-out hover:bg-[#0B84E6] hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              disabled={isLoading}
            >
              {isLoading ? "Đang xử lý..." : "Đăng nhập"}
            </Button>
          </form>
        </Form>
      </CardContent>
      {/* Footer */}
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-600">
          Chưa có tài khoản?{" "}
          <Link href="/register" className="font-semibold hover:underline" style={{ color: "#0D99FF" }}>
            Đăng ký ngay
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
