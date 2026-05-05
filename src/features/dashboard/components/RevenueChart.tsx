"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// ─────────────────────────────────────────────────────────────
// TODO (BE): Thay MOCK_DAILY_REVENUE bằng data từ API
// GET /admin/dashboard/revenue-by-day?month=YYYY-MM
// ─────────────────────────────────────────────────────────────
const MOCK_DAILY_REVENUE = [
  { day: "01", revenue: 28.5 },
  { day: "02", revenue: 32.0 },
  { day: "03", revenue: 27.8 },
  { day: "04", revenue: 68.5 }, // ngày cao nhất – được highlight
  { day: "05", revenue: 41.2 },
  { day: "06", revenue: 38.6 },
  { day: "07", revenue: 55.3 },
  { day: "08", revenue: 62.1 },
  { day: "09", revenue: 45.8 },
  { day: "10", revenue: 39.4 },
  { day: "11", revenue: 50.2 },
  { day: "12", revenue: 43.7 },
];

const COLOR_DEFAULT = "#BFDBFE"; // xanh nhạt
const COLOR_HOVER   = "#0D99FF"; // xanh đậm khi hover

// Custom tooltip cho bar chart
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-xl">
      <p className="font-semibold mb-0.5">Ngày {label}</p>
      <p>
        Doanh thu:{" "}
        <span className="text-[#60BFFF] font-bold">{payload[0].value}M VND</span>
      </p>
    </div>
  );
}

export default function RevenueChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="mb-4">
        <h3 className="font-semibold text-gray-800">Doanh thu theo ngày</h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Phân tích dòng tiền hàng ngày trong chu kỳ hiện tại
        </p>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={MOCK_DAILY_REVENUE}
          margin={{ top: 8, right: 4, left: -16, bottom: 0 }}
          barCategoryGap="30%"
        >
          <CartesianGrid vertical={false} stroke="#F3F4F6" strokeDasharray="4 4" />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 11, fill: "#9CA3AF" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#9CA3AF" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}M`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F3F4F6" }} />
          <Bar
            dataKey="revenue"
            radius={[6, 6, 0, 0]}
            onMouseEnter={(_, index) => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {MOCK_DAILY_REVENUE.map((entry, index) => (
              <Cell
                key={entry.day}
                fill={hoveredIndex === index ? COLOR_HOVER : COLOR_DEFAULT}
                style={{ transition: "fill 0.15s ease" }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
