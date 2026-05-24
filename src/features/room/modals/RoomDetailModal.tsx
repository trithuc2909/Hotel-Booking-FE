"use client";

import { BED_TYPE_MAP } from "@/constants/common";
import { useGetRoomByIdQuery } from "@/features/room/api/roomApi";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { getIconComponent } from "@/lib/utils/icon";
import { ArrowLeft, BedDouble, Maximize2, Users, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Props = {
  roomId: string;
  onClose: () => void;
};

export default function RoomDetailModal({ roomId, onClose }: Props) {
  const { data, isLoading } = useGetRoomByIdQuery({ id: roomId }, { skip: !roomId });
  const room = data?.data;

  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const displayImage = activeImage ?? room?.thumbnailUrl ?? "";
  const imageUrls = room?.imageUrls ?? [];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4" onClick={onClose}>
      <div
        className="relative flex max-h-[92vh] min-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center gap-3 border-b border-gray-100 px-5 py-4">
          <button onClick={onClose} className="cursor-pointer rounded-lg p-1.5 transition-colors hover:bg-gray-100">
            <ArrowLeft size={18} className="text-gray-600" />
          </button>
          <div className="min-w-0 flex-1">
            {room?.roomTypeName && (
              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-[#0D99FF]">
                {room.roomTypeName}
              </span>
            )}
            <h3 className="mt-0.5 truncate text-base font-bold text-gray-900">
              {isLoading ? "Đang tải..." : `Chi tiết phòng ${room?.roomName ?? ""}`}
            </h3>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
          {isLoading && <p className="py-10 text-center text-sm text-gray-400">Đang tải...</p>}

          {room && (
            <>
              {/* Gallery */}
              <div className="grid h-52 gap-1.5 overflow-hidden rounded-xl" style={{ gridTemplateColumns: "3fr 2fr" }}>
                <div
                  className="relative cursor-pointer overflow-hidden rounded-xl bg-gray-100"
                  onClick={() => setZoomedImage(displayImage)}
                >
                  {displayImage && (
                    <Image
                      src={displayImage}
                      alt={room.roomName}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  {imageUrls.slice(0, 4).map((img) => (
                    <div
                      key={img.id}
                      onClick={() => {
                        setActiveImage(img.imageUrl);
                        setZoomedImage(img.imageUrl);
                      }}
                      className="relative cursor-pointer overflow-hidden rounded-lg opacity-90 transition-opacity hover:opacity-100"
                    >
                      <Image src={img.imageUrl} alt="" fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="flex items-start gap-6">
                <div className="min-w-0 flex-1">
                  <p className="mb-1.5 text-sm font-semibold text-gray-800">Mô tả chi tiết</p>
                  <p className="text-xs leading-relaxed text-gray-500">
                    {room.description ?? "Không có mô tả cho phòng này."}
                  </p>
                </div>

                {/*Price */}
                <div className="min-w-[120px] shrink-0 text-right">
                  <p className="mb-0.5 text-[11px] tracking-wide text-gray-400 uppercase">Giá mỗi đêm</p>
                  <p className="text-xl leading-tight font-bold text-[#0D99FF]">
                    {formatCurrency(Number(room.basePrice))}
                  </p>
                </div>
              </div>

              {/* Quick info */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                {room.bedType && (
                  <span className="flex items-center gap-1 rounded-full border border-gray-100 bg-gray-50 px-2.5 py-1">
                    <BedDouble size={12} />
                    {BED_TYPE_MAP[room.bedType] ?? room.bedType}
                  </span>
                )}
                <span className="flex items-center gap-1 rounded-full border border-gray-100 bg-gray-50 px-2.5 py-1">
                  <Users size={12} />
                  Tối đa {room.maxGuests} người
                </span>
                {room.size && (
                  <span className="flex items-center gap-1 rounded-full border border-gray-100 bg-gray-50 px-2.5 py-1">
                    <Maximize2 size={12} />
                    {room.size} m²
                  </span>
                )}
              </div>

              {/* Amenities */}
              {room.amenities.length > 0 && (
                <div>
                  <p className="mb-2 text-sm font-semibold text-gray-800">Tiện ích phòng</p>
                  <div className="flex flex-wrap gap-x-5 gap-y-2">
                    {room.amenities.map((a) => {
                      const Icon = getIconComponent(a.icon ?? "");
                      return (
                        <div key={a.id} className="flex items-center gap-1.5 text-xs text-gray-600">
                          {Icon && <Icon size={13} className="shrink-0 text-[#0D99FF]" />}
                          <span>{a.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {zoomedImage && (
          <div
            className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-black/70"
            onClick={() => setZoomedImage(null)}
          >
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute top-3 right-3 cursor-pointer rounded-full bg-white/20 p-2 transition hover:bg-white/30"
            >
              <X size={18} className="text-white" />
            </button>
            <div
              className="relative aspect-[4/3] w-[85%] overflow-hidden rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={zoomedImage} alt="Phóng to" fill className="object-cover" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
