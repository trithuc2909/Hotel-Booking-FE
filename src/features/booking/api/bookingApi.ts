import { customBaseQueryWithReauth } from "@/lib/api/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "@/types/common";
import {
  CreateBookingRequest,
  CreateBookingResponse,
  CreateVNPayPaymentResponse,
} from "../types/booking.type";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: customBaseQueryWithReauth,
  tagTypes: ["Booking", "Payment"],
  endpoints: (builder) => ({
    createBooking: builder.mutation<
      ApiResponse<CreateBookingResponse>,
      CreateBookingRequest
    >({
      query: (body) => ({
        url: "/bookings",
        method: "POST",
        body,
        invalidatesTags: ["Booking"],
      }),
    }),
    createVNPayPayment: builder.mutation<
      ApiResponse<CreateVNPayPaymentResponse>,
      { bookingId: string }
    >({
      query: (body) => ({
        url: "/payments/vnpay",
        method: "POST",
        body,
      }),
    }),
    getPaymentStatus: builder.query<
      ApiResponse<{ paymentStatus: string; bookingStatus: string }>,
      { orderId: string }
    >({
      query: ({ orderId }) => ({
        url: "/payments/status",
        params: { orderId },
      }),
      providesTags: ["Payment"],
    }),
    processVNPayReturn: builder.mutation<
      { RspCode: string; Message: string },
      string
    >({
      query: (queryString) => ({
        url: `/payments/vnpay/webhook?${queryString}`,
        method: "GET",
      }),
      invalidatesTags: ["Payment"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useCreateVNPayPaymentMutation,
  useGetPaymentStatusQuery,
  useProcessVNPayReturnMutation,
} = bookingApi;
