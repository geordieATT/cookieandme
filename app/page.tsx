import HeroSection from "@/components/HeroSection";
import SocialProofBar from "@/components/SocialProofBar";
import HomePaths from "@/components/HomePaths";
import HomeCta from "@/components/HomeCta";
import ChristmasDealBanner from "@/components/ChristmasDealBanner";

// Rebuilt in the background at most hourly so the Christmas deal wording on
// the home cards switches off on its own after the cutoff.
export const revalidate = 3600;

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ChristmasDealBanner />
      <SocialProofBar />
      <HomePaths />
      <HomeCta />
    </main>
  );
}
