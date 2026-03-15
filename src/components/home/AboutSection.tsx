import Image from "next/image";
import Link from "next/link";
import { Award, Clock, MapPin, Star, CheckCircle2 } from "lucide-react";

const STATS = [
  { label: "Năm hoạt động", value: "10+", icon: Clock },
  { label: "Phòng nghỉ",     value: "20",  icon: MapPin },
  { label: "Đánh giá TB",    value: "4.7", icon: Star   },
  { label: "Giải thưởng",    value: "5",   icon: Award  },
];

const HIGHLIGHTS = [
  "Vị trí đắc địa giữa lòng Đà Lạt, gần chợ và các điểm tham quan nổi tiếng",
  "Hồ bơi riêng tại các phòng VIP, mang đến trải nghiệm nghỉ dưỡng đẳng cấp",
  "Đội ngũ phục vụ chuyên nghiệp, nhiệt tình 24/7",
  "Thiết kế nội thất gỗ đặc trưng Đà Lạt - ấm cúng, sang trọng và gần gũi thiên nhiên",
];

export default function AboutSection() {
  return (
    <section className="bg-gray-50">
      <div className="bg-[#0D99FF]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-blue-400 sm:grid-cols-4">
          {STATS.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 bg-[#0D99FF] px-6 py-6 text-white"
            >
              <Icon size={22} className="opacity-80" />
              <span className="text-3xl font-bold">{value}</span>
              <span className="text-sm opacity-80">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200"
                alt="Bullman Hotel - Đà Lạt"
                width={620}
                height={480}
                className="h-[420px] w-full object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-white p-5 shadow-xl sm:block lg:-right-8">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                  <Award className="text-amber-500" size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Best Hotel Đà Lạt
                  </p>
                  <p className="text-xs text-gray-500">
                    TripAdvisor 2026
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:pl-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#0D99FF]">
              Về chúng tôi
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-snug text-gray-900 sm:text-4xl">
              Nghỉ dưỡng đẳng cấp giữa
              <span className="text-[#0D99FF]"> lòng Đà Lạt</span>
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Bullman Hotel tọa lạc tại vị trí trung tâm thành phố Đà Lạt, nơi thiên nhiên
              và sang trọng hòa quyện hoàn hảo. Với hơn 10 năm kinh nghiệm, chúng tôi tự
              hào mang đến không gian nghỉ dưỡng ấm cúng, tinh tế mang đậm dấu ấn kiến
              trúc gỗ đặc trưng của vùng cao nguyên.
            </p>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Mỗi phòng tại Bullman Hotel đều được thiết kế riêng biệt, phản ánh nét đẹp
              tự nhiên của Đà Lạt qua từng chi tiết nội thất - từ sàn gỗ ấm áp đến cửa
              sổ panorama hướng ra đồi núi xanh mát.
            </p>

            {/* Highlights */}
            <ul className="mt-6 space-y-3">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-[#0D99FF]"
                  />
                  <span className="text-sm text-gray-600">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-8 flex gap-3">
              <Link
                href="/rooms"
                className="rounded-lg bg-[#0D99FF] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0B84E6]"
              >
                Khám phá phòng
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-[#0D99FF] hover:text-[#0D99FF]"
              >
                Liên hệ ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
