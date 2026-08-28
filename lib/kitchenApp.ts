// Pushes confirmed website orders into the kitchen app's Supabase project so Kersti
// sees them alongside everything else, rather than only in an email.
//
// This is a DIFFERENT Supabase project from anything else in this repo, and it is
// written with a service role key, which bypasses row level security. That key must
// stay server side: never import this from a client component.

const SUPABASE_URL = process.env.KITCHEN_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.KITCHEN_SUPABASE_SERVICE_ROLE_KEY;

export type KitchenOrder = {
  stripeSessionId: string;
  name: string;
  email: string;
  phone: string;
  /** Only set when the order is being delivered or couriered. */
  address: string | null;
  /** The campaign-facing occasion the customer picked, e.g. "Father's Day". */
  occasion: string;
  items: string;
  packs: { packSize: number; qty: number }[];
  flavour: string | null;
  deliveryMethod: string;
  deliveryLabel: string;
  toCollectionPoint: boolean;
  shippingFee: number;
  amountPaid: number;
  cardMessage: string | null;
};

function configured(): boolean {
  return Boolean(SUPABASE_URL && SERVICE_ROLE_KEY);
}

function headers(extra: Record<string, string> = {}) {
  return {
    apikey: SERVICE_ROLE_KEY as string,
    Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

/**
 * Stripe can deliver the same webhook more than once, so check whether this session
 * already landed before writing anything.
 */
async function alreadyRecorded(sessionId: string): Promise<boolean> {
  const url =
    `${SUPABASE_URL}/rest/v1/logs` +
    `?log_type=eq.website_order_pending` +
    `&data->>stripeSessionId=eq.${encodeURIComponent(sessionId)}` +
    `&select=id&limit=1`;

  const res = await fetch(url, { headers: headers() });
  if (!res.ok) throw new Error(`Supabase lookup failed (${res.status}): ${await res.text()}`);
  const rows = (await res.json()) as unknown[];
  return rows.length > 0;
}

async function insert(table: string, row: Record<string, unknown>) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: headers({ Prefer: "return=minimal" }),
    body: JSON.stringify(row),
  });
  if (!res.ok) {
    throw new Error(`Supabase insert into ${table} failed (${res.status}): ${await res.text()}`);
  }
}

/**
 * Writes the order into `logs` and raises a `notifications` row against it.
 * Returns "skipped" when the environment is not configured, so a missing key can
 * never take the checkout down.
 */
export async function recordOrderInKitchenApp(
  order: KitchenOrder
): Promise<"written" | "duplicate" | "skipped"> {
  if (!configured()) {
    console.warn(
      "Kitchen app Supabase env vars are not set; skipping order sync for",
      order.stripeSessionId
    );
    return "skipped";
  }

  if (await alreadyRecorded(order.stripeSessionId)) return "duplicate";

  const boxCount = order.packs.reduce((sum, p) => sum + p.qty, 0);

  await insert("logs", {
    log_type: "website_order_pending",
    saved_at: new Date().toISOString(),
    data: {
      source: "website",
      stripeSessionId: order.stripeSessionId,
      name: order.name,
      email: order.email,
      phone: order.phone,
      address: order.address,
      // The kitchen app matches this against campaign names.
      occasion: order.occasion,
      theme: order.occasion,
      items: order.items,
      packs: order.packs,
      boxCount,
      flavour: order.flavour,
      deliveryMethod: order.deliveryMethod,
      deliveryLabel: order.deliveryLabel,
      toCollectionPoint: order.toCollectionPoint,
      shippingFee: order.shippingFee,
      amountPaid: order.amountPaid,
      paid: true,
      cardMessage: order.cardMessage,
      // Explicitly unassigned so the campaign review panel picks it up. Both spellings
      // are written because the kitchen app reads camelCase and writes snake_case.
      campaignId: null,
      campaign_id: null,
      orderedAt: new Date().toISOString(),
    },
  });

  await insert("notifications", {
    // Filtering is by user_name, so this must be a real user or nobody sees it.
    user_name: "Kersti",
    type: "website_order",
    severity: "warning",
    title: `New website order from ${order.name}`,
    detail:
      `${boxCount} ${boxCount === 1 ? "box" : "boxes"} · ${order.items} · ` +
      `${order.occasion} · ${order.deliveryLabel} · $${order.amountPaid.toFixed(2)} paid`,
    reference_id: order.stripeSessionId,
    // notifJump only understands stock/sales/tasks/forms/production; campaigns live
    // under sales.
    reference_tab: "sales",
    status: "active",
  });

  return "written";
}
