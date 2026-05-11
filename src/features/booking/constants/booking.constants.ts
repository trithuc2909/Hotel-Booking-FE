export const BOOKING_STATUS_LABEL: Record<string, string> = {
  PND: "Chờ xác nhận",
  PPY: "Chờ thanh toán",
  CFM: "Đã thanh toán",
  CHK: "Đang lưu trú",
  CKO: "Đã hoàn thành",
  CAN: "Đã hủy",
  NSW: "Không đến",
  EXP: "Hết hạn",
} as const;

export const BOOKING_HISTORY_TABS = [
  { key: "ALL", label: "Tất cả" },
  { key: "CFM", label: BOOKING_STATUS_LABEL.CFM },
  { key: "CKO", label: BOOKING_STATUS_LABEL.CKO },
  { key: "CAN", label: BOOKING_STATUS_LABEL.CAN },
] as const;

export const CANCELLABLE_STATUSES = ["PPY", "CFM"] as const;
