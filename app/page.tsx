import HeroSection from "@/components/HeroSection";
import HomePaths from "@/components/HomePaths";
import HomeCta from "@/components/HomeCta";

// The home page is pre-built, but rebuilt in the background at most every
// hour so date-based content (the Christmas card and hero link in
// lib/season.ts, and the discount wording) switches over on its own.
export const revalidate = 3600;

export default function Home() {
  return (
    <main>
      <HeroSection />
      <HomePaths />
      <HomeCta />
    </main>
  );
}
