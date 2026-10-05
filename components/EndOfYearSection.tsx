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

          {/* Free Design Mockup */}
          <div style={{ marginBottom: 56 }}>
            <h2
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(22px, 3vw, 28px)",
                color: "#0C0E58",
                marginBottom: 20,
              }}
            >
              Free Design Mockup
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                color: "#333",
                lineHeight: 1.8,
              }}
            >
              Not sure how your logo will look? Send it through and we will
              make you a free mockup so you can see it on a cookie before you
              decide. No obligation.
            </p>
          </div>

          {/* Packing Options */}
          <div>
            <h2
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(22px, 3vw, 28px)",
                color: "#0C0E58",
                marginBottom: 20,
              }}
            >
              Packing Options
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                color: "#333",
                lineHeight: 1.8,
                marginBottom: 28,
              }}
            >
              Your cookies come packed in gift boxes of 24 as standard. For a
              small fee, we can split your order into boxes of 12 or 6, or
              packs of 2. Great for handing out to staff or sending to
              clients.
            </p>

            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 640,
                aspectRatio: "1152 / 774",
                margin: "0 auto 28px",
              }}
            >
              <Image
                src="/images/christmas-pack-sizes-boxes-and-bag.png"
                alt="Christmas gift boxes in three sizes and a pack of 2, tied with red ribbon"
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 700px) 100vw, 640px"
              />
            </div>

            <div className="four-col" style={{ marginBottom: 28 }}>
              {[
                "Boxes of 24 (included)",
                "Boxes of 12",
                "Boxes of 6",
                "Packs of 2",
              ].map((option) => (
                <div
                  key={option}
                  style={{
                    border: "1.5px solid #D0CFCD",
                    borderRadius: 2,
                    padding: "20px 12px",
                    textAlign: "center",
                    backgroundColor: "#FAFAF8",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: 14,
                      color: "#0C0E58",
                    }}
                  >
                    {option}
                  </span>
                </div>
              ))}
            </div>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: "#666",
                lineHeight: 1.7,
              }}
            >
              For example, an order of 48 cookies can come as 2 boxes of 24, 4
              boxes of 12, 8 boxes of 6, or 24 packs of 2.
            </p>
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
