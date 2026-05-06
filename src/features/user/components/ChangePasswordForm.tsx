"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Save, CheckCircle2 } from "lucide-react";
import { colors } from "@/constants/colors";

import { useChangePasswordMutation } from "@/features/user/api/userApi";
import { toast } from "sonner";

function PasswordInput({
  id,
  value,
  onChange,
  placeholder,
  error,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
}) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="relative">
        <Input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`pr-10 border-gray-300 focus:border-[#0D99FF] focus:ring-[#0D99FF] ${
            error ? "border-red-400 focus:border-red-400 focus:ring-red-400" : ""
          }`}
        />
        <button
          type="button"
          tabIndex={-1}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ChangePasswordForm() {
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setSaved(false);
  };

  const validate = (): Record<string, string> => {
    const errs: Record<string, string> = {};
    if (!form.oldPassword) {
      errs.oldPassword = "Vui lòng nhập mật khẩu cũ";
    }
    if (form.newPassword.length < 8) {
      errs.newPassword = "Mật khẩu phải có ít nhất 8 ký tự";
    }
    if (!form.confirmPassword) {
      errs.confirmPassword = "Vui lòng xác nhận mật khẩu mới";
    } else if (form.newPassword !== form.confirmPassword) {
      errs.confirmPassword = "Mật khẩu không trùng khớp";
    }
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    try {
      await changePassword({
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      }).unwrap();

      setSaved(true);
      setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
      toast.success("Đổi mật khẩu thành công");
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      toast.error(err?.data?.message || "Đổi mật khẩu thất bại");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
        Thông tin bảo mật
      </h2>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label
            htmlFor="pwd-old"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nhập mật khẩu cũ
          </label>
          <PasswordInput
            id="pwd-old"
            value={form.oldPassword}
            onChange={(v) => handleChange("oldPassword", v)}
            placeholder="Mật khẩu hiện tại"
            error={errors.oldPassword}
          />
        </div>

        <div>
          <label
            htmlFor="pwd-new"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Mật khẩu mới
          </label>
          <PasswordInput
            id="pwd-new"
            value={form.newPassword}
            onChange={(v) => handleChange("newPassword", v)}
            placeholder="Ít nhất 8 ký tự"
            error={errors.newPassword}
          />
        </div>

        <div>
          <label
            htmlFor="pwd-confirm"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Xác nhận mật khẩu mới
          </label>
          <PasswordInput
            id="pwd-confirm"
            value={form.confirmPassword}
            onChange={(v) => handleChange("confirmPassword", v)}
            placeholder="Nhập lại mật khẩu mới"
            error={errors.confirmPassword}
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 mt-6">
        {saved && (
          <span className="flex items-center gap-1.5 text-sm text-green-600 animate-in fade-in">
            <CheckCircle2 size={16} />
            Đổi mật khẩu thành công!
          </span>
        )}
        <Button
          id="change-pwd-save-btn"
          onClick={handleSubmit}
          disabled={isLoading}
          className="flex items-center gap-2 text-white rounded-lg px-5 cursor-pointer"
          style={{ backgroundColor: colors.primary.blue }}
        >
          <Save size={15} />
          {isLoading ? "Đang lưu..." : "Lưu thông tin"}
        </Button>
      </div>
    </div>
  );
}
