import { Suspense } from "react";
import RoomListView from "@/features/room/views/RoomListView";

export default function RoomsPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-gray-400">Đang tải...</div>}>
      <RoomListView />
    </Suspense>
  );
}
