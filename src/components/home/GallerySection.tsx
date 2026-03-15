"use client";

import Image from "next/image";
import { useState, useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const GALLERY_IMAGES = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200",
    alt: "Phòng Deluxe sang trọng",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200",
    alt: "Hồ bơi khách sạn",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200",
    alt: "Nhà hàng khách sạn",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200",
    alt: "Sảnh khách sạn",
  },
] as const;

export default function GallerySection() {
  const autoPlayPlugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoPlayPlugin.current,
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrentIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 mt-3">
      {/* Slider container */}
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex">
          {GALLERY_IMAGES.map((image) => (
            <div
              key={image.id}
              className="relative min-w-0 flex-[0_0_100%] h-[300px]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={image.id === 1}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1280px"
              />
            </div>
          ))}
        </div>
      </div>
      {/* Btn prev */}
      <button
        onClick={scrollPrev}
        className="
          absolute left-10 top-1/2 -translate-y-1/2 z-10
          flex h-10 w-10 items-center justify-center
          rounded-full bg-white/80 shadow-md
          hover:bg-white transition-all duration-200
          cursor-pointer
        "
        aria-label="Ảnh trước"
      >
        <ChevronLeft size={22} className="text-gray-700" />
      </button>
      {/* Btn next */}
      <button
        onClick={scrollNext}
        className="
          absolute right-10 top-1/2 -translate-y-1/2 z-10
          flex h-10 w-10 items-center justify-center
          rounded-full bg-white/80 shadow-md
          hover:bg-white transition-all duration-200
          cursor-pointer
        "
        aria-label="Ảnh tiếp theo"
      >
        <ChevronRight size={22} className="text-gray-700" />
      </button>
      {/* Dots indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {GALLERY_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              emblaApi?.scrollTo(index);
              setCurrentIndex(index);
            }}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              currentIndex === index ? "w-6 bg-white" : "w-2 bg-white/50"
            }`}
            aria-label={`Chuyển đến ảnh ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
