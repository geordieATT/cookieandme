import Image from "next/image";
import Link from "next/link";
import { christmasDiscountAvailable } from "@/lib/customOrderPricing";

// Small line above each "How you can order" card title.
const cardNote: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: 14,
  fontWeight: 500,
  color: "var(--accent-text)",
};

const body: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: 17,
  color: "var(--text)",
  lineHeight: 1.65,
};

const sectionHeading: React.CSSProperties = {
  color: "var(--ink)",
  marginBottom: 16,
};

const ways = (discountOpen: boolean) => [
  {
    eyebrow: discountOpen ? "10% off until 30 October" : "Ready-made designs",
    title: "Christmas templates",
    copy:
      "Pick one of our ready-made Christmas designs and we add your logo. The quickest way to get festive cookies sorted for the whole team.",
  },
  {
    eyebrow: "Standard pricing",
    title: "Fully custom",
    copy:
      "Want something of your own? We are happy to work with you on a design from scratch, made to match your brand or event.",
  },
  {
    eyebrow: "No obligation",
    title: "Free design mockup",
    copy:
      "Not sure how your logo will look? Send it through and we will make you a free mockup so you can see it on a cookie before you decide.",
  },
];

const packSizes = [
  { label: "Boxes of 24", icon: "box" },
  { label: "Boxes of 12", icon: "box" },
  { label: "Boxes of 6", icon: "box" },
  { label: "Packs of 2", icon: "bag" },
] as const;

function PackIcon({ type }: { type: "box" | "bag" }) {
  return type === "box" ? (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="8" width="18" height="13" rx="1" />
      <path d="M2 8h20M12 8v13M12 8c-1.5-3-5-4-5-1.5S10 8 12 8zM12 8c1.5-3 5-4 5-1.5S14 8 12 8z" />
    </svg>
  ) : (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 6h14l-1 15H6L5 6z" />
      <path d="M5 6l2-3h10l2 3M9 10h6" />
    </svg>
  );
}

export default function EndOfYearSection() {
  // Same cutoff checkout uses; the page regenerates hourly (see page.tsx), so
  // the 10% wording disappears on its own once the discount window closes.
  const discountOpen = christmasDiscountAvailable();
  return (
    <>
      {/* Intro */}
      <section style={{ padding: "80px 0 96px" }}>
        <div className="section-container">
          <div className="two-col">
            <div>
              <h1 style={{ marginBottom: 20 }}>
                Christmas and end-of-year events
              </h1>
              <p style={{ ...body, marginBottom: 16, maxWidth: 520 }}>
                With awards nights, Christmas parties and staff dinners all
                landing in December, our calendar fills up fast. We are taking
                bookings now so we can fit everyone in.
              </p>

              {discountOpen && (
                <p style={{ ...body, marginBottom: 16, maxWidth: 520 }}>
                  Choose one of our Christmas templates and confirm your order
                  by 30 October to get{" "}
                  <strong style={{ color: "var(--accent-text)" }}>10% off</strong>.
                </p>
              )}
              <div className="hero-actions" style={{ marginTop: 32 }}>
                <Link href="/order" className="btn-red hero-cta">
                  Place an order
                </Link>
                <Link href="/contact" className="text-link">
                  Get in touch
                </Link>
              </div>
            </div>

            <div className="eoy-photo eoy-photo-portrait">
              <Image
                src="/images/christmas-templates-meri-kirihimete.jpg"
                alt="Red, green and white Christmas template cookies stamped with Your Logo, Meri Kirihimete and Merry Christmas designs"
                fill
                priority
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Ways to order */}
      <section style={{ padding: "96px 0", backgroundColor: "var(--tint)" }}>
        <div className="section-container">
          <h2 style={{ ...sectionHeading, textAlign: "center", marginBottom: 40 }}>
            How you can order
          </h2>

          <div className="three-col">
            {ways(discountOpen).map((way) => (
              <div
                key={way.title}
                style={{
                  backgroundColor: "var(--bg)",
                  border: "1px solid var(--line)",
                  borderRadius: 2,
                  padding: "28px 26px 30px",
                }}
              >
                <span style={cardNote}>{way.eyebrow}</span>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontWeight: 500,
                    fontSize: 22,
                    color: "var(--ink)",
                    margin: "8px 0 10px",
                  }}
                >
                  {way.title}
                </h3>
                <p style={{ ...body, fontSize: 17, color: "var(--text-muted)", margin: 0 }}>
                  {way.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packing options */}
      <section style={{ padding: "96px 0" }}>
        <div className="section-container">
          <div className="two-col">
            <div className="eoy-photo eoy-photo-square">
              <Image
                src="/images/christmas-pack-sizes-red-cloth-holly-v2.jpg"
                alt="Christmas gift boxes in three sizes and a pack of 2 with red ribbon, on red cloth with holly"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div>
              <h2 style={{ ...sectionHeading, marginBottom: 16 }}>
                Split into smaller gift boxes
              </h2>
              <p style={{ ...body, marginBottom: 28 }}>
                For a small fee, we can split your order into smaller boxes or
                packs, great for handing out to staff or sending to clients.
              </p>

              <ul className="pack-sizes">
                {packSizes.map((size) => (
                  <li key={size.label} className="pack-size">
                    <PackIcon type={size.icon} />
                    <span>{size.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 0", backgroundColor: "var(--tint)" }}>
        <div className="section-container" style={{ textAlign: "center" }}>
          <h2
            style={{
              color: "var(--ink)",
              marginBottom: 12,
            }}
          >
            Got an end-of-year event coming up?
          </h2>
          <p
            style={{
              ...body,
              color: "var(--text-muted)",
              maxWidth: 480,
              margin: "0 auto 28px",
            }}
          >
            Get your order in early and we will make sure your cookies are
            ready in time.
          </p>
          <div className="hero-actions" style={{ justifyContent: "center" }}>
            <Link href="/order" className="btn-red hero-cta">
              Place an order
            </Link>
            <Link href="/contact" className="text-link">
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
