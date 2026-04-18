"use client";

import { FormProvider } from "react-hook-form";
import { RoomFormValues } from "../schemas/room.schema";
import RoomFormBasicSection from "./sections/RoomFormBasicSection";
import RoomFormDetailSection from "./sections/RoomFormDetailSection";
import RoomFormAmenitiesSection from "./sections/RoomFormAmenitiesSection";
import RoomFormImagesSection from "./sections/RoomFormImagesSection";
import { useRoomForm } from "../hooks/useRoomForm";
import RoomFormHotelRulesSection from "./sections/RoomFormHotelRulesSection";

interface RoomFormProps {
  mode: "create" | "edit";
  defaultValues?: Partial<RoomFormValues>;
  onSubmit: (data: RoomFormValues) => Promise<void> | void;
  isSubmitting?: boolean;
  onCancel?: () => void;
}

export default function RoomForm({
  mode,
  defaultValues,
  onSubmit,
  isSubmitting = false,
  onCancel,
}: RoomFormProps) {
  const methods = useRoomForm(defaultValues);

  return (
    <FormProvider {...methods}>
      <form
        id="room-form"
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <fieldset disabled={isSubmitting} className="border-0 p-0 m-0 min-w-0">
          <div className="grid grid-cols-3 gap-6">
            {/* LEFT */}
            <div className="col-span-2 space-y-6">
              <RoomFormBasicSection />
              <RoomFormDetailSection />
              <RoomFormAmenitiesSection />
              <RoomFormHotelRulesSection />
            </div>

            {/* RIGHT */}
            <div className="col-span-1">
              <RoomFormImagesSection />
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-100 pt-6 mt-6">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 cursor-pointer transition"
              >
                Hủy
              </button>
            )}

            <button
              type="submit"
              className="rounded-lg bg-[#0D99FF] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0B84E6] cursor-pointer transition disabled:opacity-60"
            >
              {isSubmitting
                ? "Đang lưu..."
                : mode === "create"
                ? "Tạo phòng"
                : "Cập nhật"}
            </button>
          </div>
        </fieldset>
      </form>
    </FormProvider>
  );
}