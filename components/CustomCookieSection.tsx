"use client";
import { useEffect, useState } from "react";

const FLAVOURS = ["Vanilla", "Chocolate", "Chocolate Chip", "Ginger", "Spice"];

const PRICE_TIERS = [
  { min: 500, price: 4.0 },
  { min: 300, price: 4.25 },
  { min: 200, price: 4.5 },
  { min: 100, price: 5.0 },
  { min: 50, price: 5.5 },
  { min: 24, price: 5.8 },
  { min: 12, price: 6.25 },
];

function getPriceEach(qty: number): number | null {
  const tier = PRICE_TIERS.find((t) => qty >= t.min);
  return tier ? tier.price : null;
}

function getMinDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString().split("T")[0];
}

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "12px 16px", border: "2px solid #E0DCF0", borderRadius: 12,
  fontFamily: "'Nunito', sans-serif", fontWeight: 600, fontSize: 15, color: "#00205B",
  backgroundColor: "#fff", outline: "none",
};

const labelStyle: React.CSSProperties = {
  fontWeight: 700, fontSize: 14, color: "#00205B", display: "block", marginBottom: 6,
};

const SLIDES = [
  "Custom logo cookies",
  "Wedding monogram set",
  "Corporate gift box",
  "Anniversary stamp cookies",
  "Birthday name cookies",
];

