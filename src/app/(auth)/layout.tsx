import { ASSETS } from "@/constants/assets";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

// Auth layout component
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={`light flex min-h-screen`}>
      {/* container */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700 lg:flex lg:w-1/2">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-white blur-3xl"></div>
          <div className="h- 96 absolute right-0 bottom-0 w-96 rounded-full bg-white blur-3xl"></div>
        </div>

        {/* Content left*/}
        <div className="relative z-10 flex w-full flex-col items-center justify-center p-12 text-white">
          {/* Logo */}
          <div className="mb-8">
            <img src={ASSETS.logoDefault} alt="BullmanHotel Logo" className="h-24 w-24 rounded-full object-contain" />
          </div>
          {/* Title */}
          <h1 className="mb-4 text-center text-4xl font-bold lg:text-5xl xl:text-6xl">BullManHotel</h1>
          {/* Description */}
          <p className="max-w-md text-center text-xl text-blue-100">
            Đặt phòng khách sạn nhanh chóng, giá tốt, thông tin minh bạch và an toàn
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
      <div className="flex w-full items-center justify-center bg-white p-8 lg:w-1/2">
        {/* Form container */}
        <div className="w-full max-w-lg">{children}</div>
      </div>
    </div>
  );
}
