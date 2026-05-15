import { ColumnDef } from "@tanstack/react-table";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import type { ServiceResponse } from "../types/service.type";
import { CellAction } from "./CellAction";

const DEFAULT_IMG =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200";

const STATUS_CLASS: Record<string, string> = {
  ACT: "bg-green-50 text-green-600 border-green-200",
  INA: "bg-gray-50 text-gray-500 border-gray-200",
};

interface ColumnCallbacks {
  onView: (s: ServiceResponse) => void;
  onToggleStatus: (s: ServiceResponse) => void;
  onDelete: (s: ServiceResponse) => void;
}

export const ServiceColumns = (
  callbacks: ColumnCallbacks,
): ColumnDef<ServiceResponse>[] => [
  {
    accessorKey: "name",
    header: "Dịch vụ",
    cell: ({ row }) => {
      const s = row.original;
      return (
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => callbacks.onView(s)}
        >
          <Image
            src={s.imageUrl || DEFAULT_IMG}
            alt={s.name}
            width={64}
            height={48}
            className="rounded-lg object-cover"
          />
          <div>
            <p className="text-sm font-semibold text-gray-800 group-hover:text-[#0D99FF] transition-colors">
              {s.name}
            </p>
            {s.description && (
              <p className="text-xs text-gray-400 line-clamp-1">{s.description}</p>
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Danh mục",
    cell: ({ row }) => {
      const cat = row.original.category;
      return (
        <span className="inline-flex items-center rounded-full border bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-600 border-blue-200">
          {cat.name}
        </span>
      );
    },
  },
  {
    accessorKey: "basePrice",
    header: "Đơn giá",
    cell: ({ row }) => {
      const s = row.original;
      return (
        <div>
          <p className="text-sm font-semibold">
            {formatCurrency(s.basePrice)}<span className="text-xs"> VNĐ</span>
          </p>
          <p className="text-xs text-gray-500">{s.unit}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const s = row.original;
      const cls = STATUS_CLASS[s.status] ?? STATUS_CLASS.INA;
      return (
        <span
          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${cls}`}
        >
          {s.displayAs ?? s.status}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "THAO TÁC",
    cell: ({ row }) => (
      <CellAction
        service={row.original}
        onView={() => callbacks.onView(row.original)}
        onToggleStatus={() => callbacks.onToggleStatus(row.original)}
        onDelete={() => callbacks.onDelete(row.original)}
      />
    ),
  },
];
