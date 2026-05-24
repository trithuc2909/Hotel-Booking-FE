import { formatDate } from "@/lib/utils";
import { Calendar } from "lucide-react";

type Props = {
  checkInDate: string;
  checkOutDate: string;
  totalNights: number;
  numberOfGuests: number;
  notes?: string;
};

export default function BookingInfoCard({ checkInDate, checkOutDate, totalNights, numberOfGuests, notes }: Props) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50">
          <Calendar className="h-4 w-4 text-purple-500" />
        </div>
        <h2 className="text-sm font-bold text-gray-800">Thông tin đặt phòng</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl bg-gray-50 p-3">
          <p className="mb-1 text-[10px] font-semibold tracking-widest text-gray-400 uppercase">Ngày nhận phòng</p>
          <p className="text-sm font-bold text-gray-800">{formatDate(checkInDate, "dd/MM/yyyy")}</p>
          <p className="mt-0.5 text-xs text-gray-400">Sau 14:00</p>
        </div>

        <div className="rounded-xl bg-gray-50 p-3">
          <p className="mb-1 text-[10px] font-semibold tracking-widest text-gray-400 uppercase">Ngày trả phòng</p>
          <p className="text-sm font-bold text-gray-800">{formatDate(checkOutDate, "dd/MM/yyyy")}</p>
          <p className="mt-0.5 text-xs text-gray-400">Trước 12:00</p>
        </div>

        <div className="rounded-xl bg-gray-50 p-3">
          <p className="mb-1 text-[10px] font-semibold tracking-widest text-gray-400 uppercase">Số đêm</p>
          <p className="text-sm font-bold text-gray-800">{totalNights} đêm</p>
        </div>

        <div className="rounded-xl bg-gray-50 p-3">
          <p className="mb-1 text-[10px] font-semibold tracking-widest text-gray-400 uppercase">Số khách</p>
          <p className="text-sm font-bold text-gray-800">{numberOfGuests} khách</p>
        </div>
      </div>

      {notes && (
        <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3">
          <p className="mb-1 text-xs font-semibold text-amber-700">📝 Ghi chú</p>
          <p className="text-xs text-amber-800">{notes}</p>
        </div>
      )}
    </div>
  );
}
