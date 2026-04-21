import { ASSETS } from "@/constants/assets";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

// Auth layout component
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={`light min-h-screen flex`}>
      {/* container */}
      <div className="hidden lg:flex lg:w-1/2  bg-gradient-to-br from-blue-500 to-blue-700 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h- 96 bg-white rounded-full blur-3xl"></div>
        </div>

        {/* Content left*/}
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
          {/* Logo */}
          <div className="mb-8">
            <img
              src={ASSETS.logoDefault}
              alt="BullmanHotel Logo"
              className="w-24 h-24 object-contain rounded-full"
            />
          </div>
          {/* Title */}
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 text-center">
            BullManHotel
          </h1>
          {/* Description */}
          <p className="text-xl text-center text-blue-100 max-w-md">
            Đặt phòng khách sạn nhanh chóng, giá tốt, thông tin minh bạch và an
            toàn
          </p>
          {/* Decorative elements */}
          <div className="mt-12 grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold">1000+</div>
              <div className="text-sm text-blue-100">Lượt đặt phòng</div>
            </div>
            <div>
              <div className="text-3xl font-bold">50K+</div>
              <div className="text-sm text-blue-100">Khách hàng</div>
            </div>
            <div>
              <div className="text-3xl font-bold">4.8★</div>
              <div className="text-sm text-blue-100">Đánh giá</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content right */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        {/* Form container */}
        <div className="w-full max-w-lg">{children}</div>
      </div>
    </div>
  );
}
