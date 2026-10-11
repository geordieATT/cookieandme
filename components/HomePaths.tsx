import Image from "next/image";
import Link from "next/link";

const paths = [
  {
    href: "/end-of-year",
    src: "/images/christmas-templates-meri-kirihimete.jpg",
    alt: "Red, green and white Christmas template cookies stamped with Your Logo, Meri Kirihimete and Merry Christmas designs",
    eyebrow: "Christmas 2026",
    title: "Christmas & end-of-year",
    copy:
      "Christmas templates with your logo, 10% off until 30 October. Perfect for staff parties, client gifts and awards nights.",
    cta: "See Christmas options",
  },
  {
    href: "/what-we-do",
    src: "/images/qspace-branded-cookie-vanilla-black-background.jpg",
    alt: "Branded cookie stamped with a company logo",
    eyebrow: "Made to order",
    title: "Custom cookies",
    copy:
      "Your design or logo, stamped into every cookie. For birthdays, weddings, corporate gifts and events.",
    cta: "See what we do",
  },
  {
    href: "/gallery",
    src: "/images/matariki-cookies-tray-pink-blue-yellow.jpg",
    alt: "Matariki cookies in pink, blue and yellow",
    eyebrow: "Our work",
    title: "Gallery",
    copy:
      "A look at what we have baked recently, from dinosaur birthdays to branded corporate orders.",
    cta: "Browse the gallery",
  },
];

export default function HomePaths() {
  return (
    <section style={{ padding: "96px 0" }}>
      <div className="section-container">
        <h2
          style={{
            color: "var(--ink)",
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          How can we help?
        </h2>
        <div style={{ width: 48, height: 3, backgroundColor: "var(--accent)", margin: "0 auto 40px" }} />

        <div className="home-paths-grid">
          {paths.map((path) => (
            <Link key={path.href} href={path.href} className="home-path">
              <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", backgroundColor: "var(--line)" }}>
                <Image
                  src={path.src}
                  alt={path.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div style={{ padding: "20px 22px 24px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--accent-text)",
                  }}
                >
                  {path.eyebrow}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontWeight: 500,
                    fontSize: 21,
                    color: "var(--ink)",
                    margin: "6px 0 8px",
                  }}
                >
                  {path.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: "var(--text-muted)",
                    marginBottom: 14,
                  }}
                >
                  {path.copy}
                </p>
                <span className="home-path-cta">{path.cta}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
