"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BedDouble,
  CalendarCheck,
  ConciergeBell,
  Tag,
} from "lucide-react";
import { ASSETS } from "@/constants/assets";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Quản lý doanh thu", icon: LayoutDashboard },
  { href: "/dashboard/rooms", label: "Quản lý phòng", icon: BedDouble },
  {
    href: "/dashboard/bookings",
    label: "Quản lý đặt phòng",
    icon: CalendarCheck,
  },
  {
    href: "/dashboard/services",
    label: "Quản lý dịch vụ",
    icon: ConciergeBell,
  },
  { href: "/dashboard/promotions", label: "Khuyến mãi", icon: Tag },
];

export default function DashboardSidebar() {
  const pathName = usePathname();

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col bg-[#EEF4FF]">
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 py-4 border-b border-blue-100">
        <img
          src={ASSETS.logoDefault}
          alt="Logo"
          className="h-8 w-8 rounded-full object-cover"
        />
        <span className="text-[#0D99FF] font-bold text-base tracking-widest">
          BULLMAN HOTEL
        </span>
      </div>
      {/* Nav */}
      <nav className="flex-1 space-y-1 p-3">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathName === href || pathName.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-white text-[#0D99FF] shadow-sm"
                  : "text-gray-500 hover:bg-white/70 hover:text-gray-800"
              }`}
            >
              <Icon
                size={17}
                className={isActive ? "text-[#0D99FF]" : "text-gray-400"}
              />
              {label}
            </Link>
          );
        })}
      </nav>
      {/* User info */}
      <div className="border-t border-blue-100 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-400 text-sm font-bold text-white">
            A
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-800">
              Quản Trị Viên
            </p>
            <p className="truncate text-xs text-gray-400">Truy cập cao cấp</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
