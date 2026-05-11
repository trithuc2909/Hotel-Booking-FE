// Views
export { default as BookingDetailView } from "./views/BookingDetailView";
export { default as BookingHistoryView } from "./views/BookingHistoryView";

// Components
export { default as BookingHeader } from "./components/BookingHeader";
export { default as BookingRoomsTable } from "./components/BookingRoomsTable";
export { default as BookingStatusBadge } from "./components/BookingStatusBadge";
export { default as CancelBookingDialog } from "./components/CancelBookingDialog";
export { default as CustomerCard } from "./components/CustomerCard";
export { default as PaymentSummaryCard } from "./components/PaymentSummaryCard";
export { ServicesCard, NotesCard } from "./components/ServicesCard";
export { default as StayInfoCard } from "./components/StayInfoCard";
export { default as SupportCard } from "./components/SupportCard";

// Hooks
export { useBookingDetail } from "./hooks/useBookingDetail";

// Services
export { canCancelBooking, CANCEL_DEADLINE_HOURS } from "./services/canCancelBooking";

// Utils
export { calculateRoomTotal } from "./utils/calculateRoomTotal";

// Mappers
export { mapBookingDetailToViewModel } from "./mappers/booking.mapper";
export type { BookingDetailViewModel } from "./mappers/booking.mapper";

// Types
export type {
  BookingDetailItem,
  BookingDetailRoom,
  BookingDetailService,
  BookingDetailPayment,
  BookingDetailCustomer,
  BookingDetailStatus,
  BookingHistoryItem,
  SelectedService,
} from "./types/booking.type";

// Constants
export {
  BOOKING_STATUS_LABEL,
  BOOKING_HISTORY_TABS,
  CANCELLABLE_STATUSES,
} from "./constants/booking.constants";
