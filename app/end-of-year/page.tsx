import type { Metadata } from "next";
import EndOfYearSection from "@/components/EndOfYearSection";

export const metadata: Metadata = {
  title: "Christmas and End-of-Year Events",
  description:
    "Christmas templates for corporate end-of-year events, awards nights and staff parties. Add your logo, pick a flavour, and we handle the rest.",
};

export default function EndOfYearPage() {
  return (
    <main className="page-top">
      <EndOfYearSection />
    </main>
  );
}
