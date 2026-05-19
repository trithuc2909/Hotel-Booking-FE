"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCancelBookingMutation } from "@/features/booking/api/bookingApi";
import { useReactToPrint } from "react-to-print";
import InvoiceTemplate from "../templates/InvoiceTemplate";

interface Props {
  bookingId: string;
  bookingCode: string;
  canCancel: boolean;
  bookingData: any;
}

export default function CancelBookingDialog({
  bookingId,
  bookingCode,
  canCancel,
  bookingData,
}: Props) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cancelBooking, { isLoading: isCancelling }] =
    useCancelBookingMutation();

  const invoiceRef = useRef<HTMLDivElement>(null);
  const handleDownloadInvoice = useReactToPrint({
    contentRef: invoiceRef,
    documentTitle: `Invoice-${bookingCode}`,
  });

  const handleConfirmCancel = async () => {
    try {
      await cancelBooking(bookingId).unwrap();
      setDialogOpen(false);
      toast.success("Hủy đặt phòng thành công");
      router.push("/booking-history");
    } catch (err: any) {
      toast.error(err?.data?.message ?? "Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  return (
    <div className="flex flex-col gap-2 pt-1">
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1 cursor-pointer"
          size="sm"
          onClick={handleDownloadInvoice}
        >
          <Download size={14} className="mr-1.5" />
          Tải hóa đơn
        </Button>
        <Button
          className="flex-1 bg-[#0D99FF] hover:bg-[#0B7FDB] cursor-pointer"
          size="sm"
          onClick={() => router.push("/rooms")}
        >
          <Calendar size={14} className="mr-1.5" />
          Đặt lại phòng
        </Button>
      </div>

      {canCancel && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="destructive"
              className="w-full cursor-pointer"
              size="sm"
            >
              Hủy đặt phòng
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Xác nhận hủy đặt phòng</DialogTitle>
              <DialogDescription>
                Bạn có chắc muốn hủy đơn đặt phòng{" "}
                <span className="font-semibold">{bookingCode}</span> không? Hành
                động này không thể hoàn tác.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Không, giữ lại</Button>
              </DialogClose>
              <Button
                variant="destructive"
                disabled={isCancelling}
                onClick={handleConfirmCancel}
                className="cursor-pointer"
              >
                {isCancelling ? "Đang hủy..." : "Xác nhận hủy"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
        <InvoiceTemplate ref={invoiceRef} data={bookingData} />
      </div>
    </div>
  );
}
