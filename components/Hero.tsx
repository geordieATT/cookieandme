"use client"
export default function Hero() {
  return (
    <section
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "80px 24px 64px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 64,
        alignItems: "center",
      }}
    >
      {/* Left: image placeholder */}
      <div
        style={{
          backgroundColor: "#E8E3D8",
          borderRadius: 24,
          aspectRatio: "4/3",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 12,
          border: "2px dashed #9B8EC4",
        }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="22" stroke="#9B8EC4" strokeWidth="2" />
          <path d="M16 30 Q20 22 24 26 Q28 18 32 26" stroke="#9B8EC4" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <circle cx="18" cy="20" r="3" fill="#9B8EC4" />
        </svg>
        <span style={{ color: "#9B8EC4", fontWeight: 700, fontSize: 14 }}>
          Lifestyle photo here
        </span>
      </div>

      {/* Right: copy */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
     
          Designed With
          <br />
          Good Taste.
        </h1>

        <p
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 600,
            fontSize: 18,
            color: "#444",
            lineHeight: 1.6,
          }}
        >
          Handcrafted, custom-designed cookies delivered from Lower Hutt.
        </p>

        <div style={{ display: "flex", gap: 14, marginTop: 8 }}>
          <a
            href="#gift-boxes"
            style={{
              backgroundColor: "#C04B2B",
              color: "#fff",
              fontWeight: 800,
              fontSize: 16,
              padding: "14px 30px",
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
            Shop Gift Boxes
          </a>
          <a
            href="#custom"
            style={{
              border: "2px solid #00205B",
              color: "#00205B",
              fontWeight: 800,
              fontSize: 16,
              padding: "12px 28px",
              borderRadius: 50,
              textDecoration: "none",
              transition: "background 0.2s, color 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#00205B";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#00205B";
            }}
          >
            Custom Orders
          </a>
        </div>
      </div>
    </section>
  );
}