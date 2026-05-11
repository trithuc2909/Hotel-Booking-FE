import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQueryWithReauth } from "@/lib/api/baseQuery";
import {
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  VerifyOTPRequest,
} from "@/features/auth/types/auth.type";
import { AuthResponse, RegisterResponse } from "@/features/auth/types/auth.type";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: customBaseQueryWithReauth,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    // Register
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (data) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: data,
      }),
    }),

    // Verify OTP
    verifyOTP: builder.mutation<AuthResponse, VerifyOTPRequest>({
      query: (data) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: data,
      }),
    }),

    // Resend OTP
    resendOTP: builder.mutation<void, { userId: string }>({
      query: (data) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: data,
      }),
    }),

    // Login
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    // Forgot Password
    forgotPassword: builder.mutation<
      { message: string },
      ForgotPasswordRequest
    >({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    // Reset Password
    resetPassword: builder.mutation<{ message: string }, ResetPasswordRequest>({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),

    // Validate Reset Token
    validateResetToken: builder.query<{ valid: boolean }, string>({
      query: (token) => ({
        url: `/auth/validate-reset-token?token=${token}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyOTPMutation,
  useResendOTPMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useValidateResetTokenQuery,
} = authApi;
