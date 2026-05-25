import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cookie & Me – Custom Designed Cookies, Lower Hutt NZ",
  description:
    "Custom-designed, handcrafted cookies for businesses, events, and every occasion worth celebrating. Based in Lower Hutt, New Zealand.",
  openGraph: {
    title: "Cookie & Me – Designed With Good Taste",
    description:
      "Custom-designed, handcrafted cookies from Lower Hutt, New Zealand.",
    url: "https://cookieandme.nz",
    siteName: "Cookie & Me",
    locale: "en_NZ",
    type: "website",
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
