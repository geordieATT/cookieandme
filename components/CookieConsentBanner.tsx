"use client";

import { useEffect, useState } from "react";
import { getCookieConsent, setCookieConsent } from "@/lib/cookieConsent";

export default function CookieConsentBanner() {
  // Starts hidden so the server and first client paint agree; the effect decides
  // whether to actually show it, same pattern as the Father's Day countdown.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      if (getCookieConsent() === null) setVisible(true);
    };
    checkConsent();
  }, []);

  const choose = (value: "accepted" | "declined") => {
    setCookieConsent(value);
    setVisible(false);
    // Lets AnalyticsGate (mounted separately) pick up the new choice immediately,
    // without needing a page reload.
    window.dispatchEvent(new Event("cookie-consent-changed"));
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1001,
        backgroundColor: "#0C0E58",
        borderTop: "3px solid #FB3D03",
        padding: "18px 20px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <p
          style={{
            flex: "1 1 320px",
            margin: 0,
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            lineHeight: 1.6,
            color: "#FAFAF8",
          }}
        >
          <strong style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900 }}>
            We use cookies 🍪
          </strong>{" "}
          <span style={{ color: "rgba(250, 250, 248, 0.8)" }}>
            (the website kind) See our{" "}
            <a href="/terms#privacy" style={{ color: "#FAFAF8", textDecoration: "underline" }}>
              Privacy Policy
            </a>{" "}
            for details.
          </span>
        </p>
        <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
          <button
            type="button"
            onClick={() => choose("declined")}
            className="cookie-banner-btn cookie-banner-btn-outline"
          >
            Decline cookies
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="cookie-banner-btn cookie-banner-btn-solid"
          >
            Accept cookies
          </button>
        </div>
      </div>
    </div>
  );
}
