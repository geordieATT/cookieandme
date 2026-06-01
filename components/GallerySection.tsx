import Image from "next/image";

const images = [
  {
    src: "/images/dinosaur-trio-cookies-black-background.jpg",
    alt: "Three dinosaur cookies on black background",
  },
  {
    src: "/images/60th-birthday-russell-gift-box-gold-ribbon.jpg",
    alt: "60th birthday cookies in gift box with gold ribbon",
  },
  {
    src: "/images/gem-homestay-welcome-cookies-blue-purple.jpg",
    alt: "Gem Homestay welcome cookies in blue and purple",
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
    src: "/images/timedock-branded-cookies-production-bench.jpg",
    alt: "TimeDock branded cookies on production bench",
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
            color: "#1B2B6B",
            marginBottom: 48,
            textAlign: "center",
          }}
        >
          A Little Taste of What We Do
        </h2>

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
      </div>
    </section>
  );
}
