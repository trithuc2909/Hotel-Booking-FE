"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save, Camera, CheckCircle2, Loader2 } from "lucide-react";
import { colors } from "@/constants/colors";
import { useGetMeQuery, useUpdateUserProfileMutation, useUploadUserAvatarMutation } from "@/features/user/api/userApi";
import { toast } from "sonner";

export default function ProfileInfoForm() {
  const { data: meData, isLoading } = useGetMeQuery();
  const user = meData?.data;

  const [updateProfile, { isLoading: isSaving }] = useUpdateUserProfileMutation();
  const [uploadAvatar, { isLoading: isUploading }] = useUploadUserAvatarMutation();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    dateOfBirth: "",
    address: "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName ?? "",
        phone: user.phone ?? "",
        dateOfBirth: user.dateOfBirth?.slice(0, 10) ?? "",
        address: user.address ?? "",
      });
    }
  }, [user]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSubmit = async () => {
    if (form.dateOfBirth) {
      const dob = new Date(form.dateOfBirth);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (dob >= today) {
        toast.error("Ngày sinh phải nhỏ hơn ngày hiện tại");
        return;
      }
    }

    try {
      await updateProfile(form).unwrap();
      toast.success("Cập nhật hồ sơ thành công");
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Cập nhật hồ sơ thất bại");
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      await uploadAvatar(formData).unwrap();
      toast.success("Cập nhật ảnh đại diện thành công");
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Cập nhật ảnh đại diện thất bại");
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-gray-100 bg-white shadow-sm">
        <Loader2 className="animate-spin text-[#0D99FF]" size={28} />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* Header banner + Avatar */}
      <div className="relative h-28 bg-gradient-to-r from-[#0D99FF] to-[#0B30A7]">
        <div className="absolute -bottom-10 left-6 flex items-end gap-3">
          {/* Avatar */}
          <div className="group relative">
            <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-white bg-gray-200 shadow-md">
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt="avatar" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0D99FF] to-[#0B30A7]">
                  <span className="text-2xl font-bold text-white">{user?.username?.charAt(0) ?? "?"}</span>
                </div>
              )}
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleAvatarChange}
            />

            {/* Camera button */}
            <button
              title="Đổi ảnh đại diện"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="absolute right-0 bottom-0 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-[#0D99FF] text-white shadow transition-colors hover:bg-[#0B30A7] disabled:opacity-60"
            >
              {isUploading ? <Loader2 size={10} className="animate-spin" /> : <Camera size={12} />}
            </button>
          </div>

          <span className="pb-1 text-xl font-semibold text-gray-700 drop-shadow">{user?.username}</span>
        </div>
      </div>

      {/* Title */}
      <div className="px-6 pt-14 pb-2">
        <h2 className="text-center text-xl font-bold text-gray-800">Thông tin cá nhân</h2>
      </div>

      {/* Form fields */}
      <div className="mt-2 grid grid-cols-1 gap-4 px-6 pb-6">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Họ và tên</label>
          <Input
            id="profile-fullname"
            value={form.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder="Nhập họ và tên"
            className="border-gray-300 focus:border-[#0D99FF] focus:ring-[#0D99FF]"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
          <Input
            id="profile-email"
            value={user?.email ?? ""}
            disabled
            className="cursor-not-allowed bg-gray-50 text-gray-500"
          />
        </div>

        {/* Phone number */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Số điện thoại</label>
          <Input
            id="profile-phone"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="vd: 0123456789"
            className="border-gray-300 focus:border-[#0D99FF] focus:ring-[#0D99FF]"
          />
        </div>

        {/* Birthday */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Ngày sinh</label>
          <Input
            id="profile-dob"
            type="date"
            value={form.dateOfBirth}
            onChange={(e) => handleChange("dateOfBirth", e.target.value)}
            max={new Date().toISOString().split("T")[0]}
            className="border-gray-300 focus:border-[#0D99FF] focus:ring-[#0D99FF]"
          />
        </div>

        {/* Address */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Địa chỉ</label>
          <Input
            id="profile-address"
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder="Nhập địa chỉ"
            className="border-gray-300 focus:border-[#0D99FF] focus:ring-[#0D99FF]"
          />
        </div>

        {/* Save button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          {saved && (
            <span className="animate-in fade-in flex items-center gap-1.5 text-sm text-green-600">
              <CheckCircle2 size={16} />
              Đã lưu thành công!
            </span>
          )}
          <Button
            id="profile-save-btn"
            onClick={handleSubmit}
            disabled={isSaving}
            className="flex cursor-pointer items-center gap-2 rounded-lg px-5 text-white"
            style={{ backgroundColor: colors.primary.blue }}
          >
            {isSaving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
            {isSaving ? "Đang lưu..." : "Lưu thông tin"}
          </Button>
        </div>
      </div>
    </div>
  );
}
