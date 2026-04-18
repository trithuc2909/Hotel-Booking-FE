import { ApiResponse } from "../../../types/common";

// Auth data (tokens)
export interface AuthData {
  accessToken: string;
  refreshToken: string;
}

// Register data
export interface RegisterData {
  userId: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface VerifyOTPRequest {
  userId: string;
  otp: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

// Wrapped responses
export type AuthResponse = ApiResponse<AuthData>;
export type RegisterResponse = ApiResponse<RegisterData>;
