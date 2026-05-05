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
  const { data, isLoading } = useGetRoomByIdQuery(
    { id: roomId },
    { skip: !roomId },
  );
  const room = data?.data;

  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const displayImage = activeImage ?? room?.thumbnailUrl ?? "";
  const imageUrls = room?.imageUrls ?? [];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl min-h-[85vh] max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 shrink-0">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <ArrowLeft size={18} className="text-gray-600" />
            </button>
            <div className="flex-1 min-w-0">
              {room?.roomTypeName && (
                <span className="text-xs text-[#0D99FF] bg-blue-50 px-2 py-0.5 rounded-full font-medium">
                  {room.roomTypeName}
                </span>
              )}
              <h3 className="text-base font-bold text-gray-900 truncate mt-0.5">
                {isLoading
                  ? "Đang tải..."
                  : `Chi tiết phòng ${room?.roomName ?? ""}`}
              </h3>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {isLoading && (
              <p className="text-sm text-gray-400 text-center py-10">
                Đang tải...
              </p>
            )}

            {room && (
              <>
                {/* Gallery */}
                <div
                  className="grid gap-1.5 h-52 rounded-xl overflow-hidden"
                  style={{ gridTemplateColumns: "3fr 2fr" }}
                >
                  <div
                    className="relative rounded-xl overflow-hidden bg-gray-100 cursor-pointer"
                    onClick={() => setZoomedImage(displayImage)}
                  >
                    {displayImage && (
                      <Image
                        src={displayImage}
                        alt={room.roomName}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
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
                        className="relative rounded-lg overflow-hidden cursor-pointer opacity-90 hover:opacity-100 transition-opacity"
                      >
                        <Image
                          src={img.imageUrl}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="flex gap-6 items-start">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 mb-1.5">
                      Mô tả chi tiết
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {room.description ?? "Không có mô tả cho phòng này."}
                    </p>
                  </div>

                  {/*Price */}
                  <div className="shrink-0 text-right min-w-[120px]">
                    <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-0.5">
                      Giá mỗi đêm
                    </p>
                    <p className="text-xl font-bold text-[#0D99FF] leading-tight">
                      {formatCurrency(Number(room.basePrice))}
                    </p>
                  </div>
                </div>

                {/* Quick info */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                  {room.bedType && (
                    <span className="flex items-center gap-1 bg-gray-50 border border-gray-100 rounded-full px-2.5 py-1">
                      <BedDouble size={12} />
                      {BED_TYPE_MAP[room.bedType] ?? room.bedType}
                    </span>
                  )}
                  <span className="flex items-center gap-1 bg-gray-50 border border-gray-100 rounded-full px-2.5 py-1">
                    <Users size={12} />
                    Tối đa {room.maxGuests} người
                  </span>
                  {room.size && (
                    <span className="flex items-center gap-1 bg-gray-50 border border-gray-100 rounded-full px-2.5 py-1">
                      <Maximize2 size={12} />
                      {room.size} m²
                    </span>
                  )}
                </div>

                {/* Amenities */}
                {room.amenities.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-gray-800 mb-2">
                      Tiện ích phòng
                    </p>
                    <div className="flex flex-wrap gap-x-5 gap-y-2">
                      {room.amenities.map((a) => {
                        const Icon = getIconComponent(a.icon ?? "");
                        return (
                          <div
                            key={a.id}
                            className="flex items-center gap-1.5 text-xs text-gray-600"
                          >
                            {Icon && (
                              <Icon
                                size={13}
                                className="text-[#0D99FF] shrink-0"
                              />
                            )}
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
              className="absolute inset-0 z-10 flex items-center justify-center bg-black/70 rounded-2xl"
              onClick={() => setZoomedImage(null)}
            >
              <button
                onClick={() => setZoomedImage(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/20 hover:bg-white/30 transition cursor-pointer"
              >
                <X size={18} className="text-white" />
              </button>
              <div
                className="relative w-[85%] aspect-[4/3] rounded-xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={zoomedImage}
                  alt="Phóng to"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
  );
}