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
import { useGetDailyRevenueQuery } from "../api/dashboardApi";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

const COLOR_DEFAULT = "#BFDBFE";
const COLOR_HOVER = "#0D99FF";

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-xl">
      <p className="font-semibold mb-0.5">Ngày {label}</p>
      <p>
        Doanh thu:{" "}
        <span className="text-[#60BFFF] font-bold">
          {new Intl.NumberFormat("vi-VN").format(payload[0].value)} VNĐ
        </span>
      </p>
    </div>
  );
}

function buildFullMonthData(
  apiData: { day: string; revenue: number }[],
  currentDate: Date,
) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const revenueMap = new Map<string, number>();
  for (const item of apiData) {
    revenueMap.set(item.day, item.revenue);
  }

  return Array.from({ length: daysInMonth }, (_, i) => {
    const dayNum = i + 1;
    const dayStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
    return {
      day: String(dayNum).padStart(2, "0"),
      revenue: revenueMap.get(dayStr) ?? 0,
    };
  });
}

export default function RevenueChart({
  currentDate,
}: {
  currentDate: Date;
}) {
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);
  const { data, isLoading } = useGetDailyRevenueQuery({
    month: format(currentDate, "yyyy-MM")
  });

  if (isLoading || !data) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 h-[340px] flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-500 w-8 h-8" />
      </div>
    );
  }

  const chartData = buildFullMonthData(data.data, currentDate);

  const monthLabel = currentDate.toLocaleString("vi-VN", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .recharts-rectangle {
          transition: fill 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
      `,
        }}
      />
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-gray-800">Doanh thu theo ngày</h3>
          <p className="text-xs text-gray-400 mt-0.5 capitalize">
            {monthLabel}
          </p>
        </div>
        <span className="text-xs font-medium text-[#0D99FF] bg-blue-50 px-2.5 py-1 rounded-full">
          {chartData.length} ngày
        </span>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={chartData}
          margin={{ top: 8, right: 4, left: -16, bottom: 0 }}
          barCategoryGap="20%"
          onMouseMove={(state: any) => {
            if (state && state.isTooltipActive && state.activeLabel) {
              const day = String(state.activeLabel);
              if (day !== hoveredDay) {
                setHoveredDay(day);
              }
            } else {
              setHoveredDay(null);
            }
          }}
          onMouseLeave={() => setHoveredDay(null)}
        >
          <CartesianGrid
            vertical={false}
            stroke="#F3F4F6"
            strokeDasharray="4 4"
          />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 10, fill: "#9CA3AF" }}
            axisLine={false}
            tickLine={false}
            interval={4}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#9CA3AF" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => {
              if (v >= 1000000) return `${(v / 1000000).toFixed(0)}M`;
              if (v >= 1000) return `${(v / 1000).toFixed(0)}K`;
              return v;
            }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F3F4F6" }} />
          <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
            {chartData.map((entry) => (
              <Cell
                key={entry.day}
                fill={hoveredDay === entry.day ? COLOR_HOVER : COLOR_DEFAULT}
                style={{
                  transition: "fill 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
