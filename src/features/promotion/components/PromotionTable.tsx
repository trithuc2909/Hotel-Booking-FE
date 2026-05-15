"use client";

import { DataTable } from "@/components/ui/data-table";
import type { PromotionResponse } from "../types/promotion.type";
import { PromotionColumns } from "./Columns";

interface Props {
  data: PromotionResponse[];
  onView: (p: PromotionResponse) => void;
  onToggleStatus: (p: PromotionResponse) => void;
  onDelete: (p: PromotionResponse) => void;
}

const GRID = "2fr 1.5fr 1fr 1fr 1fr 80px";

export default function PromotionTable({
  data,
  onView,
  onToggleStatus,
  onDelete,
}: Props) {
  const columns = PromotionColumns({ onView, onToggleStatus, onDelete });
  return (
    <DataTable
      columns={columns}
      data={data}
      gridTemplateColumns={GRID}
      emptyMessage="Không tìm thấy ưu đãi nào"
    />
  );
}
