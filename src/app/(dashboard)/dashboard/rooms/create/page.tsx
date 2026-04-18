"use client";

import Breadcrumb from "@/components/shared/Breadcrumb";
import { useCreateRoomMutation } from "@/features/room/api/roomApi";
import RoomForm from "@/features/room/components/RoomForm";
import type { RoomFormValues } from "@/features/room/schemas/room.schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CreateRoomPage() {
  const router = useRouter();

  const [createRoom, { isLoading }] = useCreateRoomMutation();
  const handleSubmit = async (data: RoomFormValues) => {
    const formData = new FormData();

    formData.append("roomName", data.roomName);
    formData.append("roomNumber", data.roomNumber);
    formData.append("roomTypeId", data.roomTypeId);
    formData.append("basePrice", String(data.basePrice));
    formData.append("floor", String(data.floor));
    formData.append("maxGuests", String(data.maxGuests));
    formData.append("balcony", String(data.balcony));
    if (data.size) formData.append("size", String(data.size));
    if (data.bedType) formData.append("bedType", data.bedType);
    if (data.view) formData.append("view", data.view);
    if (data.description) formData.append("description", data.description);
    if (data.notes) formData.append("notes", data.notes);

    data.amenityIds.forEach((id) => formData.append("amenityIds", id));
    if (data.thumbnailUrl) formData.append("thumbnailUrl", data.thumbnailUrl);
    data.imageUrls.forEach((img) => formData.append("imageUrls", img));
    try {
      await createRoom(formData).unwrap();
      toast.success("Tạo phòng thành công!");
      router.push("/dashboard/rooms");
    } catch (err: any) {
      toast.error(err?.data?.message ?? "Có lỗi xảy ra");
    }
  };

  return (
    <div className="space-y-5">
      <Breadcrumb
        items={[
          { label: "Quản lý phòng", href: "/dashboard/rooms" },
          { label: "Thêm phòng mới" },
        ]}
      />

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Thêm phòng mới</h1>
        <p className="mt-0.5 text-sm text-gray-400">
          Điền thông tin để tạo phòng mới
        </p>
      </div>

      <RoomForm
        mode="create"
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
        isSubmitting={isLoading}
      />
    </div>
  );
}
