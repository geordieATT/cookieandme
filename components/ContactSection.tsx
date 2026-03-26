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

const faqItems = [
  {
    question: "What are your lead times?",
    answer:
      "Standard orders usually require 5–7 days. If you need something sooner, get in touch and we’ll let you know what’s possible.",
  },
  {
    question: "Where do you ship to?",
    answer:
      "We currently deliver within Wellington, Lower Hutt, and Upper Hutt. Delivery is free for orders over $150, otherwise a flat $10 fee applies. Nationwide shipping is coming soon.",
  },
  {
    question: "How long do the cookies last?",
    answer:
      "Our cookies typically last 2–3 weeks when kept sealed and stored in a cool, dry place.",
  },
  {
    question: "Do you offer pickup?",
    answer: "Yes, free pickup is available in Lower Hutt.",
  },
  {
    question: "What flavours do you offer?",
    answer: "Vanilla, Chocolate, Chocolate Chip, Ginger, and Spice.",
  },
  {
    question: "What ingredients do your cookies contain?",
    answer: "We use high-quality ingredients in all our cookies. Full ingredient details will be added soon.",
  },
  {
    question: "Can I use my own logo or design?",
    answer:
      "Yes. For custom cookies, you can upload your logo or artwork and we’ll confirm what works best.",
  },
  {
    question: "What is the minimum order for custom cookies?",
    answer: "Minimum order is 12 cookies.",
  },
  {
    question: "Do you do urgent orders?",
    answer: "Depending on availability, get in touch and we’ll let you know what’s possible.",
  },
];

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    if (!name || !email || !subject || !message) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderType: "contact",
          name,
          email,
          subject,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSent(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" style={{ padding: "72px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 28 }}>
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
            Helpful details before you order
          </span>

          <h2
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 900,
              fontSize: 32,
              color: "#00205B",
              marginBottom: 10,
            }}
          >
            FAQs
          </h2>
        </div>

        <div style={{ display: "grid", gap: 14, marginBottom: 44 }}>
          {faqItems.map((item) => (
            <details
              key={item.question}
              style={{
                backgroundColor: "#fff",
                border: "2px solid #EAE4F5",
                borderRadius: 18,
                padding: "18px 20px",
              }}
            >
              <summary
                style={{
                  cursor: "pointer",
                  fontWeight: 800,
                  color: "#00205B",
                  listStyle: "none",
                }}
              >
                {item.question}
              </summary>
              <p
                style={{
                  marginTop: 12,
                  color: "#555",
                  lineHeight: 1.7,
                  fontWeight: 600,
                }}
              >
                {item.answer}
              </p>
            </details>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 0.8fr",
            gap: 40,
            alignItems: "start",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: 24,
              padding: "40px",
              boxShadow: "0 8px 40px rgba(0,32,91,0.08)",
            }}
          >
            <h3
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 900,
                fontSize: 28,
                color: "#00205B",
                marginBottom: 24,
              }}
            >
              Get in Touch
            </h3>

            {sent ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <span style={{ fontSize: 48 }}>🍪</span>
                <p style={{ fontWeight: 800, color: "#00205B", fontSize: 18, marginTop: 12 }}>
                  Message sent. We’ll be in touch soon.
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
                  <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="What’s it about?" style={inputStyle} />
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

                {error && <p style={{ color: "#C04B2B", fontWeight: 700, fontSize: 14 }}>{error}</p>}

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{
                    backgroundColor: loading ? "#aaa" : "#C04B2B",
                    color: "#fff",
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 900,
                    fontSize: 16,
                    padding: "14px 0",
                    borderRadius: 50,
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? "Sending…" : "Send Message"}
                </button>
              </div>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div
              style={{
                backgroundColor: "#F3F0FC",
                border: "2px solid #9B8EC4",
                borderRadius: 20,
                padding: "28px 32px",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 900,
                  fontSize: 20,
                  color: "#00205B",
                  marginBottom: 12,
                }}
              >
                Need something special?
              </h3>
              <p style={{ color: "#555", fontWeight: 600, fontSize: 15, lineHeight: 1.7 }}>
                If you have an event date, logo, colour palette, or custom idea in mind, send us the details and we’ll let you know what’s possible.
              </p>
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
                Contact
              </h3>
              <a
                href="mailto:cookieandme.nz@gmail.com"
                style={{
                  display: "inline-block",
                  color: "#C04B2B",
                  fontWeight: 800,
                  fontSize: 15,
                  textDecoration: "none",
                }}
              >
                cookieandme.nz@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}