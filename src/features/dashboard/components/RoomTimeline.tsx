"use client";

// ─────────────────────────────────────────────────────────────
// TODO (BE): Thay MOCK_TIMELINE bằng data từ API
// GET /admin/dashboard/room-timeline?from=YYYY-MM-DD&to=YYYY-MM-DD
// ─────────────────────────────────────────────────────────────

type BookingStatus = "checked-in" | "pending" | "conflict";

type Booking = {
  guestName: string;
  bookingId: string;
  startDay: number; // 0 = Mon, 6 = Sun
  endDay: number;   // inclusive
  status: BookingStatus;
};

type RoomRow = {
  roomCode: string;
  roomType: string;
  bookings: Booking[];
};

const DAYS = [
  { label: "MON", date: 23 },
  { label: "TUE", date: 24 },
  { label: "WED", date: 25 },
  { label: "THU", date: 26 },
  { label: "FRI", date: 27 },
  { label: "SAT", date: 28 },
  { label: "SUN", date: 29 },
];

const MOCK_ROOMS: RoomRow[] = [
  {
    roomCode: "P.101",
    roomType: "ROYAL PLUS",
    bookings: [
      {
        guestName: "Nguyen Van A",
        bookingId: "BK-8952-24",
        startDay: 1,
        endDay: 2,
        status: "checked-in",
      },
    ],
  },
  {
    roomCode: "P.102",
    roomType: "ROYAL PLUS",
    bookings: [
      {
        guestName: "Tran Huy",
        bookingId: "BK-8822-01",
        startDay: 2,
        endDay: 3,
        status: "pending",
      },
    ],
  },
  {
    roomCode: "STD 302",
    roomType: "STANDARD TWIN",
    bookings: [
      {
        guestName: "Nguyen Van An",
        bookingId: "BK-4912-99",
        startDay: 3,
        endDay: 4,
        status: "pending",
      },
    ],
  },
  {
    roomCode: "VIP 105",
    roomType: "OCEAN VIEW",
    bookings: [
      {
        guestName: "Thuc Dang",
        bookingId: "BK-6021-31",
        startDay: 1,
        endDay: 3,
        status: "pending",
      },
    ],
  },
  {
    roomCode: "STD 305",
    roomType: "STANDARD TWIN",
    bookings: [],
  },
  {
    roomCode: "DLX 208",
    roomType: "DELUXE KING",
    bookings: [
      {
        guestName: "Lê Ngọc Thái Châu",
        bookingId: "BK-2221",
        startDay: 3,
        endDay: 5,
        status: "conflict",
      },
    ],
  },
  {
    roomCode: "VIP 102",
    roomType: "OCEAN VIEW",
    bookings: [
      {
        guestName: "Michael Chen",
        bookingId: "BK-1016-40",
        startDay: 0,
        endDay: 2,
        status: "checked-in",
      },
    ],
  },
];

const STATUS_STYLES: Record<BookingStatus, string> = {
  "checked-in": "bg-[#3B82F6] text-white",
  pending:      "bg-[#F59E0B] text-white",
  conflict: "bg-gray-100 text-gray-700 border border-gray-200"
};

const LEGEND: { label: string; status: BookingStatus }[] = [
  { label: "Đang ở",       status: "checked-in" },
  { label: "Chờ nhận phòng", status: "pending" },
  { label: "Đã trả phòng", status: "conflict" },
];

const TOTAL_COLS = 7;

export default function RoomTimeline() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div>
          <h3 className="font-semibold text-gray-800 text-base">Room Timeline</h3>
          <p className="text-xs text-gray-400 mt-0.5">● Oct 23 – Oct 29</p>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-4 flex-wrap">
          {LEGEND.map(({ label, status }) => (
            <div key={status} className="flex items-center gap-1.5">
              <span
                className={`inline-block h-2.5 w-2.5 rounded-sm ${STATUS_STYLES[status]}`}
              />
              <span className="text-xs text-gray-500">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse min-w-[600px]">
          {/* Day headers */}
          <thead>
            <tr>
              <th className="w-28 text-left py-2 pr-3 text-gray-500 font-medium">
                Room Type
              </th>
              {DAYS.map((d, i) => (
                <th
                  key={i}
                  className={`text-center py-2 font-medium ${
                    d.date === 24 || d.date === 29
                      ? "text-[#0D99FF]"
                      : "text-gray-500"
                  }`}
                >
                  <div>{d.label}</div>
                  <div
                    className={`mt-0.5 text-sm font-bold ${
                      d.date === 24 || d.date === 29
                        ? "text-[#0D99FF]"
                        : "text-gray-800"
                    }`}
                  >
                    {d.date}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Room rows */}
          <tbody className="divide-y divide-gray-50">
            {MOCK_ROOMS.map((room) => (
              <tr key={room.roomCode} className="h-14">
                {/* Room label */}
                <td className="pr-3 py-1 align-middle">
                  <div className="text-gray-800 font-semibold leading-none">
                    {room.roomCode}
                  </div>
                  <div className="text-gray-400 text-[10px] mt-0.5 uppercase tracking-wide">
                    {room.roomType}
                  </div>
                </td>

                {/* Timeline cells */}
                {Array.from({ length: TOTAL_COLS }).map((_, dayIdx) => {
                  // Tìm booking bắt đầu tại ô này
                  const booking = room.bookings.find(
                    (b) => b.startDay === dayIdx
                  );

                  if (booking) {
                    const span = booking.endDay - booking.startDay + 1;
                    return (
                      <td
                        key={dayIdx}
                        colSpan={span}
                        className="py-1 px-0.5 align-middle"
                      >
                        <div
                          className={`rounded-md px-2 py-1.5 h-10 flex flex-col justify-center overflow-hidden cursor-pointer hover:opacity-90 transition-opacity ${
                            STATUS_STYLES[booking.status]
                          }`}
                        >
                          <p className="font-semibold truncate text-[11px] leading-tight">
                            {booking.guestName}
                          </p>
                          <p className="text-[10px] opacity-80 truncate leading-tight">
                            {booking.bookingId}
                          </p>
                        </div>
                      </td>
                    );
                  }

                  // Kiểm tra ô này nằm trong span của booking nào không → bỏ qua
                  const isCovered = room.bookings.some(
                    (b) => dayIdx > b.startDay && dayIdx <= b.endDay
                  );
                  if (isCovered) return null;

                  // Ô trống
                  return (
                    <td key={dayIdx} className="py-1 px-0.5 align-middle">
                      <div className="h-10 rounded-md border border-dashed border-gray-100 bg-gray-50/50" />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
