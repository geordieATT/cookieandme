// Cookie & Me shipping pricing.
//
// Single boxes are flat-rate nationwide (NZ Post pricing is not zone-based).
// Multi-box orders are NOT: NZ Post's pricing does not follow a clean size or
// volume formula, so the combos below were each tested directly on NZ Post's
// "Send It in NZ" calculator.
//
// DO NOT extend COMBO_TIERS with a formula. A combination that is not in the
// table must be quoted manually. Adding a row means testing it on the real
// calculator first.
//
// This is the single source of truth: the gift box form displays these prices
// and the checkout API recharges from them, so the two can never disagree.

export const DELIVERY_METHODS = {
  pickup: { label: "Pickup from Lower Hutt", needsAddress: false, service: null },
  huttDelivery: { label: "Delivery in the Hutt Valley", needsAddress: true, service: null },
  nzPostEconomy: { label: "NZ Post Economy (3 day)", needsAddress: true, service: "economy" },
  nzPostOvernight: { label: "NZ Post Overnight", needsAddress: true, service: "overnight" },
} as const;

export const ADDONS = {
  signature: { label: "Signature required", price: 3 },
  rural: { label: "Rural delivery address", price: 6 },
} as const;

// Key format is "sixPacks:twelvePacks", matching exactly what was tested.
const COMBO_TIERS: Record<string, "tier1" | "tier2"> = {
  "1:0": "tier1",
  "2:0": "tier1",
  "0:1": "tier1",

  "3:0": "tier2",
  "4:0": "tier2",
  "5:0": "tier2",
  "6:0": "tier2",
  "0:2": "tier2",
  "0:3": "tier2",
  "1:1": "tier2",
  "2:1": "tier2",
  "3:1": "tier2",
  "4:1": "tier2",
  "1:2": "tier2",
  "2:2": "tier2",
};

const TIER_PRICES = {
  // Tier 1 matches single-box pricing, confirmed on NZ Post's quote screen.
  tier1: { economy: 8.9, overnight: 10.9 },
  // Tier 2 overnight confirmed directly ($19.20 with signature, less $3).
  // NOTE: tier2 economy is the owner's estimate and is NOT yet confirmed.
  tier2: { economy: 14.2, overnight: 16.2 },
} as const;

export type DeliveryMethod = keyof typeof DELIVERY_METHODS;

export const NZ_POST_METHODS: DeliveryMethod[] = ["nzPostEconomy", "nzPostOvernight"];

export function isNzPost(method: string): method is DeliveryMethod {
  return (NZ_POST_METHODS as string[]).includes(method);
}

export function isDeliveryMethod(value: unknown): value is DeliveryMethod {
  return typeof value === "string" && value in DELIVERY_METHODS;
}

/** Whether this exact mix of boxes has a tested NZ Post price. */
export function isComboPriced(sixPacks: number, twelvePacks: number): boolean {
  return `${sixPacks}:${twelvePacks}` in COMBO_TIERS;
}

export type ShippingOptions = {
  sixPacks?: number;
  twelvePacks?: number;
  /** Collecting from an NZ Post collection point rather than door delivery. */
  toCollectionPoint?: boolean;
  signatureRequired?: boolean;
  ruralAddress?: boolean;
};

export type ShippingResult = {
  total: number;
  breakdown: { label: string; price: number }[];
  /** "COMBO_NOT_TESTED" means we cannot price this order and must quote manually. */
  error: string | null;
  message?: string;
};

export function calculateShipping(
  methodKey: string,
  options: ShippingOptions = {}
): ShippingResult {
  if (!isDeliveryMethod(methodKey)) {
    return { total: 0, breakdown: [], error: "UNKNOWN_METHOD" };
  }

  const method = DELIVERY_METHODS[methodKey];

  // Pickup and local delivery are free whatever the order size.
  if (method.service === null) {
    return { total: 0, breakdown: [{ label: method.label, price: 0 }], error: null };
  }

  const sixPacks = options.sixPacks ?? 0;
  const twelvePacks = options.twelvePacks ?? 0;
  const tier = COMBO_TIERS[`${sixPacks}:${twelvePacks}`];

  if (!tier) {
    return {
      total: 0,
      breakdown: [],
      error: "COMBO_NOT_TESTED",
      message:
        "We can't price courier for this combination of boxes online. Please get in touch and we'll quote it for you.",
    };
  }

  const basePrice = TIER_PRICES[tier][method.service];
  const breakdown: { label: string; price: number }[] = [
    { label: method.label, price: basePrice },
  ];
  let total: number = basePrice;

  const collecting = Boolean(options.toCollectionPoint);

  // Add-ons only apply to door delivery. Collecting in person with photo ID means
  // there is nothing to sign for and no rural leg, so both are ignored outright.
  if (!collecting) {
    if (options.signatureRequired) {
      breakdown.push({ label: ADDONS.signature.label, price: ADDONS.signature.price });
      total += ADDONS.signature.price;
    }
    if (options.ruralAddress) {
      breakdown.push({ label: ADDONS.rural.label, price: ADDONS.rural.price });
      total += ADDONS.rural.price;
    }
  }

  // Keep cents clean; adding 14.2 + 3 + 6 in floating point drifts otherwise.
  return { total: Math.round(total * 100) / 100, breakdown, error: null };
}
