import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date
export function formatDate(
  date: Date | string,
  formatStr: string = "dd/MM/yyyy",
): string {
  if (!date) return "-";
  return format(new Date(date), formatStr);
}

// Format currency
export function formatCurrency(amount: number | null | undefined): string {
  if (amount == null || isNaN(amount)) return "-";
  return amount.toLocaleString("vi-VN") + " đ";
}

// Validate email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
