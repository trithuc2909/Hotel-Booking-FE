"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/shared/Breadcrumb";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Instagram,
  Facebook,
  CheckCircle2,
} from "lucide-react";

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Địa chỉ",
    value: "14 Nam Kỳ Khởi Nghĩa, Phường 1, Bảo Lộc, Tỉnh Lâm Đồng",
    color: "text-[#0D99FF]",
    bg: "bg-blue-50",
  },
  {
    icon: Phone,
    label: "Điện thoại",
    value: "0125459789",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Mail,
    label: "Email",
    value: "Bullmanhotel@gmail.com",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: Clock,
    label: "Giờ làm việc",
    value: "Phục vụ 24/7",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.email.trim() || !form.message.trim()) {
      return;
    }
    setIsLoading(true);
    // TODO (BE): Gọi API gửi liên hệ
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Liên hệ" }]} />
        </div>
      </div>

      <main className="flex-1">
        {/* Header */}
        <div className="bg-white border-b border-gray-100">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <p className="text-xs font-bold tracking-widest text-[#0D99FF] uppercase mb-2">
              Hỗ trợ 24/7
            </p>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Liên hệ với chúng tôi
            </h1>
            <p className="text-gray-500 max-w-2xl text-sm leading-relaxed">
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ quý khách. Hãy để
              lại thông tin để trải nghiệm dịch vụ nghỉ dưỡng đẳng cấp tại
              BullMan Hotel.
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* ── Left: Form ── */}
            <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">
                Gửi tin nhắn cho chúng tôi
              </h2>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                  <CheckCircle2 size={52} className="text-green-500" />
                  <p className="text-xl font-semibold text-gray-800">
                    Gửi thành công!
                  </p>
                  <p className="text-gray-500 text-sm max-w-xs">
                    Chúng tôi đã nhận được tin nhắn của bạn và sẽ liên hệ lại
                    trong thời gian sớm nhất.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ fullName: "", email: "", phone: "", message: "" });
                    }}
                    className="mt-2 text-sm text-[#0D99FF] hover:underline"
                  >
                    Gửi tin nhắn khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Row: Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                        Họ và tên <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="Nguyễn Văn A"
                        required
                        className="w-full h-11 px-3 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0D99FF]/30 focus:border-[#0D99FF] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="example@gmail.com"
                        required
                        className="w-full h-11 px-3 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0D99FF]/30 focus:border-[#0D99FF] transition"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="0xx..."
                      className="w-full h-11 px-3 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0D99FF]/30 focus:border-[#0D99FF] transition"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                      Lời nhắn <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Quý khách cần hỗ trợ gì?"
                      required
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0D99FF]/30 focus:border-[#0D99FF] transition resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 rounded-lg bg-[#0D99FF] text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#0B84E6] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isLoading ? (
                      <>
                        <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Đang gửi...
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Gửi tin nhắn
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* ── Right: Contact Info ── */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-6">
                  Thông tin liên hệ
                </h2>

                <div className="space-y-5">
                  {CONTACT_INFO.map(({ icon: Icon, label, value, color, bg }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${bg}`}
                      >
                        <Icon size={18} className={color} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">
                          {label}
                        </p>
                        <p className="text-sm text-gray-700 font-medium leading-snug">
                          {value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                    Kết nối với chúng tôi
                  </p>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-orange-400 text-white hover:opacity-90 transition-opacity"
                    >
                      <Instagram size={18} />
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1877F2] text-white hover:opacity-90 transition-opacity"
                    >
                      <Facebook size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white border-t border-gray-100 mt-4">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-gray-800 text-center mb-6">
              Vị trí của chúng tôi
            </h2>
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <iframe
                src="https://maps.google.com/maps?q=14+Nam+Ky+Khoi+Nghia,+Phuong+1,+Bao+Loc,+Lam+Dong,+Vietnam&z=16&output=embed&hl=vi"
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="BullMan Hotel - 14 Nam Kỳ Khởi Nghĩa, Bảo Lộc, Lâm Đồng"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
