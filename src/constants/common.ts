export const IMAGE_MAX_SIZE = 5 * 1024 * 1024;
export const MAX_IMAGES = 4;
export const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const TAX_RATE = 0.1;

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

export const STATUS_TYPE = {
  ROOM_STATUS: "ROOM_STATUS",
  BOOKING_STATUS: "BOOKING_STATUS",
  SERVICE_STATUS: "SERVICE_STATUS",
} as const;

export const PAYMENT_METHOD = {
  CASH: "CASH",
  BANK_TRANSFER: "BANK_TRANSFER",
  CREDIT_CARD: "CREDIT_CARD",
  MOMO: "MOMO",
  VNPAY: "VNPAY",
} as const;

export const ROLE = {
  ADMIN: "ADMIN",
  USER: "USER",
  SYSTEM: "SYSTEM",
} as const;

export type RoleCode = (typeof ROLE)[keyof typeof ROLE];
