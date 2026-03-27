"use client";

const navItems = [
  { label: "Gallery", href: "#gallery" },
  { label: "Gift Boxes", href: "#gift-boxes" },
  { label: "Custom", href: "#custom" },
  { label: "Contact", href: "#footer" },
];

function RedStar() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#C04B2B" xmlns="http://www.w3.org/2000/svg">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

function PurpleStar() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#9B8EC4" xmlns="http://www.w3.org/2000/svg">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

export default function Header() {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 100, background: "#F7F5F0", borderBottom: "1px solid rgba(0,32,91,0.08)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="#top" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
          <RedStar />
          <span style={{ fontWeight: 900, fontSize: 24, color: "#00205B", fontFamily: "'Nunito', sans-serif" }}>
            Cookie and Me
          </span>
          <PurpleStar />
        </a>

        <nav style={{ display: "flex", gap: 20 }}>
          {navItems.map((item) => (
            <a key={item.label} href={item.href} style={{ color: "#00205B", textDecoration: "none", fontWeight: 800, fontSize: 15, fontFamily: "'Nunito', sans-serif" }}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}