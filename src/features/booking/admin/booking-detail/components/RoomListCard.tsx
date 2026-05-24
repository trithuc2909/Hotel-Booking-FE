import { BookingDetailRoom } from "@/features/booking/types/booking.type";
import { formatCurrency } from "@/lib/utils";
import { Home } from "lucide-react";

type Props = {
  rooms: BookingDetailRoom[];
};

export default function RoomListCard({ rooms }: Props) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
          <Home className="h-4 w-4 text-emerald-500" />
        </div>
        <h2 className="text-sm font-bold text-gray-800">Danh sách phòng ({rooms.length})</h2>
      </div>

      <div className="space-y-3">
        {rooms.map((room) => (
          <div key={room.id} className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-3">
            <div className="h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-200">
              {room.thumbnailUrl ? (
                <img src={room.thumbnailUrl} alt={room.roomName} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-gray-800">{room.roomName}</p>
              <div className="mt-1 flex flex-wrap gap-3 text-xs text-gray-500">
                <span>{room.nights} đêm</span>
                <span className="text-gray-300">•</span>
                <span>{formatCurrency(room.pricePerNight)}đ / đêm</span>
              </div>
            </div>

            <div className="shrink-0 text-right">
              <p className="text-sm font-bold text-gray-800">{formatCurrency(room.pricePerNight * room.nights)}đ</p>
              <p className="mt-0.5 text-[10px] text-gray-400">Thành tiền</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
