"use client";

import { AlertTriangle, X } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import type { RoomResponse } from "@/types/response/room";

const DEFAULT_IMG =
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200";

type RoomStatus = "AVL" | "CLN" | "OCP";

interface BaseModalProps {
  room: RoomResponse;
  onClose: () => void;
}

const useCloseOnEsc = (onClose: () => void) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);
};

interface DeleteModalProps extends BaseModalProps {
  onConfirm: () => void;
  isDeleting?: boolean;
}

export function DeleteRoomModal({
  room,
  onClose,
  onConfirm,
  isDeleting = false,
}: DeleteModalProps) {
  useCloseOnEsc(onClose);

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
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
              <AlertTriangle size={18} className="text-red-500" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Xóa phòng</h2>
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
            &ldquo;{room.roomName}&rdquo;
          </span>
          ?
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
          >
            Hủy
          </button>

          <button
            onClick={onConfirm}
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

const STATUSES: {
  code: RoomStatus;
  label: string;
  emoji: string;
  border: string;
  bg: string;
  text: string;
}[] = [
  {
    code: "AVL",
    label: "Còn trống",
    emoji: "✅",
    border: "border-green-400",
    bg: "bg-green-50",
    text: "text-green-600",
  },
  {
    code: "CLN",
    label: "Đang dọn dẹp",
    emoji: "🧹",
    border: "border-orange-400",
    bg: "bg-orange-50",
    text: "text-orange-500",
  },
  {
    code: "OCP",
    label: "Đang ở",
    emoji: "🏨",
    border: "border-red-400",
    bg: "bg-red-50",
    text: "text-red-500",
  },
];

interface UpdateStatusModalProps extends BaseModalProps {
  onSave: (status: RoomStatus) => void;
  isSaving?: boolean;
}

export function UpdateStatusModal({
  room,
  onClose,
  onSave,
  isSaving = false,
}: UpdateStatusModalProps) {
  const [selected, setSelected] = useState<RoomStatus>(
    room.status as RoomStatus,
  );

  useCloseOnEsc(onClose);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[440px] rounded-2xl bg-white p-6 shadow-xl animate-in zoom-in-95"
      >
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Cập nhật trạng thái
            </h2>
            <p className="mt-0.5 text-xs text-gray-400">
              Thay đổi tình trạng phòng
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Room info */}
        <div className="mb-5 flex items-center gap-3 rounded-xl bg-gray-50 p-3">
          <Image
            src={room.thumbnailUrl || DEFAULT_IMG}
            alt={room.roomName}
            width={64}
            height={48}
            className="rounded-lg object-cover"
          />
          <div>
            <p className="text-xs font-semibold uppercase text-[#0D99FF]">
              {room.roomNumber}
            </p>
            <p className="text-sm font-semibold text-gray-800">
              {room.roomName}
            </p>
          </div>
        </div>

        {/* Status */}
        <p className="mb-3 text-xs font-semibold uppercase text-gray-400">
          Chọn trạng thái
        </p>

        <div className="mb-6 grid grid-cols-3 gap-3">
          {STATUSES.map((s) => {
            const isSelected = selected === s.code;

            return (
              <button
                key={s.code}
                onClick={() => setSelected(s.code)}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition cursor-pointer ${
                  isSelected
                    ? `${s.border} ${s.bg}`
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <span className="text-2xl">{s.emoji}</span>
                <span
                  className={`text-xs font-semibold ${
                    isSelected ? s.text : "text-gray-500"
                  }`}
                >
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 cursor-pointer"
          >
            Hủy
          </button>

          <button
            onClick={() => onSave(selected)}
            disabled={isSaving}
            className="flex-1 rounded-xl bg-[#0D99FF] py-2.5 text-sm font-semibold text-white hover:bg-[#0B84E6] disabled:opacity-60 cursor-pointer"
          >
            {isSaving ? "Đang lưu..." : "Lưu"}
          </button>
        </div>
      </div>
    </div>
  );
}
