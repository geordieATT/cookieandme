"use client";

import { useEffect, useState } from "react";
import { cutoffState, formatCutoff } from "@/lib/fathersDay";

// Only show the banner in the run-up, so it disappears on its own after the day passes
// and reappears the following August without anyone editing a date.
const SHOW_WITHIN_DAYS = 60;

type Remaining = { days: number; hours: number; minutes: number; seconds: number; cutoffLabel: string };

function timeUntilCutoff(now: Date): Remaining | null {
  const { state, cutoff } = cutoffState(now);
  // Once ordering has closed there is nothing left to count down to.
  if (state !== "open") return null;

  const diff = cutoff.getTime() - now.getTime();
  if (diff <= 0 || diff > SHOW_WITHIN_DAYS * 24 * 60 * 60 * 1000) return null;

  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    cutoffLabel: formatCutoff(cutoff),
  };
}

export default function FathersDayCountdown() {
  // Starts null so the server and the first client paint agree; the effect fills it in.
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(timeUntilCutoff(new Date()));
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
      aria-label="Time left to order for Father's Day"
      style={{ backgroundColor: "#0C0E58", padding: "22px 0" }}
    >
      <div className="section-container">
        <div className="countdown-inner">
          <div className="countdown-copy">
            <p
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(17px, 2.4vw, 22px)",
                color: "#FAFAF8",
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              Father&apos;s Day orders close {remaining.cutoffLabel}
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: "rgba(250, 250, 248, 0.75)",
                margin: "4px 0 0",
              }}
            >
              Get in quick before we sell out again.
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

          <a
            href="/gift-boxes"
            className="btn-red countdown-cta"
            style={{ fontSize: 15, padding: "13px 26px", whiteSpace: "nowrap" }}
          >
            Shop Gift Boxes
          </a>
        </div>
      </div>
    </section>
  );
}
