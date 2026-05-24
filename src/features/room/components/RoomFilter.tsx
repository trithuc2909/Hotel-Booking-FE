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
  const [guests, setGuests] = useQueryState("guests", parseAsString.withDefault(""));

  const [price, setPrice] = useQueryState("price", parseAsString.withDefault("0-2200000"));

  const [amenities, setAmenities] = useQueryState("amenities", parseAsString.withDefault(""));

  const [minPrice, maxPrice] = price.split("-").map(Number);

  const [localRange, setLocalRange] = useState<[number, number]>([minPrice, maxPrice]);

  const PRICE_DEFAULT: [number, number] = [0, 2200000];

  const cleanUpFunction = () => {
    setType(null);
    setGuests(null);
    setPrice("0-2200000");
    setLocalRange(PRICE_DEFAULT);
    setAmenities(null);
  };

  const Checkbox = ({ checked }: { checked: boolean }) => (
    <div
      className={`flex h-4 w-4 items-center justify-center rounded border ${checked ? "border-blue-500 bg-blue-500" : "border-gray-300"} `}
    >
      {checked && <div className="h-2 w-2 rounded-sm bg-white" />}
    </div>
  );

  return (
    <aside className="sticky top-24 h-fit w-72 shrink-0 self-start rounded-xl border bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-semibold text-gray-800">Bộ lọc tìm kiếm</h3>
        <button onClick={cleanUpFunction} className="cursor-pointer text-xs text-red-600 hover:underline">
          Xoá bộ lọc
        </button>
      </div>
      {/* Room type */}
      <div className="mb-4">
        <h4 className="mb-2 flex items-center gap-2 font-semibold text-gray-700">🛏️ Loại phòng</h4>

        <div className="space-y-2">
          {ROOM_TYPES.map((rt) => {
            const checked = type === rt.value;

            return (
              <div
                key={rt.value}
                onClick={() => setType(checked ? null : rt.value)}
                className="flex cursor-pointer items-center gap-2"
              >
                <Checkbox checked={checked} />
                <span className="text-sm text-gray-700">
                  {rt.label} <span className="text-gray-400"></span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mb-4">
        <h4 className="mb-2 flex items-center gap-2 font-semibold text-gray-700">💰 Khoảng giá</h4>

        <Slider.Root
          className="relative flex h-5 w-full cursor-pointer items-center"
          min={0}
          max={2200000}
          step={50000}
          value={localRange}
          onValueChange={(value) => setLocalRange(value as [number, number])}
          onValueCommit={(value) => {
            setPrice(`${value[0]}-${value[1]}`);
          }}
        >
          <Slider.Track className="relative h-2 grow rounded-full bg-gray-200">
            <Slider.Range className="absolute h-full rounded-full bg-blue-500" />
          </Slider.Track>

          <Slider.Thumb className="block h-4 w-4 rounded-full border border-blue-500 bg-white shadow" />
          <Slider.Thumb className="block h-4 w-4 rounded-full border border-blue-500 bg-white shadow" />
        </Slider.Root>

        {/* Label */}
        <div className="mt-2 flex justify-between text-xs text-gray-500">
          <span>{formatCurrency(minPrice)}</span>
          <span>{formatCurrency(maxPrice)}</span>
        </div>
      </div>
      <div className="mb-4">
        <h4 className="mb-2 flex items-center gap-2 font-semibold text-gray-700">⛰️ Tiện nghi</h4>

        <div className="space-y-2">
          {AMENITIES.map((item) => {
            const selectedList = amenities ? amenities.split(",") : [];
            const checked = selectedList.includes(item);

            const handleAmenityClick = () => {
              let newList: string[];
              if (checked) {
                newList = selectedList.filter((x) => x !== item);
              } else {
                newList = [...selectedList, item];
              }
              setAmenities(newList.length > 0 ? newList.join(",") : null);
            };

            return (
              <div key={item} onClick={handleAmenityClick} className="flex cursor-pointer items-center gap-2">
                <Checkbox checked={checked} />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            );
          })}
        </div>
      </div>
      {/* Guest quantity */}
      <div>
        <h4 className="mb-2 flex items-center gap-2 font-semibold text-gray-700">👥 Số lượng khách</h4>

        <div className="space-y-2">
          {GUEST_OPTIONS.map((g) => {
            const checked = guests === String(g);

            return (
              <div
                key={g}
                onClick={() => setGuests(checked ? null : String(g))}
                className="flex cursor-pointer items-center gap-2"
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
