export interface CreateBookingRequest {
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  promotionId?: string;
  rooms: { roomId: string }[];
  services: { serviceId: string; quantity: number }[];
}

export interface CreateBookingResponse {
  bookingId: string;
  bookingCode: string;
  totalAmount: number;
  status: string;
}

export interface CreateVNPayPaymentResponse {
  payUrl: string;
  orderId: string;
}
