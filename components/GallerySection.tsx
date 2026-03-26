"use client";
import { useState } from "react";

const galleryItems = [
  "Branded cookies",
  "Gift box set",
  "Behind the scenes baking",
  "Packaging and ribbon",
];

const reviews = [
  {
    quote: "They looked incredible and tasted even better.",
    name: "Happy customer",
  },
  {
    quote: "Such a cool idea for client gifts. Everyone remembered them.",
    name: "Corporate order",
  },
  {
    quote: "Beautifully made and so thoughtful. They felt really special.",
    name: "Gift box customer",
  },
];

function PlaceholderImage({ label }: { label: string }) {
  return (
    <div
      style={{
        border: "2px dashed #CFC8E7",
        borderRadius: 28,
        backgroundColor: "#F6F3ED",
        minHeight: 420,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 24,
      }}
    >
      <div>
        <div
          style={{
            width: 84,
            height: 84,
            border: "2px dashed #B7AED9",
            borderRadius: 20,
            margin: "0 auto 18px",
          }}
        />
        <p style={{ color: "#9B8EC4", fontWeight: 800, fontSize: 18 }}>{label}</p>
      </div>
    </div>
  );
}

export default function GallerySection() {
  const [active, setActive] = useState(0);

  return (
    <section id="gallery" style={{ padding: "72px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: 36,
            alignItems: "start",
          }}
        >
          <div>
            <span
              style={{
                color: "#9B8EC4",
                fontWeight: 800,
                fontSize: 13,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 12,
              }}
            >
              A little look behind the scenes
            </span>

            <h2
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 900,
                fontSize: 32,
                color: "#00205B",
                marginBottom: 8,
              }}
            >
              Gallery
            </h2>

            <p style={{ color: "#666", fontWeight: 600, marginBottom: 22, fontSize: 15, lineHeight: 1.6 }}>
              Add your cookie photos, packing shots, and baking moments here. For now I’ve used clean placeholder frames so the layout is ready.
            </p>

            <PlaceholderImage label={galleryItems[active]} />

            <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
              {galleryItems.map((item, index) => {
                const isActive = active === index;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setActive(index)}
                    style={{
                      border: isActive ? "2px solid #9B8EC4" : "2px solid #E0DCF0",
                      backgroundColor: isActive ? "#F3F0FC" : "#fff",
                      color: "#00205B",
                      borderRadius: 999,
                      padding: "10px 14px",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h3
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 900,
                fontSize: 24,
                color: "#00205B",
                marginBottom: 18,
              }}
            >
              Kind words
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {reviews.map((review) => (
                <div
                  key={review.quote}
                  style={{
                    backgroundColor: "#fff",
                    border: "2px solid #EAE4F5",
                    borderRadius: 22,
                    padding: 24,
                    boxShadow: "0 6px 22px rgba(0,32,91,0.05)",
                  }}
                >
                  <p
                    style={{
                      fontSize: 16,
                      lineHeight: 1.7,
                      color: "#2B2B2B",
                      fontWeight: 700,
                      marginBottom: 12,
                    }}
                  >
                    “{review.quote}”
                  </p>
                  <p style={{ color: "#9B8EC4", fontWeight: 800, fontSize: 14 }}>{review.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}