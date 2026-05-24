"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { Tag } from "lucide-react";
import Image from "next/image";
import { ASSETS } from "@/constants/assets";
import { useGetServicesQuery } from "@/features/service/api/serviceApi";

const FALLBACK = "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600";

const CATEGORY_COLORS: Record<string, string> = {
  "Di chuyển": "bg-blue-50 text-blue-600",
  "Trang trí sự kiện": "bg-pink-50 text-pink-600",
  "Thư giãn": "bg-green-50 text-green-600",
  "Khám phá": "bg-amber-50 text-amber-600",
};

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("Tất cả");
  const { data, isLoading } = useGetServicesQuery();

  const services = data?.data ?? [];
  const categories = ["Tất cả", ...Array.from(new Set(services.map((s) => s.category.name)))];
  const filtered = activeTab === "Tất cả" ? services : services.filter((s) => s.category.name === activeTab);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Trang dịch vụ" }]} />
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="relative mb-8 h-64 w-full overflow-hidden rounded-2xl">
          <Image
            src={ASSETS.servicesHero}
            alt="Dịch vụ tiện ích"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
          <div className="absolute inset-0 rounded-2xl bg-black/50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
            <h1 className="mb-2 text-4xl font-bold">Dịch vụ tiện ích</h1>
            <p className="max-w-xl text-base text-white/80">Nâng tầm trải nghiệm của bạn tại Bullman Hotel</p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeTab === cat
                  ? "bg-[#0D99FF] text-white shadow-sm"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-[#0D99FF] hover:text-[#0D99FF]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="space-y-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-36 animate-pulse rounded-2xl bg-gray-100" />
            ))}
          </div>
        )}

        {/* Service Cards */}
        {!isLoading && (
          <div className="space-y-5">
            {filtered.map((service) => (
              <div
                key={service.id}
                className="flex gap-5 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative w-52 shrink-0">
                  <Image
                    src={service.imageUrl ?? FALLBACK}
                    alt={service.name}
                    fill
                    className="object-cover"
                    sizes="208px"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FALLBACK;
                    }}
                  />
                </div>
                <div className="flex-1 py-5 pr-5">
                  <span
                    className={`mb-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${CATEGORY_COLORS[service.category.name] ?? "bg-gray-100 text-gray-600"}`}
                  >
                    <Tag size={11} />
                    {service.category.name}
                  </span>
                  <h2 className="mb-1.5 text-base font-bold text-gray-900">{service.name}</h2>
                  <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-gray-500">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#0D99FF]">
                      Giá dịch vụ: {Number(service.basePrice).toLocaleString("vi-VN")} VNĐ / {service.unit}
                    </span>
                    <button className="flex cursor-pointer items-center gap-1 rounded-lg bg-[#0D99FF] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#0B84E6]">
                      Liên hệ
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
