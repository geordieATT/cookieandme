"use client";
import { useEffect, useMemo, useState } from "react";

const PACKS = [
  { size: 6, price: 39.9, label: "6 Pack" },
  { size: 12, price: 72.0, label: "12 Pack" },
  { size: 24, price: 120.0, label: "24 Pack" },
];

const THEMES = ["Love You", "Congratulations", "Happy Birthday", "Easter", "Celebration"];
const FLAVOURS = ["Vanilla", "Chocolate", "Chocolate Chip", "Ginger", "Spiced"];

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "12px 16px", border: "2px solid #E0DCF0", borderRadius: 12,
  fontFamily: "'Nunito', sans-serif", fontWeight: 600, fontSize: 15, color: "#00205B",
  backgroundColor: "#fff", outline: "none",
};

const labelStyle: React.CSSProperties = {
  fontWeight: 700, fontSize: 14, color: "#00205B", display: "block", marginBottom: 6,
};

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

export default function GiftBoxSection() {
  const [selectedPack, setSelectedPack] = useState<number>(6);
  const [theme, setTheme] = useState("Easter");
  const [flavour, setFlavour] = useState("");
  const [addCard, setAddCard] = useState(false);
  const [cardMessage, setCardMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const [hovered, setHovered] = useState(false);

  const pack = PACKS.find((p) => p.size === selectedPack)!;

  const slides = useMemo(() => [
    `${selectedPack} pack of ${theme}`,
    `${selectedPack} pack gift box`,
    `${theme} cookie close-up`,
  ], [selectedPack, theme]);

  useEffect(() => { setActiveSlide(0); }, [selectedPack, theme]);
  useEffect(() => {
    const timer = setInterval(() => setActiveSlide((prev) => (prev + 1) % slides.length), 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prev = () => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const next = () => setActiveSlide((prev) => (prev + 1) % slides.length);

  const handleSubmit = async () => {
    setError("");
    if (!theme || !flavour || !name || !email || !phone) {
      setError("Please fill in all fields.");
      return;
    }
    if (addCard && cardMessage.trim().length === 0) {
      setError("Please add your card message or untick the card option.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderType: "giftbox", name, email, phone,
          packSize: selectedPack, theme, flavour, addCard,
          cardMessage: addCard ? cardMessage.trim() : "",
          subtotal: pack.price,
          description: `Cookie and Me ${selectedPack} Pack - ${theme} - ${flavour}`,
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
    <section id="gift-boxes" style={{ padding: "40px 24px 64px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ backgroundColor: "#fff", borderRadius: 28, padding: "48px", boxShadow: "0 8px 48px rgba(0,32,91,0.10)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36, alignItems: "start" }}>
          <div>
            <span style={{ color: "#9B8EC4", fontWeight: 800, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", display: "block", marginBottom: 12 }}>
              Giftable, joyful, beautifully packaged
            </span>
            <h2 style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: 32, color: "#00205B", marginBottom: 6 }}>
              Gift Boxes
            </h2>
            <p style={{ color: "#666", fontWeight: 600, marginBottom: 24, fontSize: 15, lineHeight: 1.6 }}>
              Choose a theme, pick your flavour, and add a handwritten card if you would like. We will deliver it ready to gift.
            </p>
            <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ position: "relative" }}>
              <PlaceholderSlide text={slides[activeSlide]} />
              <button type="button" onClick={prev} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", opacity: hovered ? 1 : 0, transition: "opacity 0.2s", border: "none", background: "rgba(255,255,255,0.9)", color: "#00205B", width: 38, height: 38, borderRadius: 999, cursor: "pointer", fontSize: 18, fontWeight: 900 }}>{"<"}</button>
              <button type="button" onClick={next} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", opacity: hovered ? 1 : 0, transition: "opacity 0.2s", border: "none", background: "rgba(255,255,255,0.9)", color: "#00205B", width: 38, height: 38, borderRadius: 999, cursor: "pointer", fontSize: 18, fontWeight: 900 }}>{">"}</button>
            </div>
          </div>

          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 20 }}>
              {PACKS.map((p) => {
                const isSelected = selectedPack === p.size;
                return (
                  <button key={p.size} type="button" onClick={() => setSelectedPack(p.size)} style={{ border: isSelected ? "2.5px solid #9B8EC4" : "2px solid #E0DCF0", borderRadius: 18, padding: "24px 16px", cursor: "pointer", backgroundColor: isSelected ? "#F3F0FC" : "#fff", textAlign: "center" }}>
                    <div style={{ fontWeight: 900, fontSize: 22, color: "#00205B" }}>{p.label}</div>
                    <div style={{ fontWeight: 700, fontSize: 20, color: "#C04B2B", margin: "6px 0 4px" }}>${p.price.toFixed(2)}</div>
                  </button>
                );
              })}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <label style={labelStyle}>Theme</label>
                <select value={theme} onChange={(e) => setTheme(e.target.value)} style={inputStyle}>
                  {THEMES.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Flavour</label>
                <select value={flavour} onChange={(e) => setFlavour(e.target.value)} style={inputStyle}>
                  <option value="">Select a flavour...</option>
                  {FLAVOURS.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700, color: "#00205B", cursor: "pointer", marginBottom: 8 }}>
                <input type="checkbox" checked={addCard} onChange={(e) => setAddCard(e.target.checked)} />
                Add a handwritten card
              </label>
              {addCard && (
                <>
                  <textarea value={cardMessage} onChange={(e) => setCardMessage(e.target.value.slice(0, 200))} rows={4} placeholder="Write your message here..." style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} />
                  <p style={{ fontSize: 12, color: "#777", fontWeight: 600, marginTop: 6 }}>Short messages work best. {cardMessage.length}/200</p>
                </>
              )}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div><label style={labelStyle}>Your Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} /></div>
              <div><label style={labelStyle}>Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} /></div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Phone</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ ...inputStyle, maxWidth: 320 }} />
            </div>

            {error && <p style={{ color: "#C04B2B", fontWeight: 700, fontSize: 14, marginBottom: 12 }}>{error}</p>}

            <button onClick={handleSubmit} disabled={loading} style={{ width: "100%", backgroundColor: loading ? "#aaa" : "#C04B2B", color: "#fff", fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: 18, padding: "18px 0", borderRadius: 50, border: "none", cursor: loading ? "not-allowed" : "pointer" }}>
              {loading ? "Processing..." : `Pay $${pack.price.toFixed(2)} NZD`}
            </button>
            <p style={{ fontSize: 12, color: "#999", fontWeight: 600, marginTop: 10, textAlign: "center" }}>
              Shipping calculated at checkout. Free delivery on orders over $119.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}