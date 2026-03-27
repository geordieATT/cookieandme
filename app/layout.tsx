import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cookie & Me – Handcrafted Custom Cookies, Lower Hutt",
  description: "Custom-designed, handcrafted cookies delivered from Lower Hutt, New Zealand. Gift boxes and logo cookies for events, weddings, and businesses.",
  openGraph: {
    title: "Cookie & Me",
    description: "Baking Moments, Stamping Memories.",
    url: "https://cookieandme.nz",
    siteName: "Cookie & Me",
    locale: "en_NZ",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
