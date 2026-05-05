import { Bell, HelpCircle, Settings } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-gray-100 bg-white px-6 shadow-sm">
      {/* Left: App title */}
      <span className="text-sm font-bold text-gray-800 tracking-wide">
        BullMan Management
      </span>

      {/* Right: action icons */}
      <div className="flex items-center gap-1">
        {[Bell, Settings, HelpCircle].map((Icon, i) => (
          <button
            key={i}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <Icon size={17} />
          </button>
        ))}
        {/* TODO (BE): Thay div này bằng avatar thực của admin */}
        <div className="ml-2 h-8 w-8 rounded-full bg-gradient-to-br from-[#0D99FF] to-[#0B30A7] flex items-center justify-center text-white text-xs font-bold">
          A
        </div>
      </div>
    </header>
  );
}