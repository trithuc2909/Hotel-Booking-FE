"use client";

import { useFormContext, useWatch } from "react-hook-form";
import type { RoomFormValues } from "../../schemas/room.schema";
import { useGetAmenitiesQuery } from "../../api/lookupApi";

export default function RoomFormAmenitiesSection() {
  const { setValue } = useFormContext<RoomFormValues>();
  const selected = useWatch({ name: "amenityIds" }) ?? [];

  const { data: amenitiesData, isLoading } = useGetAmenitiesQuery();
  const amenities = amenitiesData?.data ?? [];

  const toggle = (id: string) => {
    setValue(
      "amenityIds",
      selected.includes(id)
        ? selected.filter((x: string) => x !== id)
        : [...selected, id],
    );
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase text-gray-400 tracking-wide">
          Tiện nghi
        </h2>
        <span
          className={`rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-[#0D99FF] transition-opacity ${
            selected.length > 0 ? "opacity-100" : "opacity-0"
          }`}
        >
          {selected.length} đã chọn
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {isLoading ? (
          Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="h-10 animate-pulse rounded-lg bg-gray-100"
            />
          ))
        ) : amenities.length === 0 ? (
          <p className="col-span-3 py-4 text-center text-sm text-gray-400">
            Không có tiện nghi nào
          </p>
        ) : (
          amenities.map((a) => {
            const checked = selected.includes(a.id);
            return (
              <div
                key={a.id}
                onClick={() => toggle(a.id)}
                className={`flex h-10 cursor-pointer items-center gap-2.5 rounded-lg border px-3 text-sm select-none transition-colors ${
                  checked
                    ? "border-[#0D99FF] bg-blue-50 text-[#0D99FF]"
                    : "border-gray-200 text-gray-600 hover:border-blue-200 hover:bg-gray-50"
                }`}
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                    checked
                      ? "border-[#0D99FF] bg-[#0D99FF]"
                      : "border-gray-300"
                  }`}
                >
                  {checked && (
                    <svg
                      className="h-2.5 w-2.5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </span>
                <span className="truncate">{a.name}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
