import Image from "next/image";
import Link from "next/link";
import {
  christmasDiscountAvailable,
  cookiePriceEach,
} from "@/lib/customOrderPricing";
import { CHRISTMAS_PROMO, christmasPromoActive } from "@/lib/season";

// Read from the same pricing file the order form and checkout use, so the
// "from" price on this card can't drift from what customers are charged.
// cookiePriceEach() gives the per-cookie price for a quantity; the largest
// quantities get the lowest price.
const LOWEST_PRICE = cookiePriceEach(Number.MAX_SAFE_INTEGER).toFixed(2);
// The order minimum is enforced in OrderSection and the checkout API; this is
// only the wording on the card, so update it here if that minimum changes.
const MINIMUM_ORDER = 24;

type HomePath = {
  href: string;
  src: string;
  alt: string;
  title: string;
  copy: string;
};

function homePaths(): HomePath[] {
  const christmas: HomePath = {
    href: CHRISTMAS_PROMO.href,
    src: "/images/christmas-templates-meri-kirihimete.jpg",
    alt: "Red, green and white Christmas template cookies stamped with Your Logo, Meri Kirihimete and Merry Christmas designs",
    title: "Christmas & end-of-year",
    copy: christmasDiscountAvailable()
      ? "Christmas templates with your logo, 10% off until 30 October."
      : "Christmas templates with your logo, for staff parties and client gifts.",
  };
  const ourStory: HomePath = {
    href: "/our-story",
    src: "/images/geordie-and-kersti-kitchen.jpg",
    alt: "Geordie and Kersti in the kitchen",
    title: "Our story",
    copy: "A mother and son in Lower Hutt, designing every stamp from scratch.",
  };
  return [
    // Shown first while the Christmas promotion runs; Our Story takes the
    // third slot after it ends, so the row stays three cards wide.
    ...(christmasPromoActive() ? [christmas] : []),
    {
      href: "/what-we-do",
      src: "/images/qspace-branded-cookie-vanilla-black-background.jpg",
      alt: "Branded cookie stamped with a company logo",
      title: "Custom cookies",
      copy: `Your logo, artwork or message, pressed into every cookie. Minimum ${MINIMUM_ORDER}, from $${LOWEST_PRICE} each.`,
    },
    {
      href: "/gallery",
      src: "/images/matariki-cookies-tray-pink-blue-yellow.jpg",
      alt: "Matariki cookies in pink, blue and yellow",
      title: "Gallery",
      copy: "A look at recent work, from birthdays and weddings to orders for local businesses.",
    },
    ...(christmasPromoActive() ? [] : [ourStory]),
  ];
}

export default function HomePaths() {
  return (
    <section style={{ padding: "96px 0" }}>
      <div className="section-container">
        <h2 style={{ marginBottom: 40, textAlign: "center" }}>
          How can we help?
        </h2>

        <div className="home-paths-grid">
          {homePaths().map((path) => (
            <Link key={path.href} href={path.href} className="home-path">
              <div className="home-path-image">
                <Image
                  src={path.src}
                  alt={path.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 360px"
                />
              </div>
              <h3 className="home-path-title">{path.title}</h3>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: "var(--text-muted)",
                }}
              >
                {path.copy}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
