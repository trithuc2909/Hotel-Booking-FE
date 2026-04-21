import { customBaseQueryWithReauth } from "@/lib/api/baseQuery";
import { ApiResponse } from "@/types/common";
import { createApi } from "@reduxjs/toolkit/query/react";
import { ServiceResponse } from "../types/service.type";

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: customBaseQueryWithReauth,
  endpoints: (builder) => ({
    getServices: builder.query<ApiResponse<ServiceResponse[]>, void>({
      query: () => ({
        url: "/services",
        method: "GET",
      }),
    }),
    getServiceCategories: builder.query<ApiResponse<ServiceResponse[]>, void>({
      query: () => ({
        url: "/services/categories",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServiceCategoriesQuery,
} = serviceApi;
