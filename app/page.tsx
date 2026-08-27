export const dynamic = "force-dynamic";

import HeroSection from "@/components/HeroSection";
import FathersDayCountdown from "@/components/FathersDayCountdown";
import SocialProofBar from "@/components/SocialProofBar";
import HomePaths from "@/components/HomePaths";
import HomeCta from "@/components/HomeCta";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FathersDayCountdown />
      <SocialProofBar />
      <HomePaths />
      <HomeCta />
    </main>
  );
}
