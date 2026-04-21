import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/slices/authSlice";
import { authApi } from "@/features/auth/api/authApi";
import { userApi } from "@/features/user/api/userApi";
import { roomApi } from "@/features/room/api/roomApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { lookupApi } from "@/features/room/api/lookupApi";
import { serviceApi } from "@/features/service/api/serviceApi";

export const store = configureStore({
  reducer: {
    // Slices
    auth: authReducer,

    // RTK Query APIs
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
    [lookupApi.reducerPath]: lookupApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      roomApi.middleware,
      lookupApi.middleware,
      serviceApi.middleware,
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
