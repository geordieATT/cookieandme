"use client";

import { useState } from "react";

const navLinks = [
  { label: "Gallery", href: "#gallery" },
  { label: "What We Do", href: "#corporate" },
  { label: "Our Story", href: "#about" },
  { label: "Order", href: "#order" },
  { label: "Contact", href: "#contact" },
];

function CopyFooterButton({ text, display }: { text: string; display: string }) {
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
      className="footer-link"
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      {copied ? "Copied!" : display}
    </button>
  );
}

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#0C0E58",
        color: "#FAFAF8",
        padding: "60px 0 32px",
        borderTop: "4px solid #FB3D03",
      }}
    >
      <div className="section-container">
        <div className="footer-main" style={{ marginBottom: 48 }}>
          {/* Logo + tagline */}
          <div>
            <a
              href="/"
              aria-label="Cookie and Me home"
              style={{ display: "inline-block", marginBottom: 16 }}
            >
              <img
                src="/images/cookieandme-logo-h.svg"
                alt="Cookie and Me"
                style={{
                  width: 160,
                  height: "auto",
                  display: "block",
                  filter: "brightness(0) invert(1)",
                }}
              />
            </a>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: "rgba(250, 250, 248, 0.5)",
                lineHeight: 1.7,
                maxWidth: 220,
              }}
            >
              Designed With Good Taste.
              <br />
              Handcrafted in Lower Hutt, New Zealand.
            </p>
          </div>

          {/* Nav links */}
          <nav
            aria-label="Footer navigation"
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="footer-link">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Contact */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <a
              href="https://instagram.com/cookieandme_nz"
              target="_blank"
              rel="noreferrer"
              className="footer-link"
            >
              @cookieandme_nz
            </a>
            <CopyFooterButton
              text="cookieandme.nz@gmail.com"
              display="cookieandme.nz@gmail.com"
            />
            <CopyFooterButton text="021 175 7181" display="021 175 7181" />
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(250, 250, 248, 0.1)",
            paddingTop: 24,
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              color: "rgba(250, 250, 248, 0.3)",
            }}
          >
            &copy; 2026 Cookie &amp; Me. Handcrafted in Lower Hutt, New
            Zealand.
          </p>
        </div>
      </div>
    </footer>
  );
}
