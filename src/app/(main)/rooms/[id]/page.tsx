// "use client";

// import { useParams } from "next/navigation";
// import { useGetRoomByIdQuery } from "@/store/feature/room/roomApi";
// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";
// import Breadcrumb from "@/components/common/Breadcrumb";
// import RoomGallery from "@/components/rooms/RoomGallery";
// import RoomAmenities from "@/components/rooms/RoomAmenities";
// import BookingWidget from "@/components/rooms/BookingWidget";
// import StarRating from "@/components/rooms/StarRating"; 

// export default function RoomDetailPage() {
//   const id = useParams<{ id: string }>();
//   const { data, isLoading } = useGetRoomByIdQuery(id);
//   const room = data?.data;

//   if (isLoading) return <div>Loading...</div>;
//   if (!room) return <div>Không tìm thấy phòng</div>;

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Navbar />
//       <div className="sticky top-16 z-10 bg-white border-b border-gray-100 shadow-sm">
//         <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
//           <Breadcrumb
//             items={[
//               { label: "Phòng & Giá", href: "/rooms" },
//               { label: room.roomName },
//             ]}
//           />
//         </div>
//       </div>
//       <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//         <RoomGallery
//           thumbnailUrl={room.thumbnailUrl}
//           roomName={room.roomName}
//         />
//         <div className="mt-8 flex gap-8 items-start">
//           <div className="flex-1 min-w-0 space-y-8">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">
//                 {room.roomName}
//               </h1>
//               <div className="mt-1 flex items-center gap-2">
//                 <StarRating rating={Number(room.rating)} />
//                 <span className="text-sm text-gray-500">
//                   {room.rating} đánh giá
//                 </span>
//               </div>
//             </div>
//             {/* Mô tả */}
//             <div>
//               <h2 className="text-lg font-semibold text-gray-800 mb-2">
//                 Mô tả chi tiết
//               </h2>
//               <p className="text-gray-600 leading-relaxed">{room.notes}</p>
//             </div>
//             {/* Tiện nghi */}
//             <RoomAmenities amenities={room.amenities} />
//             {/* Nội quy */}
//             <HotelRules />
//           </div>
//           {/* RIGHT: Booking widget sticky */}
//           <div className="w-80 shrink-0 sticky top-[108px] self-start">
//             <BookingWidget room={room} />
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }
