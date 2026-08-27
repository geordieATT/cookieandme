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

## Shipping (current behaviour)

There are **two separate order flows with different shipping rules.**

### 1. Gift boxes — `/gift-boxes`

Ready-made boxes, paid through Stripe Checkout. NZ Post pricing is **flat
nationwide**, not zone-based (confirmed with NZ Post directly), so there is no
North/South Island split.

**Step 1 — delivery method:**

| Value | Shown as | Price | Address? |
|---|---|---|---|
| `pickup` | Pickup from Lower Hutt | Free | No |
| `huttDelivery` | Delivery in the Hutt Valley | Free | Yes |
| `nzPostEconomy` | NZ Post Economy (3 day) | $8.90 | Yes |
| `nzPostOvernight` | NZ Post Overnight | $10.90 | Yes |

**Step 2 — only for the two NZ Post methods:** "To your door" or "To an NZ Post
shop". Collection point is the **same price**, not a discount.

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

### Known gaps

1. **One cutoff for every method.** Orders close 5pm the Thursday before
   Father's Day (`lib/fathersDay.ts`), but courier takes 3–5 business days, so a
   courier order placed at the cutoff cannot arrive by Sunday. Realistically the
   Thursday cutoff only works for pickup and local delivery.
2. **No allergen or ingredient information** anywhere on the site.
3. **Collection point still asks for the customer's address.** Needed to book
   the parcel, but it has not been confirmed whether NZ Post needs the shop's
   address instead.
