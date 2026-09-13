"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { getCookieConsent } from "@/lib/cookieConsent";

// Analytics only loads once the visitor has actively accepted, not merely because
// they haven't said no yet. Declining, or not having chosen at all, both mean it
// never mounts. Listens for the banner's choice so accepting turns it on
// immediately, with no page reload needed.
export default function AnalyticsGate() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const sync = () => setEnabled(getCookieConsent() === "accepted");
    sync();
    window.addEventListener("cookie-consent-changed", sync);
    return () => window.removeEventListener("cookie-consent-changed", sync);
  }, []);

  if (!enabled) return null;
  return <Analytics />;
}
