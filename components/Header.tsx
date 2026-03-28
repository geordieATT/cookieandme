"use client";
import { useState } from "react";

const navItems = [
  { label: "Gallery", href: "#gallery" },
  { label: "Gift Boxes", href: "#gift-boxes" },
  { label: "Custom", href: "#custom" },
  { label: "Contact", href: "#footer" },
];

function RedStar() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#C04B2B">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

function PurpleStar() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#9B8EC4">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 100, background: "#F7F5F0", borderBottom: "1px solid rgba(0,32,91,0.08)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="#top" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
          <RedStar />
          <span style={{ fontWeight: 900, fontSize: 22, color: "#00205B", fontFamily: "'Nunito', sans-serif" }}>Cookie and Me</span>
          <PurpleStar />
        </a>

        {/* Desktop nav */}
        <nav className="hide-mobile" style={{ display: "flex", gap: 20 }}>
          {navItems.map((item) => (
            <a key={item.label} href={item.href} style={{ color: "#00205B", textDecoration: "none", fontWeight: 800, fontSize: 15, fontFamily: "'Nunito', sans-serif" }}>
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 4 }}
          className="show-mobile-flex"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            {menuOpen
              ? <path d="M6 6l12 12M6 18L18 6" stroke="#00205B" strokeWidth="2.5" strokeLinecap="round" />
              : <path d="M3 6h18M3 12h18M3 18h18" stroke="#00205B" strokeWidth="2.5" strokeLinecap="round" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ backgroundColor: "#F7F5F0", borderTop: "1px solid rgba(0,32,91,0.08)", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
          {navItems.map((item) => (
            <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)} style={{ color: "#00205B", textDecoration: "none", fontWeight: 800, fontSize: 16, fontFamily: "'Nunito', sans-serif" }}>
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}