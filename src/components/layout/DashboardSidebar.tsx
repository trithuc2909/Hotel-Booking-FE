"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  BedDouble,
  CalendarCheck,
  ConciergeBell,
  Tag,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { ASSETS } from "@/constants/assets";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/features/auth";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: number;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: "TỔNG QUAN",
    items: [
      { href: "/dashboard", label: "Quản lý doanh thu", icon: BarChart3 },
    ],
  },
  {
    title: "VẬN HÀNH",
    items: [
      { href: "/dashboard/rooms", label: "Quản lý phòng", icon: BedDouble },
      { href: "/dashboard/bookings", label: "Quản lý đặt phòng", icon: CalendarCheck },
      { href: "/dashboard/services", label: "Quản lý dịch vụ", icon: ConciergeBell },
    ],
  },
  {
    title: "MARKETING",
    items: [
      { href: "/dashboard/promotions", label: "Quản lý ưu đãi", icon: Tag },
    ],
  },
];

export default function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathName = usePathname();
  const router = useRouter();

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };

  const checkActive = (href: string): boolean => {
    if (href === "/dashboard") {
      return pathName === "/dashboard";
    }
    return pathName.startsWith(href);
  };

  return (
    <aside
      role="complementary"
      aria-label="Sidebar Admin"
      className={`flex h-screen flex-col bg-white border-r border-slate-100 transition-all duration-300 shrink-0 ${isCollapsed ? "w-20" : "w-64"
        }`}
    >
      <div className="flex items-center justify-between px-4 py-5 border-b border-blue-100 h-[73px]">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 overflow-hidden hover:opacity-85 transition-opacity cursor-pointer"
        >
          <img
            src={ASSETS.logoDefault}
            alt="Logo"
            className="h-8 w-8 rounded-full object-cover shrink-0"
          />
          {!isCollapsed && (
            <span className="text-[#0D99FF] font-bold text-sm tracking-wide truncate select-none">
              Bullman Hotel
            </span>
          )}
        </Link>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Mở rộng menu" : "Thu gọn menu"}
          aria-expanded={!isCollapsed}
          className="p-1.5 rounded-lg border border-slate-100 hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors shadow-sm bg-white shrink-0 cursor-pointer"
        >
          {isCollapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
        </button>
      </div>

      <nav
        role="navigation"
        aria-label="Chính"
        className="flex-1 overflow-y-auto px-3 py-4 space-y-6"
      >
        {NAV_SECTIONS.map((section) => (
          <div key={section.title} className="space-y-1.5" role="group">
            {!isCollapsed ? (
              <h3 className="px-3 text-[10px] font-bold tracking-widest text-slate-400 uppercase select-none">
                {section.title}
              </h3>
            ) : (
              <div className="h-2" />
            )}

            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = checkActive(item.href);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    title={isCollapsed ? item.label : undefined}
                    aria-current={isActive ? "page" : undefined}
                    className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer ${isActive
                      ? "bg-[#EFF6FF] text-blue-600 font-bold"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                      }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/4 bottom-1/4 w-[3px] bg-blue-600 rounded-r-md" />
                    )}

                    <Icon
                      size={18}
                      className={`shrink-0 transition-transform duration-200 group-hover:scale-105 ${isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
                        }`}
                    />

                    {!isCollapsed && (
                      <span className="flex-1 truncate">{item.label}</span>
                    )}

                    {item.badge !== undefined && (
                      <span
                        className={`flex h-5 items-center justify-center rounded-md px-1.5 text-[10px] font-bold shrink-0 ${isActive
                          ? "bg-blue-100 text-blue-700"
                          : "bg-slate-100 text-slate-600"
                          }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-100 bg-slate-50/30">
        <button
          onClick={handleLogout}
          aria-label="Đăng xuất khỏi hệ thống"
          title={isCollapsed ? "Đăng xuất" : undefined}
          className={`cursor-pointer flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${isCollapsed
            ? "justify-center text-red-500 hover:bg-red-50"
            : "text-red-500 hover:bg-red-50 hover:text-red-600"
            }`}
        >
          <LogOut size={16} className="shrink-0" />
          {!isCollapsed && <span>Đăng xuất</span>}
        </button>
      </div>
    </aside>
  );
}
