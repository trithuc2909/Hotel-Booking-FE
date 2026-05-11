import { BookingDetailRoom } from "../types/booking.type";

export const calculateRoomTotal = (rooms: BookingDetailRoom[]) =>
  rooms.reduce((sum, r) => sum + r.pricePerNight * r.nights, 0);
