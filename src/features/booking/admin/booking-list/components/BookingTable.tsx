"use client";

import { DataTable } from "@/components/ui/data-table";
import { AdminBookingResponse } from "../../../types/booking.type";
import { ColumnDef } from "@tanstack/react-table";

interface BookingTableProps {
  bookings: AdminBookingResponse[];
  columns: ColumnDef<AdminBookingResponse>[];
}

export default function BookingTable({ bookings, columns }: BookingTableProps) {
  return (
    <DataTable
      columns={columns}
      data={bookings}
      emptyMessage="Không tìm thấy đặt phòng nào"
      gridTemplateColumns="1.2fr 1.5fr 1.5fr 1.2fr 1.2fr 1.2fr 1.5fr 50px"
    />
  );
}
