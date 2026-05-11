import { Suspense } from "react";
import AboutSection from "@/components/home/AboutSection";
import FeaturedRoomsSection from "@/components/home/FeaturedRoomsSection";
import GallerySection from "@/components/home/GallerySection";
import HeroSection from "@/components/home/HeroSection";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={<div className="min-h-[500px]" />}>
          <HeroSection />
        </Suspense>
        <GallerySection />
        <Suspense fallback={<div className="py-16" />}>
          <FeaturedRoomsSection />
        </Suspense>
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
