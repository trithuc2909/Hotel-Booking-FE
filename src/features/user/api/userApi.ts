import { customBaseQueryWithReauth } from "@/lib/api/baseQuery";
import { ApiResponse } from "@/types/common";
import {
    ChangePasswordRequest,
  UpdateUserProfileRequest,
  UserProfileResponse,
} from "@/features/user/types/user.type";
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
    updateUserProfile: builder.mutation<
      ApiResponse<UserProfileResponse>,
      UpdateUserProfileRequest
    >({
      query: (body) => ({
        url: "/users/profile",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Me"],
    }),
    uploadUserAvatar: builder.mutation<
      ApiResponse<{ avatarUrl: string }>,
      FormData
    >({
      query: (formData) => ({
        url: "/users/profile/avatar",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Me"],
    }),
    changePassword: builder.mutation<ApiResponse<null>, ChangePasswordRequest>({
      query: (body) => ({
        url: "/users/password",
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const {
  useGetMeQuery,
  useUpdateUserProfileMutation,
  useUploadUserAvatarMutation,
  useChangePasswordMutation,
} = userApi;
