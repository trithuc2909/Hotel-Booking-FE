import { Headphones, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SupportCard() {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div>
        <p className="text-sm font-semibold text-gray-800">Cần hỗ trợ?</p>
        <p className="mt-1 text-xs leading-relaxed text-gray-400">
          Nếu bạn cần hỗ trợ hoặc có bất kỳ câu hỏi nào,
          đừng ngần ngại liên hệ với chúng tôi.
        </p>
        <Button size="sm" variant="outline" className="mt-3 h-8 cursor-pointer text-xs">
          <Phone size={12} className="mr-1.5" />
          Liên hệ ngay
        </Button>
      </div>
      <Headphones size={52} className="ml-3 shrink-0 text-blue-100" />
    </div>
  );
}
