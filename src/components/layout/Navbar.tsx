"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDown, LogOut, User, CalendarDays } from "lucide-react";

import { colors } from "@/constants/colors";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Phòng & Giá", href: "/rooms" },
  { label: "Dịch vụ", href: "/services" },
  { label: "Ưu đãi", href: "/offers" },
  { label: "Liên hệ", href: "/contact" },
] as const;

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  // TODO: thay bằng redux auth sau
  const isLoggedIn = true;

  const user = {
    name: "Trí Thức",
    email: "danghuutrithuc@gmail.com",
    avatar: null,
  };

  const handleLogout = () => {
    // TODO: dispatch logout
    router.push("/");
  };

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm"
      role="navigation"
      aria-label="Main navigation"
    >
      {" "}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <span
            className="text-xl font-bold"
            style={{ color: colors.primary.blue }}
          >
            BullmanHotel
          </span>
        </Link>
        {/* Navigation links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-[#0D99FF]"
                      : "text-gray-700 hover:text-[#0D99FF]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
        {/* User area */}
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="flex items-center gap-2 rounded-full px-4 py-2 text-white"
                style={{ backgroundColor: colors.primary.blue }}
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="h-7 w-7 rounded-full"
                  />
                ) : (
                  <User size={18} />
                )}

                <span className="text-sm font-medium">{user.name}</span>

                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-56 p-0 rounded-xl shadow-lg"
            >
              {/* Profile header */}
              <div className="flex items-center gap-3 p-3 border-b">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-9 h-9 rounded-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100">
                    <User size={18} />
                  </div>
                )}

                <div className="flex flex-col text-sm">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-gray-500 text-xs">{user.email}</span>
                </div>
              </div>

              {/* Menu items */}
              <DropdownMenuItem asChild>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-3 py-2"
                >
                  <User size={16} />
                  Hồ sơ cá nhân
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  href="/booking-history"
                  className="flex items-center gap-2 px-3 py-2"
                >
                  <CalendarDays size={16} />
                  Lịch sử đặt phòng
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-red-500 focus:text-red-500"
              >
                <LogOut size={16} />
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            asChild
            className="rounded-full px-5 text-white"
            style={{ backgroundColor: colors.primary.blue }}
          >
            <Link href="/login">Đăng nhập</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
