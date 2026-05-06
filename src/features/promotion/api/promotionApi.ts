import { customBaseQueryWithReauth } from "@/lib/api/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { PromotionResponse, ValidatePromoResponse } from "../types/promotion.type";
import { ApiResponse } from "@/types/common";

export const promotionApi = createApi({
  reducerPath: "promotionApi",
  baseQuery: customBaseQueryWithReauth,
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
  }),
});

export const {
  useGetAllPromotionsQuery,
  useLazyValidatePromoCodeQuery,
} = promotionApi;