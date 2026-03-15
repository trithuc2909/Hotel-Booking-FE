export type AmenityResponse = {
    id: string;
    name: string;
    icon: string;
}

export type FeaturedRoomResponse = {
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