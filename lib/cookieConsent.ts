// Cookie consent: stored as an actual browser cookie (not localStorage), so this is
// genuinely a cookie remembering consent to cookies. Client-only — nothing here runs
// on the server.

export const CONSENT_COOKIE_NAME = "cookie_consent";
export type ConsentValue = "accepted" | "declined";

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function getCookieConsent(): ConsentValue | null {
  const value = readCookie(CONSENT_COOKIE_NAME);
  return value === "accepted" || value === "declined" ? value : null;
}

export function setCookieConsent(value: ConsentValue) {
  const oneYear = 60 * 60 * 24 * 365;
  document.cookie = `${CONSENT_COOKIE_NAME}=${value}; max-age=${oneYear}; path=/; SameSite=Lax`;
}
