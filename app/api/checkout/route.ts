import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-02-25.clover",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      orderType,
      name,
      email,
      phone,
      subtotal,
      description,
      fulfillment,
      items,
      occasion,
      address,
      postcode,
      theme,
      flavour,
      addCard,
      cardMessage,
      quantity,
      priceEach,
      cookieShape,
      colour,
      logoUrl,
      designBrief,
      latestNeededDate,
      companyName,
    } = body;

    type FulfillmentType = "pickup" | "delivery" | "northIsland" | "southIsland";
    const fulfillmentType: FulfillmentType = ["delivery", "northIsland", "southIsland"].includes(fulfillment)
      ? fulfillment
      : "pickup";

    const COURIER_RATES: Record<string, number> = {
      northIsland: 8.5,
      southIsland: 12.5,
    };
    const COURIER_LABELS: Record<string, string> = {
      northIsland: "North Island Courier",
      southIsland: "South Island Courier",
    };

    // The address is collected in our own form, so Stripe does not ask for it again.
    const formattedAddress = [address, postcode]
      .filter((part: unknown): part is string => typeof part === "string" && part.trim() !== "")
      .map((part) => part.trim())
      .join(", ")
      .slice(0, 500);

    if (fulfillmentType !== "pickup" && (!String(address ?? "").trim() || !String(postcode ?? "").trim())) {
      return NextResponse.json({ error: "A delivery address and postcode are required for this delivery method." }, { status: 400 });
    }

    // Mirrors the 250-character limit enforced in the order form.
    const printedNote = String(cardMessage ?? "").trim().slice(0, 250);
    const wantsPrintedNote = Boolean(addCard) && printedNote !== "";

    if (!orderType || !name || !email) {
      return NextResponse.json({ error: "Missing required checkout fields." }, { status: 400 });
    }

    // Gift box pricing is authoritative here: the cart's totals are recomputed from these
    // rather than trusted from the request body.
    const PACK_PRICES: Record<number, number> = { 6: 20, 12: 38 };
    const MAX_QTY_PER_LINE = 20;

    let subtotalNumber: number;
    let itemsSummary = "";

    if (orderType === "giftbox") {
      if (!Array.isArray(items) || items.length === 0) {
        return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
      }

      let computed = 0;
      const seen = new Set<number>();
      const parts: string[] = [];

      for (const item of items) {
        const size = Number(item?.packSize);
        const qty = Number(item?.qty);
        const price = PACK_PRICES[size];

        if (!price) {
          return NextResponse.json({ error: "That pack size isn't available." }, { status: 400 });
        }
        if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY_PER_LINE) {
          return NextResponse.json({ error: "Please choose a quantity between 1 and 20 per pack size." }, { status: 400 });
        }
        if (seen.has(size)) {
          return NextResponse.json({ error: "Each pack size can only appear once in the cart." }, { status: 400 });
        }
        seen.add(size);

        computed += price * qty;
        parts.push(`${qty} × ${size} Pack`);
      }

      subtotalNumber = computed;
      itemsSummary = parts.join(", ");
    } else {
      subtotalNumber = Number(subtotal);
      if (Number.isNaN(subtotalNumber) || subtotalNumber <= 0) {
        return NextResponse.json({ error: "Subtotal must be a valid number greater than zero." }, { status: 400 });
      }
    }

    const subtotalCents = Math.round(subtotalNumber * 100);

    let shippingOptions: Stripe.Checkout.SessionCreateParams.ShippingOption[];

    if (fulfillmentType in COURIER_RATES) {
      const shippingFeeCents = Math.round(COURIER_RATES[fulfillmentType] * 100);
      shippingOptions = [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: shippingFeeCents, currency: "nzd" },
            display_name: COURIER_LABELS[fulfillmentType],
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 5 },
            },
          },
        },
      ];
    } else {
      shippingOptions = [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "nzd" },
            display_name: fulfillmentType === "pickup"
              ? "Free Pickup — Lower Hutt"
              : "Free Delivery — Hutt Valley",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
      ];
    }

    const serverShippingFee = fulfillmentType in COURIER_RATES ? COURIER_RATES[fulfillmentType] : 0;

    // Send the customer back to the site they actually came from, so local testing returns to
    // localhost rather than production. Only localhost is trusted from the Origin header —
    // anything else falls back to the configured URL so this can't become an open redirect.
    const configuredBaseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") || "https://cookieandme.nz";
    const requestOrigin = req.headers.get("origin") ?? "";
    const isLocalOrigin = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(requestOrigin);
    const baseUrl = isLocalOrigin ? requestOrigin : configuredBaseUrl;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "nzd",
            unit_amount: subtotalCents,
            product_data: {
              name: description || "Cookie and Me Order",
              description: "Handcrafted cookies by Cookie and Me, Lower Hutt, NZ.",
            },
          },
          quantity: 1,
        },
      ],
      shipping_options: shippingOptions,
      metadata: {
        fulfillment: fulfillmentType,
        orderType,
        customerName: String(name),
        customerEmail: String(email),
        customerPhone: String(phone || ""),
        deliveryAddress: formattedAddress,
        subtotal: String(subtotalNumber),
        description: String(description || ""),
        items: itemsSummary,
        occasion: String(occasion || ""),
        shippingFee: String(serverShippingFee),
        theme: String(theme || ""),
        flavour: String(flavour || ""),
        addCard: String(wantsPrintedNote),
        cardMessage: printedNote,
        quantity: String(quantity || ""),
        priceEach: String(priceEach || ""),
        cookieShape: String(cookieShape || ""),
        colour: String(colour || ""),
        logoUrl: String(logoUrl || ""),
        designBrief: String(designBrief || ""),
        latestNeededDate: String(latestNeededDate || ""),
        companyName: String(companyName || ""),
      },
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/`,
    });

    if (!session.url) {
      return NextResponse.json({ error: "Stripe session created but no URL returned." }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout session." }, { status: 500 });
  }
}