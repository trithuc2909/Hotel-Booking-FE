import type { RoomResponse } from "@/types/response/room";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";

interface Props {
  rooms: RoomResponse[];
  columns: ColumnDef<RoomResponse>[];
}

export default function RoomTable({ rooms, columns }: Props) {
  return (
    <DataTable
      columns={columns}
      data={rooms}
      emptyMessage="Không tìm thấy phòng"
      gridTemplateColumns="2fr 1.5fr 1.2fr 1.2fr 80px"
    />
  );
}
