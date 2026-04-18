"use client";
import { useFormContext, Controller } from "react-hook-form";
import type { RoomFormValues } from "../../schemas/room.schema";
import { useGetRoomTypesQuery } from "../../api/lookupApi";

export default function RoomFormBasicSection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<RoomFormValues>();

  const { data: roomTypesData, isLoading: isLoadingTypes } =
    useGetRoomTypesQuery();
  const roomTypes = roomTypesData?.data ?? [];

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 space-y-4">
      <h2 className="text-sm font-bold uppercase text-gray-400 tracking-wide">
        Thông tin cơ bản
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Tên phòng <span className="text-red-500">*</span>
          </label>
          <input
            {...register("roomName")}
            placeholder="VD: Royal Lotus"
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0D99FF] focus:ring-1 focus:ring-[#0D99FF] text-gray-600"
          />
          {errors.roomName && (
            <p className="mt-1 text-xs text-red-500">
              {errors.roomName.message}
            </p>
          )}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Mã phòng <span className="text-red-500">*</span>
          </label>
          <input
            {...register("roomNumber")}
            inputMode="numeric"
            maxLength={3}
            placeholder="VD: 101"
            onKeyDown={(e) => {
              const allowed = [
                "Backspace",
                "Delete",
                "Tab",
                "ArrowLeft",
                "ArrowRight",
              ];
              if (!/[0-9]/.test(e.key) && !allowed.includes(e.key)) {
                e.preventDefault();
              }
            }}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0D99FF] focus:ring-1 focus:ring-[#0D99FF] uppercase text-gray-600"
          />
          {errors.roomNumber && (
            <p className="mt-1 text-xs text-red-500">
              {errors.roomNumber.message}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Loại phòng <span className="text-red-500">*</span>
          </label>
          <Controller
            name="roomTypeId"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0D99FF] bg-white text-gray-600"
              >
                <option value="">
                  {isLoadingTypes ? "Đang tải..." : "Chọn loại phòng"}
                </option>
                {roomTypes.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.roomTypeId && (
            <p className="mt-1 text-xs text-red-500">
              {errors.roomTypeId.message}
            </p>
          )}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Giá mỗi đêm (VNĐ) <span className="text-red-500">*</span>
          </label>
          <input
            {...register("basePrice")}
            type="number"
            min={0}
            placeholder="VD: 2000000"
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0D99FF] focus:ring-1 focus:ring-[#0D99FF] text-gray-600"
          />
          {errors.basePrice && (
            <p className="mt-1 text-xs text-red-500">
              {errors.basePrice.message}
            </p>
          )}
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Mô tả chi tiết
        </label>
        <textarea
          {...register("description")}
          rows={3}
          placeholder="Mô tả thông tin phòng gồm những gì nổi bật"
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0D99FF] resize-none text-gray-600"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Mô tả ngắn
        </label>
        <textarea
          {...register("notes")}
          rows={2}
          placeholder="Mô tả nội dung tổng quan"
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0D99FF] resize-none text-gray-600"
        />
      </div>
    </div>
  );
}
