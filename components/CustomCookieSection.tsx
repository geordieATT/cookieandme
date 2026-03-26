"use client";
import { useState, useRef, useCallback } from "react";

const FLAVOURS = ["Vanilla", "Chocolate", "Chocolate Chip", "Ginger", "Spiced"];

function getPriceEach(qty: number): number {
  if (qty < 12) return 0;
  if (qty < 24) return 6.0;
  if (qty < 50) return 5.8;
  if (qty < 100) return 5.5;
  if (qty < 200) return 5.0;
  if (qty < 300) return 4.5;
  if (qty < 500) return 4.25;
  return 4.0;
}

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

export default function CustomCookieSection() {
  const [quantity, setQuantity] = useState<string>("50");
  const [flavour, setFlavour] = useState("");
  const [colour, setColour] = useState("#9B8EC4");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [designBrief, setDesignBrief] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const qty = parseInt(quantity, 10) || 0;
  const validQty = qty >= 12 ? qty : 0;
  const priceEach = validQty ? getPriceEach(validQty) : 0;
  const subtotal = validQty * priceEach;

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && ["image/png", "image/jpeg", "image/svg+xml"].includes(file.type)) {
      setLogoFile(file);
    } else {
      setError("Please upload a PNG, JPG, or SVG file.");
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogoFile(file);
  };

  const handleSubmit = async () => {
    setError("");
    if (!flavour || !name || !email || !phone) {
      setError("Please fill in all required fields.");
      return;
    }
    if (qty < 12) {
      setError("Minimum order is 12 cookies.");
      return;
    }
    setLoading(true);
    try {
      // Upload logo to a public URL if provided
      // For now we send the file name; in production you'd upload to Vercel Blob / S3 first
      let logoUrl = "";
      if (logoFile) {
        // Placeholder: in production, upload the file and get a URL
        // e.g. using Vercel Blob: const { url } = await put(logoFile.name, logoFile, { access: 'public' });
        logoUrl = `[Logo: ${logoFile.name} — upload to Vercel Blob or S3 in production]`;
      }

      // 1. Notification email
      await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderType: "custom",
          quantity: qty,
          priceEach,
          flavour,
          colour,
          logoUrl,
          designBrief,
          name,
          email,
          phone,
          companyName,
          subtotal,
          description: `Custom Logo Cookies × ${qty} (${flavour})`,
        }),
      });

      // 2. Stripe checkout
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderType: "custom",
          name,
          email,
          subtotal,
          description: `Custom Logo Cookies × ${qty} (${flavour})`,
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
    <section
      id="custom"
      style={{
        background: "linear-gradient(160deg, #00205B 0%, #0a2d7a 100%)",
        padding: "72px 24px",
      }}
    >
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 40, textAlign: "center" }}>
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
            ✦ Design Lab ✦
          </span>
          <h2
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 900,
              fontSize: 36,
              color: "#fff",
              marginBottom: 8,
            }}
          >
            Custom Logo Cookies
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600, fontSize: 16 }}>
            Your brand, your flavour, your moment. Minimum order: 12.
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: 28,
            padding: "48px",
            boxShadow: "0 16px 64px rgba(0,0,0,0.25)",
          }}
        >
          {/* Quantity + live price */}
          <div style={{ marginBottom: 32 }}>
            <label style={labelStyle}>Quantity</label>
            <input
              type="number"
              min={12}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              style={{
                ...inputStyle,
                fontSize: 28,
                fontWeight: 900,
                padding: "16px 20px",
                width: 180,
                textAlign: "center",
                color: "#00205B",
              }}
            />
            {qty > 0 && qty < 12 && (
              <p style={{ color: "#C04B2B", fontWeight: 700, fontSize: 13, marginTop: 6 }}>
                Minimum order is 12 cookies.
              </p>
            )}

            {/* Live price engine */}
            {validQty >= 12 && (
              <div
                style={{
                  marginTop: 16,
                  padding: "16px 20px",
                  backgroundColor: "#F3F0FC",
                  borderRadius: 14,
                  border: "2px solid #9B8EC4",
                  display: "inline-block",
                }}
              >
                <span style={{ fontWeight: 700, color: "#555", fontSize: 15 }}>
                  Quantity: {validQty}
                </span>
                <span style={{ margin: "0 10px", color: "#ccc" }}>|</span>
                <span style={{ fontWeight: 700, color: "#555", fontSize: 15 }}>
                  Price: ${priceEach.toFixed(2)} each
                </span>
                <span style={{ margin: "0 10px", color: "#ccc" }}>|</span>
                <span style={{ fontWeight: 900, color: "#00205B", fontSize: 17 }}>
                  Subtotal: ${subtotal.toFixed(2)}
                </span>
              </div>
            )}
          </div>

          {/* Customiser grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
            <div>
              <label style={labelStyle}>Flavour</label>
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
              <label style={labelStyle}>Fondant Colour</label>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <input
                  type="color"
                  value={colour}
                  onChange={(e) => setColour(e.target.value)}
                  style={{
                    width: 52,
                    height: 48,
                    border: "2px solid #E0DCF0",
                    borderRadius: 10,
                    cursor: "pointer",
                    padding: 2,
                    backgroundColor: "#fff",
                  }}
                />
                <span style={{ fontWeight: 700, color: "#555", fontSize: 15 }}>{colour}</span>
              </div>
              <p style={{ fontSize: 12, color: "#999", fontWeight: 600, marginTop: 6, lineHeight: 1.4 }}>
                <em>Fondant colours may vary slightly from screen. We will confirm the closest match when we contact you.</em>
              </p>
            </div>

            {/* File upload */}
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Logo File (PNG, JPG, or SVG)</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                style={{
                  border: `2px dashed ${isDragging ? "#9B8EC4" : "#E0DCF0"}`,
                  borderRadius: 16,
                  padding: "32px",
                  textAlign: "center",
                  cursor: "pointer",
                  backgroundColor: isDragging ? "#F3F0FC" : "#FAFAF8",
                  transition: "all 0.2s",
                }}
              >
                {logoFile ? (
                  <div>
                    <span style={{ fontSize: 28 }}>✅</span>
                    <p style={{ fontWeight: 700, color: "#00205B", marginTop: 8 }}>{logoFile.name}</p>
                    <p style={{ color: "#888", fontSize: 13, marginTop: 4 }}>Click to replace</p>
                  </div>
                ) : (
                  <div>
                    <span style={{ fontSize: 32 }}>📁</span>
                    <p style={{ fontWeight: 700, color: "#555", marginTop: 8 }}>
                      Drag & drop your logo here, or click to browse
                    </p>
                    <p style={{ color: "#aaa", fontSize: 13, marginTop: 4 }}>PNG, JPG, or SVG</p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".png,.jpg,.jpeg,.svg"
                style={{ display: "none" }}
                onChange={handleFileInput}
              />
            </div>

            {/* Design brief */}
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Design Brief</label>
              <textarea
                value={designBrief}
                onChange={(e) => setDesignBrief(e.target.value)}
                placeholder="Describe your vision — colours, text, special requests…"
                rows={4}
                style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
              />
            </div>
          </div>

          {/* Personal info */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 8 }}>
            <div>
              <label style={labelStyle}>Your Name *</label>
              <input type="text" placeholder="Jane Smith" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Email *</label>
              <input type="email" placeholder="jane@example.com" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Phone *</label>
              <input type="tel" placeholder="+64 21 000 0000" value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Company Name</label>
              <input type="text" placeholder="Acme Co. (optional)" value={companyName} onChange={(e) => setCompanyName(e.target.value)} style={inputStyle} />
            </div>
          </div>

          {error && (
            <p style={{ color: "#C04B2B", fontWeight: 700, fontSize: 14, marginTop: 8 }}>{error}</p>
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
            {loading
              ? "Processing…"
              : validQty >= 12
              ? `Order Custom Cookies – $${subtotal.toFixed(2)}`
              : "Order Custom Cookies"}
          </button>
        </div>
      </div>
    </section>
  );
}
