import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
}

const initialState: AuthState = {
  isAuthenticated: !!Cookies.get("access_token"),
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>,
    ) => {
      Cookies.set("access_token", action.payload.accessToken);
      Cookies.set("refresh_token", action.payload.refreshToken);
      state.isAuthenticated = true;
    },

    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },

    logout: (state) => {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      state.isAuthenticated = false;
      state.userId = null;
    },
  },
});

export const { setAuth, setUserId, logout } = authSlice.actions;
export default authSlice.reducer;
