import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";

export const metadata: Metadata = pageMetadata({
  path: "/contact",
  title: "Contact",
  description:
    "Get in touch with Cookie & Me in Lower Hutt. Ask about a design, a quote, or a large order, and see answers to our most common questions.",
});

export default function ContactPage() {
  return (
    <main className="page-top">
      <ContactSection />
      <FAQSection />
    </main>
  );
}
