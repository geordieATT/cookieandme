import type { Metadata } from "next";
import CorporateSection from "@/components/CorporateSection";

export const metadata: Metadata = {
  title: "What We Do",
  description:
    "Personalised cookies stamped with your design or logo, for birthdays, weddings, corporate gifts and events. See our per-cookie pricing.",
};

export default function WhatWeDoPage() {
  return (
    <main className="page-top">
      <CorporateSection />
    </main>
  );
}
