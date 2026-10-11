import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import EndOfYearSection from "@/components/EndOfYearSection";

// Regenerated at most hourly so the 10% wording drops off on its own after
// the discount cutoff in lib/customOrderPricing.ts.
export const revalidate = 3600;

const title = "Christmas and End-of-Year Events";
const description =
  "Christmas templates for corporate end-of-year events, awards nights and staff parties. Add your logo, pick a flavour, and we handle the rest.";

// The link preview photo (LinkedIn, Facebook, iMessage etc.) is a 1200x628
// landscape crop, since share cards are ~1.91:1 and the source photo is
// portrait.
const shareImage = {
  url: "/images/og-end-of-year-gem-homestay.jpg",
  width: 1200,
  height: 628,
  alt: "Teal GEM Homestay Apartment logo cookies stamped with a fantail",
};

export const metadata: Metadata = pageMetadata({
  path: "/end-of-year",
  title,
  description,
  image: shareImage,
});

export default function EndOfYearPage() {
  return (
    <main className="page-top">
      <EndOfYearSection />
    </main>
  );
}
