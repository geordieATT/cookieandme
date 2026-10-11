import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

// Shown for any address that doesn't exist. The header and footer come from
// the root layout, so this only needs the middle of the page.
export default function NotFound() {
  return (
    <main className="page-top">
      <section style={{ padding: "112px 0 128px" }}>
        <div className="section-container">
          <h1 style={{ marginBottom: 16 }}>Page not found</h1>
          <p style={{ color: "var(--text-muted)", marginBottom: 28 }}>
            We couldn&apos;t find that page, but there are plenty of cookies to
            look at instead.
          </p>
          <Link href="/gallery" className="btn-red hero-cta">
            See our work
          </Link>
        </div>
      </section>
    </main>
  );
}
