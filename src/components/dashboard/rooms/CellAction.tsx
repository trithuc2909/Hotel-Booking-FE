"use client";

import { MoreHorizontal, Eye, RefreshCw, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Props {
  id: string;
  onView?: () => void;
  onUpdate?: () => void;
  onDelete?: () => void;
}

export const CellAction = ({ onView, onUpdate, onDelete }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600 transition"
      >
        <MoreHorizontal size={16} />
      </button>

      {open && (
        <div className="absolute right-0 top-10 translate-x-6 z-50 w-44 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
          <button
            onClick={() => {
              onView?.();
              setOpen(false);
            }}
            className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            <Eye size={14} className="text-gray-400" />
            Xem chi tiết
          </button>

          <button
            onClick={() => {
              onUpdate?.();
              setOpen(false);
            }}
            className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 transition"
          >
            <RefreshCw size={14} />
            Cập nhật trạng thái
          </button>

          <div className="mx-2 my-1 h-px bg-gray-100" />

          <button
            onClick={() => {
              onDelete?.();
              setOpen(false);
            }}
            className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition"
          >
            <Trash2 size={14} />
            Xóa phòng
          </button>
        </div>
      )}
    </div>
  );
};
