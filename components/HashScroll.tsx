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
    const scrollToHash = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      // A short delay, not the same tick: the new route's content needs to have
      // actually painted before the target id exists to scroll to.
      const timer = setTimeout(() => {
        // behavior: "instant" matters here, not just style: the site sets
        // scroll-behavior: smooth globally, and letting that apply to this
        // jump causes it to race with the browser's own smooth hash-scroll
        // attempt and overshoot to the bottom of the page.
        document.getElementById(hash)?.scrollIntoView({ block: "start", behavior: "instant" });
      }, 60);
      return () => clearTimeout(timer);
    };

    const cleanup = scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => {
      cleanup?.();
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, [pathname]);

  return null;
}
