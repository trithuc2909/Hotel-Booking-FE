import { useGetBookingByIdQuery } from "../api/bookingApi";
import { canCancelBooking } from "../services/canCancelBooking";
import { calculateRoomTotal } from "../utils/calculateRoomTotal";

export function useBookingDetail(id: string) {
  const { data, isLoading, isError } = useGetBookingByIdQuery(id);
  const booking = data?.data;

  const canCancel = booking
    ? canCancelBooking(booking.status.code, booking.checkInDate)
    : false;

  const roomTotal = booking ? calculateRoomTotal(booking.rooms) : 0;

  return { booking, isLoading, isError, canCancel, roomTotal };
}
