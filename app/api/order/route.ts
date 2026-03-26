import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      orderType, // "giftbox" | "custom"
      // Gift box fields
      packSize,
      // Custom cookie fields
      quantity,
      priceEach,
      colour,
      logoUrl,
      designBrief,
      companyName,
      // Shared fields
      flavour,
      name,
      email,
      phone,
      subtotal,
    } = body;

    if (!name || !email || !phone || !orderType) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    let subject = "";
    let htmlBody = "";

    if (orderType === "giftbox") {
      subject = `🍪 New Gift Box Order – ${packSize} Pack – ${name}`;
      htmlBody = `
        <h2 style="font-family:sans-serif;color:#00205B;">New Gift Box Order</h2>
        <table style="font-family:sans-serif;font-size:15px;border-collapse:collapse;width:100%;max-width:500px;">
          <tr><td style="padding:6px 12px;font-weight:bold;">Customer</td><td style="padding:6px 12px;">${name}</td></tr>
          <tr style="background:#f7f5f0;"><td style="padding:6px 12px;font-weight:bold;">Email</td><td style="padding:6px 12px;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Phone</td><td style="padding:6px 12px;">${phone}</td></tr>
          <tr style="background:#f7f5f0;"><td style="padding:6px 12px;font-weight:bold;">Pack Size</td><td style="padding:6px 12px;">${packSize} Pack</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Flavour</td><td style="padding:6px 12px;">${flavour}</td></tr>
          <tr style="background:#f7f5f0;"><td style="padding:6px 12px;font-weight:bold;">Subtotal</td><td style="padding:6px 12px;font-weight:bold;color:#C04B2B;">$${Number(subtotal).toFixed(2)} NZD</td></tr>
        </table>
        <p style="font-family:sans-serif;font-size:13px;color:#888;margin-top:24px;">Shipping will be calculated at checkout via Stripe.</p>
      `;
    } else if (orderType === "custom") {
      subject = `🍪 New Custom Cookie Order – Qty ${quantity} – ${name}`;
      htmlBody = `
        <h2 style="font-family:sans-serif;color:#00205B;">New Custom Cookie Order</h2>
        <table style="font-family:sans-serif;font-size:15px;border-collapse:collapse;width:100%;max-width:500px;">
          <tr><td style="padding:6px 12px;font-weight:bold;">Customer</td><td style="padding:6px 12px;">${name}</td></tr>
          <tr style="background:#f7f5f0;"><td style="padding:6px 12px;font-weight:bold;">Email</td><td style="padding:6px 12px;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Phone</td><td style="padding:6px 12px;">${phone}</td></tr>
          ${companyName ? `<tr style="background:#f7f5f0;"><td style="padding:6px 12px;font-weight:bold;">Company</td><td style="padding:6px 12px;">${companyName}</td></tr>` : ""}
          <tr><td style="padding:6px 12px;font-weight:bold;">Quantity</td><td style="padding:6px 12px;">${quantity}</td></tr>
          <tr style="background:#f7f5f0;"><td style="padding:6px 12px;font-weight:bold;">Price Each</td><td style="padding:6px 12px;">$${Number(priceEach).toFixed(2)}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Flavour</td><td style="padding:6px 12px;">${flavour}</td></tr>
          <tr style="background:#f7f5f0;"><td style="padding:6px 12px;font-weight:bold;">Fondant Colour</td><td style="padding:6px 12px;">
            <span style="display:inline-block;width:16px;height:16px;background:${colour};border:1px solid #ccc;border-radius:3px;vertical-align:middle;margin-right:6px;"></span>
            ${colour}
          </td></tr>
          ${logoUrl ? `<tr><td style="padding:6px 12px;font-weight:bold;">Logo File</td><td style="padding:6px 12px;"><a href="${logoUrl}">${logoUrl}</a></td></tr>` : ""}
          ${designBrief ? `<tr style="background:#f7f5f0;"><td style="padding:6px 12px;font-weight:bold;vertical-align:top;">Design Brief</td><td style="padding:6px 12px;">${designBrief.replace(/\n/g, "<br/>")}</td></tr>` : ""}
          <tr><td style="padding:6px 12px;font-weight:bold;">Subtotal</td><td style="padding:6px 12px;font-weight:bold;color:#C04B2B;">$${Number(subtotal).toFixed(2)} NZD</td></tr>
        </table>
        <p style="font-family:sans-serif;font-size:13px;color:#888;margin-top:24px;">Shipping will be calculated at checkout via Stripe.</p>
      `;
    } else {
      return NextResponse.json({ error: "Invalid order type." }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: "Cookie & Me Orders <orders@cookieandme.nz>",
      to: ["cookieandme.nz@gmail.com"],
      replyTo: email,
      subject,
      html: htmlBody,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send notification email." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Order route error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}