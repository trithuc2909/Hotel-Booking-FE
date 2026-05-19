import {
  CheckCircle2,
  Clock,
  XCircle,
  LogIn,
  LogOut,
  AlertOctagon,
} from "lucide-react";

export const colors = {
  // Primary Colors
  primary: {
    blue: "#0D99FF",
    darkBlue: "#0B30A7",
    borderBlue: "#0057FF",
  },

  // Neutral Colors
  neutral: {
    white: "#FFFFFF",
    black: "#000000",
    gray: "#C4C4C4",
  },

  // Status Colors
  status: {
    error: "#FF0000",
    success: "#10B981",
    warning: "#F59E0B",
  },

  // Background Colors
  background: {
    main: "#FFFFFF",
    secondary: "#F9FAFB",
    dark: "#1F2937",
  },
} as const;

export const buttonColors = {
  primary: {
    background: colors.primary.blue,
    text: colors.neutral.white,
    hover: "#0B7FDB",
  },
  outline: {
    background: colors.neutral.white,
    border: colors.primary.borderBlue,
    text: colors.primary.borderBlue,
    hover: "#F0F9FF",
  },
  ghost: {
    background: "transparent",
    text: colors.primary.darkBlue,
    hover: "#F0F9FF",
  },
} as const;

export const textColors = {
  primary: colors.primary.darkBlue,
  secondary: colors.neutral.gray,
  white: colors.neutral.white,
  error: colors.status.error,
} as const;

export const borderColors = {
  default: colors.neutral.gray,
  primary: colors.primary.borderBlue,
  error: colors.status.error,
} as const;

export const STATUS_COLOR: Record<string, string> = {
  PND: "bg-yellow-100 text-yellow-700",
  PPY: "bg-orange-100 text-orange-700",
  CFM: "bg-blue-100 text-blue-700",
  CHK: "bg-indigo-100 text-indigo-700",
  CKO: "bg-emerald-100 text-emerald-700",
  CAN: "bg-red-100 text-red-600",
  NSW: "bg-gray-100 text-gray-600",
  EXP: "bg-gray-100 text-gray-500",
};

export const STATUS_CONFIG: Record<
  string,
  { color: string; bg: string; text: string; Icon: any }
> = {
  PND: {
    color: "#F59E0B",
    bg: "bg-yellow-50",
    text: "text-yellow-600",
    Icon: Clock,
  },
  PPY: {
    color: "#F59E0B",
    bg: "bg-orange-50",
    text: "text-orange-600",
    Icon: Clock,
  },
  CFM: {
    color: "#0D99FF",
    bg: "bg-blue-50",
    text: "text-blue-600",
    Icon: CheckCircle2,
  },
  CHK: {
    color: "#10B981",
    bg: "bg-green-50",
    text: "text-green-600",
    Icon: LogIn,
  },
  CKO: {
    color: "#059669",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    Icon: LogOut,
  },
  CAN: {
    color: "#EF4444",
    bg: "bg-red-50",
    text: "text-red-600",
    Icon: XCircle,
  },
  NSW: {
    color: "#DC2626",
    bg: "bg-red-100",
    text: "text-red-700",
    Icon: AlertOctagon,
  },
};

export const DEFAULT_CONFIG = {
  color: "#9CA3AF",
  bg: "bg-gray-50",
  text: "text-gray-500",
  Icon: Clock,
};

export const { primary, neutral, status, background } = colors;
