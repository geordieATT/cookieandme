# Cookie & Me

Next.js (App Router) site for a mother-and-son cookie business in Lower Hutt, NZ.
Live at **cookieandme.nz**, deployed from GitHub (`geordieATT/cookieandme`) to Vercel.

## How we work

- **Push and deploy without asking.** After a commit, `git push` and let Vercel
  deploy. It takes roughly 30–75 seconds.
- **Verify on the live site after deploying, in a real browser.** Do not use
  `curl` + `grep` to confirm a deploy landed. The countdown banner and the
  Father's Day cutoff notice render only after JavaScript runs, so they never
  appear in server HTML and `curl` reports a false "not deployed".
- Run `npx tsc --noEmit` and `npm run build` before committing. Keep lint at
  zero errors.
- Never commit `renamed_cookie_photos.zip`, `download.jfif`, or
  `Steves-70th-on-bench.jfif` — stray files, nothing references them.
- **To test the webhook without a real payment**, sign a fake `checkout.session.completed`
  event with `STRIPE_WEBHOOK_SECRET` from `.env.local` and POST it to
  `https://cookieandme.nz/api/webhook` with a `stripe-signature: t=<ts>,v1=<hmac>`
  header (`v1` = HMAC-SHA256 of `<ts>.<exact raw body bytes>`, hex-encoded). Sign
  and send the *same* bytes — building the signature from a shell variable and
  sending the file (or vice versa) silently changes whitespace/newlines and the
  signature won't match. A 200 response only means the signature verified; it does
  **not** mean the kitchen app write succeeded (that failure path is caught and
  turned into an alert email rather than surfaced in the response). Confirm the
  actual write by querying Supabase directly, and delete the test rows after
  (`log_type = 'website_order_pending'` in `logs`, matching `reference_id` in
  `notifications`). Non-ASCII characters (e.g. `×`) must be UTF-8 encoded in the
  payload used for both signing and sending — building the fixture with `sed` is
  a good way to accidentally corrupt one, which won't be a signature failure and
  will instead show up as a subtly wrong value in the written row.

## Conventions

- **Brand:** navy `#0C0E58`, orange `#FB3D03`, off-white `#FAFAF8`, page grey
  `#F4F4F2`. Headings Nunito 900, body Inter.
- Styling is inline `style={{}}` plus shared classes in `app/globals.css`.
- **Images must be `.jpg`, never `.jfif`.** Vercel serves `.jfif` as
  `application/octet-stream` and the Next image optimiser rejects it with a 400.
  It works locally and breaks in production. `.jfif` files are plain JPEG, so
  renaming the extension is a safe fix.
- **Mobile:** inputs at 16px or larger (smaller makes iOS zoom on focus), tap
  targets 40px+, never any horizontal scroll.
- **No em dashes in customer-facing copy.** The owner does not want text that
  reads as AI-written; avoid bullet-list-then-sign-off structures too.
- Money is computed **server side**. Never trust a price or subtotal sent by the
  browser.
- Escape any customer-supplied text before putting it in an HTML email.

## Gift box ordering — currently disabled, not deleted

The Father's Day gift box flow was pulled off the live site on 2026-09-02 (no
occasion to sell for right now) but **every file is still in the repo**,
working and ready to relink. Nothing below this point was deleted — the
`## Shipping` and `## Kitchen app sync` sections that follow still describe
real, current code, just code that no page currently imports.

**What "disabled" means in practice:** `app/gift-boxes/page.tsx` was deleted
(so the route 404s) and every link to it was removed. `components/GiftBoxSection.tsx`,
`lib/shipping.ts`, `lib/fathersDay.ts`, `components/FathersDayCountdown.tsx`,
and the gift-box branches in `app/api/checkout/route.ts`, `app/api/webhook/route.ts`
and `lib/kitchenApp.ts` are all untouched and still fully functional — they're
just unreferenced by any page, so Next.js doesn't build a route for them.

**To bring gift boxes back**, in order:

