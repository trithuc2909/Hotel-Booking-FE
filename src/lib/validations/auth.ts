import { z } from "zod";

export const registerSchema = z
  .object({
    // Username
    username: z
      .string()
      .min(3, "Tên người dùng phải có ít nhất 3 ký tự")
      .max(50, "Tên người dùng không được quá 50 ký tự"),

    // Email
    email: z
      .string()
      .min(1, "Email không được để trống")
      .max(255, "Email không được vượt quá 255 ký tự")
      .email("Email không hợp lệ"),

    // Password
    password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),

    // Confirm Password
    confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu"),
  })
  .refine(
    (data) => {
      if (!data.password || !data.confirmPassword) return true;
      return data.password === data.confirmPassword;
    },
    {
      message: "Mật khẩu xác nhận không khớp",
      path: ["confirmPassword"],
    },
  );

// Login
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email không được để trống")
    .email("Email không hợp lệ"),
  password: z
    .string()
    .min(1, "Mật khẩu không được để trống")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
});

// Verify OTP
export const verifyOTPSchema = z.object({
  otp: z
    .string()
    .length(6, "Mã OTP phải có 6 số")
    .regex(/^\d+$/, "Mã OTP chỉ được chứa số"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type VerifyOTPFormData = z.infer<typeof verifyOTPSchema>;
