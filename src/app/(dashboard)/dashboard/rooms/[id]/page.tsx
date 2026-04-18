"use client";

import Breadcrumb from "@/components/shared/Breadcrumb";
import {
  useGetAdminRoomByIdQuery,
  useUpdateRoomByIdMutation,
} from "@/features/room/api/roomApi";
import RoomForm from "@/features/room/components/RoomForm";
import { RoomFormValues } from "@/features/room/schemas/room.schema";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { toast } from "sonner";

export default function RoomDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data, isLoading, isError } = useGetAdminRoomByIdQuery(
    { id: id! },
    { skip: !id, refetchOnMountOrArgChange: true },
  );

  const [updateRoom, { isLoading: isUpdating }] = useUpdateRoomByIdMutation();
  const room = data?.data;

  const defaultValues: Partial<RoomFormValues> = useMemo(
    () =>
      room
        ? {
            roomName: room.roomName,
            roomNumber: room.roomNumber,
            roomTypeId: room.roomTypeId,
            basePrice: Number(room.basePrice),
            floor: room.floor,
            maxGuests: room.maxGuests,
            balcony: room.balcony,
            size: room.size ?? undefined,
            bedType: room.bedType ?? undefined,
            view: room.view ?? undefined,
            description: room.description ?? undefined,
            notes: room.notes ?? undefined,
            amenityIds: room.amenities?.map((a) => a.id) ?? [],
            existingThumbnail: room.thumbnailUrl
              ? `${room.thumbnailUrl}?v=${Date.now()}`
              : undefined,
            existingImages: room.imageUrls ?? [],
          }
        : {},
    [room],
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0D99FF] border-t-transparent" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-32 text-center text-gray-400">
        Lỗi khi tải dữ liệu phòng
      </div>
    );
  }

  if (!room) {
    return (
      <div className="py-32 text-center text-gray-400">
        Không tìm thấy phòng
      </div>
    );
  }

  const handleSubmit = async (formData: RoomFormValues) => {
    if (!id) return;

    const body = new FormData();

    body.append("roomName", formData.roomName);
    body.append("roomNumber", formData.roomNumber);
    body.append("roomTypeId", formData.roomTypeId);
    body.append("basePrice", String(formData.basePrice));
    body.append("floor", String(formData.floor));
    body.append("maxGuests", String(formData.maxGuests));
    body.append("balcony", String(formData.balcony));

    if (formData.size) body.append("size", String(formData.size));
    if (formData.bedType) body.append("bedType", formData.bedType);
    if (formData.view) body.append("view", formData.view);
    if (formData.description) body.append("description", formData.description);
    if (formData.notes) body.append("notes", formData.notes);
    formData.amenityIds.forEach((id) => body.append("amenityIds", id));

    if (formData.thumbnailUrl) body.append("thumbnailUrl", formData.thumbnailUrl);
    formData.imageUrls.forEach((img) => body.append("imageUrls", img));
    formData.deleteImageIds?.forEach((id) => body.append("deleteImageIds", id));

    try {
      await updateRoom({ id, data: body }).unwrap();
      toast.success("Cập nhật phòng thành công");
      router.push("/dashboard/rooms");
    } catch (error: any) {
      toast.error(error?.data?.message || "Cập nhật phòng thất bại");
    }
  };

  return (
    <div className="space-y-5">
      <Breadcrumb
        items={[
          { label: "Quản lý phòng", href: "/dashboard/rooms" },
          { label: "Chi tiết phòng" },
          { label: room.roomName },
        ]}
      />

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Chi tiết phòng</h1>
        <p className="mt-0.5 text-sm text-gray-400">Điền thông tin để cập nhật phòng</p>
      </div>

      <RoomForm
        mode="edit"
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        isSubmitting={isUpdating}
        onCancel={() => router.back()}
      />
    </div>
  );
}
