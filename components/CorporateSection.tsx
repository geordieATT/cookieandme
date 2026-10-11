import Image from "next/image";
import { cookiePriceEach } from "@/lib/customOrderPricing";

// Prices come from the same file the order form and checkout charge from, so
// this table can't drift from what customers actually pay. The quantity
// bands in the labels (24, 50, 150) mirror the rules in that file, the order
// form and the checkout API; update the labels here if those change.
const price = (quantity: number) => `$${cookiePriceEach(quantity).toFixed(2)}`;

const pricingTiers = [
  {
    label: "24–50 cookies",
    price: price(24),
    perUnit: "per cookie",
    note: "",
    highlight: false,
    inquiry: false,
  },
  {
    label: "51–150 cookies",
    price: price(51),
    perUnit: "per cookie",
    note: "",
    highlight: true,
    inquiry: false,
  },
  {
    label: "150+ cookies",
    price: null,
    perUnit: null,
    note: "Contact us for a custom quote",
    highlight: false,
    inquiry: true,
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
              <h1
                style={{
                  color: "var(--ink)",
                  marginBottom: 20,
                }}
              >
                Cookies stamped with your design or logo
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 17,
                  color: "var(--text)",
                  lineHeight: 1.65,
                  marginBottom: 16,
                }}
              >
                At Cookie &amp; Me, we design and bake personalised cookies
                stamped with your design or logo.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 17,
                  color: "var(--text)",
                  lineHeight: 1.65,
                  marginBottom: 16,
                }}
              >
                We bake for birthdays, baby showers, anniversaries and every other
                celebration worth marking. Event organisers come to us to add
                something extra to a wedding bundle or catering package.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 17,
                  color: "var(--text)",
                  lineHeight: 1.65,
                  marginBottom: 0,
                }}
              >
                Businesses use them as client gifts, to celebrate a milestone, or
                as something memorable to hand out at expos and events. Whatever
                the occasion, we would love to help.
              </p>
            </div>
          </div>

          <div className="corporate-image">
            <Image
              src="/images/csl-long-service-dinner-branded-cookie-place-setting.jpg"
              alt="CSL branded cookie at a Long Service Dinner place setting"
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
                aspectRatio: "1 / 1",
                overflow: "hidden",
                borderRadius: 2,
                backgroundColor: "var(--tint)",
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 384px"
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
                    ? "2px solid var(--ink)"
                    : "1.5px solid var(--line)",
                  borderRadius: 2,
                  padding: "28px 20px",
                  textAlign: "center",
                  backgroundColor: tier.highlight ? "var(--tint)" : "var(--bg)",
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
                      backgroundColor: "var(--accent)",
                      color: "var(--on-dark)",
                      fontSize: 10,
                      fontWeight: 600,
                      fontFamily: "var(--font-sans)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      padding: "4px 10px",
                      borderRadius: "0 0 2px 2px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Most popular
                  </div>
                )}
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "var(--text-subtle)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 10,
                    marginTop: tier.highlight ? 14 : 0,
                  }}
                >
                  {tier.label}
                </p>
                {tier.inquiry ? (
                  <p
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontWeight: 500,
                      fontSize: 20,
                      color: "var(--ink)",
                      marginBottom: 4,
                    }}
                  >
                    Price on inquiry
                  </p>
                ) : (
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
                        fontFamily: "var(--font-serif)",
                        fontWeight: 500,
                        fontSize: 32,
                        color: "var(--ink)",
                      }}
                    >
                      {tier.price}
                    </span>
                    {tier.perUnit && (
                      <span
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: 12,
                          color: "var(--text-muted)",
                        }}
                      >
                        {tier.perUnit}
                      </span>
                    )}
                  </div>
                )}
                {tier.note && (
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 11,
                      color: "var(--text-subtle)",
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
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              color: "var(--text-muted)",
            }}
          >
            Orders under 100 cookies require full payment upfront. Orders of 100 or more require a 50% deposit. Free pickup or delivery in the Hutt Valley. Nationwide courier is available on request, just ask when you order.
          </p>
        </div>

        <div>
          <a href="/order" className="btn-navy">
            Order now
          </a>
        </div>

      </div>
    </section>
  );
}
