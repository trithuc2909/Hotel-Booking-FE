import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { authApi } from "./feature/auth/authApi";
import { userApi } from "./feature/user/userApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { roomApi } from "./feature/room/roomApi";

export const store = configureStore({
  reducer: {
    // Slices
    auth: authReducer,

    // RTK Query APIs
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, userApi.middleware, roomApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
