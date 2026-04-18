"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

// Import validation schema
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth";

// Import Redux mutation
import { useRegisterMutation } from "@/features/auth/api/authApi";

// Import UI components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Eye, EyeOff } from "lucide-react";

export default function RegisterForm() {
  // State & Hooks
  const router = useRouter();

  // Rudux mutation to call API
  const [register, { isLoading }] = useRegisterMutation();

  // Form
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Handle form submit
  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await register(data).unwrap();

      // Success
      toast.success(
        "Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.",
      );

      // Redirect to OTP verification page
      router.push(`/verify-otp?userId=${response.data.userId}`);
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.";

      toast.error(errorMessage);
    }
  };

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Render UI
  return (
    <Card className="w-full max-w-md border border-gray-100 bg-white shadow-xl rounded-2xl">
      {/* Header */}
      <CardHeader className="space-y-2 pb-6">
        <CardTitle
          className="text-3xl font-bold text-center"
          style={{ color: "#0B30A7" }}
        >
          Tạo tài khoản
        </CardTitle>
        <CardDescription className="text-center text-gray-500 text-sm">
          Nhập thông tin của bạn để tạo tài khoản mới
        </CardDescription>
      </CardHeader>
      {/* Form Content */}
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Tên người dùng
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-11 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-gray-700"
                      placeholder="Nhập tên người dùng"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Email */}
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
                      className="h-11 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-gray-700"
                      type="email"
                      placeholder="example@email.com"
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
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Mật khẩu
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="h-11 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-gray-700"
                        type={showPassword ? "text" : "password"}
                        placeholder="Nhập mật khẩu"
                        {...field}
                        disabled={isLoading}
                      />
                      {/* Eye icon */}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 hover:text-gray-900 cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Xác nhận mật khẩu
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="h-11 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-gray-700"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Nhập lại mật khẩu"
                        {...field}
                        disabled={isLoading}
                      />
                      {/* Eye icon */}
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 hover:text-gray-900 cursor-pointer"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-11 rounded-lg text-base font-semibold text-white cursor-pointer
                        bg-[#0D99FF]
                        transition-all duration-200 ease-in-out
                        hover:bg-[#0B84E6]
                        hover:shadow-md
                        active:scale-[0.98]
                        disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Đang xử lý..." : "Đăng ký"}
            </Button>
          </form>
        </Form>
      </CardContent>
      {/* Footer */}
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-600">
          Đã có tài khoản?{" "}
          <Link
            href="/login"
            className="font-semibold hover:underline"
            style={{ color: "#0D99FF" }}
          >
            Đăng nhập ngay
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
