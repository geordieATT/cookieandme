import { headers } from "next/headers";
import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");

  if (!sig) {
    return new Response("Missing Stripe signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new Response("Webhook Error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status !== "paid") {
      return new Response("ok", { status: 200 });
    }

    const meta = session.metadata ?? {};

    try {
      await resend.emails.send({
        from: "Cookie & Me <orders@cookieandme.nz>",
        to: "cookieandme.nz@gmail.com",
        subject: `New paid order – ${meta.orderType === "giftbox" ? "Gift Box" : "Custom Cookies"}`,
        html: `
          <h2>New paid order ✅</h2>
          <p><strong>Order type:</strong> ${meta.orderType ?? ""}</p>
          <p><strong>Name:</strong> ${meta.customerName ?? ""}</p>
          <p><strong>Email:</strong> ${meta.customerEmail ?? ""}</p>
          <p><strong>Phone:</strong> ${meta.customerPhone ?? ""}</p>
          <p><strong>Amount paid:</strong> $${((session.amount_total ?? 0) / 100).toFixed(2)} NZD</p>

          ${
            meta.orderType === "giftbox"
              ? `
                <h3>Gift box details</h3>
                <p><strong>Pack size:</strong> ${meta.packSize ?? ""}</p>
                <p><strong>Theme:</strong> ${meta.theme ?? ""}</p>
                <p><strong>Flavour:</strong> ${meta.flavour ?? ""}</p>
                <p><strong>Add card:</strong> ${meta.addCard ?? ""}</p>
                <p><strong>Card message:</strong> ${meta.cardMessage ?? ""}</p>
                <p><strong>Date needed by:</strong> ${meta.latestNeededDate ?? ""}</p>
              `
              : `
                <h3>Custom cookie details</h3>
                <p><strong>Quantity:</strong> ${meta.quantity ?? ""}</p>
                <p><strong>Price each:</strong> ${meta.priceEach ?? ""}</p>
                <p><strong>Colour:</strong> ${meta.colour ?? ""}</p>
                <p><strong>Logo URL:</strong> ${meta.logoUrl ?? ""}</p>
                <p><strong>Needed by:</strong> ${meta.latestNeededDate ?? ""}</p>
                <p><strong>Company name:</strong> ${meta.companyName ?? ""}</p>
                <p><strong>Design brief:</strong> ${meta.designBrief ?? ""}</p>
              `
          }
        `,
      });
    } catch (err) {
      console.error("Failed to send webhook email:", err);
      return new Response("Email send failed", { status: 500 });
    }
  }

  return new Response("ok", { status: 200 });
}