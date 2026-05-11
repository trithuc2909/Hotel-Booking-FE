import { STATUS_COLOR } from "@/constants/colors";

interface Props {
  code: string;
  displayAs: string;
}

export default function BookingStatusBadge({ code, displayAs }: Props) {
  const colorClass = STATUS_COLOR[code] ?? "bg-gray-100 text-gray-600";
  return (
    <span
      className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${colorClass}`}
    >
      {displayAs}
    </span>
  );
}
