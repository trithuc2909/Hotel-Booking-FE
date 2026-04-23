"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

import { colors } from "@/constants/colors";
import { ASSETS } from "@/constants/assets";

const NAV_LINKS = [
  { label: "Phòng & Giá", href: "/rooms" },
  { label: "Dịch vụ", href: "/services" },
  { label: "Ưu đãi", href: "/promotions" },
  { label: "Liên hệ", href: "/contact" },
] as const;

const NavbarUserMenu = dynamic(() => import("./NavbarUserMenu"), {
  ssr: false,
  loading: () => (
    <div className="h-9 w-24 rounded-full bg-gray-100 animate-pulse" />
  ),
});

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm"
      role="navigation"
      aria-label="Main navigation"
    >
      {" "}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <img
            src={ASSETS.logoDefault}
            alt="BullmanHotel"
            className="h-10 w-10 object-contain"
          />
          <span
            className="text-lg font-bold"
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
        <NavbarUserMenu />
      </div>
    </nav>
  );
}
