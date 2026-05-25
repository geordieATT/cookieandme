import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Image
        src="/images/wedding-samuel-georgia-cookies-closeup-packaged.jpg"
        alt="Beautifully packaged custom cookies"
        fill
        priority
        style={{ objectFit: "cover", objectPosition: "center 40%" }}
        sizes="100vw"
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(8, 15, 42, 0.56)",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          maxWidth: 700,
          padding: "0 24px",
          paddingTop: 80,
        }}
      >
        <h1
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: "clamp(36px, 5.5vw, 64px)",
            fontWeight: 900,
            color: "#FAFAF8",
            letterSpacing: "-0.02em",
            marginBottom: 20,
            lineHeight: 1.1,
          }}
        >
          Designed With Good Taste
        </h1>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(15px, 2vw, 18px)",
            color: "rgba(250, 250, 248, 0.85)",
            maxWidth: 540,
            margin: "0 auto 40px",
            lineHeight: 1.7,
          }}
        >
          Custom-designed, handcrafted cookies for businesses, events, and every
          occasion worth celebrating.
        </p>
        <div
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="#order"
            className="btn-red"
            style={{ fontSize: 15, padding: "14px 32px" }}
          >
            Order Now
          </a>
          <a
            href="#gallery"
            className="btn-outline-white"
            style={{ fontSize: 15, padding: "14px 32px" }}
          >
            See Our Work
          </a>
        </div>
      </div>
    </section>
  );
}
