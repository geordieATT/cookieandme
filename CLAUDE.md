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

Ready-made Father's Day boxes, paid through Stripe Checkout. One dropdown:

| Value | Shown as | Fee | Address? | Rural checkbox? |
|---|---|---|---|---|
| `pickup` | Pickup from Lower Hutt | Free | No | No |
| `delivery` | Delivery in the Hutt Valley | Free | Yes | No |
| `northIsland` | North Island Courier | $8.50 | Yes | Yes |
| `southIsland` | South Island Courier | $12.50 | Yes | Yes |

- The fee is **flat per order**, not per box.
- Courier options require ticking *"This is an urban (non-rural) delivery
  address."* This is self-declaration only — nothing validates it.
- The address is collected in **our own form** (one autocompleted line plus a
  separate postcode, via `/api/address-lookup`) and passed to Stripe as
  metadata. Stripe does **not** ask for it again.
- Stripe shows a delivery estimate: 3–5 business days courier, 3–7 for pickup
  and local delivery.
- Pickup shows: *"We'll be in touch soon to arrange a time for you to come by
  and pick them up."*

### 2. Custom cookies — `/order`

Design-your-own orders. Only **two** options, both free: *Free Pickup (Lower
Hutt)* and *Free Delivery (Wellington & Hutt Valley)*. **There is no courier
option in this flow at all.** Site copy says nationwide courier is available
"on request, just ask when you order."

### Where the numbers live

Changing a rate means editing **both** of these or they drift apart:

- `components/GiftBoxSection.tsx` → `FULFILLMENT_OPTIONS` — what the customer sees
- `app/api/checkout/route.ts` → `COURIER_RATES` / `COURIER_LABELS` — what is
  actually charged, and the authority
- `app/api/webhook/route.ts` → `collectionLabel` — wording in the order emails
- `components/OrderSection.tsx` → the custom-order collection buttons

### Known gaps

1. **Rates are duplicated** between the client display and the server charge.
   Worth consolidating into `lib/` the way `lib/fathersDay.ts` handles dates.
2. **One cutoff for every method.** Orders close 5pm the Thursday before
   Father's Day (`lib/fathersDay.ts`), but courier takes 3–5 business days, so a
   courier order placed at the cutoff cannot arrive by Sunday. Realistically the
   Thursday cutoff only works for pickup and local delivery.
3. **No allergen or ingredient information** anywhere on the site.
