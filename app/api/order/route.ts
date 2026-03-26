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

    if (orderType === "contact") {
      await resend.emails.send({
        from: "orders@cookieandme.nz",
        to: "cookieandme.nz@gmail.com",
        subject: `New Cookie & Me enquiry: ${subject}`,
        html: `
          <h2>New website enquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message?.replace(/\n/g, "<br />")}</p>
        `,
      });

      return Response.json({ success: true });
    }

    if (orderType === "giftbox") {
      await resend.emails.send({
        from: "orders@cookieandme.nz",
        to: "cookieandme.nz@gmail.com",
        subject: `New Gift Box Order from ${name}`,
        html: `
          <h2>New Gift Box Order</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Pack Size:</strong> ${packSize}</p>
          <p><strong>Theme:</strong> ${theme}</p>
          <p><strong>Flavour:</strong> ${flavour}</p>
          <p><strong>Add Handwritten Card:</strong> ${addCard ? "Yes" : "No"}</p>
          <p><strong>Card Message:</strong> ${cardMessage || "None"}</p>
          <p><strong>Description:</strong> ${description}</p>
          <p><strong>Subtotal:</strong> $${subtotal}</p>
        `,
      });

      return Response.json({ success: true });
    }

    if (orderType === "custom") {
      await resend.emails.send({
        from: "orders@cookieandme.nz",
        to: "cookieandme.nz@gmail.com",
        subject: `New Custom Cookie Order from ${name}`,
        html: `
          <h2>New Custom Cookie Order</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Company Name:</strong> ${companyName || "Not provided"}</p>
          <p><strong>Quantity:</strong> ${quantity}</p>
          <p><strong>Price Each:</strong> $${priceEach}</p>
          <p><strong>Flavour:</strong> ${flavour}</p>
          <p><strong>Fondant Colour:</strong> ${colour}</p>
          <p><strong>Need By Date:</strong> ${latestNeededDate}</p>
          <p><strong>Logo File:</strong> ${logoUrl || "No logo uploaded yet"}</p>
          <p><strong>Design Brief:</strong></p>
          <p>${designBrief ? designBrief.replace(/\n/g, "<br />") : "None provided"}</p>
          <p><strong>Description:</strong> ${description}</p>
          <p><strong>Subtotal:</strong> $${subtotal}</p>
        `,
      });

      return Response.json({ success: true });
    }

    return Response.json({ error: "Invalid order type" }, { status: 400 });
  } catch (error) {
    console.error("Order route error:", error);
    return Response.json({ error: "Something went wrong sending the email." }, { status: 500 });
  }
}