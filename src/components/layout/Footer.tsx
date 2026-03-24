import Link from "next/link";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";
export default function Footer() {
  return (
    <footer className="bg-gray-900 pt-16 pb-8 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          
          <div>
            <span className="text-2xl font-bold tracking-tight text-white">
              BULLMAN HOTEL
            </span>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              Trải nghiệm kỳ nghỉ dưỡng đẳng cấp giữa lòng Đà Lạt mộng mơ. Nơi thiên nhiên và kiến trúc sang trọng hòa quyện hoàn hảo.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" className="text-gray-400 transition-colors hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-white">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Khám phá
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/rooms" className="transition-colors hover:text-[#0D99FF]">
                  Danh sách phòng
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-[#0D99FF]">
                  Nhà hàng & Dịch vụ
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-[#0D99FF]">
                  Spa & Thư giãn
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-[#0D99FF]">
                  Tuyển dụng
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Chính sách
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              <li>
                <Link href="#" className="transition-colors hover:text-[#0D99FF]">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-[#0D99FF]">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-[#0D99FF]">
                  Chính sách đổi trả & hoàn tiền
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-[#0D99FF]">
                  Câu hỏi thường gặp (FAQ)
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Liên hệ
            </h3>
            <ul className="mt-4 space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-[#0D99FF]" />
                <span>Số 14, Nam Kỳ Khởi Nghĩa, Phường 1, Thành phố Đà Lạt, tỉnh Lâm Đồng</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-[#0D99FF]" />
                <span>+84 123 456 789</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-[#0D99FF]" />
                <span>bullmanhotel@gmail.com</span>
              </li>
            </ul>
          </div>
          
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Bullman Hotel. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Thiết kế & phát triển với <span className="text-red-500">❤</span>
          </p>
        </div>
      </div>
    </footer>
  );
}