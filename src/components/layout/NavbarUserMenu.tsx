"use client";

import { ChevronDown, LogOut, User, CalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";
import { useGetMeQuery } from "@/features/user/api/userApi";
import { colors } from "@/constants/colors";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/features/auth/slices/authSlice";

export default function NavbarUserMenu() {
  const router = useRouter();
  const isLoggedIn = useAppSelector((state) => state.auth.isAuthenticated);
  const { data: meData } = useGetMeQuery(undefined, { skip: !isLoggedIn });
  const user = meData?.data;

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  if (!isLoggedIn) {
    return (
      <div className="flex items-center gap-3">
        <Button
          asChild
          variant="outline"
          className="rounded-full px-5 border-[#0D99FF] text-[#0D99FF] hover:bg-[#0D99FF] hover:text-white transition-colors"
        >
          <Link href="/register">Đăng ký</Link>
        </Button>
        <Button
          asChild
          className="rounded-full px-5 text-white"
          style={{ backgroundColor: colors.primary.blue }}
        >
          <Link href="/login" className="flex items-center gap-1.5">
            <User size={15} />
            Đăng nhập
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="cursor-pointer flex items-center gap-2 rounded-full px-4 py-2 text-white"
          style={{ backgroundColor: colors.primary.blue }}
        >
          <User size={18} />
          <span className="text-sm font-medium">{user?.username}</span>
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        alignOffset={-10}
        className="w-56 p-0 rounded-xl shadow-lg"
      >
        <div className="flex items-center gap-3 p-3 border-b">
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt="avatar"
              className="w-9 h-9 rounded-full"
            />
          ) : (
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100">
              <User size={18} />
            </div>
          )}
          <div className="flex flex-col text-sm">
            <span className="font-medium">{user?.username}</span>
            <span className="text-gray-500 text-xs">{user?.email}</span>
          </div>
        </div>

        <DropdownMenuItem asChild>
          <Link
            href="/profiles"
            className="flex items-center gap-2 px-3 py-2 cursor-pointer"
          >
            <User size={16} /> Hồ sơ cá nhân
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/booking-history"
            className="flex items-center gap-2 px-3 py-2 cursor-pointer"
          >
            <CalendarDays size={16} /> Lịch sử đặt phòng
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 text-red-500 focus:text-red-500 cursor-pointer"
        >
          <LogOut size={16} /> Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
