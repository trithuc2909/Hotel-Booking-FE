"use client";

import { BookingDetailView } from "@/features/booking";
import { use } from "react";

export default function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <BookingDetailView id={id} />;
}
