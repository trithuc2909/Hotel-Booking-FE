const MINIO_URL = process.env.NEXT_PUBLIC_MINIO_URL ?? "http://localhost:9000";

const SERVICE_IMAGE_URL = (name: string) =>
  `${MINIO_URL}/images/services/${name}`;

export type Service = {
  id: number;
  category: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
};

export const SERVICES: Service[] = [
  {
    id: 1,
    category: "Di chuyển",
    name: "Đưa đón sân bay (Airport Transfer)",
    description:
      "Khách sạn cung cấp xe riêng đưa đón khách giữa sân bay và khách sạn theo thời gian khách yêu cầu. Chi phí dịch vụ sẽ được cộng vào tổng hóa đơn khi khách sạn xác nhận thanh toán.",
    price: "400.000 VNĐ / lượt",
    imageUrl: SERVICE_IMAGE_URL("airport-transfer.png"),
  },
  {
    id: 2,
    category: "Di chuyển",
    name: "Thuê xe máy (Motorbike Rental)",
    description:
      "Khách sạn cung cấp dịch vụ cho thuê xe máy để khách tự do khám phá và tham quan các địa điểm xung quanh trong thời gian lưu trú. Chi phí dịch vụ sẽ được cộng vào tổng hóa đơn khi khách sạn xác nhận thanh toán.",
    price: "150.000 VNĐ / ngày",
    imageUrl: SERVICE_IMAGE_URL("motorbike-rental.png"),
  },
  {
    id: 3,
    category: "Trang trí nội thất",
    name: "Trang trí sinh nhật (Room Birthday Decoration)",
    description:
      "Khách sạn cung cấp dịch vụ trang trí phòng với bóng bay, hoa, banner chúc mừng và các yếu tố khác không giới hạn theo yêu cầu và ngân sách cho dịp sinh nhật. Chi phí dịch vụ sẽ được cộng vào tổng hóa đơn khi khách sạn xác nhận thanh toán.",
    price: "1.200.000 VNĐ / gói",
    imageUrl: SERVICE_IMAGE_URL("birthday-decoration.png"),
  },
  {
    id: 4,
    category: "Trang trí nội thất",
    name: "Trang trí cầu hôn (Romantic Proposal Decoration)",
    description:
      "Khách sạn cung cấp trang trí phòng không gian lãng mạn cho dịp cầu hôn với các yếu tố như hoa, nến, nhạc, bóng bay, chữ trang trí và các cách khác. Chi phí dịch vụ sẽ được cộng vào tổng hóa đơn khi khách sạn xác nhận thanh toán.",
    price: "2.500.000 VNĐ / gói",
    imageUrl: SERVICE_IMAGE_URL("proposal-decoration.png"),
  },
  {
    id: 5,
    category: "Thư giãn",
    name: "Massage toàn thân (Full Body Massage)",
    description:
      "Dịch vụ massage thư giãn giúp khách giải tỏa căng thẳng và phục hồi năng lượng sau chuyến đi. Massage đặc biệt từ thảo dược khám phá tinh hoa Đà Lạt.",
    price: "600.000 VNĐ / người / 60 phút",
    imageUrl: SERVICE_IMAGE_URL("massage.png"),
  },
  {
    id: 6,
    category: "Thư giãn",
    name: "Xông hơi thư giãn (Sauna / Steam Bath)",
    description:
      "Khách sạn có phòng xông hơi và tắm hơi để giúp khách thư giãn trong không gian yên tĩnh, thoải mái. Chi phí dịch vụ sẽ được cộng vào tổng hóa đơn khi khách sạn xác nhận thanh toán.",
    price: "200.000 VNĐ / người / lượt",
    imageUrl: SERVICE_IMAGE_URL("sauna.png"),
  },
  {
    id: 7,
    category: "Khám phá",
    name: "Dịch vụ Hướng dẫn viên du lịch (Tour Guide Service)",
    description:
      "Khách sạn có thể sắp xếp các tour có hướng dẫn viên địa phương dẫn khách tham quan các điểm du lịch nổi tiếng của Đà Lạt và các vùng lân cận. Chi phí dịch vụ sẽ được cộng vào tổng hóa đơn khi khách sạn xác nhận thanh toán.",
    price: "500.000 VNĐ / ngày",
    imageUrl: SERVICE_IMAGE_URL("tour-guide.png"),
  },
];
export const SERVICE_CATEGORIES = [
  "Tất cả",
  ...Array.from(new Set(SERVICES.map((s) => s.category))),
];
