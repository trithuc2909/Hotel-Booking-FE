"use client";
import { Toaster as Sonner } from "sonner";

export function ToasterCustom() {
  return (
    <Sonner
      position="top-center"
      richColors
      duration={3000}
      toastOptions={{
        style: {
          borderRadius: "14px",
          padding: "12px",
          fontSize: "14px",
          width: "fit-content",
          maxWidth: "420px",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
        },
        classNames: {
          success: "bg-[#0D99FF] text-white border border-[#0D99FF] shadow-lg",
          error: "bg-[#EF4444] text-white border border-[#EF4444] shadow-lg",
          warning: "bg-[#F59E0B] text-white border border-[#F59E0B] shadow-lg",
          info: "bg-[#0D99FF] text-white border border-[#0D99FF] shadow-lg",
        },
      }}
    />
  );
}
