import { DataTable } from "@/components/ui/data-table";
import type { ServiceResponse } from "../types/service.type";
import { ServiceColumns } from "./Columns";

interface Props {
  data: ServiceResponse[];
  onView: (s: ServiceResponse) => void;
  onToggleStatus: (s: ServiceResponse) => void;
  onDelete: (s: ServiceResponse) => void;
}

const GRID = "2fr 1fr 1fr 1fr 80px";

export default function ServiceTable({
  data,
  onView,
  onToggleStatus,
  onDelete,
}: Props) {
  const columns = ServiceColumns({ onView, onToggleStatus, onDelete });
  return (
    <DataTable
      columns={columns}
      data={data}
      gridTemplateColumns={GRID}
      emptyMessage="Không tìm thấy dịch vụ nào"
    />
  );
}
