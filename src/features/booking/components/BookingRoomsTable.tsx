import { BedDouble, Hotel } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { BookingDetailRoom } from "@/features/booking/types/booking.type";

interface Props {
  rooms: BookingDetailRoom[];
  totalAmount: number;
}

export default function BookingRoomsTable({ rooms, totalAmount }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-700">
          <BedDouble size={14} className="text-[#0D99FF]" />
          Chi tiết đặt phòng
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên phòng</TableHead>
              <TableHead className="text-center">Số đêm</TableHead>
              <TableHead className="text-center">Số lượng</TableHead>
              <TableHead className="text-right">Đơn giá</TableHead>
              <TableHead className="text-right">Thành tiền</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms.map((room) => (
              <TableRow key={room.roomId}>
                <TableCell className="font-medium text-gray-800">
                  <div className="flex items-center gap-3">
                    {room.thumbnailUrl ? (
                      <img
                        src={room.thumbnailUrl}
                        alt={room.roomName}
                        className="h-12 w-16 shrink-0 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-16 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                        <Hotel size={16} className="text-gray-300" />
                      </div>
                    )}
                    <span className="text-sm">{room.roomName}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center text-gray-500">
                  {room.nights} đêm
                </TableCell>
                <TableCell className="text-center text-gray-500">
                  1 phòng
                </TableCell>
                <TableCell className="text-right text-gray-600">
                  {formatCurrency(room.pricePerNight)}
                </TableCell>
                <TableCell className="text-right font-bold text-gray-800">
                  {formatCurrency(room.pricePerNight * room.nights)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
          <span className="text-sm font-medium text-gray-500">Tổng cộng</span>
          <span className="text-lg font-extrabold text-[#0B30A7]">
            {formatCurrency(totalAmount)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
