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

    // Metadata is customer-supplied, so escape it before it goes into the HTML emails.
    const esc = (value: unknown) =>
      String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

    const printedNote = meta.addCard === "true" ? String(meta.cardMessage ?? "").trim() : "";
    const printedNoteHtml = printedNote
      ? `<h3>Printed personalised note</h3><p style="white-space:pre-wrap;border-left:3px solid #FB3D03;padding-left:12px;">${esc(printedNote)}</p>`
      : "";

    const collectionLabel =
      meta.fulfillment === "pickup" ? "Pickup from Lower Hutt"
      : meta.fulfillment === "delivery" ? "Delivery in the Hutt Valley"
      : meta.fulfillment === "northIsland" ? "North Island Courier"
      : meta.fulfillment === "southIsland" ? "South Island Courier"
      : (meta.fulfillment ?? "");

    const addressLine = meta.deliveryAddress ?? "";

    const orderDetailsHtml =
      meta.orderType === "giftbox"
        ? `
          <h3>Gift box details</h3>
          <p><strong>Occasion:</strong> ${esc(meta.occasion)}</p>
          <p><strong>Boxes ordered:</strong> ${esc(meta.items)}</p>
          <p><strong>Shipping fee:</strong> $${esc(meta.shippingFee ?? "0")}</p>
          <p><strong>Printed note:</strong> ${printedNote ? "Yes" : "No"}</p>
          ${printedNoteHtml}
        `
        : `
          <h3>Custom cookie details</h3>
          <p><strong>Quantity:</strong> ${esc(meta.quantity)}</p>
          <p><strong>Price each:</strong> ${esc(meta.priceEach)}</p>
          <p><strong>Cookie shape:</strong> ${esc(meta.cookieShape)}</p>
          <p><strong>Colour:</strong> ${esc(meta.colour)}</p>
          <p><strong>Logo URL:</strong> ${esc(meta.logoUrl)}</p>
          <p><strong>Needed by:</strong> ${esc(meta.latestNeededDate)}</p>
          <p><strong>Company name:</strong> ${esc(meta.companyName)}</p>
          <p><strong>Design brief:</strong> ${esc(meta.designBrief)}</p>
        `;

    try {
      const { error: emailError } = await resend.emails.send({
        from: "Cookie & Me <orders@cookieandme.nz>",
        to: "cookieandme.nz@gmail.com",
        subject: `New paid order – ${meta.orderType === "giftbox" ? "Gift Box" : "Custom Cookies"}`,
        html: `
          <h2>New paid order ✅</h2>
          <p><strong>Order type:</strong> ${esc(meta.orderType)}</p>
          <p><strong>Name:</strong> ${esc(meta.customerName)}</p>
          <p><strong>Email:</strong> ${esc(meta.customerEmail)}</p>
          <p><strong>Phone:</strong> ${esc(meta.customerPhone)}</p>
          <p><strong>Amount paid:</strong> $${((session.amount_total ?? 0) / 100).toFixed(2)} NZD</p>
          <p><strong>Collection:</strong> ${esc(collectionLabel)}</p>
          ${addressLine ? `<p><strong>Delivery address:</strong> ${esc(addressLine)}</p>` : ""}

          ${orderDetailsHtml}
        `,
      });
      if (emailError) {
        console.error("Failed to send webhook email:", emailError);
        return new Response("Email send failed", { status: 500 });
      }
    } catch (err) {
      console.error("Failed to send webhook email:", err);
      return new Response("Email send failed", { status: 500 });
    }

    const customerEmail = meta.customerEmail || session.customer_details?.email;
    if (customerEmail) {
      const collectionNote =
        meta.fulfillment === "pickup"
          ? "We'll be in touch soon to arrange a time for you to come by and pick them up."
          : meta.fulfillment === "delivery"
          ? "We'll deliver your order to the address you provided."
          : `Your order will be sent by courier to the address you provided (${collectionLabel}).`;

      try {
        const { error: customerEmailError } = await resend.emails.send({
          from: "Cookie & Me <orders@cookieandme.nz>",
          to: customerEmail,
          subject: "Your Cookie & Me order is confirmed!",
          html: `
            <h2>Thanks for your order, ${esc(meta.customerName)}! 🍪</h2>
            <p>We've received your payment and your order is confirmed.</p>
            <p><strong>Amount paid:</strong> $${((session.amount_total ?? 0) / 100).toFixed(2)} NZD</p>
            <p><strong>Collection:</strong> ${esc(collectionLabel)}</p>
            ${addressLine ? `<p><strong>Delivery address:</strong> ${esc(addressLine)}</p>` : ""}
            <p>${collectionNote}</p>

            ${orderDetailsHtml}

            <p>If you have any questions, just reply to this email.</p>
            <p>Thanks,<br />Cookie &amp; Me</p>
          `,
        });
        if (customerEmailError) {
          console.error("Failed to send customer confirmation email:", customerEmailError);
        }
      } catch (err) {
        console.error("Failed to send customer confirmation email:", err);
      }
    }
  }

  return new Response("ok", { status: 200 });
}