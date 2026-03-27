"use client";

const navItems = [
  { label: "Gallery", href: "#gallery" },
  { label: "Gift Boxes", href: "#gift-boxes" },
  { label: "Custom Cookies", href: "#custom" },
  { label: "Contact", href: "#footer" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" style={{ backgroundColor: "#00205B", color: "#fff", padding: "48px 24px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "start", marginBottom: 40 }}>
        <div>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: 24, marginBottom: 8 }}>
            Cookie and Me
          </p>
          <p style={{ color: "rgba(255,255,255,0.6)", fontWeight: 600, fontSize: 14, maxWidth: 280, marginBottom: 20 }}>
            Handcrafted, custom-designed cookies from Lower Hutt, New Zealand.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <a href="tel:0211757181" style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none", fontWeight: 700, fontSize: 14 }}>
              021 175 7181
            </a>
            <a href="mailto:cookieandme.nz@gmail.com" style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none", fontWeight: 700, fontSize: 14 }}>
              cookieandme.nz@gmail.com
            </a>
            <a href="https://instagram.com/cookieandme_nz" target="_blank" rel="noreferrer" style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none", fontWeight: 700, fontSize: 14 }}>
              @cookieandme_nz
            </a>
          </div>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 4 }}>
          {navItems.map((item) => (
            <a key={item.label} href={item.href} style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: 700, fontSize: 14 }}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.12)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, fontWeight: 600 }}>
          {year} Cookie and Me. All rights reserved.
        </p>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, fontWeight: 600 }}>
          Lower Hutt, New Zealand
        </p>
      </div>
    </footer>
  );
}
