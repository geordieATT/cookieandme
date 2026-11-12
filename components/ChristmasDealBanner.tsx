"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CHRISTMAS_DEAL,
  CHRISTMAS_DISCOUNT_CUTOFF,
} from "@/lib/customOrderPricing";

// Home page banner for the Black Friday Christmas cookie deal. Counts down to
// the same cutoff checkout uses, and hides itself the moment the deal ends
// (checked on the visitor's clock here, but pricing is always decided on the
// server). Rendered only after JavaScript runs, so it never shows in raw HTML.

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

function timeLeft(now: Date): Remaining | null {
  const diff = CHRISTMAS_DISCOUNT_CUTOFF.getTime() - now.getTime();
  if (diff <= 0) return null;
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

export default function ChristmasDealBanner() {
  // Starts null so the server and the first client paint agree; the effect fills it in.
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(timeLeft(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!remaining) return null;

  const units = [
    { value: remaining.days, label: remaining.days === 1 ? "Day" : "Days" },
    { value: remaining.hours, label: "Hrs" },
    { value: remaining.minutes, label: "Min" },
    { value: remaining.seconds, label: "Sec" },
  ];

  return (
    <section
      aria-label={CHRISTMAS_DEAL.name}
      style={{ backgroundColor: "var(--ink)", padding: "22px 0" }}
    >
      <div className="section-container">
        <div className="countdown-inner">
          <div className="countdown-copy">
            <p
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 900,
                fontSize: "clamp(17px, 2.4vw, 22px)",
                color: "var(--on-dark)",
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              Black Friday Christmas cookie deal: 10% off
            </p>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                color: "var(--on-dark-muted)",
                margin: "4px 0 0",
              }}
            >
              Christmas templates with your logo. Order by{" "}
              {CHRISTMAS_DEAL.endsLabel}.
            </p>
          </div>

          <div className="countdown-units" role="timer" aria-live="off">
            {units.map((unit) => (
              <div key={unit.label} className="countdown-unit">
                <span className="countdown-value">
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="countdown-label">{unit.label}</span>
              </div>
            ))}
          </div>

          <Link
            href="/end-of-year"
            className="btn-red countdown-cta"
            style={{ fontSize: 15, padding: "13px 26px", whiteSpace: "nowrap" }}
          >
            See the deal
          </Link>
        </div>
      </div>
    </section>
  );
}
