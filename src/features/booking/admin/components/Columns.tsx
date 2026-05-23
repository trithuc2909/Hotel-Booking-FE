"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { AdminBookingResponse } from "../../types/booking.type";
import { formatCurrency, formatDate } from "@/lib/utils";
import { STATUS_COLOR } from "@/constants/colors";
import CellAction from "./CellAction";

export const columns: ColumnDef<AdminBookingResponse>[] = [
  {
    accessorKey: "bookingCode",
    header: "Mã đặt phòng",
    cell: ({ row }) => (
      <Link
        href={`/dashboard/bookings/${row.original.id}`}
        className="text-sm font-semibold text-gray-600 hover:text-[#0D99FF] hover:underline"
      >
        {row.getValue("bookingCode")}
      </Link>
    ),
  },
  {
    accessorKey: "customerName",
    header: "Khách hàng",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-800">
            {row.original.customerName}
          </span>
          <span className="text-xs text-gray-400">
            {row.original.customerEmail}
          </span>
          <span className="text-xs text-gray-400">
            {row.original.customerPhone}
          </span>
        </div>
      );
    },
  },
  {
    id: "rooms",
    header: "Phòng",
    cell: ({ row }) => {
      const rooms = row.original.rooms || [];
      if (rooms.length === 0)
        return <span className="text-xs text-gray-400">-</span>;

      return (
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium text-gray-700">
            {rooms[0].roomName}
          </span>
          {rooms.length > 1 && (
            <span className="text-xs text-gray-400">
              +{rooms.length - 1} phòng khác
            </span>
          )}
        </div>
      );
    },
  },
  {
    id: "stayDates",
    header: "Thời gian lưu trú",
    cell: ({ row }) => {
      const checkIn = new Date(row.original.checkInDate);
      const checkOut = new Date(row.original.checkOutDate);
      const nights = Math.ceil(
        (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24),
      );

      return (
        <div className="flex flex-col text-xs text-gray-600">
          <span className="font-bold">
            {formatDate(checkIn, "dd/MM")} - {formatDate(checkOut, "dd/MM")}
          </span>
          <span className="text-gray-400">{nights} đêm</span>
        </div>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Tổng tiền",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalAmount"));
      return (
        <div className="text-sm font-bold text-gray-800">
          {formatCurrency(amount)}đ
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const statusLabel = row.original.displayAs || "Chưa xác định";
      const statusVal = row.original.status;
      const className =
        STATUS_COLOR[statusVal] ?? "bg-gray-50 text-gray-500 border-gray-200";

      return (
        <span
          className={`inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${className}`}
        >
          {statusLabel}
        </span>
      );
    },
  },
  {
    id: "services",
    header: "Dịch vụ",
    cell: ({ row }) => {
      const services = row.original.services || [];
      if (services.length === 0)
        return <span className="text-gray-400">{""}</span>;
      return (
        <div className="flex items-center gap-1 flex-wrap">
          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
            {services[0].serviceName} ({services[0].quantity})
          </span>
          {services.length > 1 && (
            <Popover>
              <PopoverTrigger asChild>
                <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 cursor-pointer hover:bg-gray-200 transition-colors">
                  +{services.length - 1}
                </span>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-3 bg-white shadow-lg border border-gray-100 rounded-lg"
                align="start"
              >
                <p className="text-xs font-bold text-gray-400 mb-2 tracking-wider">
                  Các dịch vụ khác
                </p>
                <div className="flex flex-col gap-2">
                  {services.slice(1).map((service, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 whitespace-nowrap"
                    >
                      {service.serviceName} ({service.quantity})
                    </span>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Thao tác",
    cell: ({ row }) => <CellAction booking={row.original} />,
  },
];
