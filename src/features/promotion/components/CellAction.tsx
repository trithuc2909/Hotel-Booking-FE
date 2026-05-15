"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal, RefreshCw, Trash2 } from "lucide-react";
import type { PromotionResponse } from "../types/promotion.type";
import { STATUS } from "@/constants/common";

interface Props {
  promotion: PromotionResponse;
  onView?: () => void;
  onToggleStatus?: () => void;
  onDelete?: () => void;
}

export const CellAction = ({
  promotion,
  onView,
  onToggleStatus,
  onDelete,
}: Props) => {
  const isActive = promotion.status === STATUS.ACTIVE;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600 transition">
          <MoreHorizontal size={16} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={4}
        alignOffset={-70}
        className="z-50 w-48 rounded-lg border border-gray-100 bg-white shadow-md"
      >
        <DropdownMenuItem
          onClick={onView}
          className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 outline-none"
        >
          <Eye size={14} /> Xem chi tiết
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onToggleStatus}
          className={`
                flex cursor-pointer items-center gap-2 px-3 py-2 text-sm
                text-gray-700 outline-none transition-colors
                ${
                  isActive
                    ? "data-[highlighted]:bg-orange-50 data-[highlighted]:text-orange-500"
                    : "data-[highlighted]:bg-green-50 data-[highlighted]:text-green-600"
                }
            `}
        >
          <RefreshCw size={14} />
          {isActive ? "Ngưng hoạt động" : "Kích hoạt"}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onDelete}
          className="
                flex cursor-pointer items-center gap-2 px-3 py-2 text-sm
                text-gray-700 outline-none transition-colors
                data-[highlighted]:bg-red-50
                data-[highlighted]:text-red-500
          "
        >
          <Trash2 size={14} />
          Xóa
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
