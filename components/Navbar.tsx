"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const navLinks = [
  { label: "Gallery", href: "#gallery" },
  { label: "Corporate", href: "#corporate" },
  { label: "Our Story", href: "#about" },
  { label: "Order", href: "#order" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: "#FAFAF8",
        borderBottom: "1px solid #E0DFDD",
        boxShadow: scrolled ? "0 2px 12px rgba(27,43,107,0.08)" : "none",
        transition: "box-shadow 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a href="/" aria-label="Cookie and Me home" style={{ flexShrink: 0 }}>
          <Image
            src="/images/cookie-and-me-logo-horizontal.svg"
            alt="Cookie and Me"
            width={220}
            height={64}
            priority
            style={{ width: 180, height: "auto", display: "block" }}
          />
        </a>

        {/* Desktop nav */}
        <nav
          className="nav-links"
          style={{ gap: 36, alignItems: "center", flexShrink: 0 }}
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 500,
                color: "#1B2B6B",
                letterSpacing: "0.015em",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C0392B")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#1B2B6B")}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          style={{
            flexDirection: "column",
            gap: 5,
            background: "none",
            border: "none",
            padding: 4,
            cursor: "pointer",
          }}
        >
          <span
            style={{
              display: "block",
              width: 22,
              height: 2,
              backgroundColor: "#1B2B6B",
              transition: "transform 0.2s, opacity 0.2s",
              transformOrigin: "center",
              transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: 22,
              height: 2,
              backgroundColor: "#1B2B6B",
              transition: "opacity 0.2s",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: "block",
              width: 22,
              height: 2,
              backgroundColor: "#1B2B6B",
              transition: "transform 0.2s, opacity 0.2s",
              transformOrigin: "center",
              transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            backgroundColor: "#FAFAF8",
            borderTop: "1px solid #E0DFDD",
            padding: "4px 0 16px",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "14px 24px",
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                fontWeight: 500,
                color: "#1B2B6B",
                borderBottom: "1px solid #F4F4F2",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
