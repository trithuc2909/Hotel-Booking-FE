export const IMAGE_MAX_SIZE = 5 * 1024 * 1024;
export const MAX_IMAGES = 4;
export const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const BED_TYPE_MAP: Record<string, string> = {
  Single: "Giường đơn",
  Double: "Giường đôi",
  Triple: "Giường ba",
} as const;

export const STATUS = {
  ACTIVE: "ACT",
  INACTIVE: "INA",
  DELETED: "DEL",
  PENDING: "PND",
  EXPIRED: "EXP",
  BANNED: "BAN",
  SUSPENDED: "SUS",
} as const;
