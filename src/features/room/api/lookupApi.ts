import { customBaseQueryWithReauth } from "@/lib/api/baseQuery";
import { ApiResponse } from "@/types/common";
import { createApi } from "@reduxjs/toolkit/query/react";
import { AmenityResponse, RoomTypeResponse } from "../types/room.type";

export const lookupApi = createApi({
  reducerPath: "lookupApi",
  baseQuery: customBaseQueryWithReauth,
  endpoints: (builder) => ({
    getRoomTypes: builder.query<ApiResponse<RoomTypeResponse[]>, void>({
      query: () => "lookup/room-types",
    }),
    getAmenities: builder.query<ApiResponse<AmenityResponse[]>, void>({
      query: () => "lookup/amenities",
    }),
  }),
});

export const { useGetRoomTypesQuery, useGetAmenitiesQuery } = lookupApi;
