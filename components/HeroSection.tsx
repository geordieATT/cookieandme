import Image from "next/image";
import Link from "next/link";
import { CHRISTMAS_PROMO, christmasPromoActive } from "@/lib/season";

// Split hero: text on the left, video on the right (stacked on phones, video
// first). No overlay, so the cookies show in their real colours.
//
// The still is the first frame of the video, so nothing visibly changes when
// playback starts. It is also what visitors see if they have reduced motion
// turned on, or while the video loads.
// TODO(Geordie): if you supply a sharper original still, replace
// /images/home-hero-poster.jpg (keep it portrait, ideally 1440px wide or more).
const HERO_STILL = "/images/home-hero-poster.jpg";

export default function HeroSection() {
  const christmas = christmasPromoActive();
  const secondary = christmas
    ? { label: "Christmas orders", href: CHRISTMAS_PROMO.href }
    : { label: "Order or get a quote", href: "/order" };

  return (
    <section className="hero">
      <div className="hero-text">
        <h1 style={{ marginBottom: 20 }}>
          Custom stamped cookies, made in Lower Hutt
        </h1>
        <p
          style={{
            fontSize: "clamp(17px, 1.6vw, 19px)",
            color: "var(--text)",
            marginBottom: 32,
            maxWidth: "46ch",
          }}
        >
          Your logo or artwork pressed into every cookie, by a mother and son.
          For weddings, birthdays, events and businesses.
        </p>
        <div className="hero-actions">
          <Link href="/gallery" className="btn-red hero-cta">
            See our work
          </Link>
          <Link href={secondary.href} className="text-link">
            {secondary.label}
          </Link>
        </div>
      </div>

      <div className="hero-media">
        <Image
          src={HERO_STILL}
          alt="Rows of red, yellow and purple cookies stamped with star designs"
          fill
          priority
          quality={85}
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />
        <video
          className="hero-video"
          src="/videos/home-hero-2.mp4"
          poster={HERO_STILL}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
