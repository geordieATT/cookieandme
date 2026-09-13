"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Next's client-side router does not reliably scroll to a URL fragment when a
// <Link> navigates to a *new* route (as opposed to changing the hash on the page
// already loaded), so a link like "/terms#privacy" clicked from another page lands
// on /terms scrolled to the top instead of the Privacy Policy section. This
// re-implements that: whenever the route changes, or the hash changes on the same
// page, scroll the matching element into view once it's actually in the DOM.
// scroll-margin-top on the target elements keeps them clear of the fixed navbar.
export default function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const jump = () => {
      // behavior: "instant" matters here, not just style: the site sets
      // scroll-behavior: smooth globally, and letting that apply to this
      // jump causes it to race with the browser's own smooth hash-scroll
      // attempt and overshoot the target.
      document.getElementById(hash)?.scrollIntoView({ block: "start", behavior: "instant" });
    };

    // Re-corrects a few times as the page settles: the web fonts are loaded via
    // a <head> <link> (not next/font), so they swap in after first paint and
    // reflow the text, which otherwise leaves the first jump's target stale and
    // over/undershooting once the swap happens. document.fonts.ready fires the
    // moment that swap actually completes, which is more reliable than any
    // fixed delay guess.
    const delays = [60, 150, 350, 600, 1000];
    const timers = delays.map((delay) => setTimeout(jump, delay));
    document.fonts?.ready.then(jump);
    return () => timers.forEach(clearTimeout);
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.slice(1);
      document.getElementById(hash)?.scrollIntoView({ block: "start", behavior: "instant" });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}
