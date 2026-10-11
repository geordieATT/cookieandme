import Link from "next/link";

export default function HomeCta() {
  return (
    <section style={{ padding: "88px 0", backgroundColor: "var(--tint)" }}>
      <div className="section-container" style={{ textAlign: "center" }}>
        <h2 style={{ marginBottom: 12 }}>Got an idea?</h2>
        <p
          style={{
            color: "var(--text)",
            maxWidth: 480,
            margin: "0 auto 32px",
          }}
        >
          Send us a logo, a sketch or just a rough thought and we&apos;ll tell
          you what&apos;s possible.
        </p>
        <div className="hero-actions" style={{ justifyContent: "center" }}>
          <Link href="/contact" className="btn-red hero-cta">
            Get in touch
          </Link>
          <Link href="/order" className="text-link">
            Place an order
          </Link>
        </div>
      </div>
    </section>
  );
}
