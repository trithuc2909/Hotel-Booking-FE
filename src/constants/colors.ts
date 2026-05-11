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

// Export individual colors for convenience
export const { primary, neutral, status, background } = colors;
