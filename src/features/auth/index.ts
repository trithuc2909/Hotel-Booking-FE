// Public API of the auth feature

// Components
export { default as LoginForm } from "./components/login-form";
export { default as RegisterForm } from "./components/register-form";
export { default as ForgotPasswordForm } from "./components/forgot-password-form";
export { default as ResetPasswordForm } from "./components/reset-password-form";
export { default as VerifyOTPForm } from "./components/verify-otp-form";

// Hooks
export { useLogin } from "./hooks/useLogin";
export { useRegister } from "./hooks/useRegister";

// Slices
export { setAuth, setUserId, logout } from "./slices/authSlice";

// Types
export type * from "./types/auth.type";

// Schemas
export { loginSchema, registerSchema } from "./schemas/auth.schema";
export type { LoginFormData, RegisterFormData } from "./schemas/auth.schema";
