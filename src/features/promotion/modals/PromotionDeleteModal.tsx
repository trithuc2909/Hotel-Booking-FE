"use client";

import { AlertTriangle, X } from "lucide-react";
import { useEffect } from "react";
import type { PromotionResponse } from "../types/promotion.type";
import { STATUS } from "@/constants/common";
import { toast } from "sonner";

interface Props {
  promotion: PromotionResponse;
  isDeleting: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function PromotionDeleteModal({ promotion, isDeleting, onConfirm, onClose }: Props) {
  const isDeletable = promotion.status !== STATUS.ACTIVE;

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
              <AlertTriangle size={20} className="text-red-500" />
            </div>
            <h2 className="text-base font-bold text-gray-800">Xóa ưu đãi</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <p className="mb-6 text-sm text-gray-500">
          Bạn có chắc muốn xóa ưu đãi{" "}
          <span className="font-semibold text-gray-800">&ldquo;{promotion.code}&rdquo;</span>?
          Hành động này không thể hoàn tác.
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
                toast.error("Vui lòng ngưng ưu đãi trước khi xóa");
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