function PlaceholderSlide({ text }: { text: string }) {
  return (
    <div style={{ border: "2px dashed #CFC8E7", borderRadius: 24, backgroundColor: "#F6F3ED", minHeight: 420, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
      <div>
        <div style={{ width: 72, height: 72, borderRadius: 18, border: "2px dashed #B7AED9", margin: "0 auto 18px" }} />
        <p style={{ color: "#9B8EC4", fontWeight: 800, fontSize: 18 }}>{text}</p>
      </div>
    </div>
  );
}

export default function CustomCookieSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [quantity, setQuantity] = useState<number | "">("");
  const [flavour, setFlavour] = useState("");
  const [neededDate, setNeededDate] = useState("");
  const [colour, setColour] = useState("#ffffff");
  const [companyName, setCompanyName] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [designBrief, setDesignBrief] = useState("");
  const [pickup, setPickup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setActiveSlide((prev) => (prev + 1) % SLIDES.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setActiveSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setActiveSlide((prev) => (prev + 1) % SLIDES.length);

  const qty = typeof quantity === "number" ? quantity : 0;
  const priceEach = qty >= 12 ? getPriceEach(qty) : null;
  const subtotal = priceEach ? Math.round(priceEach * qty * 100) / 100 : 0;
  const deposit = priceEach ? Math.round(subtotal * 0.5 * 100) / 100 : 0;

  const handleSubmit = async () => {
    setError("");
    if (!quantity || qty < 12) { setError("Minimum order is 12 cookies."); return; }
    if (!flavour) { setError("Please select a flavour."); return; }
    if (!neededDate) { setError("Please select a date needed by."); return; }
    if (!designBrief.trim()) { setError("Please add a design brief."); return; }
    if (!name || !email || !phone) { setError("Please fill in your name, email, and phone."); return; }

    setLoading(true);
    try {
      let logoUrl = "";
      if (logoFile) {
        logoUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(logoFile);
        });
      }

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderType: "custom",
          name, email, phone,
          quantity: qty,
          priceEach,
          subtotal: deposit,
          colour,
          companyName,
          logoUrl,
          designBrief,
          latestNeededDate: neededDate,
          pickup,
          description: `Custom Cookies x${qty} - 50% deposit (full order $${subtotal.toFixed(2)})`,
        }),
      });

      const data = await res.json();
      if (data.url) { window.location.href = data.url; }
      else { setError(data.error || "Something went wrong. Please try again."); }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="custom" style={{ padding: "40px 24px 64px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ backgroundColor: "#fff", borderRadius: 28, padding: "48px", boxShadow: "0 8px 48px rgba(0,32,91,0.10)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36, alignItems: "start" }}>

          {/* Left — carousel */}
          <div>
            <span style={{ color: "#9B8EC4", fontWeight: 800, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", display: "block", marginBottom: 12 }}>
              Your design, your stamp, your moment
            </span>
            <h2 style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: 32, color: "#00205B", marginBottom: 6 }}>
              Custom Cookies
            </h2>
            <p style={{ color: "#666", fontWeight: 600, marginBottom: 24, fontSize: 15, lineHeight: 1.6 }}>
              We use 3D-printed custom stamps to reproduce logos, monograms, and detailed designs. Perfect for corporate gifting, brand events, weddings, and milestone celebrations.
            </p>
            <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ position: "relative" }}>
              <PlaceholderSlide text={SLIDES[activeSlide]} />
              <button type="button" onClick={prev} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", opacity: hovered ? 1 : 0, transition: "opacity 0.2s", border: "none", background: "rgba(255,255,255,0.9)", color: "#00205B", width: 38, height: 38, borderRadius: 999, cursor: "pointer", fontSize: 18, fontWeight: 900 }}>{"<"}</button>
              <button type="button" onClick={next} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", opacity: hovered ? 1 : 0, transition: "opacity 0.2s", border: "none", background: "rgba(255,255,255,0.9)", color: "#00205B", width: 38, height: 38, borderRadius: 999, cursor: "pointer", fontSize: 18, fontWeight: 900 }}>{">"}</button>
            </div>
          </div>

          {/* Right — form */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Quantity + price calculator */}
            <div>
              <label style={labelStyle}>Quantity</label>
              <input
                type="number"
                min={12}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder="Min. 12 cookies"
                style={inputStyle}
              />
              {qty > 0 && qty < 12 && (
                <p style={{ fontSize: 12, color: "#C04B2B", fontWeight: 700, marginTop: 6 }}>Minimum order is 12 cookies.</p>
              )}
              {priceEach && (
                <div style={{ marginTop: 10, backgroundColor: "#F3F0FC", borderRadius: 12, padding: "12px 16px", display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
                  <span style={{ fontWeight: 700, color: "#555", fontSize: 14 }}>Qty: <strong style={{ color: "#00205B" }}>{qty}</strong></span>
                  <span style={{ fontWeight: 700, color: "#555", fontSize: 14 }}>Each: <strong style={{ color: "#00205B" }}>${priceEach.toFixed(2)}</strong></span>
                  <span style={{ fontWeight: 900, color: "#C04B2B", fontSize: 14 }}>Total: <strong>${subtotal.toFixed(2)}</strong></span>
                </div>
              )}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={labelStyle}>Flavour</label>
                <select value={flavour} onChange={(e) => setFlavour(e.target.value)} style={inputStyle}>
                  <option value="">Select a flavour...</option>
                  {FLAVOURS.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Date Needed By</label>
                <input type="date" value={neededDate} min={getMinDate()} onChange={(e) => setNeededDate(e.target.value)} onKeyDown={(e) => e.preventDefault()} style={inputStyle} />
                <p style={{ fontSize: 11, color: "#999", fontWeight: 600, marginTop: 4 }}>Min. 1 week lead time.</p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={labelStyle}>Fondant Colour</label>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <input type="color" value={colour} onChange={(e) => setColour(e.target.value)} style={{ width: 44, height: 44, border: "2px solid #E0DCF0", borderRadius: 10, cursor: "pointer", padding: 2 }} />
                  <span style={{ fontWeight: 600, color: "#555", fontSize: 14 }}>{colour.toUpperCase()}</span>
                </div>
                <p style={{ fontSize: 11, color: "#999", fontWeight: 600, marginTop: 4 }}>Colours may vary slightly. We will confirm the closest match.</p>
              </div>
              <div>
                <label style={labelStyle}>Company Name</label>
                <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Optional" style={inputStyle} />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Logo File (PNG, JPG, or SVG)</label>
              <input type="file" accept=".png,.jpg,.jpeg,.svg" onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)} style={{ ...inputStyle, padding: "10px 14px", cursor: "pointer" }} />
              <p style={{ fontSize: 11, color: "#999", fontWeight: 600, marginTop: 4 }}>No file yet? Describe your design in the brief below.</p>
            </div>

            <div>
              <label style={labelStyle}>Design Brief</label>
              <textarea value={designBrief} onChange={(e) => setDesignBrief(e.target.value)} rows={4} placeholder="Describe your vision — colours, text, event, special requests..." style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} />
            </div>

            {/* Pickup */}
            <div>
              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontWeight: 700, color: "#00205B", cursor: "pointer" }}>
                <input type="checkbox" checked={pickup} onChange={(e) => setPickup(e.target.checked)} style={{ marginTop: 3 }} />
                <span>
                  Local pickup (Lower Hutt) — no delivery fee
                  <span style={{ display: "block", fontWeight: 600, color: "#777", fontSize: 13, marginTop: 2 }}>
                    We will be in touch to arrange a pickup time once your order is confirmed.
                  </span>
                </span>
              </label>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div><label style={labelStyle}>Your Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} /></div>
              <div><label style={labelStyle}>Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} /></div>
            </div>
            <div><label style={labelStyle}>Phone</label><input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ ...inputStyle, maxWidth: 320 }} /></div>

            {error && <p style={{ color: "#C04B2B", fontWeight: 700, fontSize: 14 }}>{error}</p>}

            {/* Deposit summary */}
            {deposit > 0 && (
              <div style={{ backgroundColor: "#F3F0FC", borderRadius: 14, padding: "14px 18px" }}>
                <p style={{ fontWeight: 700, color: "#00205B", fontSize: 14, marginBottom: 4 }}>Payment summary</p>
                <p style={{ fontWeight: 600, color: "#555", fontSize: 13 }}>Full order total: ${subtotal.toFixed(2)}</p>
                <p style={{ fontWeight: 800, color: "#C04B2B", fontSize: 14 }}>50% deposit due now: ${deposit.toFixed(2)}</p>
                <p style={{ fontWeight: 600, color: "#777", fontSize: 12, marginTop: 4 }}>Remaining ${deposit.toFixed(2)} invoiced after delivery.</p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading || !priceEach}
              style={{ width: "100%", backgroundColor: loading || !priceEach ? "#aaa" : "#C04B2B", color: "#fff", fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: 18, padding: "18px 0", borderRadius: 50, border: "none", cursor: loading || !priceEach ? "not-allowed" : "pointer" }}
            >
              {loading ? "Processing..." : deposit > 0 ? `Pay 50% Deposit — $${deposit.toFixed(2)} NZD` : "Enter quantity to continue"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}