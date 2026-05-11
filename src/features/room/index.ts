
// API - RTK Query hooks
export * from "./api/roomApi";
export * from "./api/lookupApi";

// Views
export { default as RoomListView } from "./views/RoomListView";
export { default as RoomDetailView } from "./views/RoomDetailView";

// Components — public-facing
export { RoomCard, StarRating } from "./components/RoomCard";
export { default as RoomFilter } from "./components/RoomFilter";
export { default as RoomFilterBar } from "./components/RoomFilterBar";
export { default as RoomGallery } from "./components/RoomGallery";
export { default as RoomAmenities } from "./components/RoomAmenities";
export { default as HotelRules } from "./components/HotelRules";
export { default as BookingWidget } from "./components/BookingWidget";
export { default as RoomDetailModal } from "./modals/RoomDetailModal";
export { default as RoomSuggestionModal } from "./modals/RoomSuggestionModal";


// Components — admin
export { default as RoomForm } from "./components/RoomForm";
export { default as RoomTable } from "./components/RoomTable";

// Hooks
export { useRooms } from "./hooks/useRooms";
export { useRoomDetail, VIEW_LABELS, BED_TYPE_LABELS } from "./hooks/useRoomDetail";
export { useRoomForm } from "./hooks/useRoomForm";

// Types
export type * from "./types/room.type";

// Schemas
export { roomSchema } from "./schemas/room.schema";
export type { RoomFormValues } from "./schemas/room.schema";
