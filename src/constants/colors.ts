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

// Export individual colors for convenience
export const { primary, neutral, status, background } = colors;
