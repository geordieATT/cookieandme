import Image from "next/image";

const pricingTiers = [
  {
    label: "24 Pack",
    price: "$110",
    perUnit: null,
    note: "Fixed price",
    highlight: false,
  },
  {
    label: "25–99 Cookies",
    price: "$4.50",
    perUnit: "per cookie",
    note: "Most popular",
    highlight: true,
  },
  {
    label: "100+ Cookies",
    price: "$4.00",
    perUnit: "per cookie",
    note: "Best value",
    highlight: false,
  },
];

const galleryImages = [
  {
    src: "/images/qspace-branded-cookie-vanilla-black-background.jpg",
    alt: "QSpace branded vanilla cookie on black background",
  },
  {
    src: "/images/devopsdays-wellington-branded-cookie-black-background.jpg",
    alt: "DevOpsDays Wellington branded cookie on black background",
  },
  {
    src: "/images/pink-shirt-day-full-production-bench-overhead.jpg",
    alt: "Pink Shirt Day cookies on production bench overhead",
  },
];

export default function CorporateSection() {
  return (
    <section id="corporate" style={{ padding: "96px 0" }}>
      <div className="section-container">
        {/* Heading */}
        <div style={{ maxWidth: 640, marginBottom: 56 }}>
          <h2
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(28px, 3.5vw, 40px)",
              color: "#1B2B6B",
              marginBottom: 14,
            }}
          >
            Make Your Brand Unforgettable
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 17,
              color: "#555",
              lineHeight: 1.65,
            }}
          >
            From conferences to client gifts, we create branded cookies that
            people actually remember.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="two-col" style={{ marginBottom: 56 }}>
          <div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                color: "#333",
                lineHeight: 1.8,
                marginBottom: 20,
              }}
            >
              We work with businesses across Wellington to create custom-stamped
              cookies that carry your logo, your message, and your brand colours.
              Whether you need 24 cookies for a team event or 500 for a
              conference, every single one is made by hand in our Lower Hutt
              kitchen. Our 3D-printed stamps are designed in-house using CAD
              software, allowing us to reproduce detailed logos and complex
              designs that letter stamps simply cannot achieve.
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                color: "#333",
                lineHeight: 1.8,
              }}
            >
              <strong style={{ color: "#1B2B6B" }}>Perfect for:</strong> client
              gifting, product launches, conferences, networking events, staff
              appreciation, and brand activations.
            </p>
          </div>

          <div
            style={{
              position: "relative",
              aspectRatio: "4/3",
              overflow: "hidden",
              borderRadius: 2,
            }}
          >
            <Image
              src="/images/timedock-branded-cookies-production-bench.jpg"
              alt="TimeDock branded cookies on production bench"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Gallery row */}
        <div className="three-col" style={{ marginBottom: 56 }}>
          {galleryImages.map((img) => (
            <div
              key={img.src}
              style={{
                position: "relative",
                aspectRatio: "4/3",
                overflow: "hidden",
                borderRadius: 2,
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>

        {/* Pricing table */}
        <div style={{ marginBottom: 20 }}>
          <div className="three-col">
            {pricingTiers.map((tier) => (
              <div
                key={tier.label}
                style={{
                  border: tier.highlight
                    ? "2px solid #1B2B6B"
                    : "1.5px solid #E0DFDD",
                  borderRadius: 2,
                  padding: "32px 28px",
                  textAlign: "center",
                  backgroundColor: tier.highlight ? "#F4F5FB" : "#FAFAF8",
                  position: "relative",
                }}
              >
                {tier.highlight && (
                  <div
                    style={{
                      position: "absolute",
                      top: -1,
                      left: "50%",
                      transform: "translateX(-50%)",
                      backgroundColor: "#1B2B6B",
                      color: "#FAFAF8",
                      fontSize: 11,
                      fontWeight: 600,
                      fontFamily: "'Inter', sans-serif",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      padding: "4px 12px",
                      borderRadius: "0 0 2px 2px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Most Popular
                  </div>
                )}
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#888",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 12,
                    marginTop: tier.highlight ? 16 : 0,
                  }}
                >
                  {tier.label}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "center",
                    gap: 4,
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      fontWeight: 900,
                      fontSize: 36,
                      color: "#1B2B6B",
                    }}
                  >
                    {tier.price}
                  </span>
                  {tier.perUnit && (
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 13,
                        color: "#666",
                      }}
                    >
                      {tier.perUnit}
                    </span>
                  )}
                </div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    color: "#888",
                  }}
                >
                  {tier.note}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Deposit and shipping notes */}
        <div style={{ marginBottom: 36 }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              color: "#666",
              marginBottom: 6,
            }}
          >
            Orders under 100 cookies require full payment upfront. Orders of 100
            or more require a 50% deposit.
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              color: "#666",
            }}
          >
            Free pickup or delivery in Lower Hutt. Nationwide shipping from $8.
          </p>
        </div>

        <a href="#contact" className="btn-navy">
          Get a Corporate Quote
        </a>
      </div>
    </section>
  );
}
