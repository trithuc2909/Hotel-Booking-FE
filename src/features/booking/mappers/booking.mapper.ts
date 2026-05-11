import { canCancelBooking } from "../services/canCancelBooking";
import { BookingDetailItem } from "../types/booking.type";
import { calculateRoomTotal } from "../utils/calculateRoomTotal";

export type BookingDetailViewModel = BookingDetailItem & {
  canCancel: boolean;
  roomTotal: number;
  customerName: string;
};

export function mapBookingDetailToViewModel(
  dto: BookingDetailItem,
): BookingDetailViewModel {
  return {
    ...dto,
    customerName: dto.customer?.fullName ?? "Khách vãng lai",
    canCancel: canCancelBooking(dto.status.code, dto.checkInDate),
    roomTotal: calculateRoomTotal(dto.rooms),
  };
}
