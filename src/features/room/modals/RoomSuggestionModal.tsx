"use client";

import { X, Users, Check } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useGetAvailableRoomsQuery } from "@/features/room/api/roomApi";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { SelectedRoom } from "@/features/room/types/room.type";
import RoomDetailModal from "./RoomDetailModal";
import { BED_TYPE_MAP } from "@/constants/common";

const toBedTypeVi = (bedType: string | null) =>
  bedType ? (BED_TYPE_MAP[bedType] ?? bedType) : "";

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h3 className="font-bold text-gray-900">Chọn phòng</h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Đã chọn {draft.length} phòng
            </p>
          </div>
          <button onClick={onClose}>
            <X size={18} className="cursor-pointer text-gray-400" />
          </button>
        </div>

        {/* Room list */}
        <div className="overflow-y-auto max-h-[60vh] px-6 py-4 space-y-3">
          {isLoading && (
            <p className="text-sm text-gray-400 text-center py-6">
              Đang tải...
            </p>
          )}
          {!isLoading && rooms.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-6">
              Không còn phòng trống trong thời gian này
            </p>
          )}
          {rooms.map((room) => {
            const isSelected = draftIds.has(room.id);
            return (
              <div
                key={room.id}
                className={`flex gap-3 rounded-xl border p-3 transition-colors ${
                  isSelected
                    ? "border-blue-200 bg-blue-50"
                    : "border-gray-100 bg-gray-50"
                }`}
              >
                {/* Thumbnail */}
                <div
                  onClick={() => setPreviewRoomId(room.id)}
                  className="relative w-29 h-23 shrink-0 rounded-lg overflow-hidden bg-gray-200 cursor-pointer"
                >
                  {room.thumbnailUrl && (
                    <Image
                      src={room.thumbnailUrl}
                      alt={room.roomName}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p
                    onClick={() => setPreviewRoomId(room.id)}
                    className="text-sm font-semibold text-gray-900 truncate cursor-pointer hover:underline"
                  >
                    {room.roomName}
                  </p>
                  <p className="text-xs text-gray-400">{room.roomTypeName}</p>
                  <p className="text-xs text-gray-400">
                    {toBedTypeVi(room.bedType)}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                    <Users size={10} />
                    <span>Tối đa {room.maxGuests} người</span>
                  </div>
                  <p className="text-xs font-semibold text-[#0D99FF] mt-1">
                    {formatCurrency(Number(room.basePrice))} / đêm
                  </p>
                </div>

                {/* Toggle button */}
                <button
                  onClick={() => toggle(room)}
                  className={`cursor-pointer self-center text-xs font-semibold px-3 py-1.5 rounded-lg transition-all shrink-0 flex items-center gap-1 border ${
                    isSelected
                      ? "border-[#0D99FF] text-[#0D99FF] bg-white hover:bg-blue-50"
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
          {previewRoomId && (
            <RoomDetailModal
              roomId={previewRoomId}
              onClose={() => setPreviewRoomId(null)}
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="cursor-pointer flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={() => onConfirm(draft)}
            className="cursor-pointer flex-1 rounded-xl bg-[#0D99FF] py-2.5 text-sm font-semibold text-white hover:bg-[#0B84E6] transition-colors"
          >
            Xác nhận ({draft.length} phòng)
          </button>
        </div>
      </div>
    </div>
  );
}
