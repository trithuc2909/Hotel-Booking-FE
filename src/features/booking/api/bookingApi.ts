import { customBaseQueryWithReauth } from "@/lib/api/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "@/types/common";
import {
  BookingDetailItem,
  BookingHistoryItem,
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
    getBookingHistory: builder.query<
      ApiResponse<BookingHistoryItem[]>,
      { status?: string }
    >({
      query: ({ status } = {}) => ({
        url: "/bookings/history",
        params: status ? { status } : {},
      }),
      providesTags: ["Booking"],
    }),
    getBookingById: builder.query<ApiResponse<BookingDetailItem>, string>({
      query: (id) => `/bookings/${id}`,

      providesTags: (_result, _err, id) => [{ type: "Booking", id }],
    }),
    cancelBooking: builder.mutation<ApiResponse<BookingDetailItem>, string>({
      query: (id) => ({
        url: `/bookings/${id}/cancel`,
        method: "POST",
      }),

      invalidatesTags: (_result, _err, id) => [
        { type: "Booking", id },
        { type: "Booking", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useCreateVNPayPaymentMutation,
  useGetPaymentStatusQuery,
  useProcessVNPayReturnMutation,
  useGetBookingHistoryQuery,
  useGetBookingByIdQuery,
  useCancelBookingMutation,
} = bookingApi;
