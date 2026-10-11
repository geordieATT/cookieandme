import type { Metadata } from "next";
import EndOfYearSection from "@/components/EndOfYearSection";

const title = "Christmas and End-of-Year Events";
const description =
  "Christmas templates for corporate end-of-year events, awards nights and staff parties. Add your logo, pick a flavour, and we handle the rest.";

// The link preview photo (LinkedIn, Facebook, iMessage etc.) is a 1200x628
// landscape crop, since share cards are ~1.91:1 and the source photo is
// portrait. openGraph here replaces the site-wide one from the root layout
// rather than merging with it, so every field is repeated.
const shareImage = {
  url: "/images/og-end-of-year-gem-homestay.jpg",
  width: 1200,
  height: 628,
  alt: "Teal GEM Homestay Apartment logo cookies stamped with a fantail",
};

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | Cookie & Me`,
    description,
    url: "https://cookieandme.nz/end-of-year",
    siteName: "Cookie & Me",
    locale: "en_NZ",
    type: "website",
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Cookie & Me`,
    description,
    images: [shareImage.url],
  },
};

export default function EndOfYearPage() {
  return (
    <main className="page-top">
      <EndOfYearSection />
    </main>
  );
}
