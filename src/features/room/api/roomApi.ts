import { customBaseQueryWithReauth } from "@/lib/api/baseQuery";
import { ApiResponse, PaginationMeta } from "@/types/common";
import {
  AdminRoomsFilter,
  RoomDetailResponse,
  RoomResponse,
  RoomsFilter,
} from "@/features/room/types/room.type";
import { createApi } from "@reduxjs/toolkit/query/react";

export const roomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: customBaseQueryWithReauth,
  tagTypes: ["Rooms", "AdminRooms", "AdminRoomDetail"],
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
    getAdminRoomById: builder.query<
      ApiResponse<RoomDetailResponse>,
      { id: string }
    >({
      query: ({ id }) => `admin/rooms/${id}`,
      providesTags: (result, error, { id }) => [
        { type: "AdminRoomDetail", id },
      ],
      keepUnusedDataFor: 0,
    }),
    getAdminRooms: builder.query<ApiResponse<RoomResponse[]>, AdminRoomsFilter>(
      {
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
      },
    ),
    updateRoomStatus: builder.mutation<
      ApiResponse<null>,
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `/admin/rooms/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["AdminRooms"],
    }),
    deleteRoom: builder.mutation<ApiResponse<null>, { id: string }>({
      query: ({ id }) => ({
        url: `/admin/rooms/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "AdminRoomDetail", id },
        "AdminRooms",
      ],
    }),
    createRoom: builder.mutation<ApiResponse<null>, FormData>({
      query: (body) => ({
        url: "/admin/rooms",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AdminRooms"],
    }),
    updateRoomById: builder.mutation<
      ApiResponse<null>,
      { id: string; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/admin/rooms/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["AdminRooms"],
    }),
  }),
});

export const {
  useGetRoomsQuery,
  useGetAdminRoomByIdQuery,
  useGetAdminRoomsQuery,
  useUpdateRoomStatusMutation,
  useDeleteRoomMutation,
  useCreateRoomMutation,
  useUpdateRoomByIdMutation,
} = roomApi;
