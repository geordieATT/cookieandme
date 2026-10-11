"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "What We Do", href: "/what-we-do" },
  { label: "End-of-Year", href: "/end-of-year" },
  { label: "Gallery", href: "/gallery" },
  { label: "Our Story", href: "/our-story" },
  { label: "Order", href: "/order" },
  { label: "Contact", href: "/contact" },
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
        backgroundColor: "var(--ink)",
        color: "var(--on-dark)",
        padding: "64px 0 32px",
      }}
    >
      <div className="section-container">
        <div className="footer-main" style={{ marginBottom: 48 }}>
          {/* Logo + tagline */}
          <div>
            <Link
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
            </Link>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 13,
                color: "var(--on-dark-muted)",
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
              <Link key={link.href} href={link.href} className="footer-link">
                {link.label}
              </Link>
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
            borderTop: "1px solid var(--on-dark-line)",
            paddingTop: 24,
            display: "flex",
            flexWrap: "wrap",
            gap: "8px 20px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              color: "var(--on-dark-muted)",
              margin: 0,
            }}
          >
            &copy; 2026 Cookie &amp; Me. Handcrafted in Lower Hutt, New
            Zealand.
          </p>
          <div style={{ display: "flex", gap: 18 }}>
            <Link
              href="/terms#terms"
              className="footer-link"
              style={{ fontSize: 13 }}
            >
              Terms &amp; Conditions
            </Link>
            <Link
              href="/terms#privacy"
              className="footer-link"
              style={{ fontSize: 13 }}
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
