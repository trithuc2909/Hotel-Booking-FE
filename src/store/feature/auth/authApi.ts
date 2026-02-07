import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQueryWithReauth } from "@/lib/api/baseQuery";
import {
  LoginRequest,
  RegisterRequest,
  VerifyOTPRequest,
} from "@/types/request/auth";
import { AuthResponse, RegisterResponse } from "@/types/response/auth";

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
  }),
});

export const {
  useRegisterMutation,
  useVerifyOTPMutation,
  useResendOTPMutation,
  useLoginMutation,
} = authApi;
