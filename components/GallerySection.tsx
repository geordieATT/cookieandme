"use client";
import { useEffect, useState } from "react";

const SLIDES = [
  { id: 1, label: "Corporate logo cookies" },
  { id: 2, label: "Wedding monogram set" },
  { id: 3, label: "Happy Birthday gift box" },
  { id: 4, label: "Easter cookie collection" },
  { id: 5, label: "Custom anniversary stamp" },
  { id: 6, label: "Chocolate chip homemade" },
];

const REVIEWS = [
  { name: "Sarah M.", initials: "SM", role: "Wedding Client", quote: "Absolutely stunning cookies for our wedding. Every guest was blown away by the detail on the monogram stamps. Will treasure the photos forever.", color: "#9B8EC4" },
  { name: "James T.", initials: "JT", role: "Corporate Client", quote: "We ordered branded cookies for our product launch and the logo reproduction was incredible. Our team loved them and so did our clients.", color: "#C04B2B" },
  { name: "Aroha K.", initials: "AK", role: "Birthday Order", quote: "Ordered a gift box for my mum's 60th and she cried happy tears. The handwritten card was such a lovely touch. Will definitely order again.", color: "#00205B" },
];

function PlaceholderSlide({ label }: { label: string }) {
  return (
    <div style={{ backgroundColor: "#F6F3ED", border: "2px dashed #CFC8E7", borderRadius: 24, width: "100%", aspectRatio: "16 / 9", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="22" stroke="#B7AED9" strokeWidth="2" />
        <path d="M16 30 Q20 22 24 26 Q28 18 32 26" stroke="#B7AED9" strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="18" cy="20" r="3" fill="#B7AED9" />
      </svg>
      <p style={{ color: "#9B8EC4", fontWeight: 700, fontSize: 15 }}>{label}</p>
    </div>
  );
}

export default function GallerySection() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setActive((prev) => (prev + 1) % SLIDES.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setActive((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setActive((prev) => (prev + 1) % SLIDES.length);

  return (
    <section id="gallery" style={{ padding: "60px 20px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <span style={{ color: "#9B8EC4", fontWeight: 800, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", display: "block", marginBottom: 12 }}>
          A little taste of what we do
        </span>
        <h2 style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: 32, color: "#00205B", marginBottom: 32 }}>
          Gallery
        </h2>

        <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ position: "relative", marginBottom: 64 }}>
          <PlaceholderSlide label={SLIDES[active].label} />
          <button type="button" onClick={prev} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", opacity: hovered ? 1 : 0.4, transition: "opacity 0.2s", border: "none", background: "rgba(255,255,255,0.9)", color: "#00205B", width: 42, height: 42, borderRadius: 999, cursor: "pointer", fontSize: 20, fontWeight: 900 }}>{"<"}</button>
          <button type="button" onClick={next} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", opacity: hovered ? 1 : 0.4, transition: "opacity 0.2s", border: "none", background: "rgba(255,255,255,0.9)", color: "#00205B", width: 42, height: 42, borderRadius: 999, cursor: "pointer", fontSize: 20, fontWeight: 900 }}>{">"}</button>
        </div>

        <h3 style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: 28, color: "#00205B", marginBottom: 28, textAlign: "center" }}>
          What Customers are Saying
        </h3>

        <div className="grid-2col" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {REVIEWS.map((r) => (
            <div key={r.name} style={{ backgroundColor: "#fff", border: "2px solid #EAE4F5", borderRadius: 20, padding: "28px", display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 48, height: 48, borderRadius: 999, backgroundColor: r.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 15, flexShrink: 0 }}>
                  {r.initials}
                </div>
                <div>
                  <p style={{ fontWeight: 800, color: "#00205B", fontSize: 15, marginBottom: 2 }}>{r.name}</p>
                  <p style={{ fontWeight: 600, color: "#9B8EC4", fontSize: 13 }}>{r.role}</p>
                </div>
              </div>
              <p style={{ color: "#555", fontWeight: 600, fontSize: 14, lineHeight: 1.7, fontStyle: "italic" }}>
                "{r.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}