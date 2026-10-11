// Gallery photos. To add one: put the .jpg in public/images (never .jfif,
// see CLAUDE.md) and add one entry to this list. The newest work can go at
// the top; the first six load immediately, the rest as you scroll.

export const GALLERY_CATEGORIES = [
  "Weddings",
  "Corporate",
  "Birthdays",
  "Seasonal",
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export interface GalleryPhoto {
  src: string;
  alt: string;
  category: GalleryCategory;
  /** Where to anchor the square crop, for portrait or off-centre shots. */
  position?: string;
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    src: "/images/dinosaur-trio-cookies-black-background.jpg",
    alt: "Three dinosaur cookies on black background",
    category: "Birthdays",
  },
  {
    src: "/images/60th-birthday-russell-gift-box-gold-ribbon.jpg",
    alt: "60th birthday cookies in gift box with gold ribbon",
    category: "Birthdays",
  },
  {
    src: "/images/csl-long-service-dinner-branded-cookie-place-setting.jpg",
    alt: "CSL branded cookie at a Long Service Dinner place setting",
    category: "Corporate",
  },
  {
    src: "/images/steves-70th-on-bench.jpg",
    alt: "Steve's 70th birthday cookies on bench",
    category: "Birthdays",
  },
  {
    src: "/images/60th-birthday-russell-cookies-tray-overhead.jpg",
    alt: "60th birthday cookies on tray overhead view",
    category: "Birthdays",
  },
  {
    src: "/images/mothers-day-cookies-outdoor-candle-blue-pink.jpg",
    alt: "Mother's Day cookies with candle outdoors",
    category: "Seasonal",
  },
  {
    src: "/images/matariki-cookies-tray-pink-blue-yellow.jpg",
    alt: "Matariki collection cookies in pink, blue, and yellow on a tray",
    category: "Seasonal",
  },
  {
    src: "/images/guide-dog-day-orange-cookies-cooling-rack.jpg",
    alt: "Guide Dog Day orange cookies on cooling rack",
    category: "Corporate",
  },
  {
    src: "/images/devopsdays-wellington-branded-cookie-black-background.jpg",
    alt: "DevOpsDays Wellington branded cookie on black background",
    category: "Corporate",
  },
  {
    src: "/images/rocket-lab-3-years-branded-cookies.jpg",
    alt: "Rocket Lab \"3 years at WCC\" cookies in black, red, and white",
    category: "Corporate",
  },
  {
    src: "/images/baby-shower-gift-box-flamingo-pram-cookies.jpg",
    alt: "Baby shower gift box with flamingo, pram, and moon cookies",
    category: "Birthdays",
  },
  {
    src: "/images/gem-homestay-branded-teal-cookies.jpg",
    alt: "Teal GEM Homestay Apartment logo cookies with a fantail",
    category: "Corporate",
    position: "center 40%",
  },
];
