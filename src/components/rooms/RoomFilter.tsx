"use client";

import { formatCurrency } from "@/lib/utils/formatCurrency";
import * as Slider from "@radix-ui/react-slider";
import { parseAsString, useQueryState } from "nuqs";
import { useState } from "react";

const ROOM_TYPES = [
  { value: "VIP", label: "Phòng VIP" },
  { value: "STD", label: "Phòng tiêu chuẩn" },
];

const AMENITIES = ["Hồ bơi", "Máy pha cà phê", "Tủ quần áo", "Mini bar"];

const GUEST_OPTIONS = [1, 2, 3, 4];

export default function RoomFilter() {
  const [type, setType] = useQueryState("type", parseAsString.withDefault(""));
  const [guests, setGuests] = useQueryState(
    "guests",
    parseAsString.withDefault(""),
  );

  const [price, setPrice] = useQueryState(
    "price",
    parseAsString.withDefault("0-2200000"),
  );

  const [minPrice, maxPrice] = price.split("-").map(Number);

  const [localRange, setLocalRange] = useState<[number, number]>([
    minPrice,
    maxPrice,
  ]);

  const PRICE_DEFAULT: [number, number] = [0, 2200000];

  const cleanUpFunction = () => {
    setType(null);
    setGuests(null);
    setPrice("0-2200000");
    setLocalRange(PRICE_DEFAULT);
  };

  const Checkbox = ({ checked }: { checked: boolean }) => (
    <div
      className={`w-4 h-4 rounded border flex items-center justify-center
      ${checked ? "bg-blue-500 border-blue-500" : "border-gray-300"}
    `}
    >
      {checked && <div className="w-2 h-2 bg-white rounded-sm" />}
    </div>
  );

  return (
    <aside className="w-72 shrink-0 bg-white rounded-xl border p-4 shadow-sm sticky top-24 self-start h-fit">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          Bộ lọc tìm kiếm
        </h3>
        <button
          onClick={cleanUpFunction}
          className="text-xs text-red-600 hover:underline cursor-pointer"
        >
          Xoá bộ lọc
        </button>
      </div>
      {/* Room type */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
          🛏️ Loại phòng
        </h4>

        <div className="space-y-2">
          {ROOM_TYPES.map((rt) => {
            const checked = type === rt.value;

            return (
              <div
                key={rt.value}
                onClick={() => setType(checked ? null : rt.value)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Checkbox checked={checked} />
                <span className="text-sm text-gray-700">
                  {rt.label} <span className="text-gray-400">(4)</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
          💰 Khoảng giá
        </h4>

        <Slider.Root
          className="relative flex items-center w-full h-5 cursor-pointer"
          min={0}
          max={2200000}
          step={50000}
          value={localRange}
          onValueChange={(value) => setLocalRange(value as [number, number])}
          onValueCommit={(value) => {
            setPrice(`${value[0]}-${value[1]}`);
          }}
        >
          <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
            <Slider.Range className="absolute bg-blue-500 rounded-full h-full" />
          </Slider.Track>

          <Slider.Thumb className="block w-4 h-4 bg-white border border-blue-500 rounded-full shadow" />
          <Slider.Thumb className="block w-4 h-4 bg-white border border-blue-500 rounded-full shadow" />
        </Slider.Root>

        {/* Label */}
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>{formatCurrency(minPrice)}</span>
          <span>{formatCurrency(maxPrice)}</span>
        </div>
      </div>
      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
          ⛰️ Tiện nghi
        </h4>

        <div className="space-y-2">
          {AMENITIES.map((item) => (
            <div key={item} className="flex items-center gap-2 cursor-pointer">
              <Checkbox checked={false} />
              <span className="text-sm text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Guest quantity */}
      <div>
        <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
          👥 Số lượng khách
        </h4>

        <div className="space-y-2">
          {GUEST_OPTIONS.map((g) => {
            const checked = guests === String(g);

            return (
              <div
                key={g}
                onClick={() => setGuests(checked ? null : String(g))}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Checkbox checked={checked} />
                <span className="text-sm text-gray-700">{g} người</span>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
