import type { Metadata } from "next";
import GallerySection from "@/components/GallerySection";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A look at cookies we have designed and baked for birthdays, weddings, corporate events and celebrations around Wellington and the Hutt Valley.",
};

export default function GalleryPage() {
  return (
    <main className="page-top">
      <GallerySection />
    </main>
  );
}
