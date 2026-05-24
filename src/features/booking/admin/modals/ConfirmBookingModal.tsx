import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

interface ConfirmBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  total: number;
  guestName: string;
}

export default function ConfirmBookingModal({
  isOpen,
  onClose,
  onConfirm,
  total,
  guestName,
}: ConfirmBookingModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-gray-900">Xác nhận thanh toán tiền mặt</DialogTitle>
        </DialogHeader>

        <div className="py-3">
          <p className="text-sm leading-relaxed text-gray-600">
            Bạn có chắc chắn muốn xác nhận đặt phòng và thu tiền mặt số tiền{" "}
            <span className="font-bold text-[#0D99FF]">{formatCurrency(total)}</span> từ khách hàng{" "}
            <span className="font-bold text-gray-900">{guestName}</span> không?
          </p>
        </div>
        <DialogFooter className="flex justify-end gap-3 pt-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="cursor-pointer rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50"
          >
            Hủy
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="cursor-pointer rounded-xl bg-[#0D99FF] text-white hover:bg-[#0B84E6]"
          >
            Xác nhận
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
