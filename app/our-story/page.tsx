import type { Metadata } from "next";
import OurStorySection from "@/components/OurStorySection";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Cookie & Me is a mother-and-son business in Lower Hutt. Every stamp is designed in CAD and 3D printed in food-safe filament.",
};

export default function OurStoryPage() {
  return (
    <main className="page-top">
      <OurStorySection />
    </main>
  );
}
