import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import Cookies from "js-cookie";
import { ValueOf } from "next/dist/shared/lib/constants";
import { error } from "console";
import { headers } from "next/headers";
import { resolve } from "path";
import { rejects } from "assert";

// Token refresh logic
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: any) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  failedQueue = [];
};

export const customBaseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const baseQuery = fetchBaseQuery({
    baseUrl,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = Cookies.get("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  let result = await baseQuery(args, api, extraOptions);

  // Handle 401 - Token expired
  if (result.error && result.error.status === 401) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(() => baseQuery(args, api, extraOptions))
        .catch((err) => ({ error: err }));
    }

    isRefreshing = true;
    try {
      // Attempt to refresh token
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh",
          method: "POST",
          credentials: "include",
        },
        api,
        extraOptions,
      );

      const accessToken = (refreshResult.data as any)?.accessToken;

      if (accessToken) {
        // Save new token
        Cookies.set("access_token", accessToken);
        processQueue(null, accessToken);
        // Retry original request
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Refresh token failed - redirect to login
        processQueue(new Error("Authentication failed"));
        if (
          typeof window !== "undefined" &&
          window.location.pathname !== "/login"
        ) {
          window.location.href = "/login";
        }
      }
    } catch (error) {
      processQueue(error);
    } finally {
      isRefreshing = false;
    }
  }
  return result;
};
