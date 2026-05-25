export const dynamic = "force-dynamic";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SocialProofBar from "@/components/SocialProofBar";
import CorporateSection from "@/components/CorporateSection";
import GallerySection from "@/components/GallerySection";
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
        <SocialProofBar />
        <CorporateSection />
        <GallerySection />
        <HowItWorksSection />
        <OurStorySection />
        <OrderSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
