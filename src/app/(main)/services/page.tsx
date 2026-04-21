"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { SERVICES, SERVICE_CATEGORIES } from "@/constants/services";
import { Tag, ChevronRight } from "lucide-react";
import Image from "next/image";
import { ASSETS } from "@/constants/assets";

const FALLBACK =
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600";

const CATEGORY_COLORS: Record<string, string> = {
  "Di chuyển": "bg-blue-50 text-blue-600",
  "Trang trí nội thất": "bg-pink-50 text-pink-600",
  "Thư giãn": "bg-green-50 text-green-600",
  "Khám phá": "bg-amber-50 text-amber-600",
};

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("Tất cả");

  const filtered =
    activeTab === "Tất cả"
      ? SERVICES
      : SERVICES.filter((s) => s.category === activeTab);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[{ label: "Trang chủ", href: "/" }, { label: "Dịch vụ" }]}
          />
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">

        {/* Hero */}
        <div className="relative w-full h-74 overflow-hidden rounded-2xl mb-8">
          <Image
            src={ASSETS.servicesHero}
            alt="Dịch vụ tiện ích"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
          <div className="absolute inset-0 bg-black/50 rounded-2xl" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
            <h1 className="text-4xl font-bold mb-2">Dịch vụ tiện ích</h1>
            <p className="text-white/80 text-base max-w-xl">
              Nâng tầm trải nghiệm của bạn tại Bullman Hotel
            </p>
          </div>
        </div>
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                activeTab === cat
                  ? "bg-[#0D99FF] text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#0D99FF] hover:text-[#0D99FF]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Service Cards */}
        <div className="space-y-5">
          {filtered.map((service) => (
            <div
              key={service.id}
              className="flex gap-5 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="relative w-52 shrink-0">
                <Image
                  src={service.imageUrl}
                  alt={service.name}
                  fill
                  className="object-cover"
                  sizes="208px"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK;
                  }}
                />
              </div>

              {/* Content */}
              <div className="flex-1 py-5 pr-5">
                {/* Category pill */}
                <span
                  className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full mb-2 ${CATEGORY_COLORS[service.category] ?? "bg-gray-100 text-gray-600"}`}
                >
                  <Tag size={11} />
                  {service.category}
                </span>

                <h2 className="text-base font-bold text-gray-900 mb-1.5">
                  {service.name}
                </h2>

                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-3">
                  {service.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#0D99FF]">
                    Giá dịch vụ: {service.price}
                  </span>
                  <button className="flex cursor-pointer items-center gap-1 text-xs font-medium text-white bg-[#0D99FF] hover:bg-[#0B84E6] transition-colors px-3 py-1.5 rounded-lg">
                    Liên hệ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
