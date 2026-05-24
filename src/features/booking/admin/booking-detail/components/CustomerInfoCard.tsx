import { BookingDetailCustomer } from "@/features/booking/types/booking.type";
import { User } from "lucide-react";

type Props = {
  customer: BookingDetailCustomer | null;
};

export default function CustomerInfoCard({ customer }: Props) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
          <User className="h-4 w-4 text-[#0D99FF]" />
        </div>
        <h2 className="text-sm font-bold text-gray-800">Thông tin khách hàng</h2>
      </div>

      {customer ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <p className="mb-1 text-[10px] font-semibold tracking-widest text-gray-400 uppercase">Họ và tên</p>
            <p className="text-sm font-semibold text-gray-800">{customer.fullName ?? "—"}</p>
          </div>
          <div>
            <p className="mb-1 text-[10px] font-semibold tracking-widest text-gray-400 uppercase">Số điện thoại</p>
            <p className="text-sm font-semibold text-gray-800">{customer.phone}</p>
          </div>
          <div>
            <p className="mb-1 text-[10px] font-semibold tracking-widest text-gray-400 uppercase">Email</p>
            <p className="text-sm font-semibold break-all text-gray-800">{customer.email ?? "—"}</p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-400 italic">Không có thông tin khách hàng</p>
      )}
    </div>
  );
}
