"use client";

import { useState, useRef } from "react";

function calcTotal(qty: number): number {
  if (qty <= 50) return qty * 5.0;
  return qty * 4.5;
}

function calcDeposit(qty: number, total: number): number {
  return qty < 100 ? total : total * 0.5;
}

function fmt(n: number): string {
  return "$" + n.toFixed(2).replace(/\.00$/, "");
}

const minDate = new Date();
minDate.setDate(minDate.getDate() + 10);
const minDateStr = minDate.toISOString().split("T")[0];

export default function OrderSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateNeeded, setDateNeeded] = useState("");
  const [quantity, setQuantity] = useState<number | "">(24);
  const [flavour, setFlavour] = useState("Classic Vanilla");
  const [colour, setColour] = useState("#ffffff");
  const [companyName, setCompanyName] = useState("");
  const [logoName, setLogoName] = useState("");
  const [designBrief, setDesignBrief] = useState("");
  const [fulfillment, setFulfillment] = useState<"pickup" | "delivery">("pickup");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const qty = typeof quantity === "number" ? quantity : 0;
  const overLimit = qty > 150;
  const validQty = qty >= 24 && !overLimit;
  const priceEach = qty <= 50 ? "5.00" : "4.50";
  const total = validQty ? calcTotal(qty) : 0;
  const deposit = validQty ? calcDeposit(qty, total) : 0;
  const isFullPayment = qty < 100;

  const handleSubmit = async () => {
    setError("");
    if (!name || !email || !phone || !dateNeeded || !quantity || !designBrief) {
      setError("Please fill in all required fields.");
      return;
    }
    if (typeof quantity === "number" && quantity < 24) {
      setError("Minimum order is 24 cookies.");
      return;
    }
    if (overLimit) {
      setError("For orders over 150 cookies, please contact us.");
      return;
    }
    setLoading(true);
    try {
      const description = isFullPayment
        ? `Cookie & Me – ${qty} Custom Cookies (Full Payment: ${fmt(total)} NZD)`
        : `Cookie & Me – ${qty} Custom Cookies (50% Deposit: ${fmt(deposit)} NZD)`;

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderType: "custom",
          name,
          email,
          phone,
          subtotal: deposit,
          description,
          fulfillment,
          quantity: qty,
          priceEach,
          flavour,
          colour,
          logoUrl: logoName,
          designBrief,
          latestNeededDate: dateNeeded,
          companyName,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const showSummary = validQty;

  return (
    <section id="order" style={{ padding: "96px 0" }}>
      <div className="section-container">
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(26px, 3.5vw, 38px)",
              color: "#0C0E58",
              marginBottom: 10,
            }}
          >
            Place Your Order
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              color: "#666",
              marginBottom: 40,
            }}
          >
            All orders are custom-made. Fill out the form below and you will be
            directed to pay your deposit via Stripe.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Name + Email */}
            <div className="form-two-col">
              <div>
                <label className="form-label">Name *</label>
                <input
                  type="text"
                  className="form-field"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  autoComplete="name"
                />
              </div>
              <div>
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  className="form-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Phone + Date */}
            <div className="form-two-col">
              <div>
                <label className="form-label">Phone *</label>
                <input
                  type="tel"
                  className="form-field"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="021 000 0000"
                  autoComplete="tel"
                />
              </div>
              <div onClick={() => dateInputRef.current?.showPicker()} style={{ cursor: "pointer" }}>
                <label className="form-label" style={{ cursor: "pointer" }}>Date Needed *</label>
                <input
                  ref={dateInputRef}
                  type="date"
                  className="form-field"
                  value={dateNeeded}
                  onChange={(e) => setDateNeeded(e.target.value)}
                  min={minDateStr}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>

            {/* Quantity + Flavour */}
            <div className="form-two-col">
              <div>
                <label className="form-label">Quantity *</label>
                <input
                  type="number"
                  className="form-field"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  min={24}
                  placeholder="24"
                />
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    color: "#888",
                    marginTop: 5,
                  }}
                >
                  Minimum 24 cookies.
                </p>
              </div>
              <div>
                <label className="form-label">Flavour *</label>
                <select
                  className="form-field"
                  value={flavour}
                  onChange={(e) => setFlavour(e.target.value)}
                >
                  <option>Classic Vanilla</option>
                  <option>Vanilla Chocolate Chip</option>
                  <option>Dark Salted Chocolate</option>
                  <option>Ginger</option>
                  <option>Spice</option>
                </select>
              </div>
            </div>

            {/* Fondant colour */}
            <div>
              <label className="form-label">Fondant Colour *</label>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <input
                  type="color"
                  value={colour}
                  onChange={(e) => setColour(e.target.value)}
                  style={{
                    width: 44,
                    height: 44,
                    padding: 2,
                    border: "1.5px solid #D0CFCD",
                    borderRadius: 2,
                    cursor: "pointer",
                    backgroundColor: "#FAFAF8",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    color: "#666",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {colour}
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  color: "#888",
                  marginTop: 6,
                }}
              >
                We will do our best to match your chosen colour exactly. Please
                note that fondant can appear different under different lighting
                conditions.
              </p>
            </div>

            {/* Company name */}
            <div>
              <label className="form-label">
                Company Name{" "}
                <span style={{ color: "#AAA", fontWeight: 400 }}>
                  (optional)
                </span>
              </label>
              <input
                type="text"
                className="form-field"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Your organisation or business name"
              />
            </div>

            {/* Logo upload */}
            <div>
              <label className="form-label">
                Logo / Design File{" "}
                <span style={{ color: "#AAA", fontWeight: 400 }}>
                  (optional)
                </span>
              </label>
              <div
                onClick={() => fileRef.current?.click()}
                style={{
                  border: "1.5px dashed #C0BFBD",
                  borderRadius: 2,
                  padding: "20px 16px",
                  cursor: "pointer",
                  textAlign: "center",
                  backgroundColor: "#FAFAF8",
                  transition: "border-color 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "#0C0E58")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "#C0BFBD")
                }
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept=".png,.jpg,.jpeg,.svg"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setLogoName(file.name);
                  }}
                  style={{ display: "none" }}
                />
                {logoName ? (
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      color: "#0C0E58",
                      fontWeight: 500,
                    }}
                  >
                    {logoName}
                  </p>
                ) : (
                  <>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 14,
                        color: "#888",
                      }}
                    >
                      Click to upload your logo or design file
                    </p>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 12,
                        color: "#AAA",
                        marginTop: 4,
                      }}
                    >
                      PNG, JPG, SVG accepted
                    </p>
                  </>
                )}
              </div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  color: "#888",
                  marginTop: 6,
                }}
              >
                You can also email your file to cookieandme.nz@gmail.com after
                placing your order.
              </p>
            </div>

            {/* Design brief */}
            <div>
              <label className="form-label">Design Brief *</label>
              <textarea
                className="form-field"
                value={designBrief}
                onChange={(e) => setDesignBrief(e.target.value)}
                rows={5}
                placeholder="Describe your design — colours, theme, logo details, text, packaging preferences, event details..."
                style={{ resize: "vertical" }}
              />
            </div>

            {/* Over-limit notice */}
            {overLimit && (
              <div
                style={{
                  borderLeft: "4px solid #FB3D03",
                  backgroundColor: "#FFF8F6",
                  padding: "14px 16px",
                  borderRadius: 2,
                }}
              >
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    color: "#333",
                    lineHeight: 1.6,
                  }}
                >
                  For orders over 150 cookies, please contact us for a better
                  price —{" "}
                  <a
                    href="tel:0211757181"
                    style={{ color: "#0C0E58", fontWeight: 600 }}
                  >
                    021 175 7181
                  </a>{" "}
                  or{" "}
                  <a
                    href="mailto:cookieandme.nz@gmail.com"
                    style={{ color: "#0C0E58", fontWeight: 600 }}
                  >
                    cookieandme.nz@gmail.com
                  </a>
                </p>
              </div>
            )}

            {/* Pricing summary */}
            {showSummary && (
              <div
                style={{
                  backgroundColor: "#F4F5FB",
                  border: "1.5px solid #D4D9EE",
                  borderRadius: 2,
                  padding: "20px 24px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    color: "#444",
                  }}
                >
                  <span>{qty} cookies @ ${priceEach} each</span>
                  <span style={{ fontWeight: 600, color: "#0C0E58" }}>
                    {fmt(total)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#0C0E58",
                    borderTop: "1px solid #C8CCE0",
                    paddingTop: 10,
                    marginTop: 4,
                  }}
                >
                  <span>
                    {isFullPayment
                      ? "Due today (full payment)"
                      : "Deposit due today (50%)"}
                  </span>
                  <span
                    style={{
                      fontSize: 20,
                      fontFamily: "'Nunito', sans-serif",
                      fontWeight: 900,
                    }}
                  >
                    {fmt(deposit)}
                  </span>
                </div>
                {!isFullPayment && (
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12,
                      color: "#666",
                      marginTop: 8,
                    }}
                  >
                    Remaining {fmt(total - deposit)} NZD will be invoiced on
                    delivery.
                  </p>
                )}
              </div>
            )}

            {/* Pickup / Delivery */}
            <div>
              <label className="form-label">Collection</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {(["pickup", "delivery"] as const).map((opt) => (
                  <button key={opt} type="button" onClick={() => setFulfillment(opt)}
                    style={{ border: fulfillment === opt ? "2px solid #0C0E58" : "1.5px solid #D0CFCD", borderRadius: 2, padding: "14px 8px", cursor: "pointer", backgroundColor: fulfillment === opt ? "#F4F5FB" : "#FAFAF8", textAlign: "center", fontFamily: "'Inter', sans-serif" }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: "#0C0E58" }}>
                      {opt === "pickup" ? "Free Pickup" : "Free Delivery"}
                    </div>
                    <div style={{ fontWeight: 400, fontSize: 12, color: "#666", marginTop: 2 }}>
                      {opt === "pickup" ? "Lower Hutt" : "Wellington & Hutt Valley"}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: "#FB3D03",
                  fontWeight: 500,
                }}
              >
                {error}
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading || overLimit}
              className="btn-navy"
              style={{
                width: "100%",
                padding: "15px",
                fontSize: 15,
                opacity: loading || overLimit ? 0.5 : 1,
                cursor: overLimit ? "not-allowed" : "pointer",
              }}
            >
              {loading
                ? "Redirecting to payment..."
                : isFullPayment
                ? "Pay Now via Stripe"
                : "Pay Deposit via Stripe"}
            </button>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: "#888",
                textAlign: "center",
              }}
            >
              Not sure what you need? Use the{" "}
              <a
                href="#contact"
                style={{
                  color: "#0C0E58",
                  fontWeight: 600,
                  textDecoration: "underline",
                }}
              >
                contact form below
              </a>{" "}
              and we will help you figure it out.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
