"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "What We Do", href: "/what-we-do" },
  { label: "End-of-Year", href: "/end-of-year" },
  { label: "Gallery", href: "/gallery" },
  { label: "Our Story", href: "/our-story" },
  { label: "Order", href: "/order" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

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
        backgroundColor: "var(--bg)",
        borderBottom: "1px solid var(--line)",
        boxShadow: scrolled ? "0 2px 12px rgba(20,22,74,0.08)" : "none",
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
        <Link
          href="/"
          aria-label="Cookie and Me home"
          onClick={() => setMenuOpen(false)}
          style={{ flexShrink: 0 }}
        >
          <img
            src="/images/cookieandme-logo-h.svg"
            alt="Cookie and Me"
            style={{ width: 180, height: "auto", display: "block" }}
          />
        </Link>

        {/* Desktop nav */}
        <nav
          className="nav-links"
          style={{ gap: 36, alignItems: "center", flexShrink: 0 }}
          aria-label="Main navigation"
        >
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  fontWeight: active ? 600 : 500,
                  color: active ? "var(--accent-text)" : "var(--ink)",
                  letterSpacing: "0.015em",
                  transition: "color 0.15s",
                  borderBottom: active ? "2px solid var(--accent)" : "2px solid transparent",
                  paddingBottom: 2,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = active ? "var(--accent)" : "var(--ink)")}
              >
                {link.label}
              </Link>
            );
          })}
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
              backgroundColor: "var(--ink)",
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
              backgroundColor: "var(--ink)",
              transition: "opacity 0.2s",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: "block",
              width: 22,
              height: 2,
              backgroundColor: "var(--ink)",
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
            backgroundColor: "var(--bg)",
            borderTop: "1px solid var(--line)",
            padding: "4px 0 16px",
          }}
        >
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "14px 24px",
                  fontFamily: "var(--font-sans)",
                  fontSize: 15,
                  fontWeight: active ? 600 : 500,
                  color: active ? "var(--accent-text)" : "var(--ink)",
                  borderBottom: "1px solid var(--tint)",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
