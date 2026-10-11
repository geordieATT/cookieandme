import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import OrderSection from "@/components/OrderSection";
import HowItWorksSection from "@/components/HowItWorksSection";

export const metadata: Metadata = pageMetadata({
  path: "/order",
  title: "Place Your Order",
  description:
    "Order custom cookies from Cookie & Me. Tell us your design, colours, flavour, quantity and date needed, then pay securely via Stripe.",
});

export default function OrderPage() {
  return (
    <main className="page-top">
      <OrderSection />
      <HowItWorksSection />
    </main>
  );
}
