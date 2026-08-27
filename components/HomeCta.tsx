import Link from "next/link";

export default function HomeCta() {
  return (
    <section style={{ padding: "80px 0", backgroundColor: "#0C0E58" }}>
      <div className="section-container" style={{ textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(24px, 3vw, 34px)",
            color: "#FAFAF8",
            marginBottom: 12,
          }}
        >
          Got something in mind?
        </h2>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 15,
            lineHeight: 1.7,
            color: "rgba(250, 250, 248, 0.78)",
            maxWidth: 480,
            margin: "0 auto 28px",
          }}
        >
          Whether you have a finished design or just a rough idea, we would love to
          hear about it.
        </p>
        <div
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link href="/order" className="btn-red hero-cta">
            Place an Order
          </Link>
          <Link href="/contact" className="btn-outline-white hero-cta">
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
