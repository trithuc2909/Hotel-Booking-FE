export const CANCEL_DEADLINE_HOURS = 48;

export const canCancelBooking = (
  status: string,
  checkInDate: string,
): boolean => {
  if (status === "PPY") return true;
  if (status === "CFM") {
    const hoursLeft =
      (new Date(checkInDate).getTime() - Date.now()) / 3_600_000;
    return hoursLeft >= CANCEL_DEADLINE_HOURS;
  }
  return false;
};