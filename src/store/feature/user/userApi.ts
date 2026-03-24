import { customBaseQueryWithReauth } from "@/lib/api/baseQuery";
import { ApiResponse } from "@/types/common";
import { UserProfileResponse } from "@/types/response/user";
import { createApi } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: customBaseQueryWithReauth,
    tagTypes: ["Me"],
    endpoints: (builder) => ({
        getMe: builder.query<ApiResponse<UserProfileResponse>, void>({
            query: () => ({
                url: "/users/me",
                method: "GET",
            }),
            providesTags: ["Me"],
        }),
    }),
});

export const { useGetMeQuery } = userApi;