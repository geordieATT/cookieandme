import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

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
    // Without this, sharing a link anywhere shows no picture.
    images: [
      {
        url: "/images/fathers-day-gift-box-open-a.jpg",
        width: 1152,
        height: 2048,
        alt: "A Cookie & Me gift box packed with hand-stamped cookies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie & Me – Designed With Good Taste",
    description:
      "Custom-designed, handcrafted cookies from Lower Hutt, New Zealand.",
    images: ["/images/fathers-day-gift-box-open-a.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
