import Link from "next/link";

export default function HomeCta() {
  return (
    <section style={{ padding: "80px 0", backgroundColor: "var(--ink)" }}>
      <div className="section-container" style={{ textAlign: "center" }}>
        <h2
          style={{
            color: "var(--on-dark)",
            marginBottom: 12,
          }}
        >
          Got something in mind?
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 17,
            lineHeight: 1.65,
            color: "var(--on-dark-muted)",
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
