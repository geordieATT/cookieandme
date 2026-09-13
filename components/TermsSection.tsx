const h2Style = {
  fontFamily: "'Nunito', sans-serif",
  fontWeight: 900,
  fontSize: "clamp(22px, 3vw, 30px)",
  color: "#0C0E58",
  marginBottom: 16,
  paddingTop: 24,
  // So jumping to #terms or #privacy doesn't leave the heading hidden under the
  // fixed navbar.
  scrollMarginTop: 96,
} as const;

const h3Style = {
  fontFamily: "'Nunito', sans-serif",
  fontWeight: 800,
  fontSize: 17,
  color: "#0C0E58",
  margin: "24px 0 8px",
} as const;

const pStyle = {
  fontFamily: "'Inter', sans-serif",
  fontSize: 15,
  lineHeight: 1.75,
  color: "#444",
  marginBottom: 14,
} as const;

const liStyle = {
  fontFamily: "'Inter', sans-serif",
  fontSize: 15,
  lineHeight: 1.75,
  color: "#444",
  marginBottom: 8,
} as const;

export default function TermsSection() {
  return (
    <section style={{ padding: "64px 0 96px" }}>
      <div className="section-container" style={{ maxWidth: 760, margin: "0 auto" }}>
        <span
          style={{
            color: "#FB3D03",
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            display: "block",
            marginBottom: 10,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Legal
        </span>
        <h1
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(26px, 3.5vw, 38px)",
            color: "#0C0E58",
            marginBottom: 16,
          }}
        >
          Terms &amp; Conditions and Privacy Policy
        </h1>
        <p style={{ ...pStyle, color: "#888", fontSize: 13, marginBottom: 32 }}>
          Last updated 13 September 2026. This page is written in plain English
          for a small home-based cookie business, not by a lawyer. If you need
          this reviewed for a specific legal question, please get independent
          advice.
        </p>

        {/* ------------------------------------------------------------------ */}
        <h2 id="terms" style={h2Style}>
          Terms &amp; Conditions
        </h2>

        <h3 style={h3Style}>1. Orders</h3>
        <p style={pStyle}>
          All custom cookies are made to order once a design brief, flavour,
          quantity and date needed have been confirmed. By placing an order
          through this website, you agree to these terms.
        </p>
        <ul style={{ paddingLeft: 20, marginBottom: 14 }}>
          <li style={liStyle}>Our minimum order is 24 cookies.</li>
          <li style={liStyle}>
            We generally need up to 10 days lead time, depending on order size
            and our current schedule. Get in touch if you need something
            sooner and we will let you know if we can fit it in.
          </li>
          <li style={liStyle}>
            Custom stamp designs, colours and flavours are confirmed with you
            before we begin production.
          </li>
        </ul>

        <h3 style={h3Style}>2. Payment</h3>
        <p style={pStyle}>
          Payment is taken securely through Stripe. We never see or store your
          full card details.
        </p>
        <ul style={{ paddingLeft: 20, marginBottom: 14 }}>
          <li style={liStyle}>
            Orders under 100 cookies require full payment upfront.
          </li>
          <li style={liStyle}>
            Orders of 100 or more cookies require a 50% deposit to secure the
            order, with the remainder due before collection or delivery.
          </li>
        </ul>

        <h3 style={h3Style}>3. Cancellations and changes</h3>
        <p style={pStyle}>
          Because every order is made specifically for you, we cannot offer a
          refund once production has begun. If you need to cancel or change an
          order, contact us as soon as possible and we will do our best to
          accommodate you, but this cannot be guaranteed the closer it gets to
          your collection or delivery date.
        </p>

        <h3 style={h3Style}>4. Faults and issues</h3>
        <p style={pStyle}>
          If something arrives damaged, incorrect, or not as described, please
          contact us within 48 hours with photos where possible. We will
          always try to make it right, whether that is a replacement, partial
          refund, or credit toward a future order.
        </p>

        <h3 style={h3Style}>5. Allergies and dietary requirements</h3>
        <p style={pStyle}>
          Our cookies are baked in a home kitchen that also handles common
          allergens, including gluten, dairy, egg and nuts. We do not
          currently publish a full ingredient list on this site. If you or
          your guests have any allergy or dietary requirement, please contact
          us before ordering so we can talk through what we can and cannot
          accommodate.
        </p>

        <h3 style={h3Style}>6. Collection and delivery</h3>
        <p style={pStyle}>
          Free pickup and delivery is available within Lower Hutt and the
          wider Hutt Valley and Wellington area, arranged directly with you
          after your order is placed. Nationwide courier options may be
          available on request for some products, priced separately.
        </p>

        <h3 style={h3Style}>7. Photos and images</h3>
        <p style={pStyle}>
          With your permission, we may photograph your order (or ask you to
          share a photo) to use on our website, social media or in future
          marketing. Let us know if you would prefer we didn&apos;t.
        </p>

        {/* ------------------------------------------------------------------ */}
        <h2 id="privacy" style={h2Style}>
          Privacy Policy
        </h2>

        <p style={pStyle}>
          This section explains what personal information Cookie &amp; Me
          collects through this website, why, and what we do with it. We are
          a small business based in Lower Hutt, New Zealand, and this policy
          is written with the New Zealand Privacy Act 2020 in mind.
        </p>

        <h3 style={h3Style}>What we collect</h3>
        <p style={pStyle}>Depending on which form you use, we may collect:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 14 }}>
          <li style={liStyle}>Your name, email address and phone number.</li>
          <li style={liStyle}>
            Order details: flavour, quantity, design brief, date needed, and
            (for gift box orders, when available) a delivery address.
          </li>
          <li style={liStyle}>
            The filename of a logo or design file you tell us about. The file
            itself is not uploaded through this site; we ask you to email it
            to us separately.
          </li>
          <li style={liStyle}>
            The content of any message you send us through the contact form.
          </li>
        </ul>
        <p style={pStyle}>
          We never see or store your card number or other full payment
          details. Payment is handled entirely by Stripe.
        </p>

        <h3 style={h3Style}>How we use it</h3>
        <ul style={{ paddingLeft: 20, marginBottom: 14 }}>
          <li style={liStyle}>To prepare, confirm and fulfil your order.</li>
          <li style={liStyle}>
            To send you order confirmation and payment receipt emails.
          </li>
          <li style={liStyle}>To respond to enquiries sent through this site.</li>
          <li style={liStyle}>
            To keep basic records for accounting and tax purposes, as required
            by law.
          </li>
        </ul>
        <p style={pStyle}>
          We do not sell your information to anyone, and we do not use it for
          advertising.
        </p>

        <h3 style={h3Style}>Who we share it with</h3>
        <p style={pStyle}>
          We use a small number of external services to run this website and
          take payment. Each only receives what it needs to do its job:
        </p>
        <ul style={{ paddingLeft: 20, marginBottom: 14 }}>
          <li style={liStyle}>
            <strong>Stripe</strong> — processes payment. See Stripe&apos;s own
            privacy policy for how they handle payment data.
          </li>
          <li style={liStyle}>
            <strong>Resend</strong> — sends order confirmation and enquiry
            emails on our behalf.
          </li>
          <li style={liStyle}>
            <strong>Vercel</strong> — hosts this website, and provides
            aggregate, cookie-free visit analytics (see Cookies below) only if
            you accept them.
          </li>
          <li style={liStyle}>
            Our own internal order-management tools, used only to prepare and
            track your order.
          </li>
        </ul>

        <h3 style={h3Style}>Cookies</h3>
        <p style={pStyle}>
          This site uses one small, essential cookie to remember whether
          you&apos;ve accepted or declined our cookie banner, so we don&apos;t
          ask you again. If you accept, we also enable Vercel&apos;s built-in
          website analytics, which counts visits and page views in aggregate
          and does not use tracking cookies or identify you personally. If you
          decline, that analytics never loads. You can change your choice at
          any time by clearing your browser&apos;s cookies for this site.
        </p>

        <h3 style={h3Style}>How long we keep it</h3>
        <p style={pStyle}>
          We keep order and enquiry information for as long as reasonably
          needed to fulfil your order, answer follow-up questions, and meet
          our accounting and tax record-keeping obligations.
        </p>

        <h3 style={h3Style}>Your rights</h3>
        <p style={pStyle}>
          Under the Privacy Act 2020, you can ask what personal information we
          hold about you, and ask us to correct it if it&apos;s wrong. To do
          either, email{" "}
          <a href="mailto:cookieandme.nz@gmail.com" style={{ color: "#0C0E58", fontWeight: 600 }}>
            cookieandme.nz@gmail.com
          </a>
          .
        </p>

        <h3 style={h3Style}>Questions</h3>
        <p style={{ ...pStyle, marginBottom: 0 }}>
          If anything on this page is unclear, or you have a question about
          your order or your information, contact us at{" "}
          <a href="mailto:cookieandme.nz@gmail.com" style={{ color: "#0C0E58", fontWeight: 600 }}>
            cookieandme.nz@gmail.com
          </a>{" "}
          or{" "}
          <a href="tel:0211757181" style={{ color: "#0C0E58", fontWeight: 600 }}>
            021 175 7181
          </a>
          .
        </p>
      </div>
    </section>
  );
}
