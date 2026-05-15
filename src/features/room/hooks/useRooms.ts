import { useEffect } from "react";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { useGetRoomsQuery } from "../api/roomApi";
import type { RoomResponse } from "../types/room.type";
import type { PaginationMeta } from "@/types/common";

export function useRooms() {
  const [type] = useQueryState("type", parseAsString.withDefault(""));
  const [guests] = useQueryState("guests", parseAsString.withDefault(""));
  const [price] = useQueryState("price", parseAsString.withDefault("0-2200000"));
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [pageSize, setPageSize] = useQueryState("limit", parseAsInteger.withDefault(9));
  
  const [, setOldPageSize] = useQueryState("pageSize");
  useEffect(() => {
    setOldPageSize(null);
  }, [setOldPageSize]);

  const [minPrice, maxPrice] = price.split("-").map(Number);
  const isDefault = minPrice === 0 && maxPrice === 2200000;

  const { data, isLoading } = useGetRoomsQuery({
    roomTypeCode: type || undefined,
    guests: guests ? Number(guests) : undefined,
    minPrice: isDefault ? undefined : minPrice,
    maxPrice: isDefault ? undefined : maxPrice,
    pageNum: page,
    pageSize,
  });

  const rooms: RoomResponse[] = data?.data ?? [];
  const meta = data?.meta as PaginationMeta | undefined;
  const totalPages = meta?.totalPages ?? 1;
  const total = meta?.total ?? 0;

  useEffect(() => {
    if (page !== 1) setPage(1);
  }, [type, guests, price]);

  return { rooms, isLoading, page, setPage, totalPages, total, pageSize, setPageSize };
}
