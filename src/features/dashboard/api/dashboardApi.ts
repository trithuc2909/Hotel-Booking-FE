import { customBaseQueryWithReauth } from "@/lib/api/baseQuery";
import { ApiResponse } from "@/types/common";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  DashboardStatsPeriod,
  DashboardStatsResponse,
  DailyRevenueResponse,
  RoomTimelineRequest,
  RoomTimelineResponse,
} from "../types/dashboard.type";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: customBaseQueryWithReauth,
  tagTypes: ["Dashboard"],
  endpoints: (builder) => ({
    getDashboardStats: builder.query<
      ApiResponse<DashboardStatsResponse>,
      { period?: DashboardStatsPeriod | null; month?: string | null }
    >({
      query: ({ period, month }) => {
        const params = new URLSearchParams();
        if (period) params.append("period", period);
        if (month) params.append("month", month);
        return {
          url: `/admin/dashboard/stats?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Dashboard"],
    }),
    getDailyRevenue: builder.query<
      ApiResponse<DailyRevenueResponse[]>,
      { period?: DashboardStatsPeriod | null; month?: string | null }
    >({
      query: ({ period, month }) => {
        const params = new URLSearchParams();
        if (period) params.append("period", period);
        if (month) params.append("month", month);
        return {
          url: `/admin/dashboard/revenue-by-day?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Dashboard"],
    }),
    getRoomTimeline: builder.query<
      ApiResponse<RoomTimelineResponse[]>,
      RoomTimelineRequest
    >({
      query: ({ from, to }) => ({
        url: `/admin/dashboard/room-timeline?from=${from}&to=${to}`,
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetDailyRevenueQuery,
  useGetRoomTimelineQuery,
} = dashboardApi;
