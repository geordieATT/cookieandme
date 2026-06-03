import Image from "next/image";

const pricingTiers = [
  {
    label: "24 Pack",
    price: "$110",
    strikethrough: "$120",
    perUnit: null,
    note: "",
    highlight: false,
  },
  {
    label: "25–99 Cookies",
    price: "$5.00",
    strikethrough: null,
    perUnit: "per cookie",
    note: "",
    highlight: false,
  },
  {
    label: "100–499 Cookies",
    price: "$4.50",
    strikethrough: null,
    perUnit: "per cookie",
    note: "Most popular",
    highlight: true,
  },
  {
    label: "500+ Cookies",
    price: "$4.00",
    strikethrough: null,
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
              <h2
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(28px, 3.5vw, 40px)",
                  color: "#0C0E58",
                  marginBottom: 14,
                  maxWidth: 400,
                }}
              >
                Make your Occasion Unforgettable
              </h2>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 15,
                  color: "#333",
                  lineHeight: 1.8,
                  marginBottom: 16,
                }}
              >
                At Cookie &amp; Me, we design and bake personalised cookies
                stamped with your design or logo.
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 15,
                  color: "#333",
                  lineHeight: 1.8,
                  marginBottom: 8,
                }}
              >
                Whether you&apos;re:
              </p>
              <ul
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 15,
                  color: "#333",
                  lineHeight: 1.8,
                  marginBottom: 16,
                  paddingLeft: 20,
                  listStyleType: "disc",
                }}
              >
                <li style={{ marginBottom: 8 }}>
                  planning a birthday, baby shower, anniversary, or another
                  special celebration,
                </li>
                <li style={{ marginBottom: 8 }}>
                  an event organiser looking to add value to a wedding bundle or
                  catering package,
                </li>
                <li>
                  a business looking for a unique, memorable gift for clients, a
                  way to celebrate milestone achievements, or something to hand
                  out at expos and events,
                </li>
              </ul>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 15,
                  color: "#333",
                  lineHeight: 1.8,
                  marginBottom: 32,
                }}
              >
                You&apos;ve come to the right place!
              </p>
              <div>
                <a href="#order" className="btn-navy">
                  Order Now
                </a>
              </div>
            </div>
          </div>

          <div className="corporate-image">
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
          <div className="pricing-grid">
            {pricingTiers.map((tier) => (
              <div
                key={tier.label}
                style={{
                  border: tier.highlight
                    ? "2px solid #0C0E58"
                    : "1.5px solid #E0DFDD",
                  borderRadius: 2,
                  padding: "28px 20px",
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
                      backgroundColor: "#0C0E58",
                      color: "#FAFAF8",
                      fontSize: 10,
                      fontWeight: 600,
                      fontFamily: "'Inter', sans-serif",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      padding: "4px 10px",
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
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#888",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 10,
                    marginTop: tier.highlight ? 14 : 0,
                  }}
                >
                  {tier.label}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "center",
                    gap: 6,
                    marginBottom: 4,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      fontWeight: 900,
                      fontSize: 32,
                      color: "#0C0E58",
                    }}
                  >
                    {tier.price}
                  </span>
                  {tier.strikethrough && (
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 14,
                        color: "#BBB",
                        textDecoration: "line-through",
                      }}
                    >
                      {tier.strikethrough}
                    </span>
                  )}
                  {tier.perUnit && (
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 12,
                        color: "#666",
                      }}
                    >
                      {tier.perUnit}
                    </span>
                  )}
                </div>
                {tier.note && (
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 11,
                      color: "#AAA",
                    }}
                  >
                    {tier.note}
                  </p>
                )}
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
            Orders under 100 cookies require full payment upfront. Orders of
            100 or more require a 50% deposit.
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

      </div>
    </section>
  );
}
