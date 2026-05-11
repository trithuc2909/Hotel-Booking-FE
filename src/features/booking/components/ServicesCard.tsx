import { MessageSquare, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { BookingDetailService } from "@/features/booking/types/booking.type";

interface ServicesCardProps {
  services: BookingDetailService[];
}

export function ServicesCard({ services }: ServicesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-700">
          <Sparkles size={14} className="text-[#0D99FF]" />
          Dịch vụ đi kèm
        </CardTitle>
      </CardHeader>
      <CardContent>
        {services.length > 0 ? (
          <div className="space-y-3">
            {services.map((svc) => (
              <div
                key={svc.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-gray-700">
                  {svc.quantity}x {svc.serviceName}
                </span>
                <span className="ml-3 whitespace-nowrap font-medium text-gray-700">
                  {formatCurrency(svc.totalPrice)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm italic text-gray-400">Không có dịch vụ</p>
        )}
      </CardContent>
    </Card>
  );
}

interface NotesCardProps {
  notes?: string | null;
}

export function NotesCard({ notes }: NotesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-700">
          <MessageSquare size={14} className="text-[#0D99FF]" />
          Ghi chú
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{notes || "Không có ghi chú"}</p>
      </CardContent>
    </Card>
  );
}
