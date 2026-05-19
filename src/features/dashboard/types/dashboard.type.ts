export type StatItem = {
  value: number;
  change: number;
};

export type DashboardStatsResponse = {
  totalRevenue: StatItem;
  totalBookings: StatItem;
  avgRoomRate: StatItem;
};

export type DailyRevenueResponse = {
  day: string;
  revenue: number;
};

export type TimelineBooking = {
  guestName: string;
  bookingCode: string;
  checkInDate: string;
  checkOutDate: string;
  status: string;
};

export type RoomTimelineResponse = {
  roomCode: string;
  roomType: string;
  bookings: TimelineBooking[];
};

export const DASHBOARD_STATS_PERIOD = {
  CURRENT: "current",
  PREVIOUS: "previous",
} as const;

export type DashboardStatsPeriod =
  (typeof DASHBOARD_STATS_PERIOD)[keyof typeof DASHBOARD_STATS_PERIOD];

export type RoomTimelineRequest = {
  from: string;
  to: string;
};
