"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { useGetAllPromotionsQuery } from "@/features/promotion/api/promotionApi";
import { Copy, Check } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { discountType } from "@/features/promotion/types/promotion.type";

const FALLBACK = "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600";

function PromotionCard({ promo }: { promo: any }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(promo.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const discountLabel =
    promo.discountType === discountType.FIXED
      ? `Giảm ${Number(promo.discountValue).toLocaleString("vi-VN")}đ`
      : `Giảm ${promo.discountValue}%`;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* Banner image */}
      <div className="relative h-44 w-full bg-gray-100">
        <Image
          src={promo.imageUrl ?? FALLBACK}
          alt={promo.title}
          fill
          className="object-cover"
          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK; }}
        />
        {/* Discount badge */}
        <div className="absolute top-3 left-3 bg-[#0D99FF] text-white text-xs font-bold px-2.5 py-1 rounded-full">
          {discountLabel}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-bold text-gray-900 text-base">{promo.title}</h3>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
          {promo.description}
        </p>

        {/* Promo code */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">Mã ưu đãi</p>
            <span className="text-sm font-bold text-[#0D99FF] tracking-widest">
              {promo.code}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-[#0D99FF] text-[#0D99FF] hover:bg-blue-50 transition cursor-pointer"
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? "Đã copy" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PromotionsPage() {
  const { data, isLoading } = useGetAllPromotionsQuery();
  const promotions = data?.data ?? [];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: "Ưu đãi" }]} />
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Ưu đãi đặc biệt từ{" "}
            <span className="text-[#0D99FF]">BullMan Hotel</span>
          </h1>
          <p className="mt-2 text-gray-500">
            Tận hưởng những trải nghiệm nghỉ dưỡng xa hoa với các gói ưu đãi được thiết kế riêng cho kỳ nghỉ hoàn hảo của bạn.
          </p>
        </div>

        {/* Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        )}

        {/* Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {promotions.map((promo) => (
              <PromotionCard key={promo.id} promo={promo} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
