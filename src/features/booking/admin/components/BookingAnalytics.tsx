"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useGetBookingAnalyticsQuery } from "@/features/booking/api/bookingApi";
import { formatDate } from "@/lib/utils";
import { DEFAULT_CONFIG, STATUS_CONFIG } from "@/constants/colors";

export default function BookingAnalytics() {
  const { data, isLoading, isError } = useGetBookingAnalyticsQuery();

  const activities = data?.data?.recentActivities || [];
  const allocation = data?.data?.allocation || [];
  const filteredAllocation = allocation.filter((item: any) =>
    ["PPY", "CFM", "CAN"].includes(item.status),
  );
  const totalBookings = filteredAllocation.reduce(
    (sum, item) => sum + item.count,
    0,
  );
  const pieData = filteredAllocation.map((item) => ({
    name: item.displayAs,
    value: item.count,
    color: STATUS_CONFIG[item.status]?.color || DEFAULT_CONFIG.color,
    percentage:
      totalBookings > 0 ? ((item.count / totalBookings) * 100).toFixed(1) : 0,
  }));

  if (isLoading) {
    return (
      <p className="text-center text-sm text-gray-400 py-5">
        Đang tải biểu đồ...
      </p>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-sm text-red-400 py-5">
        Không thể tải dữ liệu biểu đồ
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
      <div className="lg:col-span-3 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="mb-4">
          <h3 className="font-bold text-gray-800">Hoạt động gần đây</h3>
        </div>

        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-5">
              Chưa có hoạt động nào
            </p>
          ) : (
            activities.map((act) => {
              const cfg = STATUS_CONFIG[act.status] || DEFAULT_CONFIG;
              const Icon = cfg.Icon;

              return (
                <div
                  key={act.id}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${cfg.bg} ${cfg.text}`}
                    >
                      <Icon size={16} />
                    </div>

                    <div className="flex flex-col justify-center">
                      <p className="text-gray-600">
                        Đơn đặt phòng{" "}
                        <span className="font-bold text-gray-800">
                          {act.bookingCode}
                        </span>{" "}
                        - {act.customerName}
                      </p>
                      {act.modifiedOn && (
                        <span className="text-xs text-gray-400">
                          {formatDate(
                            new Date(act.modifiedOn),
                            "HH:mm - dd/MM/yyyy",
                          )}
                        </span>
                      )}
                    </div>
                  </div>

                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.text}`}
                  >
                    {act.displayAs}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="mb-2">
          <h3 className="font-bold text-gray-800">Phân bổ đặt phòng</h3>
        </div>

        <div className="flex items-center gap-4 h-[180px]">
          <div className="w-1/2 h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="w-1/2 space-y-2">
            {pieData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-600 truncate">{item.name}</span>
                </div>
                <div className="flex items-center gap-1 font-semibold text-gray-800">
                  <span>{item.percentage}%</span>
                  <span className="text-gray-400 text-[10px]">
                    ({item.value})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
