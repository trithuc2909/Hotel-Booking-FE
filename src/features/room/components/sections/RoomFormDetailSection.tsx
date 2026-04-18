"use client";
import { useFormContext } from "react-hook-form";
import type { RoomFormValues } from "../../schemas/room.schema";

const BED_TYPES = [
  { value: "Triple", label: "Giường Triple" },
  { value: "Single", label: "Giường đơn" },
  { value: "Double", label: "Giường đôi" },
];

const VIEW_OPTIONS = [
  { value: "Sea", label: "Hướng biển" },
  { value: "City", label: "Hướng thành phố" },
  { value: "Garden", label: "Hướng vườn" },
  { value: "Pool", label: "Hướng hồ bơi" },
];

export default function RoomFormDetailSection() {
  const { register, watch, setValue } = useFormContext<RoomFormValues>();
  const balcony = watch("balcony");

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 space-y-4">
      <h2 className="text-sm font-bold uppercase text-gray-400 tracking-wide">
        Chi tiết phòng
      </h2>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Số lượng khách <span className="text-red-500">*</span>
          </label>
          <input
            {...register("maxGuests")}
            type="number" min={1} max={10}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0D99FF] text-gray-600"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Tầng <span className="text-red-500">*</span>
          </label>
          <input
            {...register("floor")}
            type="number" min={1}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0D99FF] text-gray-600"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Diện tích (m²)</label>
          <input
            {...register("size")}
            type="number" min={1}
            placeholder="VD: 35"
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0D99FF] text-gray-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Loại giường</label>
          <select
            {...register("bedType")}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none bg-white focus:border-[#0D99FF] text-gray-600"
          >
            <option value="">Chọn loại giường</option>
            {BED_TYPES.map((b) => (
              <option key={b.value} value={b.value}>{b.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Hướng nhìn</label>
          <select
            {...register("view")}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none bg-white focus:border-[#0D99FF] text-gray-600"
          >
            <option value="">Chọn hướng nhìn</option>
            {VIEW_OPTIONS.map((v) => (
              <option key={v.value} value={v.value}>{v.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setValue("balcony", !balcony)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            balcony ? "bg-[#0D99FF]" : "bg-gray-200"
          }`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            balcony ? "translate-x-6" : "translate-x-1"
          }`} />
        </button>
        <label className="text-sm font-medium text-gray-700">Có ban công</label>
      </div>
    </div>
  );
}
