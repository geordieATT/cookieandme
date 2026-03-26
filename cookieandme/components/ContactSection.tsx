"use client";
import { useState } from "react";

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
};

const labelStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: 14,
  color: "#00205B",
  display: "block",
  marginBottom: 6,
};

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !subject || !message) return;
    // Simple mailto fallback — replace with Resend API call if desired
    const mailtoLink = `mailto:cookieandme.nz@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} <${email}>\n\n${message}`)}`;
    window.location.href = mailtoLink;
    setSent(true);
  };

  return (
    <section id="contact" style={{ padding: "72px 24px" }}>
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
          alignItems: "start",
        }}
      >
        {/* Contact form */}
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: 24,
            padding: "40px",
            boxShadow: "0 8px 40px rgba(0,32,91,0.08)",
          }}
        >
          <h2
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 900,
              fontSize: 28,
              color: "#00205B",
              marginBottom: 24,
            }}
          >
            Get in Touch
          </h2>

          {sent ? (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <span style={{ fontSize: 48 }}>🍪</span>
              <p style={{ fontWeight: 800, color: "#00205B", fontSize: 18, marginTop: 12 }}>
                Message sent! We'll be in touch soon.
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={labelStyle}>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Subject</label>
                <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="What's it about?" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  placeholder="Tell us what you need…"
                  style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
                />
              </div>
              <button
                onClick={handleSubmit}
                style={{
                  backgroundColor: "#C04B2B",
                  color: "#fff",
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 900,
                  fontSize: 16,
                  padding: "14px 0",
                  borderRadius: 50,
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#a03a20")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#C04B2B")}
              >
                Send Message
              </button>
            </div>
          )}
        </div>

        {/* Shipping info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              backgroundColor: "#F3F0FC",
              border: "2px solid #9B8EC4",
              borderRadius: 20,
              padding: "32px",
            }}
          >
            <h3
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 900,
                fontSize: 20,
                color: "#00205B",
                marginBottom: 16,
              }}
            >
              🚚 Delivery & Shipping
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 12,
                  padding: "14px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 22 }}>📦</span>
                <div>
                  <p style={{ fontWeight: 800, color: "#00205B", fontSize: 15 }}>$10 Flat Rate NZ-Wide</p>
                  <p style={{ color: "#666", fontSize: 13, fontWeight: 600 }}>On all orders under $125</p>
                </div>
              </div>
              <div
                style={{
                  backgroundColor: "#C04B2B",
                  borderRadius: 12,
                  padding: "14px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 22 }}>🎉</span>
                <div>
                  <p style={{ fontWeight: 800, color: "#fff", fontSize: 15 }}>FREE Delivery – Wellington Region</p>
                  <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 600 }}>On orders over $125</p>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#fff",
              border: "2px solid #E0DCF0",
              borderRadius: 20,
              padding: "28px 32px",
            }}
          >
            <h3
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 900,
                fontSize: 18,
                color: "#00205B",
                marginBottom: 12,
              }}
            >
              📍 Based in Lower Hutt, NZ
            </h3>
            <p style={{ color: "#666", fontWeight: 600, fontSize: 15, lineHeight: 1.6 }}>
              All cookies are baked fresh to order. Custom orders typically take 5–7 business days.
              For urgent orders, please get in touch directly.
            </p>
            <a
              href="mailto:cookieandme.nz@gmail.com"
              style={{
                display: "inline-block",
                marginTop: 14,
                color: "#C04B2B",
                fontWeight: 800,
                fontSize: 15,
                textDecoration: "none",
              }}
            >
              cookieandme.nz@gmail.com →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}