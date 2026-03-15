import {
  Wifi, Bath, Tv, Waves, Wine, DoorOpen, Flame, Coffee,
  Wind, Shirt, Archive, Zap, Thermometer, Fan,
  type LucideIcon,
} from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon> = {
  "wifi":        Wifi,
  "bath":        Bath,
  "tv":          Tv,
  "waves":       Waves,
  "wine":        Wine,
  "door-open":   DoorOpen,
  "flame":       Flame,
  "coffee":      Coffee,
  "wind":        Wind,
  "shirt":       Shirt,
  "archive":     Archive,
  "zap":         Zap,
  "thermometer": Thermometer,
  "fan":         Fan,
};

export function getIconComponent(iconName: string | null): LucideIcon | null {
  if (!iconName) return null;
  return ICON_MAP[iconName] ?? null;
}