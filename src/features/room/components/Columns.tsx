import { ColumnDef } from "@tanstack/react-table";
import type { RoomResponse } from "@/features/room/types/room.type";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import { CellAction } from "./CellAction";

const DEFAULT_IMG =
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200";

const STATUS_COLOR_CONFIG: Record<string, string> = {
  AVL: "bg-green-50 text-green-600 border-green-200",
  OCP: "bg-red-50 text-red-500 border-red-200",
  CLN: "bg-orange-50 text-orange-500 border-orange-200",
  RSV: "bg-blue-50 text-blue-500 border-blue-200",
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
        <div className="flex items-center gap-3">
          <Image
            src={room.thumbnailUrl || DEFAULT_IMG}
            alt={room.roomName}
            width={64}
            height={48}
            className="rounded-lg object-cover"
          />
          <div>
            <p className="text-sm font-semibold text-gray-800">
              {room.roomName}
            </p>
            <p className="text-xs text-gray-400">Phòng {room.roomNumber}</p>
          </div>
        </div>
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
      const className =
        STATUS_COLOR_CONFIG[room.status] ??
        "bg-gray-50 text-gray-500 border-gray-200";

      const statusLabel = room.statusLabel || "Không xác định";

      return (
        <span
          className={`inline-flex items-center whitespace-nowrap rounded-full border px-3 py-1 text-xs font-semibold ${className}`}
        >
          {statusLabel}
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
