// Shared Father's Day dates, so the countdown banner and the gift box page can never
// disagree about when orders close.

// Father's Day in New Zealand is the first Sunday of September.
export function fathersDay(year: number): Date {
  const septemberFirst = new Date(year, 8, 1);
  const daysUntilSunday = (7 - septemberFirst.getDay()) % 7;
  return new Date(year, 8, 1 + daysUntilSunday, 0, 0, 0, 0);
}

// Most orders close 5pm the Thursday before, leaving Friday and Saturday to bake and
// hand over. NZ Post Economy takes three days in transit, so it closes 5pm Tuesday.
const DAYS_BEFORE_BY_METHOD: Record<string, number> = {
  nzPostEconomy: 5, // Sunday minus five days is Tuesday
};
const DEFAULT_DAYS_BEFORE = 3; // Sunday minus three days is Thursday

export function orderCutoff(year: number, method?: string): Date {
  const day = fathersDay(year);
  const cutoff = new Date(day);
  const daysBefore =
    method === undefined
      ? DEFAULT_DAYS_BEFORE
      : DAYS_BEFORE_BY_METHOD[method] ?? DEFAULT_DAYS_BEFORE;
  cutoff.setDate(day.getDate() - daysBefore);
  cutoff.setHours(17, 0, 0, 0);
  return cutoff;
}

// The last moment anything can still be ordered for Father's Day.
export function latestOrderCutoff(year: number): Date {
  return orderCutoff(year);
}

// e.g. "Thursday 3 September, 5pm"
export function formatCutoff(date: Date): string {
  const weekday = date.toLocaleDateString("en-NZ", { weekday: "long" });
  const month = date.toLocaleDateString("en-NZ", { month: "long" });
  return `${weekday} ${date.getDate()} ${month}, 5pm`;
}

export type CutoffState = "open" | "closed" | "over";

export type CutoffInfo = {
  state: CutoffState;
  cutoff: Date;
  day: Date;
  /** True when this method has closed but a faster one is still open. */
  fasterStillOpen: boolean;
};

// "closed" means Father's Day has not happened yet but ordering for it has shut.
// Pass a delivery method to get that method's own cutoff.
export function cutoffState(now: Date, method?: string): CutoffInfo {
  const year = now.getFullYear();
  const day = fathersDay(year);

  // Once the day itself has passed, roll forward so next year's dates are shown.
  if (now > day) {
    const nextYear = year + 1;
    return {
      state: "over",
      cutoff: orderCutoff(nextYear, method),
      day: fathersDay(nextYear),
      fasterStillOpen: false,
    };
  }

  const cutoff = orderCutoff(year, method);
  const closed = now > cutoff;
  return {
    state: closed ? "closed" : "open",
    cutoff,
    day,
    fasterStillOpen: closed && now <= latestOrderCutoff(year),
  };
}
