export default function Footer() {
  return (
    <footer>
      {/* Wavy transition */}
      <svg
        viewBox="0 0 1440 48"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", width: "100%", marginBottom: -2 }}
        preserveAspectRatio="none"
      >
        {/* Three wave lines — orange, lavender, white */}
        <path
          d="M0,24 C360,48 720,0 1080,24 C1260,36 1380,20 1440,24"
          fill="none"
          stroke="#C04B2B"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M0,32 C360,56 720,8 1080,32 C1260,44 1380,28 1440,32"
          fill="none"
          stroke="#9B8EC4"
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M0,40 C360,64 720,16 1080,40 C1260,52 1380,36 1440,40 L1440,48 L0,48 Z"
          fill="#00205B"
          stroke="#fff"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Footer body */}
      <div
        style={{
          backgroundColor: "#00205B",
          padding: "48px 24px 32px",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          {/* Left: wordmark */}
          <div>
            <span
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 900,
                fontSize: 24,
                color: "#fff",
                letterSpacing: "-0.5px",
              }}
            >
              Cookie &amp; Me
            </span>
          </div>

          {/* Center: tagline */}
          <div style={{ textAlign: "center" }}>
            <span
              style={{
                color: "#9B8EC4",
                fontWeight: 800,
                fontSize: 14,
                letterSpacing: "0.15em",
              }}
            >
              ★ Designed With Good Taste ★
            </span>
          </div>

          {/* Right: social + email */}
          <div style={{ display: "flex", gap: 20, justifyContent: "flex-end", alignItems: "center" }}>
            {/* Instagram */}
            <a
              href="https://instagram.com/cookieandme_nz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{
                color: "rgba(255,255,255,0.8)",
                transition: "color 0.2s",
                display: "flex",
                alignItems: "center",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C04B2B")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>

            {/* Email */}
            <a
              href="mailto:cookieandme.nz@gmail.com"
              style={{
                color: "rgba(255,255,255,0.8)",
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 700,
                fontSize: 14,
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C04B2B")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
            >
              cookieandme.nz@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 20,
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "rgba(255,255,255,0.45)",
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            © 2026 Cookie &amp; Me. Lower Hutt, New Zealand.
          </p>
        </div>
      </div>
    </footer>
  );
}
