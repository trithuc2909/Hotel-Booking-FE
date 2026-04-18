import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RoomFormValues, roomSchema } from "../schemas/room.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const useRoomForm = (defaultValues?: Partial<RoomFormValues>) => {
  const methods = useForm<RoomFormValues>({
    resolver: zodResolver(roomSchema) as any,
    defaultValues: {
      balcony: false,
      amenityIds: [],
      maxGuests: 2,
      floor: 1,
      ...defaultValues,
    },
    mode: "onSubmit",
  });

  const serialized = JSON.stringify(defaultValues);

  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      methods.reset({ balcony: false, amenityIds: [], maxGuests: 2, floor: 1, ...defaultValues });
    }
  }, [serialized]);

  return methods;
};
