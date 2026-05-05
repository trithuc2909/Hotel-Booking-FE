"use client";

import { useGetServicesQuery } from "@/features/service/api/serviceApi";
import { SelectedService } from "../types/booking.type";
import { useEffect, useMemo, useState } from "react";
import { X, Check } from "lucide-react";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { getIconComponent } from "@/lib/utils/icon";

type Props = {
  selected: SelectedService[];
  onSave: (services: SelectedService[]) => void;
  onClose: () => void;
};

export default function ServiceModal({ selected, onSave, onClose }: Props) {
  const { data, isLoading } = useGetServicesQuery();
  const services = data?.data ?? [];

  const groups = useMemo(() => {
    return services.reduce<
      Record<string, { icon: string; items: typeof services }>
    >((acc, svc) => {
      const cat = svc.category.name;
      if (!acc[cat]) acc[cat] = { icon: svc.category.icon, items: [] };
      acc[cat].items.push(svc);
      return acc;
    }, {});
  }, [services]);

  const [draft, setDraft] = useState<SelectedService[]>(selected);

  // Sync when parent change
  useEffect(() => {
    setDraft(selected);
  }, [selected]);

  // Optimize lookup
  const selectedIds = useMemo(() => {
    return new Set(draft.map((s) => s.id));
  }, [draft]);

  const toggle = (svc: (typeof services)[0]) => {
    setDraft((prev) => {
      const exists = prev.some((s) => s.id === svc.id);

      if (exists) {
        return prev.filter((s) => s.id !== svc.id);
      }

      return [
        ...prev,
        {
          id: svc.id,
          name: svc.name,
          basePrice: Number(svc.basePrice),
          unit: svc.unit,
          categoryName: svc.category.name,
          categoryIcon: svc.category.icon,
        },
      ];
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Thêm dịch vụ bổ sung</h3>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto max-h-[60vh] px-6 py-4 space-y-5">
          {isLoading && <p className="text-sm text-gray-500">Đang tải...</p>}

          {!isLoading && services.length === 0 && (
            <p className="text-sm text-gray-500">Không có dịch vụ</p>
          )}

          {!isLoading &&
            Object.entries(groups).map(([category, { icon, items }]) => {
              const CategoryIcon = getIconComponent(icon);
              return (
              <div key={category}>
                <div className="flex items-center gap-2 mb-2">
                  {CategoryIcon && <CategoryIcon size={14} className="text-[#0D99FF]" />}
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    {category}
                  </p>
                </div>

                <div className="space-y-2">
                  {items.map((svc) => {
                    const isSelected = selectedIds.has(svc.id);

                    return (
                      <div
                        key={svc.id}
                        className={`flex items-center justify-between rounded-xl border px-4 py-3 transition ${
                          isSelected
                            ? "border-blue-200 bg-blue-50"
                            : "border-gray-100 bg-gray-50"
                        }`}
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {svc.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {formatCurrency(Number(svc.basePrice))} / {svc.unit}
                          </p>
                        </div>

                        <button
                          onClick={() => toggle(svc)}
                          className={`cursor-pointer text-xs font-semibold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 border shrink-0 ${
                            isSelected
                              ? "border-[#0D99FF] text-[#0D99FF] bg-white hover:bg-blue-50"
                              : "border-[#0D99FF] bg-[#0D99FF] text-white hover:bg-[#0B84E6]"
                          }`}
                        >
                          {isSelected ? (
                            <>
                              Đã chọn
                              <Check size={12} />
                            </>
                          ) : (
                            "Thêm"
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="cursor-pointer flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Hủy
          </button>

          <button
            onClick={() => onSave(draft)}
            className="cursor-pointer flex-1 rounded-xl bg-[#0D99FF] py-2.5 text-sm font-semibold text-white hover:bg-[#0B84E6]"
          >
            Lưu lựa chọn
          </button>
        </div>
      </div>
    </div>
  );
}
