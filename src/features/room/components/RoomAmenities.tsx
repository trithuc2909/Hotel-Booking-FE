import AmenityIcon from "@/components/shared/AmenityIcon";
import { AmenityResponse } from "@/features/room/types/room.type";

export default function RoomAmenities({ amenities }: { amenities: AmenityResponse[] }) {
  if (!amenities.length) return null;

  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Tiện nghi</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {amenities.map((a) => (
          <div key={a.id} className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5">
            <AmenityIcon icon={a.icon ?? ""} name={a.name} size={16} showLabel={false} className="bg-transparent px-0 py-0" />
            <span className="text-sm text-gray-700">{a.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
