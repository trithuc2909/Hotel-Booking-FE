"use client";

import { useState, useEffect } from "react";
import { Search, Users, BedDouble } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQueryState, parseAsString } from "nuqs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const ROOM_TYPES = [
  { value: "STD", label: "Phòng tiêu chuẩn" },
  { value: "VIP", label: "Phòng VIP" },
] as const;

const GUEST_OPTIONS = [
  { value: "1", label: "1 người lớn" },
  { value: "2", label: "2 người lớn" },
  { value: "3", label: "3 người lớn" },
  { value: "4", label: "4 người lớn" },
] as const;

export default function HeroSection() {
  const [typeQuery, setTypeQuery] = useQueryState("type", parseAsString.withDefault(""));
  const [checkInQuery, setCheckInQuery] = useQueryState("checkIn", parseAsString.withDefault(""));
  const [checkOutQuery, setCheckOutQuery] = useQueryState("checkOut", parseAsString.withDefault(""));
  const [guestsQuery, setGuestsQuery] = useQueryState("guests", parseAsString.withDefault(""));

  const [localRoomType, setLocalRoomType] = useState(typeQuery);
  const [localCheckIn, setLocalCheckIn] = useState(checkInQuery);
  const [localCheckOut, setLocalCheckOut] = useState(checkOutQuery);
  const [localGuests, setLocalGuests] = useState(guestsQuery);

  // Sync local states if query parameters change (e.g. back navigation or reset)
  useEffect(() => {
    setLocalRoomType(typeQuery);
    setLocalCheckIn(checkInQuery);
    setLocalCheckOut(checkOutQuery);
    setLocalGuests(guestsQuery);
  }, [typeQuery, checkInQuery, checkOutQuery, guestsQuery]);

  const handleSearch = () => {
    setTypeQuery(localRoomType || null, { scroll: false });
    setCheckInQuery(localCheckIn || null, { scroll: false });
    setCheckOutQuery(localCheckOut || null, { scroll: false });
    setGuestsQuery(localGuests || null, { scroll: false });

    // Tự động scroll mượt mà xuống khu vực danh sách phòng
    setTimeout(() => {
      document.getElementById("featured-rooms")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <section className="relative w-full">
      <div className="relative h-[480px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600')",
          }}
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl font-bold text-white leading-tight max-w-2xl">
            Khám phá thiên đường tại
            <br />
            <span className="text-[#0D99FF]">Bullman Hotel</span>
          </h1>
        </div>
      </div>

      <div className="relative z-20 mx-auto -mt-30 max-w-5xl px-4">
        <div className="rounded-2xl bg-white shadow-xl px-6 py-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr_1fr_1.2fr]">
            {/* Input 1: room type */}
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-1 text-xs font-semibold text-gray-500 tracking-wide">
                <BedDouble size={13} />
                Loại phòng
              </label>
              <Select value={localRoomType} onValueChange={setLocalRoomType}>
                <SelectTrigger className="h-11 w-full border-gray-200 rounded-lg cursor-pointer">
                  <SelectValue placeholder="Chọn loại phòng" />
                </SelectTrigger>
                <SelectContent side="bottom" position="popper" sideOffset={3} className="w-[var(--radix-select-trigger-width)]" avoidCollisions={false}>
                  {ROOM_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value} className="cursor-pointer" >
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Input 2: checkIn date */}
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-1 text-xs font-semibold text-gray-500 tracking-wide">
                <CalendarIcon size={13} />
                Ngày nhận phòng
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className={cn(
                      "relative h-9 w-full rounded-lg border border-gray-200 px-3 pr-10 text-left text-sm flex items-center focus:outline-none focus:ring-2 focus:ring-[#0D99FF] cursor-pointer",
                      !localCheckIn && "text-gray-400",
                    )}
                  >
                    {localCheckIn
                      ? format(new Date(localCheckIn), "dd/MM/yyyy", { locale: vi })
                      : "Chọn ngày nhận"}

                    <CalendarIcon
                      size={16}
                      className="absolute right-3 text-gray-400"
                    />
                  </button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start" side="bottom" avoidCollisions={false}>
                  <Calendar
                    mode="single"
                    onSelect={(date) => {
                      const formattedDate = date ? format(date, "yyyy-MM-dd") : "";
                      setLocalCheckIn(formattedDate);

                      // reset checkout if checkout < checkin
                      if (localCheckOut && date && new Date(localCheckOut) < date) {
                        setLocalCheckOut("");
                      }
                    }}
                    selected={localCheckIn ? new Date(localCheckIn) : undefined}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    initialFocus
                    locale={vi}
                  />
                </PopoverContent>
              </Popover>
            </div>
            {/* Input 3: checkOut date */}
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-1 text-xs font-semibold text-gray-500 tracking-wide">
                <CalendarIcon size={13} />
                Ngày trả phòng
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className={cn(
                      "relative h-9 w-full rounded-lg border border-gray-200 px-3 pr-10 text-left text-sm flex items-center focus:outline-none focus:ring-2 focus:ring-[#0D99FF] cursor-pointer",
                      !localCheckOut && "text-gray-400",
                    )}
                  >
                    {localCheckOut
                      ? format(new Date(localCheckOut), "dd/MM/yyyy", { locale: vi })
                      : "Chọn ngày trả"}

                    <CalendarIcon
                      size={16}
                      className="absolute right-3 text-gray-400"
                    />
                  </button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start" side="bottom" avoidCollisions={false}>
                  <Calendar
                    mode="single"
                    onSelect={(date) => setLocalCheckOut(date ? format(date, "yyyy-MM-dd") : "")}
                    selected={localCheckOut ? new Date(localCheckOut) : undefined}
                    disabled={(date) =>
                      date < (localCheckIn ? new Date(localCheckIn) : new Date(new Date().setHours(0, 0, 0, 0)))
                    }
                    initialFocus
                    locale={vi}
                  />
                </PopoverContent>
              </Popover>
            </div>
            {/* Input 4: guests + search button */}
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-1 text-xs font-semibold text-gray-500 tracking-wide">
                <Users size={13} />
                Số lượng khách
              </label>
              <div className="flex gap-2">
                <Select value={localGuests} onValueChange={setLocalGuests}>
                  <SelectTrigger className="h-11 flex-1 border-gray-200 rounded-lg cursor-pointer">
                    <SelectValue placeholder="Chọn khách" />
                  </SelectTrigger>
                  <SelectContent side="bottom" position="popper" sideOffset={3} className="w-[var(--radix-select-trigger-width)]" avoidCollisions={false}>
                    {GUEST_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value} className="cursor-pointer">
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* search button */}
                <Button
                  onClick={handleSearch}
                  className="h-9 w-12 rounded-lg bg-[#0D99FF] p-0 hover:bg-[#0B84E6] flex-shrink-0 cursor-pointer flex items-center justify-center"
                  aria-label="Tìm kiếm phòng"
                >
                  <Search size={18} className="text-white" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
