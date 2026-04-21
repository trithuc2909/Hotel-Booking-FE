import { Clock, Cigarette, Volume2, CreditCard, Dog } from "lucide-react";

const RULES = [
  { icon: Clock, title: "Nhận và trả phòng", desc: "Nhận phòng từ 12:00 – Trả phòng trước 12:00 ngày hôm sau." },
  { icon: Cigarette, title: "Cấm hút thuốc trong phòng", desc: "Vi phạm sẽ bị tính phí vệ sinh theo quy định." },
  { icon: Volume2, title: "Không gây ồn ào", desc: "Không làm ồn từ 23:00 – 6:00 để tôn trọng khách khác." },
  { icon: CreditCard, title: "Xuất trình giấy tờ khi nhận phòng", desc: "Cung cấp CCCD hoặc hộ chiếu để làm thủ tục check-in." },
  { icon: Dog, title: "Không mang thú nuôi", desc: "Khách không được phép mang vật nuôi vào phòng." },
];

export default function HotelRules() {
  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Nội quy khách sạn</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {RULES.map((rule, i) => (
          <div key={i} className="flex items-start gap-3 rounded-xl border border-blue-50 bg-blue-50/60 p-4">
            <div className="mt-0.5 shrink-0 rounded-lg bg-white p-1.5 shadow-sm">
              <rule.icon size={16} className="text-[#0D99FF]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{rule.title}</p>
              <p className="mt-0.5 text-xs text-gray-500">{rule.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
