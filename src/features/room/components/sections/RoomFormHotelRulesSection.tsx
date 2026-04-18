"use client";
import { ShieldCheck } from "lucide-react";

const RULES = [
  "Giờ nhận phòng: 14:00 — Trả phòng: 12:00",
  "Không hút thuốc trong phòng. Vi phạm sẽ bị tính phí.",
  "Giữ giữ tài sản khách sạn, làm hỏng phải đền bù.",
  "Giữ yên tĩnh từ 22:00 — 06:00, không gây ồn ào.",
  "Xuất trình giấy tờ tuỳ thân khi nhận phòng (CCCD/Hộ chiếu).",
  "Không mang thú nuôi vào khách sạn.",
];

export default function RoomFormHotelRulesSection() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50">
          <ShieldCheck size={16} className="text-[#0D99FF]" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-gray-800">Nội quy khách sạn</h2>
          <p className="text-xs text-gray-400">Áp dụng chung cho tất cả các phòng</p>
        </div>
      </div>

      <ul className="space-y-2.5">
        {RULES.map((rule, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[10px] font-bold text-[#0D99FF]">
              {i + 1}
            </span>
            {rule}
          </li>
        ))}
      </ul>
    </div>
  );
}
