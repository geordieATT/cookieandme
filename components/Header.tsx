"use client";

export default function Header() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "#F7F5F0",
        borderBottom: "1px solid rgba(0,32,91,0.08)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "18px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        
          href="#top"
          style={{
            fontWeight: 900,
            fontSize: 24,
            color: "#00205B",
            textDecoration: "none",
          }}
        >
          Cookie & Me
        </a>

        <nav style={{ display: "flex", gap: 20 }}>
          {[
            { label: "Gallery", href: "#gallery" },
            { label: "Gift Boxes", href: "#gift-boxes" },
            { label: "Custom", href: "#custom" },
            { label: "Contact", href: "#footer" },
          ].map((item) => (
            
              key={item.label}
              href={item.href}
              style={{
                color: "#00205B",
                textDecoration: "none",
                fontWeight: 800,
                fontSize: 15,
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}