"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save, Camera, CheckCircle2 } from "lucide-react";
import { colors } from "@/constants/colors";

// ─────────────────────────────────────────────────────────────
// TODO (BE): Thay MOCK_USER bằng dữ liệu thực từ useGetMeQuery()
// import { useGetMeQuery } from "@/features/user/api/userApi";
// ─────────────────────────────────────────────────────────────
const MOCK_USER = {
  fullName: "Đặng Hữu Trí Thức",
  email: "danghuutrithuc@gmail.com",
  phone: "0123456789",
  dateOfBirth: "2004-08-24",
  gender: "male" as "male" | "female",
  address: "123abc tỉnh a",
  avatarUrl: "",
  username: "Trí Thức",
};

export default function ProfileInfoForm() {
  // TODO (BE): Bỏ comment dòng dưới và xoá MOCK_USER khi có API
  // const { data: meData, isLoading } = useGetMeQuery();
  // const user = meData?.data;

  const user = MOCK_USER; // TODO (BE): Xoá dòng này

  const [form, setForm] = useState({
    fullName: user.fullName,
    phone: user.phone,
    dateOfBirth: user.dateOfBirth,
    gender: user.gender,
    address: user.address,
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSubmit = () => {
    // TODO (BE): Gọi mutation updateProfile(form).unwrap() tại đây
    // await updateProfile(form).unwrap();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* ── Header banner + Avatar ── */}
      <div className="relative h-28 bg-gradient-to-r from-[#0D99FF] to-[#0B30A7]">
        <div className="absolute -bottom-10 left-6 flex items-end gap-3">
          {/* Avatar */}
          <div className="relative group">
            <div className="w-20 h-20 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-md">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0D99FF] to-[#0B30A7]">
                  <span className="text-white text-2xl font-bold">
                    {user.username.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            {/* TODO (BE): Nút đổi ảnh – cần thêm upload endpoint */}
            <button
              title="Đổi ảnh đại diện"
              className="absolute bottom-0 right-0 w-6 h-6 bg-[#0D99FF] text-white rounded-full flex items-center justify-center shadow hover:bg-[#0B30A7] transition-colors"
            >
              <Camera size={12} />
            </button>
          </div>
          <span className="font-semibold text-gray-700 text-xl pb-1 drop-shadow">
            {user.username}
          </span>
        </div>
      </div>

      {/* ── Title ── */}
      <div className="px-6 pt-14 pb-2">
        <h2 className="text-xl font-bold text-center text-gray-800">
          Thông tin cá nhân
        </h2>
      </div>

      {/* ── Form fields ── */}
      <div className="px-6 pb-6 grid grid-cols-1 gap-4 mt-2">
        {/* Họ tên */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Họ tên
          </label>
          <Input
            id="profile-fullname"
            value={form.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder="Nhập họ và tên"
            className="border-gray-300 focus:border-[#0D99FF] focus:ring-[#0D99FF]"
          />
        </div>

        {/* Email – readonly */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            id="profile-email"
            value={user.email}
            disabled
            className="bg-gray-50 text-gray-500 cursor-not-allowed"
          />
          {/* TODO (BE): Email chỉ đọc – nếu muốn đổi email cần luồng verify riêng */}
        </div>

        {/* Số điện thoại */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Số điện thoại
          </label>
          <Input
            id="profile-phone"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="0123456789"
            className="border-gray-300 focus:border-[#0D99FF] focus:ring-[#0D99FF]"
          />
        </div>

        {/* Ngày sinh */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ngày sinh
          </label>
          <Input
            id="profile-dob"
            type="date"
            value={form.dateOfBirth}
            onChange={(e) => handleChange("dateOfBirth", e.target.value)}
            className="border-gray-300 focus:border-[#0D99FF] focus:ring-[#0D99FF]"
          />
        </div>

        {/* Giới tính */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Giới tính
          </label>
          <div className="flex gap-8">
            {(["male", "female"] as const).map((g) => (
              <label
                key={g}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                    form.gender === g
                      ? "border-[#0D99FF] bg-[#0D99FF]"
                      : "border-gray-400"
                  }`}
                  onClick={() => handleChange("gender", g)}
                >
                  {form.gender === g && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
                <span
                  className="text-sm text-gray-700"
                  onClick={() => handleChange("gender", g)}
                >
                  {g === "male" ? "Nam" : "Nữ"}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Địa chỉ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Địa chỉ
          </label>
          <Input
            id="profile-address"
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder="Nhập địa chỉ"
            className="border-gray-300 focus:border-[#0D99FF] focus:ring-[#0D99FF]"
          />
        </div>

        {/* Nút Lưu */}
        <div className="flex items-center justify-end gap-3 pt-2">
          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-green-600 animate-in fade-in">
              <CheckCircle2 size={16} />
              Đã lưu thành công!
            </span>
          )}
          <Button
            id="profile-save-btn"
            onClick={handleSubmit}
            className="flex items-center gap-2 text-white rounded-lg px-5"
            style={{ backgroundColor: colors.primary.blue }}
          >
            <Save size={15} />
            Lưu
          </Button>
        </div>
      </div>
    </div>
  );
}
