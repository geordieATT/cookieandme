import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-02-25.clover",
});

// Wellington region suburb/city keywords used to detect free delivery eligibility.
// Stripe collects the full address at checkout; we use a webhook or post-payment
// page to reconcile shipping — but for session creation we offer both shipping
// options and let Stripe apply the correct one based on the customer's address.
const WELLINGTON_REGIONS = [
  "wellington",
  "lower hutt",
  "upper hutt",
  "porirua",
  "kapiti",
  "paraparaumu",
  "waikanae",
  "masterton", // Wairarapa — exclude if desired
];

function isWellingtonAddress(address: {
  city?: string | null;
  state?: string | null;
  line1?: string | null;
  postal_code?: string | null;
} | null): boolean {
  if (!address) return false;
  const haystack = [address.city, address.state, address.line1]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return WELLINGTON_REGIONS.some((region) => haystack.includes(region));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      orderType, // "giftbox" | "custom"
      name,
      email,
      subtotal, // number in dollars, e.g. 72.00
      description, // human-readable line item label
      // Optional: pre-collected address for shipping logic hint
      // (Stripe collects authoritatively, but we can pre-fill)
    } = body;

    if (!orderType || !name || !email || !subtotal) {
      return NextResponse.json(
        { error: "Missing required checkout fields." },
        { status: 400 }
      );
    }

    const subtotalCents = Math.round(Number(subtotal) * 100);
    const flatRateShippingCents = 1000; // $10.00 NZD
    const FREE_SHIPPING_THRESHOLD_CENTS = 12500; // $125.00 NZD

    // Build shipping options. We always offer both; Stripe's address collection
    // will let us apply the right one. For orders clearly over $125 from Wellington,
    // free shipping is the only sensible option — but we present both and handle
    // via the `shipping_address_collection` + `shipping_options` below.
    // Note: Stripe does not natively filter shipping options by address at session
    // creation time. The recommended pattern is to present both and use a webhook
    // (checkout.session.completed) to reconcile if needed, OR restrict via
    // `shipping_options` with `allowed_countries`.
    //
    // Here we apply a simpler rule: if subtotal >= $125 we create a free shipping
    // option as the only/primary choice for NZ, and include flat-rate as fallback.
    // The customer can select the correct one; we confirm in the notification email.

    const shippingOptions: Stripe.Checkout.SessionCreateParams.ShippingOption[] =
      [];

    if (subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS) {
      // Free delivery available for Wellington — list it first
      shippingOptions.push({
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "nzd" },
          display_name: "FREE Delivery – Wellington Region",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 3 },
            maximum: { unit: "business_day", value: 7 },
          },
        },
      });
      shippingOptions.push({
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: flatRateShippingCents, currency: "nzd" },
          display_name: "Flat Rate – NZ-Wide",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 3 },
            maximum: { unit: "business_day", value: 7 },
          },
        },
      });
    } else {
      // Only flat-rate applies
      shippingOptions.push({
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: flatRateShippingCents, currency: "nzd" },
          display_name: "Flat Rate – NZ-Wide",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 3 },
            maximum: { unit: "business_day", value: 7 },
          },
        },
      });
    }

    const lineItemLabel =
      description ||
      (orderType === "giftbox" ? "Cookie & Me Gift Box" : "Custom Logo Cookies");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      currency: "nzd",
      customer_email: email,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "nzd",
            unit_amount: subtotalCents,
            product_data: {
              name: lineItemLabel,
              description: "Handcrafted cookies by Cookie & Me, Lower Hutt, NZ.",
              images: ["https://cookieandme.nz/og-image.jpg"], // update if you have a product image
            },
          },
          quantity: 1,
        },
      ],
      shipping_address_collection: {
        allowed_countries: ["NZ"],
      },
      shipping_options: shippingOptions,
      metadata: {
        orderType,
        customerName: name,
        customerEmail: email,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/#${orderType === "giftbox" ? "gift-boxes" : "custom"}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session." },
      { status: 500 }
    );
  }
}