import { useParams } from "next/navigation";
import { useGetRoomByIdQuery } from "../api/roomApi";

export const VIEW_LABELS: Record<string, string> = {
  Sea: "Hướng biển",
  City: "Hướng thành phố",
  Garden: "Hướng vườn",
  Pool: "Hướng hồ bơi",
};

export const BED_TYPE_LABELS: Record<string, string> = {
  Single: "Giường đơn",
  Double: "Giường đôi",
  Triple: "Giường ba",
};

export function useRoomDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetRoomByIdQuery({ id });
  const room = data?.data;

  return { room, isLoading, isError };
}
