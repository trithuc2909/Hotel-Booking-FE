import { customBaseQueryWithReauth } from "@/lib/api/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { PromotionResponse } from "../types/promotion.type";
import { ApiResponse } from "@/types/common";

export const promotionApi = createApi({
  reducerPath: "promotionApi",
  baseQuery: customBaseQueryWithReauth,
  endpoints: (builder) => ({
    getAllPromotions: builder.query<ApiResponse<PromotionResponse[]>, void>({
      query: () => "/promotions",
    }),
  }),
});

export const { useGetAllPromotionsQuery } = promotionApi;