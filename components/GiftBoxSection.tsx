"use client";
import { useState } from "react";

const PACKS = [
  { size: 6, price: 39.9, label: "6 Pack", sub: "Perfect for a sweet treat" },
  { size: 12, price: 72.0, label: "12 Pack", sub: "Great for sharing" },
  { size: 24, price: 120.0, label: "24 Pack", sub: "Ideal for events" },
];

const FLAVOURS = ["Vanilla", "Chocolate", "Chocolate Chip", "Ginger", "Spiced"];

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

export default function GiftBoxSection() {
  const [selectedPack, setSelectedPack] = useState<number | null>(null);
  const [flavour, setFlavour] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const pack = PACKS.find((p) => p.size === selectedPack);
  const total = pack ? pack.price : 0;

  const handleSubmit = async () => {
    setError("");
    if (!selectedPack || !flavour || !name || !email || !phone) {
      setError("Please fill in all fields and select a pack size.");
      return;
    }
    setLoading(true);
    try {
      // 1. Send notification email
      await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderType: "giftbox",
          packSize: selectedPack,
          flavour,
          name,
          email,
          phone,
          subtotal: total,
          description: `Cookie & Me ${selectedPack} Pack – ${flavour}`,
        }),
      });

      // 2. Create Stripe session and redirect
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderType: "giftbox",
          name,
          email,
          subtotal: total,
          description: `Cookie & Me ${selectedPack} Pack – ${flavour}`,
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
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        {/* Floating white card */}
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: 28,
            padding: "48px",
            boxShadow: "0 8px 48px rgba(0,32,91,0.10)",
          }}
        >
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
          <p style={{ color: "#666", fontWeight: 600, marginBottom: 36, fontSize: 15 }}>
            Beautifully packaged, handcrafted cookies — ready to gift.
          </p>

          {/* Pack cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 32 }}>
            {PACKS.map((p) => {
              const isSelected = selectedPack === p.size;
              return (
                <button
                  key={p.size}
                  onClick={() => setSelectedPack(p.size)}
                  style={{
                    border: isSelected ? "2.5px solid #9B8EC4" : "2px solid #E0DCF0",
                    borderRadius: 18,
                    padding: "24px 16px",
                    cursor: "pointer",
                    backgroundColor: isSelected ? "#F3F0FC" : "#fff",
                    textAlign: "center",
                    transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
                    boxShadow: isSelected
                      ? "0 0 0 3px rgba(155,142,196,0.20)"
                      : "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = "#9B8EC4";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(155,142,196,0.15)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = "#E0DCF0";
                      e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
                    }
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      fontWeight: 900,
                      fontSize: 22,
                      color: "#00205B",
                    }}
                  >
                    {p.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      fontWeight: 700,
                      fontSize: 20,
                      color: "#C04B2B",
                      margin: "6px 0 4px",
                    }}
                  >
                    ${p.price.toFixed(2)}
                  </div>
                  <div style={{ color: "#888", fontSize: 13, fontWeight: 600 }}>{p.sub}</div>
                </button>
              );
            })}
          </div>

          {/* Form fields */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ fontWeight: 700, fontSize: 14, color: "#00205B", display: "block", marginBottom: 6 }}>
                Flavour
              </label>
              <select
                value={flavour}
                onChange={(e) => setFlavour(e.target.value)}
                style={inputStyle}
              >
                <option value="">Select a flavour…</option>
                {FLAVOURS.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontWeight: 700, fontSize: 14, color: "#00205B", display: "block", marginBottom: 6 }}>
                Your Name
              </label>
              <input
                type="text"
                placeholder="Jane Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ fontWeight: 700, fontSize: 14, color: "#00205B", display: "block", marginBottom: 6 }}>
                Email
              </label>
              <input
                type="email"
                placeholder="jane@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ fontWeight: 700, fontSize: 14, color: "#00205B", display: "block", marginBottom: 6 }}>
                Phone
              </label>
              <input
                type="tel"
                placeholder="+64 21 000 0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ ...inputStyle, maxWidth: 320 }}
              />
            </div>
          </div>

          {error && (
            <p style={{ color: "#C04B2B", fontWeight: 700, fontSize: 14, marginTop: 16 }}>
              {error}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              marginTop: 28,
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
              transition: "background 0.2s, transform 0.15s",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = "#a03a20";
                e.currentTarget.style.transform = "scale(1.01)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = loading ? "#aaa" : "#C04B2B";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {loading ? "Processing…" : `Pay $${total.toFixed(2)} NZD`}
          </button>
        </div>
      </div>
    </section>
  );
}
