import AboutSection from "@/components/home/AboutSection";
import FeaturedRoomsSection from "@/components/home/FeaturedRoomsSection";
import GallerySection from "@/components/home/GallerySection";
import HeroSection from "@/components/home/HeroSection";

import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <GallerySection />
        <FeaturedRoomsSection />
        <AboutSection />
      </main>
    </>
  );
}
