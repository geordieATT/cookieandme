"use client";

import { useState } from "react";

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
        <h2
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(26px, 3.5vw, 38px)",
            color: "#1B2B6B",
            marginBottom: 56,
          }}
        >
          Get in Touch
        </h2>

        <div className="two-col" style={{ alignItems: "start", gap: 64 }}>
          {/* Contact details */}
          <div>
            <h3
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 800,
                fontSize: 20,
                color: "#1B2B6B",
                marginBottom: 20,
              }}
            >
              Contact Details
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                marginBottom: 36,
              }}
            >
              <a
                href="tel:0211757181"
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
                021 175 7181
              </a>
              <a
                href="mailto:cookieandme.nz@gmail.com"
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
                cookieandme.nz@gmail.com
              </a>
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

            <div
              style={{
                border: "1.5px solid #D4D9EE",
                borderRadius: 2,
                padding: "24px",
                backgroundColor: "#F4F5FB",
              }}
            >
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: "#444",
                  lineHeight: 1.75,
                }}
              >
                If you have an event date, logo, colour palette, or custom idea
                in mind, send us the details and we will let you know what is
                possible.
              </p>
            </div>
          </div>

          {/* Contact form */}
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
