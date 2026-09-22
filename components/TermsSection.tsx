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

// Numbered sub-clauses (4.1, 6.2, etc.), indented under their parent clause.
const subClauseStyle = {
  ...pStyle,
  marginLeft: 20,
} as const;

const linkStyle = { color: "#0C0E58", fontWeight: 600 } as const;

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
          Terms and Conditions and Privacy Policy
        </h1>
        <p style={{ ...pStyle, color: "#888", fontSize: 13, marginBottom: 32 }}>
          Last updated 13 September 2026.
        </p>

        {/* ------------------------------------------------------------------ */}
        <h2 id="terms" style={h2Style}>
          Terms and Conditions
        </h2>

        <h3 style={h3Style}>1. About These Terms</h3>
        <p style={pStyle}>
          Cookie &amp; Me is a brand operated by Linked Futures Partnership
          (Kersti Taylor and Geordie Taylor), a partnership based in Lower
          Hutt, New Zealand (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
          &ldquo;our&rdquo;). These Terms apply to all orders placed through
          our website, by enquiry, or directly with us, whether for retail
          products or custom and corporate cookies (&ldquo;Products&rdquo;).
          By placing an order with us, you agree to these Terms. You must be
          at least 16 years old to place an order, because under New Zealand
          law a contract with someone under 16 may not be enforceable, and we
          need to know that anyone committing to an order (especially a
          custom order involving deposits and delivery dates) is legally able
          to do so.
        </p>

        <h3 style={h3Style}>2. Our Products</h3>
        <p style={pStyle}>
          Our cookies are handmade in a kitchen operating under an MPI
          approved Food Control Plan. Because each cookie is handmade, small
          variations in appearance, size, colour and icing detail are normal
          and aren&apos;t considered faults. Product photos are a true
          representation, but colours may look slightly different depending
          on your screen and the handmade nature of the product.
        </p>

        <h3 style={h3Style}>3. Allergen Information</h3>
        <p style={pStyle}>
          Our kitchen prepares products containing gluten/wheat, dairy, eggs
          and soy. Everything is made in the same kitchen alongside other
          ingredients, so we can&apos;t guarantee any product is completely
          free of any allergen, even where that allergen isn&apos;t listed.
          If you or the person you&apos;re buying for has a food allergy or
          intolerance, please get in touch before ordering so we can talk
          through your options. We can&apos;t accept liability for a reaction
          where we weren&apos;t told about an allergy or intolerance in
          advance.
        </p>

        <h3 style={h3Style}>4. Placing an Order</h3>
        <p style={pStyle}>
          Custom orders (bespoke designs, corporate branding, bulk orders) are
          quoted individually. Get in touch and we&apos;ll work out the
          payment arrangement together, we may ask for a deposit on larger
          orders to confirm your order and lock in a delivery date. We&apos;ll
          confirm the agreed payment arrangement in writing (including by
          email or message), and your order is confirmed once we&apos;ve
          received any agreed payment. Campaign or seasonal drop orders (for
          example Father&apos;s Day, Mother&apos;s Day, Matariki) and one-off
          website orders for non-customised cookies are paid in full at the
          time of ordering. Lead times vary depending on the size and
          complexity of your order and the time of year. We&apos;ll confirm a
          realistic timeframe when you enquire.
        </p>
        <p style={subClauseStyle}>
          <strong>4.1</strong> If you upload a logo, image or design brief
          with your order, you&apos;re confirming that you own it or have
          permission to use it, and giving us permission to reproduce it on
          your cookies. You&apos;re responsible for making sure you have the
          right to use any third-party logo or artwork you send us.
        </p>
        <p style={subClauseStyle}>
          <strong>4.2</strong> Any designs, logos or artwork you provide
          remain yours. We don&apos;t claim ownership of your designs or any
          work we create by adapting them for your cookies.
        </p>

        <h3 style={h3Style}>5. Cancellations and Changes</h3>
        <p style={pStyle}>
          Payments are non-refundable once an order is confirmed, because we
          buy ingredients and packaging and set aside kitchen time
          specifically for your order. That said, things come up, and
          we&apos;ll always look at cancellations case by case. Depending on
          how much notice you give us and how much work has already gone into
          your order, we may offer a full or partial refund, credit, or a
          rescheduled date at our discretion. Cancellations made less than 48
          hours before a confirmed delivery date are unlikely to be eligible
          for any refund. To cancel or change an order, get in touch with us
          as soon as you can.
        </p>

        <h3 style={h3Style}>6. Pricing and Payment</h3>
        <p style={pStyle}>
          All prices are listed in New Zealand dollars (NZD). Cookie &amp; Me
          (Linked Futures Partnership) isn&apos;t currently registered for
          GST.
        </p>
        <p style={subClauseStyle}>
          <strong>6.1 Standard Purchases.</strong> For our standard gift
          boxes, payment is taken in full at checkout when you order online,
          processed securely through Stripe. We do not store your card
          details.
        </p>
        <p style={subClauseStyle}>
          <strong>6.2 Custom and Large Orders.</strong> Get in touch with us
          directly on{" "}
          <a href="tel:0211757181" style={linkStyle}>
            021 175 7181
          </a>{" "}
          or{" "}
          <a href="mailto:cookieandme.nz@gmail.com" style={linkStyle}>
            cookieandme.nz@gmail.com
          </a>{" "}
          to arrange quote and payment terms for custom or large orders.
          Payment can also be made by direct bank transfer or via invoice.
        </p>

        <h3 style={h3Style}>7. Delivery, Pickup and Shipping</h3>
        <p style={pStyle}>
          Free delivery and pickup is available within the Hutt Valley and
          wider Wellington region. Outside this area, delivery is arranged
          and charged via courier, including nationwide within New Zealand
          and to Australia on request. Delivery timeframes given by couriers
          are estimates only, and are outside our control once an order has
          left our kitchen. Risk in the products, including any damage in
          transit, passes to you once the order leaves our kitchen, whether
          that&apos;s when you or your courier collect it, or when we hand it
          to a third-party courier for delivery. This means that if a courier
          damages your order in transit, any claim would be between you and
          the courier, not with us.
        </p>

        <h3 style={h3Style}>8. Taking Products Overseas</h3>
        <p style={pStyle}>
          We&apos;re based in New Zealand and our products are made to comply
          with New Zealand food safety and labelling law only. If you choose
          to take cookies overseas or give them to someone in another
          country, that&apos;s at your own discretion and risk, the same as
          with anything bought from a New Zealand bakery. We don&apos;t sell
          products for resale or commercial redistribution overseas, and we
          accept no responsibility for compliance with any other
          country&apos;s laws.
        </p>

        <h3 style={h3Style}>9. Photos and Marketing</h3>
        <p style={pStyle}>
          We love sharing our work. Unless you tell us otherwise, we may
          photograph completed orders (including corporate branding or custom
          designs) and use these images on our website, social media and
          marketing materials. If you&apos;d rather we didn&apos;t use photos
          of your order, for example for confidentiality reasons, just let us
          know when you place your order and we&apos;ll respect that.
          We&apos;re also happy to discuss any specific requirements around
          timing or usage.
        </p>

        <h3 style={h3Style}>10. Things Outside Our Control</h3>
        <p style={pStyle}>
          If something outside our control prevents us from fulfilling your
          order, whether that&apos;s equipment failure, a supplier shortage,
          illness, or a natural disaster, we&apos;ll let you know as soon as
          possible and offer you a full refund or a rescheduled date.
        </p>

        <h3 style={h3Style}>11. Consumer Guarantees</h3>
        <p style={pStyle}>
          For products bought for personal, domestic or household use,
          nothing in these Terms limits your rights under the Consumer
          Guarantees Act 1993 or the Fair Trading Act 1986. For products
          bought for business purposes, the parties agree that the Consumer
          Guarantees Act 1993 does not apply, to the extent permitted by
          section 43(2) of that Act. If you are purchasing on behalf of a
          business, we will make this exclusion clear in your quote or
          invoice.
        </p>

        <h3 style={h3Style}>12. Liability</h3>
        <p style={pStyle}>
          To the maximum extent the law allows, our liability for any claim
          relating to your order is limited to the value of that order.
          We&apos;re not liable for any indirect or consequential loss,
          including loss of profits or loss of opportunity (for example, an
          event affected by a delayed or damaged delivery), except where this
          can&apos;t be excluded by law.
        </p>

        <h3 style={h3Style}>13. Resolving Problems</h3>
        <p style={pStyle}>
          If something goes wrong with your order, please get in touch with
          us first. We&apos;ll always try to sort things out directly with
          you. If we can&apos;t reach a resolution, either party can refer
          the matter to the Disputes Tribunal or the New Zealand courts.
        </p>

        <h3 style={h3Style}>14. Privacy</h3>
        <p style={pStyle}>
          We collect and use your personal information in line with our
          Privacy Policy below.
        </p>

        <h3 style={h3Style}>15. Governing Law</h3>
        <p style={pStyle}>These Terms are governed by New Zealand law.</p>

        <h3 style={h3Style}>16. Contact Us</h3>
        <p style={{ ...pStyle, marginBottom: 0 }}>
          Cookie &amp; Me (Linked Futures Partnership), Lower Hutt, New
          Zealand.{" "}
          <a href="mailto:cookieandme.nz@gmail.com" style={linkStyle}>
            cookieandme.nz@gmail.com
          </a>{" "}
          /{" "}
          <a href="tel:0211757181" style={linkStyle}>
            021 175 7181
          </a>{" "}
          /{" "}
          <a href="https://cookieandme.nz" style={linkStyle}>
            cookieandme.nz
          </a>
        </p>

        {/* ------------------------------------------------------------------ */}
        <h2 id="privacy" style={h2Style}>
          Privacy Policy
        </h2>

        <p style={pStyle}>
          This policy explains how Cookie &amp; Me, a brand of Linked Futures
          Partnership (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
          &ldquo;our&rdquo;), collects, holds, uses and discloses personal
          information in line with the Privacy Act 2020 (NZ).
        </p>

        <h3 style={h3Style}>1. What We Collect</h3>
        <ul style={{ paddingLeft: 20, marginBottom: 14 }}>
          <li style={liStyle}>
            Contact details you give us when ordering or enquiring: name,
            email, phone, delivery address
          </li>
          <li style={liStyle}>
            Order details: products, customisation, uploaded artwork,
            delivery instructions
          </li>
          <li style={liStyle}>
            Payment information processed via Stripe (we don&apos;t see or
            store your full card details)
          </li>
        </ul>

        <h3 style={h3Style}>2. How We Use It</h3>
        <ul style={{ paddingLeft: 20, marginBottom: 14 }}>
          <li style={liStyle}>To process and deliver your order</li>
          <li style={liStyle}>
            To communicate with you about your order, quote or enquiry
          </li>
          <li style={liStyle}>
            To let past campaign customers know about upcoming campaigns and
            promotions. We currently do this through our social media
            (Instagram and Facebook), not by email
          </li>
          <li style={liStyle}>To meet our legal and accounting obligations</li>
        </ul>

        <h3 style={h3Style}>3. Website Analytics and Advertising</h3>
        <p style={pStyle}>
          Our website uses cookies and similar tracking tools, including
          Vercel analytics and the Meta Pixel, to understand how visitors use
          our site (such as pages visited and device or browser information)
          and to run and measure our advertising. This may involve your data
          being processed on servers outside New Zealand, including by Google
          and Meta through their analytics and advertising tools. When you
          first visit our site, our cookie consent banner will ask for your
          consent before any non-essential tracking is activated. You can
          change your preferences or withdraw consent at any time through the
          banner or your browser settings. If you&apos;re visiting from
          outside New Zealand, including from the European Union or United
          Kingdom, the same consent process applies.
        </p>

        <h3 style={h3Style}>4. Sharing Your Information</h3>
        <p style={pStyle}>
          We don&apos;t sell your personal information. We only share it
          with:
        </p>
        <ul style={{ paddingLeft: 20, marginBottom: 14 }}>
          <li style={liStyle}>Stripe, to process payments securely</li>
          <li style={liStyle}>Couriers, to deliver your order</li>
          <li style={liStyle}>
            Google and Meta, as described above under Website Analytics and
            Advertising
          </li>
          <li style={liStyle}>Any other party where required by law</li>
        </ul>

        <h3 style={h3Style}>5. Storage and Security</h3>
        <p style={pStyle}>
          We take reasonable steps to keep your information secure. We
          generally keep order records for seven years to meet our tax
          obligations. Contact details for enquiries that don&apos;t lead to
          an order are deleted within 12 months. Beyond that, we only keep
          information for as long as necessary for the purposes above or as
          required by law.
        </p>

        <h3 style={h3Style}>6. Your Rights</h3>
        <p style={pStyle}>
          Under the Privacy Act 2020, you have the right to access and
          request correction of the personal information we hold about you.
          To do this, contact us at{" "}
          <a href="mailto:cookieandme.nz@gmail.com" style={linkStyle}>
            cookieandme.nz@gmail.com
          </a>
          .
        </p>

        <h3 style={h3Style}>7. Changes to This Policy</h3>
        <p style={{ ...pStyle, marginBottom: 0 }}>
          We may update this policy from time to time. The latest version
          will always be available on our website.
        </p>
      </div>
    </section>
  );
}
