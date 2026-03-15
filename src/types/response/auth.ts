import { ApiResponse } from "../common";

// Auth data (tokens)
export interface AuthData {
  accessToken: string;
  refreshToken: string;
}

// Register data
export interface RegisterData {
  userId: string;
}

// Wrapped responses
export type AuthResponse = ApiResponse<AuthData>;
export type RegisterResponse = ApiResponse<RegisterData>;
