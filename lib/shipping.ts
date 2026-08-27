// Cookie & Me shipping pricing.
//
// NZ Post pricing is flat nationwide rather than zone-based, so there is no
// North/South Island split. Rates were confirmed with NZ Post directly.
//
// This is the single source of truth: the gift box form displays these prices and
// the checkout API recharges from them, so the two can never disagree.

export const DELIVERY_METHODS = {
  pickup: { label: "Pickup from Lower Hutt", price: 0, needsAddress: false },
  huttDelivery: { label: "Delivery in the Hutt Valley", price: 0, needsAddress: true },
  nzPostEconomy: { label: "NZ Post Economy (3 day)", price: 8.9, needsAddress: true },
  nzPostOvernight: { label: "NZ Post Overnight", price: 10.9, needsAddress: true },
} as const;

export const ADDONS = {
  signature: { label: "Signature required", price: 3 },
  rural: { label: "Rural delivery address", price: 6 },
} as const;

export type DeliveryMethod = keyof typeof DELIVERY_METHODS;

// Only these offer the door-vs-collection choice and the add-on checkboxes.
export const NZ_POST_METHODS: DeliveryMethod[] = ["nzPostEconomy", "nzPostOvernight"];

export function isNzPost(method: string): method is DeliveryMethod {
  return (NZ_POST_METHODS as string[]).includes(method);
}

export function isDeliveryMethod(value: unknown): value is DeliveryMethod {
  return typeof value === "string" && value in DELIVERY_METHODS;
}

export type ShippingOptions = {
  /** Collecting from an NZ Post collection point rather than door delivery. */
  toCollectionPoint?: boolean;
  signatureRequired?: boolean;
  ruralAddress?: boolean;
};

export type ShippingResult = {
  total: number;
  breakdown: { label: string; price: number }[];
  error: string | null;
};

export function calculateShipping(
  methodKey: string,
  options: ShippingOptions = {}
): ShippingResult {
  if (!isDeliveryMethod(methodKey)) {
    return { total: 0, breakdown: [], error: "Unknown delivery method" };
  }

  const method = DELIVERY_METHODS[methodKey];
  const breakdown: { label: string; price: number }[] = [
    { label: method.label, price: method.price },
  ];
  let total: number = method.price;

  const nzPost = isNzPost(methodKey);
  const collecting = nzPost && Boolean(options.toCollectionPoint);

  // Add-ons only apply to door delivery. Collecting in person with photo ID means
  // there is nothing to sign for and no rural leg, so both are ignored outright.
  if (nzPost && !collecting) {
    if (options.signatureRequired) {
      breakdown.push({ label: ADDONS.signature.label, price: ADDONS.signature.price });
      total += ADDONS.signature.price;
    }
    if (options.ruralAddress) {
      breakdown.push({ label: ADDONS.rural.label, price: ADDONS.rural.price });
      total += ADDONS.rural.price;
    }
  }

  // Keep cents clean; adding 8.9 + 3 + 6 in floating point drifts otherwise.
  return { total: Math.round(total * 100) / 100, breakdown, error: null };
}
