import Image from "next/image";

interface GalleryImage {
  src: string;
  alt: string;
  itemClass?: string;
}

const images: GalleryImage[] = [
  {
    src: "/images/dinosaur-trio-cookies-black-background.jpg",
    alt: "Three dinosaur cookies on black background",
  },
  {
    src: "/images/60th-birthday-russell-gift-box-gold-ribbon.jpg",
    alt: "60th birthday cookies in gift box with gold ribbon",
  },
  {
    src: "/images/csl-long-service-dinner-branded-cookie-place-setting.jfif",
    alt: "CSL branded cookie at a Long Service Dinner place setting",
  },
  {
    src: "/images/steves-70th-on-bench.jpg",
    alt: "Steve's 70th birthday cookies on bench",
  },
  {
    src: "/images/60th-birthday-russell-cookies-tray-overhead.jpg",
    alt: "60th birthday cookies on tray overhead view",
  },
  {
    src: "/images/mothers-day-cookies-outdoor-candle-blue-pink.jpg",
    alt: "Mother's Day cookies with candle outdoors",
  },
  {
    src: "/images/matariki-cookies-tray-pink-blue-yellow.jfif",
    alt: "Matariki collection cookies in pink, blue, and yellow on a tray",
  },
  {
    src: "/images/guide-dog-day-orange-cookies-cooling-rack.jpg",
    alt: "Guide Dog Day orange cookies on cooling rack",
  },
  {
    src: "/images/devopsdays-wellington-branded-cookie-black-background.jpg",
    alt: "DevOpsDays Wellington branded cookie on black background",
  },
];

export default function GallerySection() {
  return (
    <section
      id="gallery"
      style={{ padding: "96px 0", backgroundColor: "#F4F4F2" }}
    >
      <div className="section-container">
        <h2
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(26px, 3.5vw, 38px)",
            color: "#0C0E58",
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          A Little Taste of What We Do
        </h2>
        <div style={{ width: 48, height: 3, backgroundColor: "#FB3D03", margin: "0 auto 32px" }} />

        <div className="gallery-grid">
          {images.map((img) => (
            <div key={img.src} className={`gallery-item${img.itemClass ? ` ${img.itemClass}` : ""}`}>
              <div style={{ position: "relative", paddingBottom: "75%" }}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              lineHeight: 1.6,
              color: "#666",
              maxWidth: 420,
              margin: "0 auto 16px",
            }}
          >
            There&apos;s plenty more where these came from — check out our Instagram
            for the full collection.
          </p>
          <a
            href="https://instagram.com/cookieandme_nz"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-red"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontSize: 15,
              padding: "14px 28px",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            See More on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