1. Recreate `app/gift-boxes/page.tsx`:
   ```tsx
   import type { Metadata } from "next";
   import GiftBoxSection from "@/components/GiftBoxSection";

   export const metadata: Metadata = {
     title: "Father's Day Gift Boxes",
     description:
       "Ready-made Father's Day gift boxes of hand-stamped cookies. Pick a 6 or 12 pack, add a printed note, and choose pickup, Hutt Valley delivery, or nationwide courier.",
   };

   export default function GiftBoxesPage() {
     return (
       <main className="page-top">
         <GiftBoxSection />
       </main>
     );
   }
   ```
2. Add `{ label: "Gift Boxes", href: "/gift-boxes" }` back into the `navLinks`
   array in `components/Navbar.tsx` and `components/Footer.tsx`.
3. In `components/HeroSection.tsx`, add a red `Shop Gift Boxes` button back
   into the hero button row, pointing at `/gift-boxes`.
4. In `app/page.tsx`, import `FathersDayCountdown` and render it right after
   `<HeroSection />`.
5. In `components/HomePaths.tsx`, add the gift box card back to the top of
   the `paths` array. `.home-paths-grid` in `app/globals.css` auto-balances
   for 2 or 3 cards, so no CSS change is needed either way.
6. Add `{ path: "/gift-boxes", priority: 0.9, changeFrequency: "weekly" as const }`
   back into `app/sitemap.ts`.

**Before relinking for a *different* occasion** (Christmas, Mother's Day,
etc.) rather than reactivating for another Father's Day: `GiftBoxSection.tsx`,
its gallery images, and `lib/fathersDay.ts` are all Father's-Day-specific —
copy, photos, the `occasion` value sent to Stripe/the kitchen app, and the
cutoff-date math (first Sunday of September) all assume that occasion. Reusing
the flow for a new occasion means updating those, not just relinking the page.

## Shipping (current behaviour)

There are **two separate order flows with different shipping rules.**

### 1. Gift boxes — `/gift-boxes` (currently disabled, see above)

Ready-made boxes, paid through Stripe Checkout. NZ Post pricing is **flat
nationwide**, not zone-based (confirmed with NZ Post directly), so there is no
North/South Island split.

**Step 1 — delivery method:**

| Value | Shown as | Price | Address? |
|---|---|---|---|
| `pickup` | Pickup from Lower Hutt | Free | No |
| `huttDelivery` | Delivery in the Hutt Valley | Free | Yes |
| `nzPostEconomy` | NZ Post Economy (3 day) | from $8.90 | Yes |
| `nzPostOvernight` | NZ Post Overnight | from $10.90 | Yes |

**Courier price depends on the mix of boxes.** NZ Post's multi-box pricing does
not follow a size or volume formula, so every combination in `COMBO_TIERS`
(`lib/shipping.ts`) was tested on NZ Post's own calculator.

| Boxes (6-packs : 12-packs) | Economy | Overnight |
|---|---|---|
| 1:0, 2:0, 0:1 | $8.90 | $10.90 |
| 3:0 – 6:0, 0:2, 0:3, 1:1, 2:1, 3:1, 4:1, 1:2, 2:2 | $14.20 | $16.20 |

**Never add a row by extrapolating.** A combination that is not in the table
cannot be priced: the form disables checkout, shows the total as
"$X + courier", and points the customer at the contact page, and the API
rejects it with `COMBO_NOT_TESTED`. To add a combination, test it on NZ Post's
"Send It in NZ" calculator first. Pickup and Hutt Valley delivery stay free at
any size, so a large order can always be placed that way.

⚠ **The $14.20 tier-2 economy price is unverified** — it was an estimate, not a
figure from the calculator. Confirm it before relying on it.

**Step 2 — only for the two NZ Post methods:** "To your door" or "To an NZ Post
shop". Collection point is the **same price**, not a discount. Choosing it
relabels the address field to "Collection point address": the customer enters the
shop's address, not their own, because that is where the parcel is sent.

**Step 3 — only for NZ Post door delivery:** two optional add-ons, Signature
required +$3 and Rural delivery address +$6. Choosing a collection point hides
them entirely and voids them in pricing, since neither applies when collecting
in person with photo ID.

