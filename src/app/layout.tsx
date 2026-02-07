import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "../components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "@/components/providers";
import { ToasterCustom } from "@/components/ui/toaster-custom";

// Font chính: Open Sans
const openSans = Open_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BullManHotel – Đặt phòng khách sạn trực tuyến",
  description:
    "BullManHotel giúp bạn đặt phòng khách sạn nhanh chóng, giá tốt, thông tin minh bạch và an toàn cho mọi chuyến đi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={openSans.className}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <ToasterCustom />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
