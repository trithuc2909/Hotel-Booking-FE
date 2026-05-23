import { ColumnDef } from "@tanstack/react-table";
import type { RoomResponse } from "@/features/room/types/room.type";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import { CellAction } from "./CellAction";
import Link from "next/link";

const DEFAULT_IMG =
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200";

const STATUS_COLOR_CONFIG: Record<string, string> = {
  AVL: "bg-emerald-50 text-emerald-700 border-emerald-200",
  OCP: "bg-blue-50 text-blue-700 border-blue-200",
  CLN: "bg-yellow-50 text-yellow-700 border-yellow-200",
  RSV: "bg-orange-50 text-orange-700 border-orange-200",
  MNT: "bg-violet-50 text-violet-700 border-violet-200",
};

interface ColumnCallbacks {
  onView: (room: RoomResponse) => void;
  onUpdate: (room: RoomResponse) => void;
  onDelete: (room: RoomResponse) => void;
}

export const createRoomColumns = (
  callbacks: ColumnCallbacks,
): ColumnDef<RoomResponse>[] => [
    {
      accessorKey: "roomName",
      header: "Tên phòng",
      cell: ({ row }) => {
        const room = row.original;
        return (
          <Link
            href={`/dashboard/rooms/${room.id}`}
            className="group flex items-center gap-3 transition-colors hover:text-[#0D99FF]"
          >
            <div className="overflow-hidden rounded-lg">
              <Image
                src={room.thumbnailUrl || DEFAULT_IMG}
                alt={room.roomName}
                width={64}
                height={48}
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800 transition-colors group-hover:text-[#0D99FF]">
                {room.roomName}
              </p>
              <p className="text-xs text-gray-400">Phòng {room.roomNumber}</p>
            </div>
          </Link>
        );
      },
    },
    {
      accessorKey: "roomTypeName",
      header: "Loại phòng",
      cell: ({ row }) => {
        const room = row.original;

        return <span className="text-sm text-gray-600">{room.roomTypeName}</span>;
      },
    },

    {
      accessorKey: "status",
      header: "Trạng thái",
      cell: ({ row }) => {
        const room = row.original;
        const effectiveStatus = room.displayStatus ?? room.status;
        const className =
          STATUS_COLOR_CONFIG[effectiveStatus] ??
          "bg-gray-50 text-gray-500 border-gray-200";
        const label =
          room.displayStatusLabel ?? room.statusLabel ?? "Không xác định";
        return (
          <span
            className={`inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${className}`}
          >
            {label}
          </span>
        );
      },
    },

    {
      accessorKey: "basePrice",
      header: "Giá phòng",
      cell: ({ row }) => {
        const room = row.original;

        return (
          <div>
            <p className="text-sm font-semibold text-gray-800">
              {formatCurrency(room.basePrice)}
            </p>
            <p className="text-xs text-gray-400">VND</p>
          </div>
        );
      },
    },

    {
      id: "actions",
      header: "Thao tác",
      cell: ({ row }) => (
        <CellAction
          id={row.original.id}
          onView={() => callbacks.onView(row.original)}
          onUpdate={() => callbacks.onUpdate(row.original)}
          onDelete={() => callbacks.onDelete(row.original)}
        />
      ),
    },
  ];
