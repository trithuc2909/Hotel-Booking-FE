import { ClipboardList } from "lucide-react";
import { fmtDateTime } from "@/lib/utils";
import BookingStatusBadge from "./BookingStatusBadge";

interface Props {
  bookingCode: string;
  createdOn: string | null;
  status: { code: string; displayAs: string };
}

export default function BookingHeader({ bookingCode, createdOn, status }: Props) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-4 rounded-2xl border border-gray-100 bg-white px-6 py-5 shadow-sm">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0D99FF]/10">
        <ClipboardList size={22} className="text-[#0D99FF]" />
      </div>

      <div className="min-w-0 flex-1">
        <h1 className="text-xl font-bold text-[#1E3A5F]">
          Đơn đặt phòng {bookingCode}
        </h1>
        {createdOn && (
          <p className="mt-0.5 text-sm text-gray-400">
            Đặt lúc {fmtDateTime(createdOn)}
          </p>
        )}
      </div>

      <BookingStatusBadge code={status.code} displayAs={status.displayAs} />
    </div>
  );
}
