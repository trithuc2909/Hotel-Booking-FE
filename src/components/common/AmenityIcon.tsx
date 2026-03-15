"use client";

import { getIconComponent } from "@/lib/utils/icon";

type AmenityIconProps = {
  icon: string | null;
  name: string;
  size?: number;
  showLabel?: boolean;
  className?: string;
};

export default function AmenityIcon({
  icon,
  name,
  size = 12,
  showLabel = true,
  className = "",
}: AmenityIconProps) {
  const IconComponent = getIconComponent(icon);

  if (!IconComponent) {
    return showLabel ? (
      <span className={`text-xs text-gray-500 ${className}`}>{name}</span>
    ) : null;
  }

  return (
    <span
      title={name}
      className={`flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 ${className}`}
    >
      <IconComponent size={size} />
      {showLabel && <span>{name}</span>}
    </span>
  );
}
