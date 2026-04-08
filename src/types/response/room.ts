import { PaginationMeta } from "../common";

export type AmenityResponse = {
  id: string;
  name: string;
  icon: string;
};

export type RoomResponse = {
  id: string;
  roomTypeId: string;
  roomTypeName: string;
  roomTypeCode: string;
  roomNumber: string;
  roomName: string;
  notes: string | null;
  basePrice: number;
  maxGuests: number;
  thumbnailUrl: string | null;
  rating: number | null;
  status: string;
  amenities: AmenityResponse[];
};

export type RoomsFilter = {
  roomTypeCode?: string;
  guests?: number;
  limit?: number;
  checkIn?: string;
  checkOut?: string;
  minPrice?: number;
  maxPrice?: number;
  pageNum?: number;
  pageSize?: number;
};

export type RoomsPagedResponse = {
  data: RoomResponse[];
  meta: PaginationMeta;
};

export type AdminRoomsFilter = {
  roomTypeCode?: string;
  status?: string;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  minPrice?: number;
  maxPrice?: number;
  pageNum?: number;
  pageSize?: number;
  search?: string;
};
