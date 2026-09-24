import Image from "next/image";
import Link from "next/link";

export default function EndOfYearSection() {
  return (
    <>
      <section style={{ padding: "96px 0" }}>
        <div className="section-container">
          {/* Two-column layout */}
          <div className="two-col" style={{ marginBottom: 56 }}>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <h1
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(28px, 3.5vw, 40px)",
                    color: "#0C0E58",
                    marginBottom: 14,
                    maxWidth: 440,
                  }}
                >
                  Christmas and End-of-Year Events
                </h1>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 15,
                    color: "#333",
                    lineHeight: 1.8,
                    marginBottom: 16,
                  }}
                >
                  December is rapidly approaching, and with end-of-year events,
                  awards nights, Christmas parties, and staff dinners all
                  happening at once, we are expecting a busy few months. That is
                  why we are booking orders now to make sure we can fit everyone
                  in.
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 15,
                    color: "#333",
                    lineHeight: 1.8,
                    marginBottom: 16,
                  }}
                >
                  We have designed a set of Christmas templates ready to go.
                  Pick a design, we add your logo, and you are sorted. Orders
                  using a Christmas template confirmed before November 1st get
                  10% off.
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 15,
                    color: "#333",
                    lineHeight: 1.8,
                    marginBottom: 0,
                  }}
                >
                  Want something fully custom? No problem. Standard pricing
                  applies and we are happy to work with you on a design from
                  scratch.
                </p>
              </div>
            </div>

            <div className="corporate-image">
              <Image
                src="/images/christmas-templates.jpg"
                alt="Red, green and white Christmas cookies stamped with a Your Logo design"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
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
              marginBottom: 28,
            }}
          >
            Got an end-of-year event coming up?
          </h2>
          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/contact"
              className="hero-cta"
              style={{
                display: "inline-block",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: 14,
                letterSpacing: "0.03em",
                color: "#0C0E58",
                backgroundColor: "transparent",
                padding: "12px 28px",
                borderRadius: 2,
                border: "1.5px solid rgba(12, 14, 88, 0.4)",
                textAlign: "center",
              }}
            >
              Get in Touch
            </Link>
            <Link href="/order" className="btn-red hero-cta">
              Place an Order
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
