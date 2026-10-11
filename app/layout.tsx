import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import AnalyticsGate from "@/components/AnalyticsGate";
import HashScroll from "@/components/HashScroll";
import { DEFAULT_SHARE_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";
import "./globals.css";

// Fonts are self-hosted by Next.js at build time, so there is no request to
// Google and no late swap after the page appears. Each exposes a CSS variable
// that globals.css uses (--font-serif for headings, --font-sans for the rest).
// Fraunces is a variable font: "opsz" lets it adjust its shapes to the size it
// is drawn at, and SOFT/WONK are switched off in globals.css.
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Cookie & Me – Custom Designed Cookies, Lower Hutt NZ",
    template: "%s | Cookie & Me",
  },
  description:
    "Custom-designed, handcrafted cookies for businesses, events, and every occasion worth celebrating. Based in Lower Hutt, New Zealand.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  // Fallback share tags for any page that doesn't set its own (every page
  // does, via pageMetadata in lib/seo.ts; this covers the 404 page).
  openGraph: {
    title: "Cookie & Me – Designed With Good Taste",
    description:
      "Custom-designed, handcrafted cookies from Lower Hutt, New Zealand.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_NZ",
    type: "website",
    images: [{ ...DEFAULT_SHARE_IMAGE, url: `${SITE_URL}${DEFAULT_SHARE_IMAGE.url}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie & Me – Designed With Good Taste",
    description:
      "Custom-designed, handcrafted cookies from Lower Hutt, New Zealand.",
    images: [`${SITE_URL}${DEFAULT_SHARE_IMAGE.url}`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-NZ" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <Navbar />
        {children}
        <Footer />
        <CookieConsentBanner />
        <AnalyticsGate />
        <HashScroll />
      </body>
    </html>
  );
}
