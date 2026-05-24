"use client";

import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useGetDailyRevenueQuery } from "../api/dashboardApi";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

const COLOR_DEFAULT = "#BFDBFE";
const COLOR_HOVER = "#0D99FF";

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg bg-gray-900 px-3 py-2 text-xs text-white shadow-xl">
      <p className="mb-0.5 font-semibold">Ngày {label}</p>
      <p>
        Doanh thu:{" "}
        <span className="font-bold text-[#60BFFF]">{new Intl.NumberFormat("vi-VN").format(payload[0].value)} VNĐ</span>
      </p>
    </div>
  );
}

function buildFullMonthData(apiData: { day: string; revenue: number }[], currentDate: Date) {
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

export default function RevenueChart({ currentDate }: { currentDate: Date }) {
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);
  const { data, isLoading } = useGetDailyRevenueQuery({
    month: format(currentDate, "yyyy-MM"),
  });

  if (isLoading || !data) {
    return (
      <div className="flex h-[340px] items-center justify-center rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  const chartData = buildFullMonthData(data.data, currentDate);

  const monthLabel = currentDate.toLocaleString("vi-VN", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
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
          <p className="mt-0.5 text-xs text-gray-400 capitalize">{monthLabel}</p>
        </div>
        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-[#0D99FF]">
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
          <CartesianGrid vertical={false} stroke="#F3F4F6" strokeDasharray="4 4" />
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
