"use client";
import Image from "next/image";

export default function Hero() {
  const heading = "Designed With Good Taste";

  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 20px 48px" }}>
      <div className="grid-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
        <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", paddingBottom: "75%" }}>
          <Image
            src="/images/IMG_20260419_143712_514.jpg"
            alt="Samuel and Georgia wedding cookies close-up"
            fill
            style={{ objectFit: "cover" }}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h1 className="hero-heading" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "#0C0E58", lineHeight: 1.15 }}>
            {heading}
          </h1>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600, fontSize: 18, color: "#444", lineHeight: 1.6 }}>
            Handcrafted, custom-designed cookies delivered from Lower Hutt.
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 8, flexWrap: "wrap" }}>
            <a href="#custom" style={{ backgroundColor: "#FB3D03", color: "#fff", fontWeight: 800, fontSize: 16, padding: "14px 30px", borderRadius: 50, textDecoration: "none", display: "inline-block" }}>
              Order Custom Cookies
            </a>
            <a href="#gallery" style={{ border: "2px solid #0C0E58", color: "#0C0E58", fontWeight: 800, fontSize: 16, padding: "12px 28px", borderRadius: 50, textDecoration: "none", display: "inline-block" }}>
              View Gallery
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}