import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import AnalyticsGate from "@/components/AnalyticsGate";
import HashScroll from "@/components/HashScroll";
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
  metadataBase: new URL("https://cookieandme.nz"),
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
  openGraph: {
    title: "Cookie & Me – Designed With Good Taste",
    description:
      "Custom-designed, handcrafted cookies from Lower Hutt, New Zealand.",
    url: "https://cookieandme.nz",
    siteName: "Cookie & Me",
    locale: "en_NZ",
    type: "website",
    // Without this, sharing a link anywhere shows no picture. Uses the same photo
    // as the homepage hero, since it isn't tied to a specific occasion or product
    // line the way a gift box photo would be.
    images: [
      {
        url: "/images/wedding-samuel-georgia-cookies-closeup-packaged.jpg",
        width: 1440,
        height: 1919,
        alt: "Beautifully packaged custom cookies from Cookie & Me",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie & Me – Designed With Good Taste",
    description:
      "Custom-designed, handcrafted cookies from Lower Hutt, New Zealand.",
    images: ["/images/wedding-samuel-georgia-cookies-closeup-packaged.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
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
