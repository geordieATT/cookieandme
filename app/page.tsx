"use client";

import GiftBoxSection from "@/components/GiftBoxSection";
import CustomCookieSection from "@/components/CustomCookieSection";
import ContactSection from "@/components/ContactSection";
import GallerySection from "@/components/GallerySection";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F5F0]">
      <Header />
      <Hero />
      <GiftBoxSection />
      <CustomCookieSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </main>
  );
}