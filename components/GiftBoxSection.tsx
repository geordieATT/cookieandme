"use client";
import { useMemo, useState } from "react";

const PACKS = [
  { size: 6, price: 39.9, label: "6 Pack", sub: "Perfect for a sweet treat" },
  { size: 12, price: 72.0, label: "12 Pack", sub: "Great for sharing" },
  { size: 24, price: 120.0, label: "24 Pack", sub: "Ideal for events" },
];

const THEMES = ["Love You", "Congratulations", "Happy Birthday", "Easter", "Celebration"];
const FLAVOURS = ["Vanilla", "Chocolate", "Chocolate Chip", "Ginger", "Spice"];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  border: "2px solid #E0DCF0",
  borderRadius: 12,
  fontFamily: "'Nunito', sans-serif",
  fontWeight: 600,
  fontSize: 15,
  color: "#00205B",
  backgroundColor: "#fff",
  outline: "none",
  transition: "border-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: 14,
  color: "#00205B",
  display: "block",
  marginBottom: 6,
};

function PlaceholderSlide({ text }: { text: string }) {
  return (
    <div
      style={{
        border: "2px dashed #CFC8E7",
        borderRadius: 24,
        backgroundColor: "#F6F3ED",
        minHeight: 420,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        textAlign: "center",
      }}
    >
      <div>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 18,
            border: "2px dashed #B7AED9",
            margin: "0 auto 18px",
          }}
        />
        <p
          style={{
            color: "#9B8EC4",
            fontWeight: 800,
            fontSize: 18,
            fontFamily: "'Nunito', sans-serif",
          }}
        >
          {text}
        </p>
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

  const pack = PACKS.find((p) => p.size === selectedPack)!;
  const total = pack.price;

  const slides = useMemo(
    () => [
      `${selectedPack} pack of ${theme}`,
      `${selectedPack} pack gift box`,
      `${theme} cookie close-up`,
    ],
    [selectedPack, theme]
  );

  const [activeSlide, setActiveSlide] = useState(0);

  const handleSubmit = async () => {
    setError("");

    if (!selectedPack || !theme || !flavour || !name || !email || !phone) {
      setError("Please fill in all fields and select a pack, theme, and flavour.");
      return;
    }

    if (addCard && cardMessage.trim().length === 0) {
      setError("Please add your handwritten card message or untick the card option.");
      return;
    }

    setLoading(true);

    try {
      await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderType: "giftbox",
          packSize: selectedPack,
          theme,
          flavour,
          addCard,
          cardMessage: addCard ? cardMessage.trim() : "",
          name,
          email,
          phone,
          subtotal: total,
          description: `Cookie & Me ${selectedPack} Pack – ${theme} – ${flavour}`,
        }),
      });

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderType: "giftbox",
          name,
          email,
          subtotal: total,
          description: `Cookie & Me ${selectedPack} Pack – ${theme} – ${flavour}`,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="gift-boxes" style={{ padding: "40px 24px 64px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: 28,
            padding: "48px",
            boxShadow: "0 8px 48px rgba(0,32,91,0.10)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 36,
            alignItems: "start",
          }}
        >
          <div>
            <span
              style={{
                color: "#9B8EC4",
                fontWeight: 800,
                fontSize: 13,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 12,
              }}
            >
              Giftable, joyful, beautifully packaged
            </span>

            <h2
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 900,
                fontSize: 32,
                color: "#00205B",
                marginBottom: 6,
              }}
            >
              Gift Boxes
            </h2>

            <p style={{ color: "#666", fontWeight: 600, marginBottom: 24, fontSize: 15, lineHeight: 1.6 }}>
              Choose a theme, pick your flavour, and add a handwritten card if you’d like. We’ll deliver it ready to gift.
            </p>

            <PlaceholderSlide text={slides[activeSlide]} />

            <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
              {slides.map((slide, index) => {
                const active = index === activeSlide;
                return (
                  <button
                    key={slide}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    style={{
                      border: active ? "2px solid #9B8EC4" : "2px solid #E0DCF0",
                      backgroundColor: active ? "#F3F0FC" : "#fff",
                      color: "#00205B",
                      borderRadius: 999,
                      padding: "10px 14px",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {slide}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 20 }}>
                {PACKS.map((p) => {
                  const isSelected = selectedPack === p.size;
                  return (
                    <button
                      key={p.size}
                      type="button"
                      onClick={() => setSelectedPack(p.size)}
                      style={{
                        border: isSelected ? "2.5px solid #9B8EC4" : "2px solid #E0DCF0",
                        borderRadius: 18,
                        padding: "24px 16px",
                        cursor: "pointer",
                        backgroundColor: isSelected ? "#F3F0FC" : "#fff",
                        textAlign: "center",
                        transition: "0.2s",
                        boxShadow: isSelected
                          ? "0 0 0 3px rgba(155,142,196,0.20)"
                          : "0 2px 8px rgba(0,0,0,0.04)",
                      }}
                    >
                      <div style={{ fontWeight: 900, fontSize: 22, color: "#00205B" }}>{p.label}</div>
                      <div style={{ fontWeight: 700, fontSize: 20, color: "#C04B2B", margin: "6px 0 4px" }}>
                        ${p.price.toFixed(2)}
                      </div>
                      <div style={{ color: "#888", fontSize: 13, fontWeight: 600 }}>{p.sub}</div>
                    </button>
                  );
                })}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={labelStyle}>Theme</label>
                  <select value={theme} onChange={(e) => setTheme(e.target.value)} style={inputStyle}>
                    {THEMES.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Flavour</label>
                  <select value={flavour} onChange={(e) => setFlavour(e.target.value)} style={inputStyle}>
                    <option value="">Select a flavour…</option>
                    {FLAVOURS.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontWeight: 700,
                      color: "#00205B",
                      cursor: "pointer",
                      marginBottom: 8,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={addCard}
                      onChange={(e) => setAddCard(e.target.checked)}
                    />
                    Add a handwritten card
                  </label>

                  {addCard && (
                    <>
                      <textarea
                        value={cardMessage}
                        onChange={(e) => setCardMessage(e.target.value.slice(0, 200))}
                        rows={4}
                        placeholder="Write your message here... we’ll handwrite this and include it with your order."
                        style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
                      />
                      <p style={{ fontSize: 12, color: "#777", fontWeight: 600, marginTop: 6 }}>
                        Short messages work best. {cardMessage.length}/200
                      </p>
                    </>
                  )}
                </div>

                <div>
                  <label style={labelStyle}>Your Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Smith" style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@example.com" style={inputStyle} />
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={labelStyle}>Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+64 21 000 0000"
                    style={{ ...inputStyle, maxWidth: 320 }}
                  />
                </div>
              </div>
            </div>

            {error && (
              <p style={{ color: "#C04B2B", fontWeight: 700, fontSize: 14, marginTop: 12 }}>{error}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                marginTop: 20,
                width: "100%",
                backgroundColor: loading ? "#aaa" : "#C04B2B",
                color: "#fff",
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 900,
                fontSize: 18,
                padding: "18px 0",
                borderRadius: 50,
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Processing…" : `Pay $${total.toFixed(2)} NZD`}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
