# 🏨 Hotel Booking Web UI (Frontend)

[![Next.js](https://img.shields.io/badge/Next.js-16.x-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.x-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.x-764ABC?style=for-the-badge&logo=redux)](https://redux-toolkit.js.org/)

Giao diện Web tối tân, chuyên nghiệp phục vụ quản lý và vận hành hệ thống Khách Sạn toàn diện. Được xây dựng dựa trên **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, kết hợp giải pháp quản lý trạng thái hiệu năng cao **Redux Toolkit** và data grid mạnh mẽ **TanStack Table**.

Dự án mang đến trải nghiệm UX/UI vượt trội với thiết kế hiện đại, responsive hoàn toàn trên mọi thiết bị và tích hợp các biểu đồ phân tích kinh doanh thời gian thực trực quan.

---

## ✨ Điểm Nhấn Công Nghệ & Trải Nghiệm Người Dùng (UX/UI Highlights)

### 1. 📅 Sơ Đồ Quản Lý Phòng Dạng Gantt (Interactive Room Timeline)
* **Giao diện Trực Quan**: Trực quan hóa các phòng và trạng thái đặt phòng theo biểu đồ Gantt thời gian thực tại Dashboard.
* **Tương tác Nhanh (Quick Actions Modal)**: Cho phép lễ tân nhấp trực tiếp vào bất kỳ block đặt phòng nào để mở modal cập nhật nhanh trạng thái đơn đặt (Check-in, Checkout, Cancel), tự động đồng bộ hóa tải lại dữ liệu (`refetch`) lập tức mà không cần reload trang.
* **Cơ chế màu sắc thông minh**: Phân biệt rõ ràng giữa các nhóm trạng thái đặt phòng (Chờ nhận phòng, Đã check-in, Đã trả phòng, Đã hủy).

### 2. 🎛️ Dashboard & Biểu Đồ Phân Tích Kinh Doanh
* **Bento Grid Layout**: Bố cục Dashboard được sắp xếp theo cấu trúc Bento hiện đại, gọn gàng, tôn vinh các chỉ số quan trọng (Doanh thu, Tỷ lệ lấp đầy, Số lượng phòng trống, Dọn dẹp).
* **Phân tích Doanh thu**: Tích hợp **Recharts** vẽ biểu đồ doanh thu theo ngày, tuần, tháng động, bộ lọc linh hoạt qua URL Search Params nhờ tích hợp **nuqs**.

### 3. 📂 Hệ Thống Quản Trị Cực Kỳ Chi Tiết & Tiện Ích
* **Bảng dữ liệu thông minh (TanStack Table)**: Danh sách phòng, đơn đặt phòng, hóa đơn được thiết kế với cơ chế sắp xếp, tìm kiếm, phân trang và bộ lọc chồng chéo trạng thái cực kỳ mượt mà.
* **Pagination Phân Trang Circular Ellipsis**: Thuật toán phân trang động tự thu gọn các trang ở giữa thành dấu ba chấm (`...`), ngăn tràn giao diện khi số lượng trang quá lớn.
* **Xuất Excel & In Hóa Đơn**: Tích hợp `xlsx` xuất báo cáo dữ liệu trực tiếp ra Excel và thư viện `react-to-print` hỗ trợ in hóa đơn thanh toán chuẩn hóa cho khách hàng tại quầy.

### 4. 👤 Trải Nghiệm Khách Hàng Tuyệt Vời (B2C & Walk-in Flow)
* **Luồng Đặt Phòng Đa Năng**:
  * Khách hàng đặt trực tuyến: Tự động liên kết tài khoản cá nhân, lưu lịch sử đặt phòng riêng biệt.
  * Đặt hộ tại quầy (Lễ tân/Admin): Hỗ trợ cơ chế tra cứu/tự động tạo thông tin Khách hàng dựa trên **Số điện thoại**, bảo toàn tuyệt đối thông tin tài khoản cá nhân của Admin/Staff thực hiện.
* **Giao diện đặt phòng trực quan**: Carousel ảnh phòng chất lượng cao (`embla-carousel`), biểu mẫu nhập liệu xác thực mạnh mẽ qua `react-hook-form` & `zod`.

### 5. 🛡️ Bảo Mật & Xác Thực OTP An Toàn
* **Input OTP Phân Cực**: Trải nghiệm nhập mã xác thực OTP gửi qua email cực kỳ mượt mà với hiệu ứng focus riêng cho từng ô kí tự nhờ thư viện `input-otp`.
* **Phân quyền Route (RBAC)**: Tự động kiểm tra quyền hạn đăng nhập, điều hướng và chặn truy cập trái phép đối với các trang quản trị tùy theo vai trò (`ADMIN`, `STAFF`, `USER`).

---

## 🎨 Design System & UX/UI Tokens

Hệ thống áp dụng các tiêu chuẩn thiết kế Premium:
* **Typography**: Sử dụng font chữ hiện đại, tối ưu hóa hiển thị và độ đọc tốt.
* **Color Palette**: Tông màu chủ đạo tinh tế, sử dụng các dải màu Gradient chuyển tiếp mượt mà, hỗ trợ giao diện Dark Mode / Light Mode thời thượng qua `next-themes`.
* **Micro-animations**: Các nút bấm, thẻ và thanh bên tích hợp hiệu ứng Hover Scale, Opacity transition tinh tế.
* **Nested Radius Principle**: Để đảm bảo cân đối thị giác tối đa, bo góc các phần tử bên trong (ví dụ: nút nhấn `rounded-lg`, `rounded-xl`) luôn được thiết kế nhỏ hơn bo góc của container bao ngoài (`rounded-2xl`).

---

## 📂 Cấu Trúc Thư Mục Dự Án (Project Structure)

```text
hotel-booking-ui-web/
├── public/                 # Các tài nguyên tĩnh (Images, SVGs, Logos)
├── src/
│   ├── app/                # Next.js App Router Pages
│   │   ├── (auth)/         # Nhóm route xác thực (Login, Register, OTP, Quên mật khẩu)
│   │   ├── (dashboard)/    # Nhóm route quản trị admin/lễ tân
│   │   │   └── dashboard/  # Thống kê, Quản lý phòng, đơn đặt phòng, khuyến mại, dịch vụ
│   │   └── (main)/         # Nhóm route dành cho khách hàng (Danh sách phòng, Đặt phòng, Profile)
│   ├── components/         # Các Component dùng chung (Shared UI)
│   │   ├── layout/         # Sidebar quản trị collapsible, Header, Footer
│   │   ├── ui/             # Các component Shadcn UI cơ bản (Button, Dialog, Dropdown, Input,...)
│   │   └── common/         # Pagination, Loading spinner, Theme toggler
│   ├── config/             # Cấu hình API endpoints, axios client, v.v.
│   ├── constants/          # Khai báo các enum trạng thái, hằng số hệ thống
│   ├── features/           # Phát triển theo mô hình Feature-driven
│   │   ├── auth/           # Redux slice, components xử lý đăng ký, đăng nhập
│   │   ├── booking/        # Luồng đặt phòng, Timeline phòng, quản lý đơn đặt phòng
│   │   ├── dashboard/      # Linh hồn quản trị, Recharts thống kê doanh thu
│   │   ├── room/           # Quản lý danh mục phòng, thẻ hiển thị phòng, chi tiết phòng
│   │   ├── service/        # Các dịch vụ đi kèm khách sạn
│   │   └── user/           # Quản lý thông tin hồ sơ cá nhân khách hàng
│   ├── lib/                # Utilities dùng chung (utils.ts, cn helper)
│   ├── store/              # Cấu hình Redux Toolkit Store
│   └── types/              # Khai báo TypeScript Interfaces & Types
├── tailwind.config.js      # Cấu hình Tailwind CSS
├── tsconfig.json           # Cấu hình TypeScript
└── package.json            # Các thư viện phụ thuộc và script phát triển
```

---

## 🛠️ Thư Viện Sử Dụng & Chi Tiết Vai Trò

| Thư viện | Phiên bản | Vai trò trong hệ thống |
| :--- | :--- | :--- |
| **`next`** | `16.1.4` | Framework chính, hỗ trợ Server Components & App Router tối ưu SEO. |
| **`react`** | `19.2.3` | Thư viện giao diện chính, tận dụng các hook cải tiến mới nhất. |
| **`@reduxjs/toolkit`** | `2.11.2` | Quản lý trạng thái ứng dụng tập trung (Auth, Cart, UI settings). |
| **`@tanstack/react-table`**| `8.21.3` | Xử lý các bảng dữ liệu phức tạp (phân loại, lọc nâng cao). |
| **`recharts`** | `3.8.1` | Vẽ biểu đồ doanh thu trực quan, biểu đồ tròn phân tích hiệu suất phòng. |
| **`react-hook-form`** | `7.71.1` | Quản lý Form hiệu năng cao, tránh re-render không cần thiết. |
| **`zod`** | `4.4.3` | Kiểm tra ràng buộc dữ liệu đầu vào phía Client cực kỳ nghiêm ngặt. |
| **`sonner`** | `2.0.7` | Hiển thị thông báo Toast siêu mượt, hiện đại. |
| **`xlsx`** | `0.18.5` | Cho phép kết xuất dữ liệu báo cáo ra file Excel chỉ với 1 click. |
| **`react-to-print`** | `3.3.0` | Hỗ trợ định dạng in hóa đơn nhanh chóng, chuyên nghiệp. |
| **`embla-carousel-react`** | `8.6.0` | Cung cấp Slider xem ảnh phòng mượt mà, hỗ trợ Auto-play. |

---

## ⚙️ Hướng Dẫn Cài Đặt & Chạy Dưới Local

### 1. Cài đặt các gói phụ thuộc
Sử dụng `npm` để cài đặt các package của ứng dụng:
```bash
npm install
```

### 2. Cấu hình biến môi trường
Tạo file `.env.local` ở thư mục gốc của frontend:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

Hệ thống hỗ trợ chạy đa môi trường thông qua các script cấu hình sẵn:
* **`.env.dev`**: Kết nối tới API Server môi trường Development.
* **`.env.prod`**: Kết nối tới API Server môi trường Production.

### 3. Khởi chạy dự án ở chế độ Phát triển (Development)
Chạy lệnh sau để khởi động Local Dev Server (mặc định tại cổng `3000`):
```bash
npm run dev
```

Nếu muốn chạy kèm tệp cấu hình môi trường cụ thể:
```bash
# Chạy với môi trường Dev
npm run dev:dev

# Chạy với môi trường Prod
npm run dev:prod
```

Truy cập [http://localhost:3000](http://localhost:3000) trên trình duyệt để kiểm tra kết quả!

### 4. Build sản phẩm hoàn thiện (Production Build)
Để tối ưu hóa toàn bộ mã nguồn, font chữ và các thành phần tĩnh trước khi deploy:
```bash
npm run build
```
Để build theo môi trường chỉ định:
```bash
npm run build:dev  # Build cho staging/development
npm run build:prod # Build cho production
```

Sau khi build thành công, khởi chạy server production:
```bash
npm run start
```

---

## 🤝 Hướng Dẫn Đóng Góp Phát Triển (Contribution)
1. Fork dự án này.
2. Tạo nhánh mới để phát triển tính năng (`git checkout -b feature/AmazingFeature`).
3. Commit các thay đổi (`git commit -m 'Add some AmazingFeature'`).
4. Push nhánh của bạn lên (`git push origin feature/AmazingFeature`).
5. Tạo một Pull Request để chúng ta cùng review mã nguồn.

Chúc các bạn phát triển dự án thật vui vẻ và gặt hái nhiều thành công! 🎉🏨
