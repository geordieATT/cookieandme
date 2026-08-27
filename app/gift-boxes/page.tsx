import type { Metadata } from "next";
import GiftBoxSection from "@/components/GiftBoxSection";

export const metadata: Metadata = {
  title: "Father's Day Gift Boxes",
  description:
    "Ready-made Father's Day gift boxes of hand-stamped cookies. Pick a 6 or 12 pack, add a printed note, and choose pickup, Hutt Valley delivery, or nationwide courier.",
};

export default function GiftBoxesPage() {
  return (
    <main className="page-top">
      <GiftBoxSection />
    </main>
  );
}
