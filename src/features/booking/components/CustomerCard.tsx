import { Mail, Phone, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookingDetailCustomer } from "@/features/booking/types/booking.type";

interface Props {
  customer: BookingDetailCustomer;
}

export default function CustomerCard({ customer }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-700">
          <User size={14} className="text-[#0D99FF]" />
          Khách hàng
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0D99FF]/10">
            <User size={18} className="text-[#0D99FF]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-800">
              {customer.fullName ?? "—"}
            </span>
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600">
              Khách chính
            </span>
          </div>
        </div>

        {/* Contact info */}
        <div className="mt-4 space-y-2 border-t border-gray-50 pt-4">
          <p className="flex items-center gap-2 text-sm text-gray-600">
            <Phone size={13} className="shrink-0 text-gray-400" />
            {customer.phone}
          </p>
          {customer.email && (
            <p className="flex items-center gap-2 text-sm text-gray-600">
              <Mail size={13} className="shrink-0 text-gray-400" />
              {customer.email}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
