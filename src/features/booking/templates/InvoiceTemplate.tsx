import React from "react";
import { fmtDateTime, formatCurrency, formatDate } from "@/lib/utils";
import {
  Calendar,
  User,
  Bed,
  ShieldCheck,
  CreditCard,
  Bell,
  FileText,
  Heart,
  Phone,
  MapPin,
  Clock,
  Shield,
} from "lucide-react";

interface InvoiceTemplateProps {
  data: any;
}

const InvoiceTemplate = React.forwardRef<HTMLDivElement, InvoiceTemplateProps>(
  ({ data }, ref) => {
    if (!data) return null;

    const totalAmount = data.totalAmount || 0;
    const totalService = data.totalService || 0;
    const taxAmount = data.taxAmount || 0;

    const roomTotal = totalAmount - totalService - taxAmount;

    const paidPayment = data.payments?.find(
      (p: any) => p.paymentStatus === "SCS",
    );

    return (
      <div
        ref={ref}
        className="invoice-wrapper p-10 bg-white mx-auto text-sm text-gray-800 font-sans border border-gray-200 shadow-lg flex flex-col justify-between"
        style={{ width: "210mm", height: "297mm", boxSizing: "border-box" }}
      >
        <div className="flex-grow flex flex-col justify-between mb-6">
          <div className="flex justify-between items-center border-b-2 border-blue-600 pb-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo-default.jpg"
                alt="Logo"
                className="h-16 w-auto object-contain"
              />
              <div>
                <h2 className="text-xl font-bold text-blue-900 leading-tight">
                  BULLMAN HOTEL
                </h2>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                  Premium Stay Experience
                </p>
              </div>
            </div>

            <div className="text-center flex-1 mx-4">
              <h1 className="text-2xl font-extrabold text-blue-900 tracking-tight">
                HÓA ĐƠN ĐẶT PHÒNG
              </h1>
              <div className="w-32 h-0.5 bg-gray-200 mx-auto my-1"></div>
              <p className="text-[10px] font-bold text-gray-400 tracking-wider">
                BOOKING INVOICE
              </p>
            </div>

            <div className="mr-2 text-right text-xs">
              <p>
                <span className="text-gray-500 font-semibold">
                  Mã đặt phòng:
                </span>{" "}
                <span className="font-bold text-blue-900 text-sm ml-2">
                  {data.bookingCode}
                </span>
              </p>
              <p className="mt-1">
                <span className="text-gray-500 font-semibold">Ngày đặt:</span>{" "}
                <span className="font-medium ml-2">
                  {formatDate(new Date(data.createdOn), "dd/MM/yyyy")}
                </span>
              </p>
              <p className="mt-1 flex items-center justify-end">
                <span className="text-gray-500 font-semibold mr-2">
                  Trạng thái:
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-700 border border-green-200">
                  ● {data.status?.displayAs || "Đã hoàn thành"}
                </span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-8 flex-grow items-stretch my-6">
            <div className="col-span-3 flex flex-col justify-between">
              <div className="border border-gray-100 rounded-lg p-5 shadow-sm bg-white">
                <h2 className="text-sm font-bold text-blue-900 flex items-center gap-2 mb-3">
                  <Calendar size={16} className="text-blue-600" />
                  1. THÔNG TIN LƯU TRÚ
                </h2>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">
                      Ngày nhận phòng:
                    </span>
                    <span className="font-semibold text-gray-800">
                      {formatDate(new Date(data.checkInDate), "dd/MM/yyyy")} -
                      Sau 14:00
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">
                      Ngày trả phòng:
                    </span>
                    <span className="font-semibold text-gray-800">
                      {formatDate(new Date(data.checkOutDate), "dd/MM/yyyy")} -
                      Trước 12:00
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Số đêm:</span>
                    <span className="font-semibold text-gray-800">
                      {data.totalNights} đêm
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Số khách:</span>
                    <span className="font-semibold text-gray-800">
                      {data.numberOfGuests} khách
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Số phòng:</span>
                    <span className="font-semibold text-gray-800">
                      {data.rooms?.length || 0} phòng
                    </span>
                  </div>
                </div>
              </div>

              <div className="border border-gray-100 rounded-lg p-5 shadow-sm bg-white">
                <h2 className="text-sm font-bold text-blue-900 flex items-center gap-2 mb-3">
                  <User size={16} className="text-blue-600" />
                  2. THÔNG TIN KHÁCH HÀNG
                </h2>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Họ tên:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800">
                        {data.customer?.fullName}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Email:</span>
                    <span className="font-semibold text-gray-800">
                      {data.customer?.email}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">
                      Số điện thoại:
                    </span>
                    <span className="font-semibold text-gray-800">
                      {data.customer?.phone}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border border-gray-100 rounded-lg p-5 shadow-sm bg-white">
                <h2 className="text-sm font-bold text-blue-900 flex items-center gap-2 mb-3">
                  <Bed size={16} className="text-blue-600" />
                  3. CHI TIẾT ĐẶT PHÒNG
                </h2>
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 font-bold uppercase text-[10px] tracking-wider">
                      <th className="py-2 px-3 text-left">Tên phòng</th>
                      <th className="py-2 px-3 text-center">Số lượng</th>
                      <th className="py-2 px-3 text-right">Đơn giá</th>
                      <th className="py-2 px-3 text-right">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.rooms?.map((room: any, idx: number) => (
                      <tr key={idx} className="border-t border-gray-100">
                        <td className="py-2 px-3 font-medium text-gray-800">
                          {room.roomName || "Phòng"}
                        </td>
                        <td className="py-2 px-3 text-center text-gray-600">
                          1
                        </td>
                        <td className="py-2 px-3 text-right text-gray-600">
                          {formatCurrency(room.pricePerNight)}đ
                        </td>
                        <td className="py-2 px-3 text-right font-semibold text-gray-800">
                          {formatCurrency(
                            room.pricePerNight *
                              (room.nights || data.totalNights),
                          )}
                          đ
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-between mt-3 pt-2 border-t border-dashed border-gray-200">
                  <span className="text-xs font-bold text-blue-900 uppercase">
                    Tổng tiền phòng
                  </span>
                  <span className="text-sm font-extrabold text-blue-900">
                    {formatCurrency(roomTotal)}đ
                  </span>
                </div>
              </div>

              <div className="border border-gray-100 rounded-lg p-5 shadow-sm bg-white">
                <h2 className="text-sm font-bold text-blue-900 flex items-center gap-2 mb-2">
                  <ShieldCheck size={16} className="text-blue-600" />
                  5. CHÍNH SÁCH HỦY PHÒNG
                </h2>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Miễn phí hủy phòng trước 48 giờ trước ngày nhận phòng. Sau
                  thời gian này, phí hủy sẽ là 100% tổng tiền phòng.
                </p>
              </div>
            </div>

            <div className="col-span-2 flex flex-col justify-between">
              <div className="border border-gray-100 rounded-lg p-5 shadow-sm bg-white">
                <h2 className="text-sm font-bold text-blue-900 flex items-center gap-2 mb-3">
                  <CreditCard size={16} className="text-blue-600" />
                  6. CHI TIẾT THANH TOÁN
                </h2>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">
                      Tiền phòng
                    </span>
                    <span className="font-semibold text-gray-800">
                      {formatCurrency(roomTotal)}đ
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">
                      Dịch vụ đi kèm
                    </span>
                    <span className="font-semibold text-gray-800">
                      {formatCurrency(totalService)}đ
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Thuế</span>
                    <span className="font-semibold text-gray-800">
                      {formatCurrency(taxAmount)}đ
                    </span>
                  </div>
                </div>
                <div className="border-t border-dashed border-gray-200 my-3"></div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-bold text-blue-900 uppercase">
                    Tổng cộng
                  </span>
                  <span className="text-xl font-extrabold text-blue-900">
                    {formatCurrency(totalAmount)}đ
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold text-green-700">
                    ĐÃ THANH TOÁN
                  </p>
                  <p className="text-[10px] text-xs text-green-600 mt-0.5">
                    Phương thức thanh toán: {paidPayment?.paymentMethod || "Chuyển khoản"}
                  </p>
                  {paidPayment?.paidAt && (
                    <p className="text-[10px] text-xs text-green-600 mt-0.5">
                      Thời gian: {fmtDateTime(paidPayment.paidAt)}
                    </p>
                  )}
                </div>
              </div>

              <div className="border border-gray-100 rounded-lg p-5 shadow-sm bg-white flex-grow my-4">
                <h2 className="text-sm font-bold text-blue-900 flex items-center gap-2 mb-3">
                  <Bell size={16} className="text-blue-600" />
                  7. DỊCH VỤ ĐI KÈM
                </h2>
                {data.services?.length === 0 ? (
                  <p className="text-xs text-gray-400 italic">
                    Không có dịch vụ
                  </p>
                ) : (
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-gray-500 font-bold uppercase text-[10px] tracking-wider border-b border-gray-100">
                        <th className="py-1 text-left">Dịch vụ</th>
                        <th className="py-1 text-right">Giá</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.services?.map((svc: any, idx: number) => (
                        <tr
                          key={idx}
                          className="border-b border-gray-50 last:border-0"
                        >
                          <td className="py-2 text-gray-700 font-medium">
                            {idx + 1}. {svc.quantity}x {svc.serviceName}
                          </td>
                          <td className="py-2 text-right text-gray-800 font-semibold">
                            {formatCurrency(svc.totalPrice)}đ
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                <div className="flex justify-between mt-2 pt-2 border-t border-dashed border-gray-200">
                  <span className="text-xs font-bold text-blue-900 uppercase">
                    Tổng tiền dịch vụ
                  </span>
                  <span className="text-sm font-bold text-blue-900">
                    {formatCurrency(totalService)}đ
                  </span>
                </div>
              </div>

              <div className="border border-gray-100 rounded-lg p-5 shadow-sm bg-white">
                <h2 className="text-sm font-bold text-blue-900 flex items-center gap-2 mb-2">
                  <FileText size={16} className="text-blue-600" />
                  8. GHI CHÚ
                </h2>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {data.notes || "Không có ghi chú"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          {/* Footer Info */}
          <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-100 text-[11px] leading-relaxed">
            <div className="flex items-start gap-2">
              <Phone size={14} className="text-blue-600 mt-0.5" />
              <div>
                <p className="font-bold text-blue-900">LIÊN HỆ</p>
                <p className="text-xs text-gray-500">+84 123 456 789</p>
                <p className="text-xs text-gray-500">bullmanhotel@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin size={14} className="text-blue-600 mt-0.5" />
              <div>
                <p className="font-bold text-blue-900">ĐỊA CHỈ</p>
                <p className="text-xs text-gray-500">
                  Số 14, Nam Kỳ Khởi Nghĩa, Phường 1, Thành phố Đà Lạt, tỉnh Lâm
                  Đồng
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock size={14} className="text-blue-600 mt-0.5" />
              <div>
                <p className="font-bold text-blue-900">GIỜ LÀM VIỆC</p>
                <p className="text-xs text-gray-500">24/7 - Luôn sẵn sàng</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Shield size={14} className="text-blue-600 mt-0.5" />
              <div>
                <p className="font-bold text-blue-900">CAM KẾT</p>
                <p className="text-xs text-gray-500">
                  Thông tin bảo mật. Tuyệt đối an toàn.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-6 bg-blue-900 text-white p-4 rounded-lg">
            <Heart size={14} className="text-white mx-auto mb-1 fill-white" />
            <p className="text-sm font-bold">
              Cảm ơn bạn đã lựa chọn chúng tôi!
            </p>
            <p className="text-[11px] text-blue-200 mt-0.5">
              Chúc bạn có một kỳ nghỉ tuyệt vời và đáng nhớ.
            </p>
          </div>
        </div>
      </div>
    );
  },
);

InvoiceTemplate.displayName = "InvoiceTemplate";
export default InvoiceTemplate;
