import { BookingDetailService } from "@/features/booking/types/booking.type";
import { formatCurrency } from "@/lib/utils";
import { ClipboardList } from "lucide-react";

type Props = {
  services: BookingDetailService[];
  totalService: number;
};

export default function ServiceListCard({ services, totalService }: Props) {
  if (services.length === 0) return null;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50">
          <ClipboardList className="h-4 w-4 text-orange-500" />
        </div>
        <h2 className="text-sm font-bold text-gray-800">Dịch vụ bổ sung ({services.length})</h2>
      </div>

      <div className="space-y-2">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5"
          >
            <div>
              <p className="text-sm font-semibold text-gray-800">{service.serviceName}</p>
              <p className="text-xs text-gray-400">
                {service.quantity} {service.unit} × {formatCurrency(service.unitPrice)}đ
              </p>
            </div>
            <p className="shrink-0 text-sm font-bold text-gray-800">{formatCurrency(service.totalPrice)}đ</p>
          </div>
        ))}

        <div className="flex items-center justify-between border-t border-dashed border-gray-200 px-1 pt-2">
          <p className="text-xs font-semibold text-gray-500">Tổng dịch vụ</p>
          <p className="text-sm font-bold text-gray-800">{formatCurrency(totalService)}đ</p>
        </div>
      </div>
    </div>
  );
}
