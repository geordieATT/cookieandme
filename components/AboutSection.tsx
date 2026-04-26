"use client";
import Image from "next/image";

const ABOUT_IMAGES = [
  { src: "/images/IMG-20260423-WA0026.jpg", alt: "3D-printed dinosaur stamps laid out with undecorated cookies" },
  { src: "/images/IMG-20260418-WA0016.jpg", alt: "Gold monogram cookies close-up" },
  { src: "/images/IMG-20260419-WA0088.jpg", alt: "KitchenAid mixer with fondant" },
  { src: "/images/IMG-20260412-WA0046.jpg", alt: "Cookie and Me branded Halloween cookies in purple, orange and black" },
];

export default function AboutSection() {
  return (
    <section id="about" style={{ padding: "40px 20px 64px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="grid-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <span style={{ color: "#9B8EC4", fontWeight: 800, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", display: "block", marginBottom: 12 }}>
                Handmade with heart in Lower Hutt
              </span>
              <h2 style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: 32, color: "#00205B", marginBottom: 16 }}>
                Our Story
              </h2>
            </div>
            <p style={{ color: "#666", fontWeight: 600, fontSize: 15, lineHeight: 1.7 }}>
              Cookie & Me started from a love of making everyday moments feel a little more special. Every cookie is baked and decorated by hand in Lower Hutt, with care put into every detail — from the flavour to the finish.
            </p>
            <p style={{ color: "#666", fontWeight: 600, fontSize: 15, lineHeight: 1.7 }}>
              What sets us apart is our custom 3D-printed stamps. We design and print our own tools to reproduce logos, monograms, and intricate patterns with precision you just can not get any other way.
            </p>
            <p style={{ color: "#666", fontWeight: 600, fontSize: 15, lineHeight: 1.7 }}>
              Whether you are after a gift box for someone special or a hundred branded cookies for a corporate event, we put the same love into every single one.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {ABOUT_IMAGES.map(({ src, alt }) => (
              <div key={src} style={{ position: "relative", borderRadius: 16, overflow: "hidden", paddingBottom: "100%" }}>
                <Image
                  src={src}
                  alt={alt}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
