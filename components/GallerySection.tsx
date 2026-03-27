"use client";
import { useState } from "react";

const CATEGORIES = ["All", "Custom", "Gift Boxes", "Homemade"];

const GALLERY_ITEMS = [
  { id: 1, category: "Custom", label: "Corporate logo cookies" },
  { id: 2, category: "Custom", label: "Wedding monogram" },
  { id: 3, category: "Custom", label: "Birthday name stamp" },
  { id: 4, category: "Gift Boxes", label: "Happy Birthday box" },
  { id: 5, category: "Gift Boxes", label: "Congratulations box" },
  { id: 6, category: "Gift Boxes", label: "Love You gift set" },
  { id: 7, category: "Homemade", label: "Chocolate chip cookies" },
  { id: 8, category: "Homemade", label: "Classic vanilla" },
  { id: 9, category: "Custom", label: "Anniversary stamp" },
  { id: 10, category: "Gift Boxes", label: "Easter box" },
  { id: 11, category: "Homemade", label: "Ginger cookies" },
  { id: 12, category: "Custom", label: "Baby shower set" },
];

function PlaceholderTile({ label }: { label: string }) {
  return (
    <div
      style={{
        backgroundColor: "#F6F3ED",
        border: "2px dashed #CFC8E7",
        borderRadius: 20,
        aspectRatio: "1 / 1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        padding: 16,
        textAlign: "center",
      }}
    >
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="22" stroke="#B7AED9" strokeWidth="2" />
        <path d="M16 30 Q20 22 24 26 Q28 18 32 26" stroke="#B7AED9" strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="18" cy="20" r="3" fill="#B7AED9" />
      </svg>
      <span style={{ color: "#9B8EC4", fontWeight: 700, fontSize: 13, lineHeight: 1.4 }}>
        {label}
      </span>
    </div>
  );
}

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" style={{ padding: "72px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
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
          A little taste of what we do
        </span>

        <h2
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 900,
            fontSize: 32,
            color: "#00205B",
            marginBottom: 28,
          }}
        >
          Gallery
        </h2>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 36 }}>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "10px 20px",
                  borderRadius: 50,
                  border: isActive ? "2.5px solid #9B8EC4" : "2px solid #E0DCF0",
                  backgroundColor: isActive ? "#F3F0FC" : "#fff",
                  color: isActive ? "#00205B" : "#888",
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 800,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 20,
          }}
        >
          {filtered.map((item) => (
            <PlaceholderTile key={item.id} label={item.label} />
          ))}
        </div>
      </div>
    </section>
  );
}