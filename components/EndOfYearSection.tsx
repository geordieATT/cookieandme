import Image from "next/image";
import Link from "next/link";

const eyebrow: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#FB3D03",
};

const body: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: 16,
  color: "#333",
  lineHeight: 1.75,
};

const sectionHeading: React.CSSProperties = {
  fontFamily: "'Nunito', sans-serif",
  fontWeight: 900,
  fontSize: "clamp(26px, 3.5vw, 36px)",
  color: "#0C0E58",
  marginBottom: 16,
};

const ways = [
  {
    eyebrow: "10% off before 1 November",
    title: "Christmas Templates",
    copy:
      "Pick one of our ready-made Christmas designs and we add your logo. The quickest way to get festive cookies sorted for the whole team.",
  },
  {
    eyebrow: "Standard pricing",
    title: "Fully Custom",
    copy:
      "Want something of your own? We are happy to work with you on a design from scratch, made to match your brand or event.",
  },
  {
    eyebrow: "No obligation",
    title: "Free Design Mockup",
    copy:
      "Not sure how your logo will look? Send it through and we will make you a free mockup so you can see it on a cookie before you decide.",
  },
];

const packSizes = [
  { count: "24", unit: "per box", note: "Included" },
  { count: "12", unit: "per box", note: "Small fee" },
  { count: "6", unit: "per box", note: "Small fee" },
  { count: "2", unit: "per pack", note: "Small fee" },
];

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
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(32px, 4.5vw, 48px)",
                  lineHeight: 1.1,
                  color: "#0C0E58",
                  margin: "10px 0 20px",
                }}
              >
                Christmas and End-of-Year Events
              </h1>
              <p style={{ ...body, marginBottom: 16, maxWidth: 520 }}>
                With awards nights, Christmas parties and staff dinners all
                landing in December, our calendar fills up fast. We are taking
                bookings now so we can fit everyone in.
              </p>

              <div
                style={{
                  borderLeft: "4px solid #FB3D03",
                  backgroundColor: "#FFF1EB",
                  padding: "14px 18px",
                  margin: "24px 0 28px",
                  maxWidth: 520,
                }}
              >
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: "#0C0E58",
                    margin: 0,
                  }}
                >
                  <strong>10% off Christmas templates</strong> for orders
                  confirmed before 1 November.
                </p>
              </div>

              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <Link href="/order" className="btn-red hero-cta">
                  Place an Order
                </Link>
                <Link href="/contact" className="btn-navy hero-cta">
                  Get in Touch
                </Link>
              </div>
            </div>

            <div className="corporate-image">
              <Image
                src="/images/christmas-templates.jpg"
                alt="Red, green and white Christmas cookies stamped with a Your Logo design"
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
      <section style={{ padding: "96px 0", backgroundColor: "#F4F4F2" }}>
        <div className="section-container">
          <h2 style={{ ...sectionHeading, textAlign: "center" }}>
            How You Can Order
          </h2>
          <div
            style={{
              width: 48,
              height: 3,
              backgroundColor: "#FB3D03",
              margin: "0 auto 40px",
            }}
          />

          <div className="three-col">
            {ways.map((way) => (
              <div
                key={way.title}
                style={{
                  backgroundColor: "#FAFAF8",
                  border: "1px solid #E4E3E0",
                  borderRadius: 2,
                  padding: "28px 26px 30px",
                }}
              >
                <span style={{ ...eyebrow, fontSize: 11 }}>{way.eyebrow}</span>
                <h3
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 900,
                    fontSize: 22,
                    color: "#0C0E58",
                    margin: "8px 0 10px",
                  }}
                >
                  {way.title}
                </h3>
                <p style={{ ...body, fontSize: 15, color: "#555", margin: 0 }}>
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
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "2000 / 1559",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <Image
                src="/images/christmas-pack-sizes-red-cloth-holly.jpg"
                alt="Christmas gift boxes in three sizes and a pack of 2 with red ribbon, on red cloth with holly"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div>
              <span style={eyebrow}>Packing options</span>
              <h2 style={{ ...sectionHeading, margin: "10px 0 16px" }}>
                Split Into Smaller Gift Boxes
              </h2>
              <p style={{ ...body, marginBottom: 28 }}>
                Your cookies come in gift boxes of 24 as standard. For a small
                fee, we can split your order into smaller boxes or packs, great
                for handing out to staff or sending to clients.
              </p>

              <div className="pack-sizes">
                {packSizes.map((size) => (
                  <div
                    key={size.count}
                    style={{
                      border: "1.5px solid #E4E3E0",
                      borderRadius: 2,
                      padding: "16px 12px",
                      textAlign: "center",
                      backgroundColor: "#FFFFFF",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Nunito', sans-serif",
                        fontWeight: 900,
                        fontSize: 32,
                        lineHeight: 1,
                        color: "#0C0E58",
                      }}
                    >
                      {size.count}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 13,
                        color: "#555",
                        margin: "6px 0 8px",
                      }}
                    >
                      cookies {size.unit}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: size.note === "Included" ? "#1E7A46" : "#888",
                      }}
                    >
                      {size.note}
                    </div>
                  </div>
                ))}
              </div>

              <p
                style={{
                  ...body,
                  fontSize: 14,
                  color: "#666",
                  marginTop: 20,
                }}
              >
                For example, 48 cookies can come as 2 boxes of 24, 4 boxes of
                12, 8 boxes of 6, or 24 packs of 2.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 0", backgroundColor: "#F4F4F2" }}>
        <div className="section-container" style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(24px, 3vw, 34px)",
              color: "#0C0E58",
              marginBottom: 12,
            }}
          >
            Got an end-of-year event coming up?
          </h2>
          <p
            style={{
              ...body,
              color: "#555",
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
