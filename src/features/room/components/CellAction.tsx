"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal, Eye, RefreshCw, Trash2 } from "lucide-react";

interface Props {
  id: string;
  onView?: () => void;
  onUpdate?: () => void;
  onDelete?: () => void;
}

export const CellAction = ({ onView, onUpdate, onDelete }: Props) => {
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
        className="z-50 w-44 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
      >
        <DropdownMenuItem
          onClick={onView}
          className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 outline-none transition"
        >
          <Eye size={14} className="text-gray-400" />
          Xem chi tiết
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onUpdate}
          className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 outline-none transition"
        >
          <RefreshCw size={14} />
          Cập nhật trạng thái
        </DropdownMenuItem>

        <DropdownMenuSeparator className="mx-2 my-1 h-px bg-gray-100" />

        <DropdownMenuItem
          onClick={onDelete}
          className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 outline-none transition"
        >
          <Trash2 size={14} />
          Xóa phòng
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
