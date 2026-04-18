import { PaginationMeta } from "../../../types/common";

export type AmenityResponse = {
  id: string;
  name: string;
  icon?: string;
};

export type RoomTypeResponse = {
  id: string;
  code: string;
  name: string;
};

export type RoomImageResponse = {
  id: string;
  imageUrl: string;
  displayOrder: number;
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
  statusLabel: string | null;
  amenities: AmenityResponse[];
};

export type RoomDetailResponse = RoomResponse & {
  floor: number;
  size: number | null;
  bedType: string | null;
  view: string | null;
  balcony: boolean;
  description: string | null;
  imageUrls: RoomImageResponse[];
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

export const ROOM_STATUS = {
  AVAILABLE: "AVL",
  OCCUPIED: "OCP",
  CLEANING: "CLN",
  RESERVED: "RSV",
} as const;

export type RoomStatusCode = (typeof ROOM_STATUS)[keyof typeof ROOM_STATUS];
