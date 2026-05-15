import { customBaseQueryWithReauth } from "@/lib/api/baseQuery";
import { ApiResponse } from "@/types/common";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  AdminServiceFilter,
  ServiceResponse,
  ServiceStatsResponse,
} from "../types/service.type";

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: customBaseQueryWithReauth,
  tagTypes: ["AdminServices", "ServiceStats"],
  endpoints: (builder) => ({
    getServices: builder.query<ApiResponse<ServiceResponse[]>, void>({
      query: () => ({ url: "/services", method: "GET" }),
    }),
    getServiceCategories: builder.query<ApiResponse<ServiceResponse[]>, void>({
      query: () => ({ url: "/services/categories", method: "GET" }),
    }),
    getAdminServices: builder.query<
      ApiResponse<ServiceResponse[]>,
      AdminServiceFilter
    >({
      query: (filter = {}) => {
        const params = new URLSearchParams();
        if (filter.search) params.set("search", filter.search);
        if (filter.categoryId) params.set("categoryId", filter.categoryId);
        if (filter.status) params.set("status", filter.status);
        if (filter.pageNum) params.set("pageNum", String(filter.pageNum));
        if (filter.pageSize) params.set("pageSize", String(filter.pageSize));
        return { url: `/admin/services?${params.toString()}` };
      },
      providesTags: ["AdminServices"],
    }),
    getAdminServiceById: builder.query<ApiResponse<ServiceResponse>, string>({
      query: (id) => ({ url: `/admin/services/${id}` }),
      providesTags: (_result, _err, id) => [{ type: "AdminServices", id }],
    }),
    getServiceStats: builder.query<ApiResponse<ServiceStatsResponse>, void>({
      query: () => ({ url: "/admin/services/stats" }),
      providesTags: ["ServiceStats"],
    }),
    updateServiceStatus: builder.mutation<
      ApiResponse<null>,
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `/admin/services/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["AdminServices", "ServiceStats"],
    }),
    deleteService: builder.mutation<ApiResponse<null>, { id: string }>({
      query: ({ id }) => ({
        url: `/admin/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminServices", "ServiceStats"],
    }),
    createService: builder.mutation<ApiResponse<null>, FormData>({
      query: (body) => ({ url: "/admin/services", method: "POST", body }),
      invalidatesTags: ["AdminServices", "ServiceStats"],
    }),
    updateService: builder.mutation<
      ApiResponse<null>,
      { id: string; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/admin/services/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["AdminServices"],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServiceCategoriesQuery,
  useGetAdminServicesQuery,
  useGetAdminServiceByIdQuery,
  useGetServiceStatsQuery,
  useUpdateServiceStatusMutation,
  useDeleteServiceMutation,
  useCreateServiceMutation,
  useUpdateServiceMutation,
} = serviceApi;
