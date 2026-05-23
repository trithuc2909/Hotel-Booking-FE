import { useState } from "react";
import {
  useCreateVNPayPaymentMutation,
  useCreateBookingMutation,
} from "@/features/booking/api/bookingApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ConfirmBookingModal from "../admin/modals/ConfirmBookingModal";
import { PAYMENT_METHOD } from "@/constants/common";

interface UsePaymentHandlersProps {
  guestName: string;
  guestPhone: string;
  total: number;
  onSuccess?: () => void;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  selectedRooms: any[];
  selectedServices: any[];
  paymentMethod: string;
}

export const usePaymentHandlers = ({
  guestName,
  guestPhone,
  total,
  onSuccess,
  checkInDate,
  checkOutDate,
  guests,
  selectedRooms,
  selectedServices,
  paymentMethod,
}: UsePaymentHandlersProps) => {
  const [createVNPayPayment] = useCreateVNPayPaymentMutation();
  const [createBooking] = useCreateBookingMutation();
  const [showCashModal, setShowCashModal] = useState(false);
  const router = useRouter();
  const executeBooking = async () => {
    try {
      const payload = {
        checkInDate,
        checkOutDate,
        numberOfGuests: guests,
        rooms: selectedRooms.map((r) => ({ roomId: r.id })),
        services: selectedServices.map((s) => ({
          serviceId: s.id,
          quantity: s.quantity,
        })),
        paymentMethod,
        fullName: guestName,
        phone: guestPhone,
      };
      const response = await createBooking(payload).unwrap();
      if (response.succeeded) {
        const bookingId = response.data.bookingId;
        if (paymentMethod === PAYMENT_METHOD.CASH) {
          toast.success("Đặt phòng thành công!");
          onSuccess?.();
          router.push("/dashboard/bookings");
        } else if (paymentMethod === PAYMENT_METHOD.BANK_TRANSFER) {
          try {
            const paymentRes = await createVNPayPayment({ bookingId }).unwrap();
            window.location.href = paymentRes.data.payUrl;
          } catch (error: any) {
            toast.error(
              "Không thể kết nối cổng thanh toán VNPay. Booking đã được lưu!",
            );
          }
        }
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Có lỗi xảy ra khi đặt phòng");
    }
  };
  const handleConfirmBooking = async () => {
    if (!guestName || !guestPhone) {
      toast.error("Vui lòng nhập tên và số điện thoại khách hàng");
      return;
    }
    if (paymentMethod === PAYMENT_METHOD.CASH) {
      setShowCashModal(true);
    } else {
      await executeBooking();
    }
  };
  const ConfirmModal = () => (
    <ConfirmBookingModal
      isOpen={showCashModal}
      onClose={() => setShowCashModal(false)}
      onConfirm={executeBooking}
      total={total}
      guestName={guestName}
    />
  );
  return {
    handleConfirmBooking,
    ConfirmModal,
  };
};
