import { Bell, HelpCircle, Settings } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-gray-100 bg-white px-6 shadow-sm">
      <span className="text-sm font-bold tracking-wide text-gray-800">BullMan Management</span>

      <div className="flex items-center gap-1">
        {[Bell, Settings, HelpCircle].map((Icon, i) => (
          <button
            key={i}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <Icon size={17} />
          </button>
        ))}
        <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#0D99FF] to-[#0B30A7] text-xs font-bold text-white">
          A
        </div>
      </div>
    </header>
  );
}
