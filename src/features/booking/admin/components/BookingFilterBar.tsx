"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminBookingsFilter } from "../../types/booking.type";
import { useGetCodesQuery } from "@/features/room";
import { STATUS_TYPE } from "@/constants/common";

interface BookingFilterBarProps {
  filter: AdminBookingsFilter;
  onFilterChange: (newFilter: AdminBookingsFilter) => void;
  onClearFilter: () => void;
}

export default function BookingFilterBar({
  filter,
  onFilterChange,
  onClearFilter,
}: BookingFilterBarProps) {
  const hasActiveFilter =
    filter.search || filter.status || filter.checkInDate || filter.checkOutDate;

  const { data: codesData } = useGetCodesQuery(STATUS_TYPE.BOOKING_STATUS);
  const statuses = codesData?.data || [];

  const filteredStatuses = statuses.filter((item: any) =>
    ["PPY", "CFM", "CAN"].includes(item.code),
  );

  return (
    <div className="flex flex-wrap items-center gap-3 py-1">
      <div className="relative flex-1 max-w-sm min-w-[240px]">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Tìm theo Mã đặt phòng, Tên khách hàng,..."
          className="pl-9 bg-white h-9 text-xs"
          value={filter.search || ""}
          onChange={(e) =>
            onFilterChange({ ...filter, search: e.target.value, pageNum: 1 })
          }
        />
      </div>

      <div className="flex items-center gap-1.5">
        <span className="text-xs text-gray-500 whitespace-nowrap">Từ:</span>
        <Input
          type="date"
          className="w-[130px] bg-white h-9 text-xs cursor-pointer"
          value={filter.checkInDate || ""}
          onChange={(e) =>
            onFilterChange({
              ...filter,
              checkInDate: e.target.value,
              pageNum: 1,
            })
          }
        />
      </div>

      <div className="flex items-center gap-1.5">
        <span className="text-xs text-gray-500 whitespace-nowrap">Đến:</span>
        <Input
          type="date"
          className="w-[130px] bg-white h-9 text-xs cursor-pointer"
          value={filter.checkOutDate || ""}
          onChange={(e) =>
            onFilterChange({
              ...filter,
              checkOutDate: e.target.value,
              pageNum: 1,
            })
          }
        />
      </div>

      <Select
        value={filter.status || "ALL"}
        onValueChange={(val) =>
          onFilterChange({
            ...filter,
            status: val === "ALL" ? undefined : val,
            pageNum: 1,
          })
        }
      >
        <SelectTrigger className="w-[160px] bg-white h-9 text-xs cursor-pointer">
          <SelectValue placeholder="Trạng thái" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL" className="text-xs cursor-pointer">
            Tất cả trạng thái
          </SelectItem>
          {filteredStatuses.map((item) => (
            <SelectItem
              key={item.code}
              value={item.code}
              className="text-xs cursor-pointer"
            >
              {item.displayAs}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasActiveFilter && (
        <Button
          variant="ghost"
          onClick={onClearFilter}
          className="group h-9 w-9 p-0 text-muted-foreground hover:bg-slate-100 hover:text-slate-700 rounded-lg cursor-pointer flex items-center justify-center shrink-0"
          title="Xóa bộ lọc"
        >
          <X className="h-4 w-4 transition-colors group-hover:text-red-500" />
        </Button>
      )}
    </div>
  );
}
