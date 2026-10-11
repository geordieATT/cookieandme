import type { Metadata } from "next";

// cookieandme.nz is the canonical domain. cookieandme.co.nz also serves the
// site, but every page tells search engines and link previews that the .nz
// address is the real one, so the two are never treated as rival copies.
export const SITE_URL = "https://cookieandme.nz";
export const SITE_NAME = "Cookie & Me";

type ShareImage = { url: string; width: number; height: number; alt: string };

// Used for link previews on pages that don't set their own image.
export const DEFAULT_SHARE_IMAGE: ShareImage = {
  url: "/images/wedding-samuel-georgia-cookies-closeup-packaged.jpg",
  width: 1440,
  height: 1919,
  alt: "Beautifully packaged custom cookies from Cookie & Me",
};

/**
 * Title, description, canonical URL and share-preview tags for one page.
 * Next.js replaces (rather than merges) a parent's openGraph block, so every
 * page builds the full set here, with absolute .nz URLs throughout.
 */
export function pageMetadata({
  path,
  title,
  description,
  image = DEFAULT_SHARE_IMAGE,
  shareTitle,
}: {
  path: string;
  /** Page title; the layout appends " | Cookie & Me" in the browser tab. */
  title: string;
  description: string;
  image?: ShareImage;
  /** Title for link previews, if it should differ from `${title} | Cookie & Me`. */
  shareTitle?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const imageUrl = `${SITE_URL}${image.url}`;
  const ogTitle = shareTitle ?? `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_NZ",
      type: "website",
      images: [{ ...image, url: imageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [imageUrl],
    },
  };
}
