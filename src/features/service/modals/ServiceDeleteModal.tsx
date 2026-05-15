"use client";

import { AlertTriangle, X } from "lucide-react";
import { useEffect } from "react";
import type { ServiceResponse } from "../types/service.type";
import { STATUS } from "@/constants/common";
import { toast } from "sonner";

interface Props {
  service: ServiceResponse;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting?: boolean;
}

export function ServiceDeleteModal({
  service,
  onClose,
  onConfirm,
  isDeleting = false,
}: Props) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const isDeletable = service.status !== STATUS.ACTIVE;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[380px] rounded-2xl bg-white p-6 shadow-xl animate-in zoom-in-95"
      >
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
              <AlertTriangle size={18} className="text-red-500" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Xóa dịch vụ</h2>
              <p className="mt-0.5 text-xs text-gray-400">
                Hành động không thể hoàn tác
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <p className="mb-6 text-sm text-gray-500">
          Bạn có chắc muốn xóa{" "}
          <span className="font-semibold text-gray-800">
            &ldquo;{service.name}&rdquo;
          </span>
          ?
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
          >
            Hủy
          </button>
          <button
            onClick={() => {
              if (!isDeletable) {
                toast.error("Vui lòng ngưng hoạt động dịch vụ trước khi xóa");
                onClose();
                return;
              }
              onConfirm();
            }}
            disabled={isDeleting}
            className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-60 cursor-pointer"
          >
            {isDeleting ? "Đang xóa..." : "Xóa"}
          </button>
        </div>
      </div>
    </div>
  );
}
