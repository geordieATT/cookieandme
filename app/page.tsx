export const dynamic = "force-dynamic";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import GallerySection from "@/components/GallerySection";
import GiftBoxSection from "@/components/GiftBoxSection";
import CustomCookieSection from "@/components/CustomCookieSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main id="top" className="min-h-screen bg-[#F7F5F0]">
      <Header />
      <Hero />
      <GallerySection />
      <GiftBoxSection />
      <CustomCookieSection />
      <ContactSection />
      <Footer />
    </main>
  );
}