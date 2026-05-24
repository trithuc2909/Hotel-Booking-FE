import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUpdateBookingStatusMutation } from "../../api/bookingApi";
import { toast } from "sonner";

interface UpdateStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingCode: string;
  bookingId: string;
  currentStatus: string;
  onSuccess?: () => void;
}

export default function UpdateStatusModal({
  isOpen,
  onClose,
  bookingCode,
  bookingId,
  currentStatus,
  onSuccess,
}: UpdateStatusModalProps) {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [updateStatus, { isLoading }] = useUpdateBookingStatusMutation();

  const handleUpdate = async () => {
    try {
      await updateStatus({ id: bookingId, status: selectedStatus }).unwrap();
      toast.success("Cập nhật trạng thái thành công!");
      onSuccess?.();
      onClose();
    } catch (error) {
      toast.error("Không thể cập nhật trạng thái");
    }
  };

  const statuses = [
    { value: "CONFIRMED", label: "Đã thanh toán" },
    { value: "PENDING_PAYMENT", label: "Chờ thanh toán" },
    { value: "CANCELLED", label: "Đã hủy & hoàn tiền" },
    { value: "CHECKED_IN", label: "Đã nhận phòng" },
    { value: "CHECKED_OUT", label: "Đã trả phòng" },
  ];
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">Cập nhật trạng thái</DialogTitle>
          <p className="text-sm font-medium text-blue-600">Mã đặt phòng: {bookingCode}</p>
        </DialogHeader>
        <div>
          <p className="mb-3 text-xs font-bold tracking-wider text-gray-400">CHỌN TRẠNG THÁI MỚI</p>
          <div className="space-y-3">
            {statuses.map((status) => (
              <label
                key={status.value}
                className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-all ${
                  selectedStatus === status.value
                    ? "border-[#0D99FF] bg-blue-50/50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <span className="text-sm font-semibold text-gray-800">{status.label}</span>
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                    selectedStatus === status.value ? "border-[#0D99FF]" : "border-gray-300"
                  }`}
                >
                  {selectedStatus === status.value && <div className="h-2.5 w-2.5 rounded-full bg-[#0D99FF]" />}
                </div>
                <input
                  type="radio"
                  name="status"
                  value={status.value}
                  checked={selectedStatus === status.value}
                  onChange={() => setSelectedStatus(status.value)}
                  className="hidden"
                />
              </label>
            ))}
          </div>
        </div>
        <div className="mt-2 flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose} className="cursor-pointer font-semibold text-gray-600">
            Hủy bỏ
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={isLoading}
            className="min-w-[140px] cursor-pointer bg-[#0D99FF] font-semibold text-white hover:bg-[#0B84E6]"
          >
            {isLoading ? "Đang xử lý..." : "Xác nhận cập nhật"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
