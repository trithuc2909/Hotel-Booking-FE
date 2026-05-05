"use client";

import { Ticket, PlayCircle } from "lucide-react";
import { MOCK_PROMO_STATS } from "@/features/dashboard/mock/promotionsMock";
import { Button } from "@/components/ui/button";
import { colors } from "@/constants/colors";
import { PlusCircle } from "lucide-react";

type Props = { onAdd: () => void };

export default function PromotionStatsSection({ onAdd }: Props) {
  // TODO (BE): Thay MOCK_PROMO_STATS bằng useGetPromoStatsQuery()
  const stats = MOCK_PROMO_STATS;

  return (
    <div className="flex items-stretch gap-4 flex-wrap">
      {/* Card 1 */}
      <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 flex items-center gap-4 min-w-[160px]">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
          <Ticket size={20} className="text-[#0D99FF]" />
        </div>
        <div>
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
            Tổng số lượt sử dụng
          </p>
          <p className="text-2xl font-extrabold text-gray-900 leading-tight mt-0.5">
            {stats.totalUsed}
          </p>
        </div>
      </div>

      {/* Card 2 */}
      <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 flex items-center gap-4 min-w-[160px]">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
          <PlayCircle size={20} className="text-emerald-500" />
        </div>
        <div>
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
            Tổng ưu đãi đang chạy
          </p>
          <p className="text-2xl font-extrabold text-gray-900 leading-tight mt-0.5">
            {stats.activeCount}
          </p>
        </div>
      </div>

      {/* Nút thêm mới – căn phải */}
      {/* TODO (BE): onClick mở modal/navigate tạo ưu đãi mới */}
      <Button
        id="promo-add-btn"
        onClick={onAdd}
        className="h-auto px-6 text-white flex items-center gap-2 rounded-xl self-stretch"
        style={{ backgroundColor: colors.primary.blue }}
      >
        <PlusCircle size={16} />
        Thêm ưu đãi mới
      </Button>
    </div>
  );
}
