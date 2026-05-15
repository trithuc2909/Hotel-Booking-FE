import { ColumnDef } from "@tanstack/react-table";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import { discountType, type PromotionResponse } from "../types/promotion.type";
import { CellAction } from "./CellAction";

const DEFAULT_IMG =
  "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=200";

const STATUS_CLASS: Record<string, string> = {
  ACT: "bg-green-50 text-green-600 border-green-200",
  INA: "bg-gray-50 text-gray-500 border-gray-200",
};

interface ColumnCallbacks {
  onView: (p: PromotionResponse) => void;
  onToggleStatus: (p: PromotionResponse) => void;
  onDelete: (p: PromotionResponse) => void;
}

export const PromotionColumns = (callbacks: ColumnCallbacks): ColumnDef<PromotionResponse>[] => [
  {
    accessorKey: "code",
    header: "Mã ưu đãi",
    cell: ({ row }) => {
      const p = row.original;
      return (
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => callbacks.onView(p)}
        >
          <Image
            src={p.imageUrl || DEFAULT_IMG}
            alt={p.title}
            width={56}
            height={42}
            className="rounded-lg object-cover shrink-0"
          />
          <div>
            <p className="text-sm font-bold text-gray-800 group-hover:text-[#0D99FF] transition-colors font-mono">
              {p.code}
            </p>
            <p className="text-xs text-gray-400 line-clamp-1">{p.title}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "discountType",
    header: "Loại giảm",
    cell: ({ row }) => {
      const p = row.original;
      const isPercent = p.discountType === discountType.PERCENT;
      return (
        <div>
          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${isPercent ? "bg-purple-50 text-purple-600 border-purple-200" : "bg-blue-50 text-blue-600 border-blue-200"}`}>
            {isPercent ? "Phần trăm" : "Cố định"}
          </span>
          <p className="mt-1 ml-2 text-sm font-semibold text-gray-800">
            {isPercent ? `${p.discountValue}%` : formatCurrency(p.discountValue) + " VNĐ"}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "usageCount",
    header: "Lượt dùng",
    cell: ({ row }) => {
      const p = row.original;
      return (
        <div className="text-sm text-gray-700">
          <span className="font-semibold">{p.usageCount}</span>
          {p.usageLimit && <span className="text-gray-400"> / {p.usageLimit}</span>}
        </div>
      );
    },
  },
  {
    accessorKey: "endDate",
    header: "Hết hạn",
    cell: ({ row }) => {
      const d = row.original.endDate;
      if (!d) return <span className="text-xs text-gray-400">Không giới hạn</span>;
      const date = new Date(d);
      const isExpired = date < new Date();
      return (
        <span className={`text-xs ${isExpired ? "text-red-500 font-medium" : "text-gray-600"}`}>
          {date.toLocaleDateString("vi-VN")}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const p = row.original;
      const cls = STATUS_CLASS[p.status] ?? STATUS_CLASS.INA;
      return (
        <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${cls}`}>
          {p.displayAs ?? p.status}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Thao tác",
    cell: ({ row }) => (
      <CellAction
        promotion={row.original}
        onView={() => callbacks.onView(row.original)}
        onToggleStatus={() => callbacks.onToggleStatus(row.original)}
        onDelete={() => callbacks.onDelete(row.original)}
      />
    ),
  },
];
