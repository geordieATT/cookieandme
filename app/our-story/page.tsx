import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import OurStorySection from "@/components/OurStorySection";

export const metadata: Metadata = pageMetadata({
  path: "/our-story",
  title: "Our Story",
  description:
    "Cookie & Me is a mother-and-son business in Lower Hutt. We custom design and make every stamp in house, so logos and fine details come out sharp.",
});

export default function OurStoryPage() {
  return (
    <main className="page-top">
      <OurStorySection />
    </main>
  );
}