- Fees are **per order**, not per box.
- Rural is a **self-declared paid add-on**, not a blocker. Nothing verifies it.
  See the manual backstop below.
- The address is collected in our own form (one autocompleted line plus a
  separate postcode, via `/api/address-lookup`) and passed to Stripe as
  metadata. Stripe does **not** ask for it again.

**Order cutoffs** live in `lib/fathersDay.ts` and differ by method, because
Economy spends three days in transit:

| Method | Father's Day cutoff |
|---|---|
| NZ Post Economy (3 day) | 5pm **Tuesday** before |
| Everything else | 5pm **Thursday** before |

Dates are derived from the first Sunday of September, so they stay correct every
year without editing. When a method has closed but a faster one is still open,
the page says so and points at the alternatives rather than just refusing.

**Manual backstop (a process, not a feature):** whoever ships an order should
check the real NZ Post price against what the customer paid. If it is higher
because an undeclared rural address, contact the customer for the difference
*before* shipping. Only affects door delivery; collection point orders cannot
have this problem.

### 2. Custom cookies — `/order`

Design-your-own orders. Only **two** options, both free: *Free Pickup (Lower
Hutt)* and *Free Delivery (Wellington & Hutt Valley)*. **There is no courier
option in this flow at all.** Site copy says nationwide courier is available
"on request, just ask when you order."

### Where the numbers live

Rates now live in one place:

- **`lib/shipping.ts` is the single source of truth.** `DELIVERY_METHODS`,
  `ADDONS`, and `calculateShipping()` live here. Both the form and the checkout
  API import it, so a rate can only be changed in one place.
- `app/api/checkout/route.ts` recomputes the shipping charge from that library
  and ignores anything the browser sends. Add-ons are forced off for non-NZ-Post
  methods and for collection point, so a crafted request cannot add charges.
- `components/OrderSection.tsx` → the custom-order collection buttons

## Kitchen app sync

Dormant while gift box ordering is disabled — with no page able to create a
`orderType: giftbox` checkout session, this code path simply never fires. It
needs no changes to work again the moment gift boxes is relinked.

The kitchen app is a **separate codebase** (vanilla JS + Supabase, not in this
repo) that Kersti and Geordie use day to day. It has its own Supabase project,
`fbtqvkxnpzaocuzrrfrb` — unrelated to any Supabase project this repo might use
for other things.

When a **paid gift box order** comes in, `app/api/webhook/route.ts` writes it
there (`lib/kitchenApp.ts`) after both confirmation emails have already sent,
so a sync failure can never cost the customer their confirmation:

- `logs`: one row, `log_type: 'website_order_pending'`, holding the order
  details as JSON, including `occasion` (used downstream to match the order to
  a campaign) and `campaignId`/`campaign_id: null` (deliberately unassigned —
  the kitchen app's own review flow files it under a campaign).
- `notifications`: one row alerting Kersti (`user_name: 'Kersti'`,
  `type: 'website_order'`, `severity: 'warning'`, `reference_tab: 'sales'`).
  These values were chosen by reading the kitchen app's actual rendering code,
  not guessed — `type` has no effect on how a notification displays, but
  `reference_tab` does: the app's jump handler only understands five tab
  names, and campaigns live under `sales`.
- Needs `KITCHEN_SUPABASE_URL` and `KITCHEN_SUPABASE_SERVICE_ROLE_KEY` set in
  Vercel (server side only — never referenced from a client component). Skips
  itself with a warning log if they're missing, rather than failing the
  webhook.
- Deduplicates on `stripeSessionId`, since Stripe can redeliver a webhook.
- If the write fails for any other reason, an email goes to the owner with the
  order details so it can be entered by hand, since a paid order that never
  reaches the kitchen app would otherwise be silently lost.

Verified end to end on 2026-08-28 with a signed test event (see the testing
note above) — confirmed both rows land with the right shape, then deleted.

### Known gaps

1. **No allergen or ingredient information** anywhere on the site.
