import { customBaseQueryWithReauth } from "@/lib/api/baseQuery";
import { ApiResponse, PaginationMeta } from "@/types/common";
import {
  AdminRoomsFilter,
  RoomResponse,
  RoomsFilter,
} from "@/types/response/room";
import { createApi } from "@reduxjs/toolkit/query/react";
import { Filter } from "lucide-react";

export const roomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: customBaseQueryWithReauth,
  tagTypes: ["Rooms", "AdminRooms"],
  endpoints: (builder) => ({
    getRooms: builder.query<ApiResponse<RoomResponse[]>, RoomsFilter>({
      query: (filter = {}) => {
        const params = new URLSearchParams();
        if (filter.roomTypeCode)
          params.set("roomTypeCode", filter.roomTypeCode);
        if (filter.guests) params.set("guests", String(filter.guests));
        if (filter.limit) params.set("limit", String(filter.limit));
        if (filter.checkIn) params.set("checkIn", filter.checkIn);
        if (filter.checkOut) params.set("checkOut", filter.checkOut);
        if (filter.minPrice !== undefined)
          params.set("minPrice", String(filter.minPrice));
        if (filter.maxPrice !== undefined)
          params.set("maxPrice", String(filter.maxPrice));
        if (filter.pageNum) params.set("pageNum", String(filter.pageNum));
        if (filter.pageSize) params.set("pageSize", String(filter.pageSize));
        return { url: `/rooms?${params.toString()}` };
      },
      providesTags: ["Rooms"],
    }),
    getRoomById: builder.query<ApiResponse<RoomResponse>, { id: string }>({
      query: ({ id }) => `/rooms/${id}`,
    }),
    getAdminRooms: builder.query<
      ApiResponse<RoomResponse[]>,
      AdminRoomsFilter
    >({
      query: (filter = {}) => {
        const params = new URLSearchParams();
        if (filter.search) params.set("search", filter.search);
        if (filter.roomTypeCode)
          params.set("roomTypeCode", filter.roomTypeCode);
        if (filter.status) params.set("status", filter.status);
        if (filter.sortBy) params.set("sortBy", filter.sortBy);
        if (filter.sortDirection)
          params.set("sortDirection", filter.sortDirection);
        if (filter.pageNum) params.set("pageNum", String(filter.pageNum));
        if (filter.pageSize) params.set("pageSize", String(filter.pageSize));
        if (filter.minPrice !== undefined)
          params.set("minPrice", String(filter.minPrice));
        if (filter.maxPrice !== undefined)
          params.set("maxPrice", String(filter.maxPrice));
        return { url: `/admin/rooms?${params.toString()}` };
      },
      providesTags: ["AdminRooms"],
    }),
  }),
});

export const { useGetRoomsQuery, useGetRoomByIdQuery, useGetAdminRoomsQuery } =
  roomApi;
