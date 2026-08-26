export const dynamic = "force-dynamic";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FathersDayCountdown from "@/components/FathersDayCountdown";
import SocialProofBar from "@/components/SocialProofBar";
import CorporateSection from "@/components/CorporateSection";
import GallerySection from "@/components/GallerySection";
import GiftBoxSection from "@/components/GiftBoxSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import OurStorySection from "@/components/OurStorySection";
import OrderSection from "@/components/OrderSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FathersDayCountdown />
        <SocialProofBar />
        <CorporateSection />
        <GallerySection />
        <GiftBoxSection />
        <OurStorySection />
        <HowItWorksSection />
        <OrderSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
