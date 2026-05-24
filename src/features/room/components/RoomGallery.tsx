"use client";

import { RoomImageResponse } from "@/features/room/types/room.type";
import Image from "next/image";
import { useState } from "react";

const FALLBACK = "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800";

type Props = {
  thumbnailUrl: string | null;
  imageUrls: RoomImageResponse[];
  roomName: string;
};

export default function RoomGallery({ thumbnailUrl, imageUrls, roomName }: Props) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const mainImage = thumbnailUrl ?? FALLBACK;
  const subImages = (imageUrls ?? []).slice(0, 4);

  return (
    <>
      <div className="grid h-[320px] grid-cols-[2fr_1fr] gap-2 overflow-hidden rounded-2xl">
        <div className="relative cursor-pointer" onClick={() => setLightbox(mainImage)}>
          <Image
            src={mainImage}
            alt={roomName}
            fill
            className="object-cover transition hover:brightness-90"
            sizes="60vw"
            priority
          />
        </div>
        {/* sub images */}
        <div className="grid grid-cols-2 grid-rows-2 gap-2">
          {[0, 1, 2, 3].map((i) => {
            const src = subImages[i]?.imageUrl ?? FALLBACK;
            return (
              <div key={i} className="relative cursor-pointer" onClick={() => setLightbox(src)}>
                <Image
                  src={src}
                  alt={`Ảnh ${i + 2}`}
                  fill
                  className="object-cover transition hover:brightness-90"
                  sizes="20vw"
                />
                {i === 3 && imageUrls.length > 4 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-xl font-bold text-white">
                    +{imageUrls.length - 3}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setLightbox(null)}
        >
          <div className="relative mx-4 h-[80vh] w-full max-w-4xl">
            <Image src={lightbox} alt="Preview" fill className="object-contain" />
          </div>
        </div>
      )}
    </>
  );
}
