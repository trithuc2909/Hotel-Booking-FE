"use client";

import Breadcrumb from "@/components/shared/Breadcrumb";
import Pagination from "@/components/shared/Pagination";
import SearchInput from "@/components/shared/SearchInput";
import { createRoomColumns } from "@/features/room/components/Columns";
import {
  DeleteRoomModal,
  UpdateStatusModal,
} from "@/features/room/components/Modal";
import RoomFilterBar from "@/features/room/components/RoomFilterBar";
import RoomTable from "@/features/room/components/RoomTable";
import {
  useGetAdminRoomsQuery,
  useUpdateRoomStatusMutation,
  useDeleteRoomMutation,
} from "@/features/room/api/roomApi";
import type { RoomResponse, RoomStatusCode } from "@/features/room/types/room.type";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ModalType = "update" | "delete" | null;

export default function AdminRoomsPage() {
  const [roomTypeFilter, setRoomTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [sortPrice, setSortPrice] = useState("");
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(5);

  const [selectedRoom, setSelectedRoom] = useState<RoomResponse | null>(null);
  const [modalType, setModalType] = useState<ModalType>(null);

  const { data, isLoading, isError } = useGetAdminRoomsQuery({
    roomTypeCode: roomTypeFilter || undefined,
    status: statusFilter || undefined,
    sortBy: sortPrice ? "basePrice" : undefined,
    sortDirection: sortPrice ? (sortPrice as "asc" | "desc") : undefined,
    search: search || undefined,
    pageNum,
    pageSize,
  });

  const [updateRoomStatus, { isLoading: isUpdating }] =
    useUpdateRoomStatusMutation();

  const [deleteRoom, { isLoading: isDeleting }] = useDeleteRoomMutation();

  const rooms = data?.data ?? [];
  const meta = data?.meta;
  const router = useRouter();

  const closeModal = () => {
    setModalType(null);
    setSelectedRoom(null);
  };

  const handleUpdateStatus = async (status: RoomStatusCode) => {
    if (!selectedRoom) return;

    try {
      await updateRoomStatus({ id: selectedRoom.id, status }).unwrap();
      toast.success("Cập nhật trạng thái phòng thành công");
      closeModal();
    } catch (err: any) {
      const code = err?.data?.code;

      if (code === "INVALID_TRANSITION") {
        toast.error(
          "Không thể chuyển trạng thái này. Xem hướng dẫn để biết thứ tự hợp lệ.",
        );
      } else {
        toast.error(err?.data?.message ?? "Có lỗi xảy ra");
      }
    }
  };

  const handleDeleteRoom = async () => {
    if (!selectedRoom) return;

    try {
      await deleteRoom({ id: selectedRoom.id }).unwrap();
      toast.success("Xóa phòng thành công");
      closeModal();
    } catch (err: any) {
      const code = err?.data?.code;

      if (code === "ROOM_OCCUPIED") {
        toast.error("Không thể xóa phòng đang có khách");
      } else {
        toast.error(err?.data?.message ?? "Có lỗi xảy ra");
      }
    }
  };

  const columns = useMemo(
    () =>
      createRoomColumns({
        onView: (room) => router.push(`/dashboard/rooms/${room.id}`),
        onUpdate: (room) => {
          setSelectedRoom(room);
          setModalType("update");
        },
        onDelete: (room) => {
          setSelectedRoom(room);
          setModalType("delete");
        },
      }),
    [],
  );

  return (
    <div className="space-y-5">
      <Breadcrumb
        items={[
          { label: "Quản lý phòng", href: "/dashboard/rooms" },
          { label: "Danh sách phòng" },
        ]}
      />

      <h1 className="text-2xl font-bold text-gray-900">Quản lý phòng</h1>

      <div className="flex items-center justify-between gap-4">
        <SearchInput
          value={search}
          onChange={(v) => {
            setSearch(v);
            setPageNum(1);
          }}
          placeholder="Tìm kiếm theo tên phòng, mã phòng..."
          className="flex-1 max-w-md"
        />
        <button
          onClick={() => router.push("/dashboard/rooms/create")}
          className="flex cursor-pointer shrink-0 items-center gap-2 rounded-lg bg-[#0D99FF] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0B84E6] transition-colors"
        >
          <Plus size={16} />
          Thêm Phòng Mới
        </button>
      </div>

      <RoomFilterBar
        type={roomTypeFilter}
        status={statusFilter}
        sortPrice={sortPrice}
        onSortPriceChange={(v) => {
          setSortPrice(v);
          setPageNum(1);
        }}
        onTypeChange={(v) => {
          setRoomTypeFilter(v);
          setPageNum(1);
        }}
        onStatusChange={(v) => {
          setStatusFilter(v);
          setPageNum(1);
        }}
      />

      {isLoading ? (
        <p className="py-16 text-center text-sm text-gray-400">Đang tải...</p>
      ) : isError ? (
        <p className="py-16 text-center text-sm text-red-400">
          Lỗi khi tải dữ liệu
        </p>
      ) : (
        <>
          <RoomTable rooms={rooms} columns={columns} />
          <Pagination
            page={pageNum}
            totalPages={meta?.totalPages || 1}
            onPageChange={setPageNum}
            total={meta?.total}
            pageSize={pageSize}
            onPageSizeChange={(s) => {
              setPageSize(s);
              setPageNum(1);
            }}
          />
        </>
      )}

      {/* Modals */}
      {selectedRoom && modalType === "delete" && (
        <DeleteRoomModal
          room={selectedRoom}
          onClose={closeModal}
          isDeleting={isDeleting}
          onConfirm={handleDeleteRoom}
        />
      )}
      {selectedRoom && modalType === "update" && (
        <UpdateStatusModal
          room={selectedRoom}
          onClose={closeModal}
          isSaving={isUpdating}
          onSave={handleUpdateStatus}
        />
      )}
    </div>
  );
}
