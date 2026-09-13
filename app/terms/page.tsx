import type { Metadata } from "next";
import TermsSection from "@/components/TermsSection";

export const metadata: Metadata = {
  title: "Terms & Conditions and Privacy Policy",
  description:
    "Cookie & Me's terms and conditions for ordering, and our privacy policy covering what information we collect and how it's used.",
};

export default function TermsPage() {
  return (
    <main className="page-top">
      <TermsSection />
    </main>
  );
}
