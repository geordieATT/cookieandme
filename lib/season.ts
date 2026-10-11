// Seasonal promotions shown on the home page.
//
// Display only: this decides whether the Christmas home card and the
// Christmas link in the hero are shown. It does not affect pricing, the
// Christmas template discount (that cutoff lives in customOrderPricing.ts)
// or whether the End-of-Year page itself exists.
//
// After `endsAt` the card and link hide on their own. The home page is
// regenerated at least hourly (see `revalidate` in app/page.tsx), so this
// takes effect without a new deploy.
//
// TODO(Geordie): 25 December 2026 is a placeholder end date. Change it to
// the day you want Christmas to drop off the home page.
export const CHRISTMAS_PROMO = {
  // Midnight NZ time at the start of this day, written in UTC (NZDT = UTC+13).
  endsAt: new Date(Date.UTC(2026, 11, 24, 11, 0, 0)), // 25 Dec 2026, 00:00 NZDT
  href: "/end-of-year",
} as const;

export function christmasPromoActive(now: Date = new Date()): boolean {
  return now.getTime() < CHRISTMAS_PROMO.endsAt.getTime();
}
