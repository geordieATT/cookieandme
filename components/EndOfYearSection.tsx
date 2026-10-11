import Image from "next/image";
import Link from "next/link";

const eyebrow: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
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

const ways = [
  {
    eyebrow: "10% off until 30 October",
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
  return (
    <>
      {/* Intro */}
      <section style={{ padding: "80px 0 96px" }}>
        <div className="section-container">
          <div className="two-col">
            <div>
              <span style={eyebrow}>Christmas 2026</span>
              <h1
                style={{
                  color: "var(--ink)",
                  margin: "10px 0 20px",
                }}
              >
                Christmas and end-of-year events
              </h1>
              <p style={{ ...body, marginBottom: 16, maxWidth: 520 }}>
                With awards nights, Christmas parties and staff dinners all
                landing in December, our calendar fills up fast. We are taking
                bookings now so we can fit everyone in.
              </p>

              <p style={{ ...body, marginBottom: 32, maxWidth: 520 }}>
                Choose one of our Christmas templates and confirm your order by
                30 October to get{" "}
                <strong style={{ color: "var(--accent-text)" }}>10% off</strong>.
              </p>

              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <Link href="/order" className="btn-red hero-cta">
                  Place an Order
                </Link>
                <Link href="/contact" className="btn-navy hero-cta">
                  Get in Touch
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
            {ways.map((way) => (
              <div
                key={way.title}
                style={{
                  backgroundColor: "var(--bg)",
                  border: "1px solid var(--line)",
                  borderRadius: 2,
                  padding: "28px 26px 30px",
                }}
              >
                <span style={{ ...eyebrow, fontSize: 11 }}>{way.eyebrow}</span>
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
              <span style={eyebrow}>Packing options</span>
              <h2 style={{ ...sectionHeading, margin: "10px 0 16px" }}>
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
          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link href="/order" className="btn-red hero-cta">
              Place an Order
            </Link>
            <Link href="/contact" className="btn-navy hero-cta">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
