import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      orderType,
      name,
      email,
      phone,
      subject,
      message,
      description,
      subtotal,

      // gift box fields
      packSize,
      theme,
      flavour,
      addCard,
      cardMessage,

      // custom cookie fields
      quantity,
      priceEach,
      colour,
      logoUrl,
      designBrief,
      latestNeededDate,
      companyName,
    } = body;

    // Everything below is visitor-supplied, so escape it before it goes into an HTML email.
    const esc = (value: unknown) =>
      String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

    // Multi-line fields keep their line breaks, but only after escaping.
    const escMultiline = (value: unknown) => esc(value).replace(/\n/g, "<br />");

    const senderEmail = String(email ?? "").trim();
    const validSender = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail);
    // Lets the owner hit Reply and reach the customer instead of the sending address.
    const replyTo = validSender ? senderEmail : undefined;

    if (!name || !validSender) {
      return Response.json({ error: "A name and valid email address are required." }, { status: 400 });
    }

    if (orderType === "contact") {
      const { error } = await resend.emails.send({
        from: "Cookie & Me <orders@cookieandme.nz>",
        to: "cookieandme.nz@gmail.com",
        replyTo,
        subject: `New Cookie & Me enquiry: ${esc(subject)}`,
        html: `
          <h2>New website enquiry</h2>
          <p><strong>Name:</strong> ${esc(name)}</p>
          <p><strong>Email:</strong> ${esc(email)}</p>
          <p><strong>Subject:</strong> ${esc(subject)}</p>
          <p><strong>Message:</strong></p>
          <p>${escMultiline(message)}</p>
        `,
      });
      if (error) {
        console.error("Resend error (contact):", error);
        return Response.json({ error: "Failed to send message." }, { status: 500 });
      }
      return Response.json({ success: true });
    }

    if (orderType === "giftbox") {
      const { error } = await resend.emails.send({
        from: "Cookie & Me <orders@cookieandme.nz>",
        to: "cookieandme.nz@gmail.com",
        replyTo,
        subject: `New Gift Box Order from ${esc(name)}`,
        html: `
          <h2>New Gift Box Order</h2>
          <p><strong>Name:</strong> ${esc(name)}</p>
          <p><strong>Email:</strong> ${esc(email)}</p>
          <p><strong>Phone:</strong> ${esc(phone)}</p>
          <p><strong>Pack Size:</strong> ${esc(packSize)}</p>
          <p><strong>Theme:</strong> ${esc(theme)}</p>
          <p><strong>Flavour:</strong> ${esc(flavour)}</p>
          <p><strong>Add Handwritten Card:</strong> ${addCard ? "Yes" : "No"}</p>
          <p><strong>Card Message:</strong> ${escMultiline(cardMessage) || "None"}</p>
          <p><strong>Description:</strong> ${esc(description)}</p>
          <p><strong>Subtotal:</strong> $${esc(subtotal)}</p>
        `,
      });
      if (error) {
        console.error("Resend error (giftbox):", error);
        return Response.json({ error: "Failed to send message." }, { status: 500 });
      }
      return Response.json({ success: true });
    }

    if (orderType === "custom") {
      const { error } = await resend.emails.send({
        from: "Cookie & Me <orders@cookieandme.nz>",
        to: "cookieandme.nz@gmail.com",
        replyTo,
        subject: `New Custom Cookie Order from ${esc(name)}`,
        html: `
          <h2>New Custom Cookie Order</h2>
          <p><strong>Name:</strong> ${esc(name)}</p>
          <p><strong>Email:</strong> ${esc(email)}</p>
          <p><strong>Phone:</strong> ${esc(phone)}</p>
          <p><strong>Company Name:</strong> ${esc(companyName) || "Not provided"}</p>
          <p><strong>Quantity:</strong> ${esc(quantity)}</p>
          <p><strong>Price Each:</strong> $${esc(priceEach)}</p>
          <p><strong>Flavour:</strong> ${esc(flavour)}</p>
          <p><strong>Fondant Colour:</strong> ${esc(colour)}</p>
          <p><strong>Need By Date:</strong> ${esc(latestNeededDate)}</p>
          <p><strong>Logo File:</strong> ${esc(logoUrl) || "No logo uploaded yet"}</p>
          <p><strong>Design Brief:</strong></p>
          <p>${escMultiline(designBrief) || "None provided"}</p>
          <p><strong>Description:</strong> ${esc(description)}</p>
          <p><strong>Subtotal:</strong> $${esc(subtotal)}</p>
        `,
      });
      if (error) {
        console.error("Resend error (custom):", error);
        return Response.json({ error: "Failed to send message." }, { status: 500 });
      }
      return Response.json({ success: true });
    }

    return Response.json({ error: "Invalid order type" }, { status: 400 });
  } catch (error) {
    console.error("Order route error:", error);
    return Response.json({ error: "Something went wrong sending the email." }, { status: 500 });
  }
}
