import { headers } from "next/headers";
import Stripe from "stripe";
import { Resend } from "resend";
import { recordOrderInKitchenApp } from "@/lib/kitchenApp";

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

    // The checkout route already resolved this into readable text.
    const collectionLabel = meta.shippingLabel || meta.fulfillment || "";
    const shippingBreakdown = meta.shippingBreakdown || "";
    const isCollectionPoint = meta.collectionPoint === "true";

    const addressLine = meta.deliveryAddress ?? "";

    const orderDetailsHtml =
      meta.orderType === "giftbox"
        ? `
          <h3>Gift box details</h3>
          <p><strong>Occasion:</strong> ${esc(meta.occasion)}</p>
          <p><strong>Boxes ordered:</strong> ${esc(meta.items)}</p>
          <p><strong>Shipping fee:</strong> $${esc(meta.shippingFee ?? "0")}</p>
          ${shippingBreakdown ? `<p><strong>Shipping breakdown:</strong> ${esc(shippingBreakdown)}</p>` : ""}
          ${isCollectionPoint ? `<p><strong>⚠ Send to an NZ Post collection point, not the door.</strong></p>` : ""}
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
        // Replying to the order notification should reach the customer.
        replyTo: meta.customerEmail || session.customer_details?.email || undefined,
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
          : isCollectionPoint
          ? "We'll send your order to the NZ Post collection point you chose. Remember to bring photo ID when you pick it up."
          : `Your order will be sent by NZ Post to the address you provided (${collectionLabel}).`;

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

    // Push gift box orders into the kitchen app so they show up alongside everything
    // else. Deliberately last: the emails have already gone out, so a problem here can
    // never cost the customer their confirmation.
    if (meta.orderType === "giftbox") {
      try {
        // "2 × 6 Pack, 1 × 12 Pack" -> [{ qty: 2, packSize: 6 }, { qty: 1, packSize: 12 }]
        const packs = [...String(meta.items ?? "").matchAll(/(\d+)\s*×\s*(\d+)\s*Pack/g)].map(
          (m) => ({ qty: Number(m[1]), packSize: Number(m[2]) })
        );

        const result = await recordOrderInKitchenApp({
          stripeSessionId: session.id,
          name: String(meta.customerName ?? ""),
          email: String(customerEmail ?? ""),
          phone: String(meta.customerPhone ?? ""),
          address: addressLine ? String(addressLine) : null,
          occasion: String(meta.occasion ?? ""),
          items: String(meta.items ?? ""),
          packs,
          flavour: meta.flavour ? String(meta.flavour) : null,
          deliveryMethod: String(meta.fulfillment ?? ""),
          deliveryLabel: String(collectionLabel),
          toCollectionPoint: isCollectionPoint,
          shippingFee: Number(meta.shippingFee ?? 0),
          amountPaid: (session.amount_total ?? 0) / 100,
          cardMessage: printedNote || null,
        });
        console.log(`Kitchen app sync for ${session.id}: ${result}`);
      } catch (err) {
        // A paid order that never reaches the kitchen app would otherwise be invisible,
        // so turn the failure into an email rather than only a server log.
        console.error("Failed to record order in kitchen app:", err);
        try {
          await resend.emails.send({
            from: "Cookie & Me <orders@cookieandme.nz>",
            to: "cookieandme.nz@gmail.com",
            subject: "Action needed: paid order did not reach the kitchen app",
            html: `
              <h2>Add this order to the kitchen app manually</h2>
              <p>The payment succeeded and the customer has been confirmed, but writing
              the order into the kitchen app failed, so it will not appear there.</p>
              <p><strong>Customer:</strong> ${esc(meta.customerName)}</p>
              <p><strong>Boxes:</strong> ${esc(meta.items)}</p>
              <p><strong>Occasion:</strong> ${esc(meta.occasion)}</p>
              <p><strong>Stripe session:</strong> ${esc(session.id)}</p>
              <p><strong>Error:</strong> ${esc(err instanceof Error ? err.message : String(err))}</p>
            `,
          });
        } catch (alertErr) {
          console.error("Failed to send kitchen app failure alert:", alertErr);
        }
      }
    }
  }

  return new Response("ok", { status: 200 });
}