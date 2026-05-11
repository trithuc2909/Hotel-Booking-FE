import { ArrowRight, BedDouble, Hotel, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fmtDate } from "@/lib/utils";
import { BookingDetailRoom } from "@/features/booking/types/booking.type";
import { Calendar } from "lucide-react";

interface Props {
  checkInDate: string;
  checkOutDate: string;
  totalNights: number;
  numberOfGuests: number;
  rooms: BookingDetailRoom[];
}

export default function StayInfoCard({
  checkInDate,
  checkOutDate,
  totalNights,
  numberOfGuests,
  rooms,
}: Props) {
  const firstRoomThumbnail = rooms[0]?.thumbnailUrl;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-700">
          <Calendar size={14} className="text-[#0D99FF]" />
          Thông tin lưu trú
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Room thumbnail */}
        {firstRoomThumbnail && (
          <div className="overflow-hidden rounded-xl">
            <img
              src={firstRoomThumbnail}
              alt="Ảnh phòng"
              className="h-48 w-full object-cover"
            />
          </div>
        )}

        {/* Check-in / Check-out */}
        <div className="flex items-center gap-3">
          <div className="flex-1 rounded-xl border border-gray-100 bg-gray-50 p-4">
            <p className="mb-1 text-xs text-gray-400">Nhận phòng</p>
            <p className="text-lg font-bold text-[#0D99FF]">
              {fmtDate(checkInDate)}
            </p>
            <p className="mt-1 text-xs text-gray-400">Sau 14:00</p>
          </div>

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm">
            <ArrowRight size={14} className="text-gray-400" />
          </div>

          <div className="flex-1 rounded-xl border border-gray-100 bg-gray-50 p-4">
            <p className="mb-1 text-xs text-gray-400">Trả phòng</p>
            <p className="text-lg font-bold text-[#0D99FF]">
              {fmtDate(checkOutDate)}
            </p>
            <p className="mt-1 text-xs text-gray-400">Trước 12:00</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-6 border-t border-gray-100 pt-4 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <BedDouble size={14} className="text-gray-400" />
            <span className="font-medium text-gray-700">{totalNights}</span>
            &nbsp;đêm
            <span className="text-xs text-gray-400">Thời gian lưu trú</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Users size={14} className="text-gray-400" />
            <span className="font-medium text-gray-700">{numberOfGuests}</span>
            &nbsp;khách
            <span className="text-xs text-gray-400">Số lượng khách</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Hotel size={14} className="text-gray-400" />
            <span className="font-medium text-gray-700">{rooms.length}</span>
            &nbsp;phòng
            <span className="text-xs text-gray-400">Số lượng phòng</span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
