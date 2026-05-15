import { customBaseQueryWithReauth } from "@/lib/api/baseQuery";
import { ApiResponse } from "@/types/common";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  AdminPromotionFilter,
  PromotionResponse,
  PromotionStatsResponse,
  ValidatePromoResponse,
} from "../types/promotion.type";

export const promotionApi = createApi({
  reducerPath: "promotionApi",
  baseQuery: customBaseQueryWithReauth,
  tagTypes: ["AdminPromotions", "PromotionStats"],
  endpoints: (builder) => ({
    getAllPromotions: builder.query<ApiResponse<PromotionResponse[]>, void>({
      query: () => "/promotions",
    }),
    validatePromoCode: builder.query<
      ApiResponse<ValidatePromoResponse>,
      { code: string; orderValue: number }
    >({
      query: ({ code, orderValue }) =>
        `/promotions/validate?code=${encodeURIComponent(code)}&orderValue=${orderValue}`,
    }),
    getAdminPromotions: builder.query<
      ApiResponse<PromotionResponse[]>,
      AdminPromotionFilter
    >({
      query: (params) => ({ url: "/admin/promotions", params }),
      providesTags: ["AdminPromotions"],
    }),
    getAdminPromotionById: builder.query<
      ApiResponse<PromotionResponse>,
      string
    >({
      query: (id) => ({ url: `/admin/promotions/${id}` }),
      providesTags: (_r, _e, id) => [{ type: "AdminPromotions", id }],
    }),
    getPromotionStats: builder.query<ApiResponse<PromotionStatsResponse>, void>(
      {
        query: () => ({ url: "/admin/promotions/stats" }),
        providesTags: ["PromotionStats"],
      },
    ),
    createPromotion: builder.mutation<ApiResponse<null>, FormData>({
      query: (data) => ({
        url: "/admin/promotions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AdminPromotions", "PromotionStats"],
    }),
    updatePromotion: builder.mutation<
      ApiResponse<null>,
      { id: string; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/admin/promotions/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["AdminPromotions"],
    }),
    updatePromotionStatus: builder.mutation<
      ApiResponse<null>,
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `/admin/promotions/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["AdminPromotions", "PromotionStats"],
    }),
    deletePromotion: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({ url: `/admin/promotions/${id}`, method: "DELETE" }),
      invalidatesTags: ["AdminPromotions", "PromotionStats"],
    }),
  }),
});

export const {
  useGetAdminPromotionsQuery,
  useGetAdminPromotionByIdQuery,
  useGetPromotionStatsQuery,
  useCreatePromotionMutation,
  useUpdatePromotionMutation,
  useUpdatePromotionStatusMutation,
  useDeletePromotionMutation,
  useGetAllPromotionsQuery,
  useValidatePromoCodeQuery,
} = promotionApi;
