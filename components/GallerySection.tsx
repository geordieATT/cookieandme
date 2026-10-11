"use client";

import { useState } from "react";
import Image from "next/image";
import {
  GALLERY_CATEGORIES,
  GALLERY_PHOTOS,
  type GalleryCategory,
} from "@/lib/gallery";

// Only offer filters for categories that actually have photos, so nobody
// clicks into an empty grid.
const usedCategories = GALLERY_CATEGORIES.filter((c) =>
  GALLERY_PHOTOS.some((p) => p.category === c)
);

// Images in the first screen load straight away instead of waiting.
const EAGER_COUNT = 6;

export default function GallerySection() {
  const [filter, setFilter] = useState<GalleryCategory | "All">("All");
  const photos =
    filter === "All"
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.category === filter);

  return (
    <section id="gallery" style={{ padding: "72px 0 96px" }}>
      <div className="section-container">
        <h1 style={{ marginBottom: 20 }}>Recent work</h1>

        <div className="gallery-filters" role="group" aria-label="Filter photos">
          {(["All", ...usedCategories] as const).map((c) => (
            <button
              key={c}
              type="button"
              className="gallery-filter"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {photos.map((img, i) => (
            <div key={img.src} className="gallery-item">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={filter === "All" && i < EAGER_COUNT}
                style={{ objectFit: "cover", objectPosition: img.position }}
                sizes="(max-width: 1024px) 50vw, 384px"
              />
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40 }}>
          <p style={{ color: "var(--text-muted)", marginBottom: 4 }}>
            There&apos;s plenty more where these came from.
          </p>
          <a
            href="https://instagram.com/cookieandme_nz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            See more on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
