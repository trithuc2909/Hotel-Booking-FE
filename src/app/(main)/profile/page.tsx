import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProfileInfoForm from "@/features/user/components/ProfileInfoForm";
import ChangePasswordForm from "@/features/user/components/ChangePasswordForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hồ sơ cá nhân – BullManHotel",
  description:
    "Quản lý thông tin cá nhân và bảo mật tài khoản BullManHotel của bạn.",
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-8">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Hồ sơ cá nhân
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Quản lý thông tin cá nhân và bảo mật tài khoản của bạn
            </p>
          </div>

          {/* Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left - Profile */}
            <div className="lg:col-span-2">
              <ProfileInfoForm />
            </div>

            {/* Right - Security */}
            <div className="lg:col-span-1">
              <ChangePasswordForm />
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}