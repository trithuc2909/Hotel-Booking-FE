"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal, Eye, Power, Trash2 } from "lucide-react";
import { ServiceResponse } from "../types/service.type";

interface Props {
  service: ServiceResponse;
  onView?: () => void;
  onToggleStatus?: () => void;
  onDelete?: () => void;
}

export const CellAction = ({
  service,
  onView,
  onToggleStatus,
  onDelete,
}: Props) => {
  const isActive = service.status === "ACT";

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
        className="z-50 w-48 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
      >
        <DropdownMenuItem
          onClick={onView}
          className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 outline-none transition"
        >
          <Eye size={14} className="text-gray-400" />
          Xem chi tiết
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
          <Power size={14} />
          {isActive ? "Ngưng hoạt động" : "Kích hoạt"}
        </DropdownMenuItem>

        <DropdownMenuSeparator className="mx-2 my-1 h-px bg-gray-100" />

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
          Xóa dịch vụ
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
