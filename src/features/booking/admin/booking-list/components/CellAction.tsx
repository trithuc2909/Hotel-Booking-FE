import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, RefreshCw } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { AdminBookingResponse } from "../../../types/booking.type";
import UpdateStatusModal from "../../modals/UpdateStatusModal";
interface BookingActionsCellProps {
  booking: AdminBookingResponse;
}
export default function CellAction({ booking }: BookingActionsCellProps) {
  const [showStatusModal, setShowStatusModal] = useState(false);
  return (
    <div className="flex w-full justify-end pr-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 cursor-pointer p-0">
            <span className="sr-only">Mở menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={4} alignOffset={-34} className="bg-white">
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link
              href={`/dashboard/bookings/${booking.id}`}
              className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-gray-700 transition outline-none hover:bg-gray-100"
            >
              <Eye className="mr-2 h-4 w-4 text-gray-500" /> Xem chi tiết
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-gray-700 transition-colors outline-none data-[highlighted]:bg-blue-50 data-[highlighted]:text-blue-600 [&_svg]:transition-colors"
            onClick={() => setShowStatusModal(true)}
          >
            <RefreshCw className="mr-2 h-4 w-4 text-gray-500" /> Cập nhật trạng thái
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateStatusModal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        bookingId={booking.id}
        bookingCode={booking.bookingCode}
        currentStatus={booking.status}
      />
    </div>
  );
}
