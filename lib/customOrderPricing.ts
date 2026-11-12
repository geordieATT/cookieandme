// Custom cookie order pricing for the /order flow.
//
// This is the single source of truth: the order form uses this to show the
// customer what they'll pay, and the checkout API recharges from it
// independently, so the two can never disagree and a request cannot be
// crafted to pay less than it should.

// Packing is chosen by box size, so the number of boxes follows the order
// quantity: 48 cookies is 2 boxes of 24, 4 of 12, 8 of 6, or 24 packs of 2.
// Boxes of 24 are the standard packing; any smaller size is a paid split.
export const PACKING_OPTIONS = {
  box24: { label: "Boxes of 24", size: 24, unit: "box", included: true },
  box12: { label: "Boxes of 12", size: 12, unit: "box", included: false },
  box6: { label: "Boxes of 6", size: 6, unit: "box", included: false },
  pack2: { label: "Packs of 2", size: 2, unit: "pack", included: false },
} as const;

export type PackingOption = keyof typeof PACKING_OPTIONS;

export function isPackingOption(value: unknown): value is PackingOption {
  return typeof value === "string" && value in PACKING_OPTIONS;
}

/**
 * How an order of `quantity` cookies is packed, e.g. "4 boxes of 12". If the
 * quantity does not divide evenly, the extra cookies go in the last box.
 */
export function packingSummary(quantity: number, packing: PackingOption): string {
  const { size, unit } = PACKING_OPTIONS[packing];
  const count = Math.max(1, Math.floor(quantity / size));
  const extra = quantity - count * size;
  const plural = unit === "box" ? "boxes" : "packs";
  const base = `${count} ${count === 1 ? unit : plural} of ${size}`;
  return extra > 0 ? `${base}, plus ${extra} extra in the last ${unit}` : base;
}

// The Christmas template discount (marketed as the Black Friday Christmas
// cookie deal) applies to orders confirmed by midnight at the end of Sunday
// 22 November 2026, NZ time (00:00 NZDT on 23 November = 11:00 UTC on 22
// November). After it, the option stays available on the form, it just stops
// applying a discount — checked against the server's own clock, never the
// visitor's. Written in UTC because Vercel's servers run on UTC, not NZ time.
export const CHRISTMAS_DISCOUNT_CUTOFF = new Date(Date.UTC(2026, 10, 22, 11, 0, 0));

// Customer-facing name and deadline wording for the deal. Every page, the
// home banner, checkout and the order email read these, so the deal is
// described the same way everywhere. Keep in step with the cutoff above.
export const CHRISTMAS_DEAL = {
  name: "Black Friday Christmas cookie deal",
  endsLabel: "midnight Sunday 22 November",
  endsShort: "22 November",
  // Optional discount code. Entering it on the order form ticks the Christmas
  // template box; ticking the box without it gets the same 10% off.
  code: "BLACKFRIDAY26",
} as const;

// True if the text is the deal's discount code. Case and spaces don't matter.
export function isDealCode(input: unknown): boolean {
  return (
    typeof input === "string" &&
    input.replace(/\s+/g, "").toUpperCase() === CHRISTMAS_DEAL.code
  );
}

export function christmasDiscountAvailable(now: Date = new Date()): boolean {
  return now.getTime() < CHRISTMAS_DISCOUNT_CUTOFF.getTime();
}

// $5.00 each for 50 or fewer, $4.50 each for 51+. Matches the standard order pricing.
export function cookiePriceEach(quantity: number): number {
  return quantity <= 50 ? 5.0 : 4.5;
}

// $6 per 24 cookies, i.e. 25c per cookie, for any packing option other than the
// included single box. Charged per cookie (not per 24-block) so it scales
// cleanly for any quantity, not just exact multiples of 24.
export function packingFee(quantity: number, packing: PackingOption): number {
  if (PACKING_OPTIONS[packing].included) return 0;
  return quantity * 0.25;
}

export type CustomOrderPricing = {
  priceEach: number;
  /** Cookie price after the Christmas discount, if it applied. */
  cookieSubtotal: number;
  discountApplied: boolean;
  packingFee: number;
  /** Cookie subtotal plus packing fee. */
  total: number;
  isFullPayment: boolean;
  /** What's actually charged today: the full total, or a 50% deposit for 100+ cookies. */
  amountDueToday: number;
};

export function calculateCustomOrderPrice(params: {
  quantity: number;
  christmasTemplate: boolean;
  packing: PackingOption;
  now?: Date;
}): CustomOrderPricing {
  const { quantity, christmasTemplate, packing, now = new Date() } = params;

  const priceEach = cookiePriceEach(quantity);
  const discountApplied = christmasTemplate && christmasDiscountAvailable(now);
  const cookieSubtotal = quantity * priceEach * (discountApplied ? 0.9 : 1);
  const fee = packingFee(quantity, packing);
  const total = cookieSubtotal + fee;
  const isFullPayment = quantity < 100;
  const amountDueToday = isFullPayment ? total : total * 0.5;

  return {
    priceEach,
    cookieSubtotal,
    discountApplied,
    packingFee: fee,
    total,
    isFullPayment,
    amountDueToday,
  };
}
