import { Bell, HelpCircle, Settings } from "lucide-react";
export default function DashboardHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-gray-100 bg-white px-6">
      <span className="text-sm font-semibold text-gray-700">
        BULLMAN DASHBOARD
      </span>
      <div className="flex items-center gap-1">
        {[Bell, Settings, HelpCircle].map((Icon, i) => (
          <button
            key={i}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <Icon size={17} />
          </button>
        ))}
        <div className="ml-2 h-8 w-8 rounded-full bg-gray-300" />
      </div>
    </header>
  );
}