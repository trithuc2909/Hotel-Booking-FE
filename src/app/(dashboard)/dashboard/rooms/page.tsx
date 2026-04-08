"use client";

import Breadcrumb from "@/components/common/Breadcrumb";
import Pagination from "@/components/common/Pagination";
import SearchInput from "@/components/common/SearchInput";
import { createRoomColumns } from "@/components/dashboard/rooms/Columns";
import { DeleteRoomModal, UpdateStatusModal } from "@/components/dashboard/rooms/Modal";
import RoomFilterBar from "@/components/dashboard/rooms/RoomFilterBar";
import RoomTable from "@/components/dashboard/rooms/RoomTable";
import { useGetAdminRoomsQuery } from "@/store/feature/room/roomApi";
import type { RoomResponse } from "@/types/response/room";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";

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

  const rooms = data?.data ?? [];
  const meta = data?.meta;

  const closeModal = () => {
    setModalType(null);
    setSelectedRoom(null);
  };

  const columns = useMemo(
    () =>
      createRoomColumns({
        onView: (room) => console.log("view", room.id), // TODO: navigate to detail
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
        <button className="flex cursor-pointer shrink-0 items-center gap-2 rounded-lg bg-[#0D99FF] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0B84E6] transition-colors">
          <Plus size={16} />
          Thêm Phòng Mới
        </button>
      </div>

      <RoomFilterBar
        type={roomTypeFilter}
        status={statusFilter}
        sortPrice={sortPrice}
        onSortPriceChange={(v) => { setSortPrice(v); setPageNum(1); }}
        onTypeChange={(v) => { setRoomTypeFilter(v); setPageNum(1); }}
        onStatusChange={(v) => { setStatusFilter(v); setPageNum(1); }}
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
            onPageSizeChange={(s) => { setPageSize(s); setPageNum(1); }}
          />
        </>
      )}

      {/* Modals */}
      {selectedRoom && modalType === "delete" && (
        <DeleteRoomModal
          room={selectedRoom}
          onClose={closeModal}
          onConfirm={() => {
            console.log("delete", selectedRoom.id); // TODO: gọi API
            closeModal();
          }}
        />
      )}
      {selectedRoom && modalType === "update" && (
        <UpdateStatusModal
          room={selectedRoom}
          onClose={closeModal}
          onSave={(status) => {
            console.log("update", selectedRoom.id, status); // TODO: gọi API
            closeModal();
          }}
        />
      )}
    </div>
  );
}
