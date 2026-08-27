// Shared Father's Day dates, so the countdown banner and the gift box page can never
// disagree about when orders close.

// Father's Day in New Zealand is the first Sunday of September.
export function fathersDay(year: number): Date {
  const septemberFirst = new Date(year, 8, 1);
  const daysUntilSunday = (7 - septemberFirst.getDay()) % 7;
  return new Date(year, 8, 1 + daysUntilSunday, 0, 0, 0, 0);
}

// Orders close 5pm on the Thursday before, leaving Friday and Saturday to bake and hand over.
export function orderCutoff(year: number): Date {
  const day = fathersDay(year);
  const cutoff = new Date(day);
  cutoff.setDate(day.getDate() - 3);
  cutoff.setHours(17, 0, 0, 0);
  return cutoff;
}

// e.g. "Thursday 3 September, 5pm"
export function formatCutoff(date: Date): string {
  const weekday = date.toLocaleDateString("en-NZ", { weekday: "long" });
  const month = date.toLocaleDateString("en-NZ", { month: "long" });
  return `${weekday} ${date.getDate()} ${month}, 5pm`;
}

export type CutoffState = "open" | "closed" | "over";

// "closed" means Father's Day has not happened yet but ordering for it has shut.
export function cutoffState(now: Date): { state: CutoffState; cutoff: Date; day: Date } {
  const year = now.getFullYear();
  const day = fathersDay(year);
  const cutoff = orderCutoff(year);
  // Once the day itself has passed, roll forward so next year's dates are shown.
  if (now > day) {
    const nextYear = year + 1;
    return { state: "over", cutoff: orderCutoff(nextYear), day: fathersDay(nextYear) };
  }
  return { state: now > cutoff ? "closed" : "open", cutoff, day };
}
