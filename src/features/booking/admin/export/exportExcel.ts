import { exportToExcel } from "@/lib/utils/excel";
import { formatDate } from "@/lib/utils";

export const exportBookingsToExcel = (bookings: any[]) => {
  const summaryData = bookings.map((b) => ({
    "Mã Booking": b.bookingCode,
    "Khách Hàng": b.customerName || "",
    "Số Điện Thoại": b.customerPhone || "",
    "Tổng Tiền Phòng": b.totalRoom,
    "Tổng Tiền Dịch Vụ": b.totalService,
    "Mã Ưu Đãi": b.promotionCode || "",
    "Tiền Giảm giá": b.discount,
    "Thuế VAT (10%)": b.taxAmount,
    "Tổng Thanh Toán": b.totalAmount,
    "PT Thanh Toán": b.paymentMethod || "",
    "Trạng Thái": b.displayAs || "",
  }));

  const roomData = bookings.flatMap((b) =>
    b.rooms.map((r: any) => ({
      "Mã Booking": b.bookingCode,
      "Mã Phòng": r.roomNumber || "",
      "Tên Phòng": r.roomName,
      "Loại Phòng": r.roomType || "",
      "Ngày Check-in": formatDate(new Date(b.checkInDate), "dd/MM/yyyy"),
      "Ngày Check-out": formatDate(new Date(b.checkOutDate), "dd/MM/yyyy"),
      "Số Đêm": r.nights,
      "Giá Phòng/Đêm": r.pricePerNight,
      "Thành Tiền Phòng": r.pricePerNight * r.nights,
    })),
  );

  const serviceData = bookings.flatMap((b) =>
    b.services.map((s: any) => ({
      "Mã Booking": b.bookingCode,
      "Tên Dịch Vụ": s.serviceName,
      "Danh Mục": s.categoryName || "",
      "Đơn Giá": s.quantity > 0 ? s.totalPrice / s.quantity : 0,
      "Số Lượng": s.quantity,
      "Thành Tiền Dịch Vụ": s.totalPrice,
    })),
  );

  exportToExcel(
    [
      { sheetName: "Hoa_Don_Tong_Hop", data: summaryData },
      { sheetName: "Chi_Tiet_Phong", data: roomData },
      { sheetName: "Chi_Tiet_Dich_Vu", data: serviceData },
    ],
    "Bao_Cao_Dat_Phong",
  );
};
