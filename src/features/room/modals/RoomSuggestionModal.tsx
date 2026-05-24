"use client";

import { X, Users, Check } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useGetAvailableRoomsQuery } from "@/features/room/api/roomApi";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { SelectedRoom } from "@/features/room/types/room.type";
import RoomDetailModal from "./RoomDetailModal";
import { BED_TYPE_MAP } from "@/constants/common";

const toBedTypeVi = (bedType: string | null) => (bedType ? (BED_TYPE_MAP[bedType] ?? bedType) : "");

type Props = {
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  nights: number;
  selected: SelectedRoom[];
  onConfirm: (rooms: SelectedRoom[]) => void;
  onClose: () => void;
};

export default function RoomSuggestionModal({
  checkInDate,
  checkOutDate,
  guests,
  nights,
  selected,
  onConfirm,
  onClose,
}: Props) {
  const { data, isLoading } = useGetAvailableRoomsQuery({
    checkInDate,
    checkOutDate,
    guests,
  });
  const rooms = data?.data ?? [];

  const [draft, setDraft] = useState<SelectedRoom[]>(selected);
  const draftIds = new Set(draft.map((r) => r.roomId));

  const toggle = (room: (typeof rooms)[0]) => {
    if (draftIds.has(room.id)) {
      setDraft((prev) => prev.filter((r) => r.roomId !== room.id));
    } else {
      setDraft((prev) => [
        ...prev,
        {
          roomId: room.id,
          roomName: room.roomName,
          thumbnailUrl: room.thumbnailUrl,
          basePrice: Number(room.basePrice),
          nights,
        },
      ]);
    }
  };

  const [previewRoomId, setPreviewRoomId] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div>
            <h3 className="font-bold text-gray-900">Chọn phòng</h3>
            <p className="mt-0.5 text-xs text-gray-400">Đã chọn {draft.length} phòng</p>
          </div>
          <button onClick={onClose}>
            <X size={18} className="cursor-pointer text-gray-400" />
          </button>
        </div>

        {/* Room list */}
        <div className="max-h-[60vh] space-y-3 overflow-y-auto px-6 py-4">
          {isLoading && <p className="py-6 text-center text-sm text-gray-400">Đang tải...</p>}
          {!isLoading && rooms.length === 0 && (
            <p className="py-6 text-center text-sm text-gray-400">Không còn phòng trống trong thời gian này</p>
          )}
          {rooms.map((room) => {
            const isSelected = draftIds.has(room.id);
            return (
              <div
                key={room.id}
                className={`flex gap-3 rounded-xl border p-3 transition-colors ${
                  isSelected ? "border-blue-200 bg-blue-50" : "border-gray-100 bg-gray-50"
                }`}
              >
                {/* Thumbnail */}
                <div
                  onClick={() => setPreviewRoomId(room.id)}
                  className="relative h-23 w-29 shrink-0 cursor-pointer overflow-hidden rounded-lg bg-gray-200"
                >
                  {room.thumbnailUrl && (
                    <Image src={room.thumbnailUrl} alt={room.roomName} fill className="object-cover" />
                  )}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <p
                    onClick={() => setPreviewRoomId(room.id)}
                    className="cursor-pointer truncate text-sm font-semibold text-gray-900 hover:underline"
                  >
                    {room.roomName}
                  </p>
                  <p className="text-xs text-gray-400">{room.roomTypeName}</p>
                  <p className="text-xs text-gray-400">{toBedTypeVi(room.bedType)}</p>
                  <div className="mt-0.5 flex items-center gap-1 text-xs text-gray-400">
                    <Users size={10} />
                    <span>Tối đa {room.maxGuests} người</span>
                  </div>
                  <p className="mt-1 text-xs font-semibold text-[#0D99FF]">
                    {formatCurrency(Number(room.basePrice))} / đêm
                  </p>
                </div>

                {/* Toggle button */}
                <button
                  onClick={() => toggle(room)}
                  className={`flex shrink-0 cursor-pointer items-center gap-1 self-center rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                    isSelected
                      ? "border-[#0D99FF] bg-white text-[#0D99FF] hover:bg-blue-50"
                      : "border-[#0D99FF] bg-[#0D99FF] text-white hover:bg-[#0B84E6]"
                  }`}
                >
                  {isSelected ? (
                    <>
                      Đã chọn
                      <Check size={12} />
                    </>
                  ) : (
                    "Thêm vào danh sách"
                  )}
                </button>
              </div>
            );
          })}
          {previewRoomId && <RoomDetailModal roomId={previewRoomId} onClose={() => setPreviewRoomId(null)} />}
        </div>

        {/* Footer */}
        <div className="flex gap-3 border-t border-gray-100 px-6 py-4">
          <button
            onClick={onClose}
            className="flex-1 cursor-pointer rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            onClick={() => onConfirm(draft)}
            className="flex-1 cursor-pointer rounded-xl bg-[#0D99FF] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0B84E6]"
          >
            Xác nhận ({draft.length} phòng)
          </button>
        </div>
      </div>
    </div>
  );
}
