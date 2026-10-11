"use client";

import { useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

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
          style={{ gap: 32, alignItems: "center", flexShrink: 0 }}
          aria-label="Main navigation"
        >
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className="nav-link"
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
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            width: 44,
            height: 44,
            marginRight: -10,
            background: "none",
            border: "none",
            padding: 0,
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
                className="nav-mobile-link"
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
