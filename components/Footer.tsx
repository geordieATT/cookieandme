import Image from "next/image";

const navLinks = [
  { label: "Gallery", href: "#gallery" },
  { label: "Corporate", href: "#corporate" },
  { label: "Our Story", href: "#about" },
  { label: "Order", href: "#order" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#1B2B6B",
        color: "#FAFAF8",
        padding: "60px 0 32px",
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
              <Image
                src="/images/cookie-and-me-logo.svg.svg"
                alt="Cookie and Me"
                width={140}
                height={40}
                style={{
                  height: 36,
                  width: "auto",
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
            <a
              href="mailto:cookieandme.nz@gmail.com"
              className="footer-link"
            >
              cookieandme.nz@gmail.com
            </a>
            <a href="tel:0211757181" className="footer-link">
              021 175 7181
            </a>
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
