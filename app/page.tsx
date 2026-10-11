import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import HomePaths from "@/components/HomePaths";
import HomeCta from "@/components/HomeCta";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    path: "/",
    title: "Cookie & Me",
    description:
      "Custom-designed, handcrafted cookies for businesses, events, and every occasion worth celebrating. Based in Lower Hutt, New Zealand.",
    shareTitle: "Cookie & Me – Designed With Good Taste",
  }),
  // The home page uses the full site title without the " | Cookie & Me" suffix.
  title: { absolute: "Cookie & Me – Custom Designed Cookies, Lower Hutt NZ" },
};

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
