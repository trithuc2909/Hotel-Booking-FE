import { ApiResponse } from "@/types/common";
import { RoomResponse, RoomsFilter } from "@/types/response/room";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const roomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  tagTypes: ["Rooms"],
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
        if (filter.pageNum) params.set("pageNum", String(filter.pageNum))
        if (filter.pageSize) params.set("pageSize", String(filter.pageSize))
        return { url: `/rooms?${params.toString()}` };     
      },
      providesTags: ["Rooms"],
    }),
  }),
});

export const { useGetRoomsQuery } = roomApi;
