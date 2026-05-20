import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUpdateBookingStatusMutation } from "../../api/bookingApi";
import { toast } from "sonner";
interface UpdateStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingCode: string;
  bookingId: string;
  currentStatus: string;
}
export default function UpdateStatusModal({
  isOpen,
  onClose,
  bookingCode,
  bookingId,
  currentStatus,
}: UpdateStatusModalProps) {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [updateStatus, { isLoading }] = useUpdateBookingStatusMutation();
  const handleUpdate = async () => {
    try {
      await updateStatus({ id: bookingId, status: selectedStatus }).unwrap();
      toast.success("Cập nhật trạng thái thành công!");
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
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Cập nhật trạng thái
          </DialogTitle>
          <p className="text-sm text-blue-600 font-medium">
            Mã đặt phòng: {bookingCode}
          </p>
        </DialogHeader>
        <div>
          <p className="text-xs font-bold text-gray-400 mb-3 tracking-wider">
            CHỌN TRẠNG THÁI MỚI
          </p>
          <div className="space-y-3">
            {statuses.map((status) => (
              <label
                key={status.value}
                className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedStatus === status.value
                    ? "border-[#0D99FF] bg-blue-50/50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <span className="text-sm font-semibold text-gray-800">
                  {status.label}
                </span>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedStatus === status.value
                      ? "border-[#0D99FF]"
                      : "border-gray-300"
                  }`}
                >
                  {selectedStatus === status.value && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0D99FF]" />
                  )}
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
        <div className="flex justify-end gap-3 mt-2">
          <Button
            variant="ghost"
            onClick={onClose}
            className="cursor-pointer text-gray-600 font-semibold"
          >
            Hủy bỏ
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={isLoading}
            className="bg-[#0D99FF] hover:bg-[#0B84E6] text-white font-semibold cursor-pointer min-w-[140px]"
          >
            {isLoading ? "Đang xử lý..." : "Xác nhận cập nhật"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
