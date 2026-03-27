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
      packSize,
      theme,
      flavour,
      addCard,
      cardMessage,
      quantity,
      priceEach,
      colour,
      logoUrl,
      designBrief,
      latestNeededDate,
      companyName,
    } = body;

    if (!orderType || !name || !email || subtotal === undefined || subtotal === null) {
      return NextResponse.json({ error: "Missing required checkout fields." }, { status: 400 });
    }

    const subtotalNumber = Number(subtotal);
    if (Number.isNaN(subtotalNumber) || subtotalNumber <= 0) {
      return NextResponse.json({ error: "Subtotal must be a valid number greater than zero." }, { status: 400 });
    }

    const subtotalCents = Math.round(subtotalNumber * 100);
    const freeShippingThreshold = 11900;

    const shippingOptions: Stripe.Checkout.SessionCreateParams.ShippingOption[] = [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "nzd" },
          display_name: "Free Pickup — Lower Hutt",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 3 },
            maximum: { unit: "business_day", value: 7 },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: subtotalCents >= freeShippingThreshold ? 0 : 1000,
            currency: "nzd",
          },
          display_name: subtotalCents >= freeShippingThreshold
            ? "Free Delivery — Wellington Region"
            : "Delivery — Wellington Region ($10.00)",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 3 },
            maximum: { unit: "business_day", value: 7 },
          },
        },
      },
    ];

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") || "https://cookieandme.nz";

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
      shipping_address_collection: { allowed_countries: ["NZ"] },
      shipping_options: shippingOptions,
      metadata: {
        orderType,
        customerName: String(name),
        customerEmail: String(email),
        customerPhone: String(phone || ""),
        subtotal: String(subtotalNumber),
        description: String(description || ""),
        packSize: String(packSize || ""),
        theme: String(theme || ""),
        flavour: String(flavour || ""),
        addCard: String(addCard || false),
        cardMessage: String(cardMessage || ""),
        quantity: String(quantity || ""),
        priceEach: String(priceEach || ""),
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