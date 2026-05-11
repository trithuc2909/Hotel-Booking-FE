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

export type BookingHistoryRoom = {
  roomId: string;
  roomName: string;
  pricePerNight: number;
  nights: number;
  thumbnailUrl: string | null;
};

export type BookingHistoryService = {
  serviceName: string;
  quantity: number;
  unit: string;
  totalPrice: number;
};

export type BookingHistoryPayment = {
  paymentStatus: string;
  paymentMethod: string;
  paidAt: string | null;
  amount: number;
};

export type BookingHistoryStatus = {
  code: string;
  displayAs: string;
};

export type BookingHistoryItem = {
  id: string;
  bookingCode: string;
  status: BookingHistoryStatus;
  checkInDate: string;
  checkOutDate: string;
  totalNights: number;
  totalAmount: number;
  createdOn: string | null;
  rooms: BookingHistoryRoom[];
  services: BookingHistoryService[];
  latestPayment: BookingHistoryPayment | null;
};

export type BookingDetailRoom = {
  id: string;
  roomId: string;
  roomName: string;
  pricePerNight: number;
  nights: number;
  thumbnailUrl: string | null;
};

export type BookingDetailService = {
  id: string;
  serviceName: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
};

export type BookingDetailPayment = {
  id: string;
  orderId: string;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  paidAt: string | null;
};

export type BookingDetailCustomer = {
  fullName: string | null;
  phone: string;
  email: string | null;
};

export type BookingDetailStatus = {
  code: string;
  displayAs: string;
};

export type BookingDetailItem = {
  id: string;
  bookingCode: string;
  status: BookingDetailStatus;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  totalNights: number;
  totalService: number;
  taxAmount: number;
  discount: number;
  totalAmount: number;
  notes?: string;
  createdOn: string | null;
  expiresAt: string | null;
  customer: BookingDetailCustomer | null;
  rooms: BookingDetailRoom[];
  services: BookingDetailService[];
  payments: BookingDetailPayment[];
};

export type SelectedService = {
  id: string;
  name: string;
  basePrice: number;
  unit: string;
  categoryName: string;
  categoryIcon: string;
};
