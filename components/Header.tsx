"use client";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          backgroundColor: "#F7F5F0",
          boxShadow: "0 2px 8px rgba(0,32,91,0.07)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            height: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            <span
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 900,
                fontSize: 22,
                color: "#00205B",
                letterSpacing: "-0.5px",
              }}
            >
              Cookie &amp; Me
            </span>
          </Link>

          {/* Nav */}
          <nav style={{ display: "flex", gap: 32 }}>
            {[
              { label: "Gift Boxes", href: "#gift-boxes" },
              { label: "Custom", href: "#custom" },
              { label: "Contact", href: "#contact" },
            ].map(({ label, href }) => (
              <a
                key={href}
                href={href}
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  color: "#00205B",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C04B2B")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#00205B")}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="#gift-boxes"
            style={{
              backgroundColor: "#C04B2B",
              color: "#fff",
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 800,
              fontSize: 15,
              padding: "10px 22px",
              borderRadius: 50,
              textDecoration: "none",
              transition: "background 0.2s, transform 0.15s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#a03a20";
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#C04B2B";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Order Now
          </a>
        </div>

        {/* Wave divider */}
        <svg
          viewBox="0 0 1440 28"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", width: "100%", height: 28, marginTop: -1 }}
          preserveAspectRatio="none"
        >
          <path
            d="M0,14 C240,28 480,0 720,14 C960,28 1200,0 1440,14 L1440,28 L0,28 Z"
            fill="#F7F5F0"
            stroke="#9B8EC4"
            strokeWidth="2"
            strokeDasharray="0"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </header>
    </>
  );
}
