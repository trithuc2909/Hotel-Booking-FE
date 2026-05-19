import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  role: string | null;
}

const decodeToken = (token: string | undefined) => {
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const rawBinary = typeof window !== 'undefined'
      ? window.atob(base64)
      : Buffer.from(base64, 'base64').toString('binary');
    const jsonPayload = decodeURIComponent(
      rawBinary
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

const getInitialState = (): AuthState => {
  const token = Cookies.get("access_token");
  const decoded = decodeToken(token);
  return {
    isAuthenticated: !!token,
    userId: decoded?.userId || null,
    role: decoded?.role || null,
  };
};

const initialState: AuthState = getInitialState();

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
      const decoded = decodeToken(action.payload.accessToken);
      state.userId = decoded?.userId || null;
      state.role = decoded?.role || null;
    },

    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },

    logout: (state) => {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      state.isAuthenticated = false;
      state.userId = null;
      state.role = null;
    },
  },
});

export const { setAuth, setUserId, logout } = authSlice.actions;
export default authSlice.reducer;
