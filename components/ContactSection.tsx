"use client";

import { useState } from "react";

function CopyButton({ text, display }: { text: string; display: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: do nothing
    }
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif",
        fontSize: 15,
        fontWeight: 500,
        color: copied ? "#1B2B6B" : "#1B2B6B",
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        gap: 8,
        transition: "color 0.15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#C0392B")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "#1B2B6B")}
    >
      {copied ? "Copied!" : display}
    </button>
  );
}

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
    <section id="contact" style={{ padding: "96px 0" }}>
      <div className="section-container">
        <div className="two-col" style={{ alignItems: "start", gap: 72 }}>
          {/* Left: intro + contact details */}
          <div>
            <h2
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(26px, 3.5vw, 38px)",
                color: "#1B2B6B",
                marginBottom: 16,
              }}
            >
              Get in Touch
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                color: "#555",
                lineHeight: 1.75,
                marginBottom: 40,
              }}
            >
              Whether you have a specific idea or just want to explore what is
              possible, we would love to hear from you. Fill out the form or
              reach us directly below.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <CopyButton text="021 175 7181" display="021 175 7181" />
              <CopyButton
                text="cookieandme.nz@gmail.com"
                display="cookieandme.nz@gmail.com"
              />
              <a
                href="https://instagram.com/cookieandme_nz"
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 15,
                  fontWeight: 500,
                  color: "#1B2B6B",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#C0392B")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "#1B2B6B")
                }
              >
                @cookieandme_nz on Instagram
              </a>
            </div>
          </div>

          {/* Right: form */}
          <div>
            {sent ? (
              <div
                style={{
                  padding: "48px 32px",
                  textAlign: "center",
                  border: "1.5px solid #E0DFDD",
                  borderRadius: 2,
                }}
              >
                <p
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 800,
                    fontSize: 20,
                    color: "#1B2B6B",
                    marginBottom: 8,
                  }}
                >
                  Message sent.
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    color: "#666",
                  }}
                >
                  We will be in touch soon.
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div className="form-two-col">
                  <div>
                    <label className="form-label">Name *</label>
                    <input
                      type="text"
                      className="form-field"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
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
                    />
                  </div>
                </div>
                <div>
                  <label className="form-label">Subject *</label>
                  <input
                    type="text"
                    className="form-field"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="What is your enquiry about?"
                  />
                </div>
                <div>
                  <label className="form-label">Message *</label>
                  <textarea
                    className="form-field"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    placeholder="Tell us what you need..."
                    style={{ resize: "vertical" }}
                  />
                </div>
                {error && (
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      color: "#C0392B",
                    }}
                  >
                    {error}
                  </p>
                )}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="btn-navy"
                  style={{
                    width: "100%",
                    padding: "13px",
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
