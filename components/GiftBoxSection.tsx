"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const PACKS = [
  { size: 6, label: "6 Pack", price: 20 },
  { size: 12, label: "12 Pack", price: 38 },
] as const;

const FULFILLMENT_OPTIONS = [
  { value: "pickup", label: "Pickup from Lower Hutt", fee: 0, needsAddress: false },
  { value: "delivery", label: "Delivery in the Hutt Valley", fee: 0, needsAddress: true },
  { value: "northIsland", label: "North Island Courier", fee: 8.5, needsAddress: true },
  { value: "southIsland", label: "South Island Courier", fee: 12.5, needsAddress: true },
] as const;

type Fulfillment = (typeof FULFILLMENT_OPTIONS)[number]["value"];
const COURIER_OPTIONS: Fulfillment[] = ["northIsland", "southIsland"];

const NOTE_MAX = 250;

const GALLERY_IMAGES = [
  { type: "image" as const, src: "/images/fathers-day-gift-box-open-a.jpg", alt: "Father's Day gift box open with cookies" },
  { type: "image" as const, src: "/images/fathers-day-gift-box-open-b.jpg", alt: "Father's Day gift box open with cookies, second angle" },
  { type: "image" as const, src: "/images/fathers-day-cookies-angled.jpg", alt: "Father's Day cookies on a table" },
  { type: "image" as const, src: "/images/fathers-day-cookies-flatlay.jpg", alt: "Father's Day cookies flat lay" },
  { type: "video" as const, src: "/images/fathers-day-gift-box-video.mp4", alt: "Father's Day gift box video" },
];

type Suggestion = { address: string; postcode: string };
type PackSize = (typeof PACKS)[number]["size"];
type CartItem = { packSize: PackSize; qty: number };

const MAX_QTY_PER_LINE = 20;

function priceFor(size: PackSize): number {
  return PACKS.find((p) => p.size === size)!.price;
}

function optionFor(value: Fulfillment) {
  return FULFILLMENT_OPTIONS.find((o) => o.value === value)!;
}

function fmt(n: number): string {
  return "$" + n.toFixed(2).replace(/\.00$/, "");
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function GiftBoxSection() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [fulfillment, setFulfillment] = useState<Fulfillment>("pickup");
  const [confirmUrban, setConfirmUrban] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [includeNote, setIncludeNote] = useState(false);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Address autocomplete
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [lookingUp, setLookingUp] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  // Set when the customer picks a suggestion, so we don't immediately re-query what we just filled in.
  const justSelectedRef = useRef(false);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActiveSlide((prev) => (prev + 1) % GALLERY_IMAGES.length), 4000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const selected = optionFor(fulfillment);
  const needsAddress = selected.needsAddress;

  // Debounced address lookup.
  useEffect(() => {
    if (!needsAddress) return;
    if (justSelectedRef.current) {
      justSelectedRef.current = false;
      return;
    }
    const query = address.trim();
    if (query.length < 3) {
      setSuggestions([]);
      setLookingUp(false);
      return;
    }

    const controller = new AbortController();
    setLookingUp(true);
    const handle = setTimeout(async () => {
      try {
        const res = await fetch(`/api/address-lookup?q=${encodeURIComponent(query)}`, { signal: controller.signal });
        const data = await res.json();
        setSuggestions(data.suggestions ?? []);
        setHighlighted(-1);
        setShowSuggestions(true);
      } catch {
        // Aborted or offline — leave the field as free text.
      } finally {
        setLookingUp(false);
      }
    }, 300);

    return () => { clearTimeout(handle); controller.abort(); };
  }, [address, needsAddress]);

  const chooseSuggestion = (s: Suggestion) => {
    justSelectedRef.current = true;
    setAddress(s.address);
    if (s.postcode) setPostcode(s.postcode);
    setSuggestions([]);
    setShowSuggestions(false);
    setHighlighted(-1);
  };

  const handleAddressKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((i) => (i - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter" && highlighted >= 0) {
      e.preventDefault();
      chooseSuggestion(suggestions[highlighted]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % GALLERY_IMAGES.length);

  const subtotal = cart.reduce((sum, item) => sum + priceFor(item.packSize) * item.qty, 0);
  const shippingFee = selected.fee;
  const total = subtotal + shippingFee;
  const isCourier = COURIER_OPTIONS.includes(fulfillment);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const qtyFor = (size: PackSize) => cart.find((item) => item.packSize === size)?.qty ?? 0;

  // Derives the new quantity from the previous state rather than a captured value, so
  // rapid taps on + don't collapse into a single increment. Zero drops the pack entirely.
  const adjustQty = (size: PackSize, delta: number) => {
    setError("");
    setCart((prev) => {
      const current = prev.find((item) => item.packSize === size)?.qty ?? 0;
      const next = Math.max(0, Math.min(MAX_QTY_PER_LINE, current + delta));
      if (next === 0) return prev.filter((item) => item.packSize !== size);
      if (prev.some((item) => item.packSize === size)) {
        return prev.map((item) => (item.packSize === size ? { ...item, qty: next } : item));
      }
      // Keep the order stable so rows don't jump around as packs are added.
      return [...prev, { packSize: size, qty: next }].sort((a, b) => a.packSize - b.packSize);
    });
  };

  const handleSubmit = async () => {
    setError("");
    if (cart.length === 0) {
      setError("Please add at least one gift box to your cart.");
      return;
    }
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Please fill in your name, email and phone number. All three are required.");
      return;
    }
    if (!isValidEmail(email.trim())) {
      setError("Please enter a valid email address so we can send your confirmation.");
      return;
    }
    if (needsAddress && (!address.trim() || !postcode.trim())) {
      setError("Please enter your delivery address and postcode.");
      return;
    }
    if (isCourier && !confirmUrban) {
      setError("Please confirm your address is an urban (non-rural) address before continuing.");
      return;
    }
    if (includeNote && !note.trim()) {
      setError("Please write your personalised note, or untick the printed note option.");
      return;
    }
    setLoading(true);
    try {
      const summary = cart.map((item) => `${item.qty} × ${item.packSize} Pack`).join(", ");
      const description = `Cookie & Me – Father's Day Gift Boxes (${summary})`;
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderType: "giftbox",
          occasion: "Father's Day",
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          fulfillment,
          items: cart,
          description,
          address: needsAddress ? address.trim() : "",
          postcode: needsAddress ? postcode.trim() : "",
          addCard: includeNote,
          cardMessage: includeNote ? note.trim() : "",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="gift-boxes" className="giftbox-section" style={{ backgroundColor: "#F4F4F2" }}>
      <div className="section-container">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span
            style={{
              color: "#FB3D03",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: 10,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Ready-Made Gift Boxes
          </span>
          <h1
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(26px, 3.5vw, 38px)",
              color: "#0C0E58",
              marginBottom: 10,
            }}
          >
            The Perfect Father&apos;s Day Gift
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.7, color: "#555", marginBottom: 36, maxWidth: 680 }}>
            Give Dad something sweet this Father&apos;s Day. Each box includes your choice of 6 or
            12 buttery vanilla chocolate chip cookies, topped with a thin, intricately stamped
            layer of icing in Father&apos;s Day themed designs. Neatly wrapped and ready to gift,
            it&apos;s the perfect way to say thank you.
          </p>

          <div className="two-col" style={{ alignItems: "start", gap: 56 }}>
            {/* Gallery */}
            <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ position: "relative" }}>
              <div style={{ position: "relative", borderRadius: 2, overflow: "hidden", paddingBottom: "100%", backgroundColor: "#E0DFDD" }}>
                {GALLERY_IMAGES[activeSlide].type === "video" ? (
                  <video
                    key={GALLERY_IMAGES[activeSlide].src}
                    src={GALLERY_IMAGES[activeSlide].src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <Image
                    src={GALLERY_IMAGES[activeSlide].src}
                    alt={GALLERY_IMAGES[activeSlide].alt}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 560px"
                  />
                )}
              </div>
              {GALLERY_IMAGES.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Previous photo"
                    className="giftbox-arrow"
                    style={{ left: 12, opacity: hovered ? 1 : 0.55 }}
                  >
                    {"<"}
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next photo"
                    className="giftbox-arrow"
                    style={{ right: 12, opacity: hovered ? 1 : 0.55 }}
                  >
                    {">"}
                  </button>
                  <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 14 }}>
                    {GALLERY_IMAGES.map((img, i) => (
                      <button
                        key={img.src}
                        type="button"
                        onClick={() => setActiveSlide(i)}
                        aria-label={`Show photo ${i + 1}`}
                        className="giftbox-dot"
                        style={{ ["--dot-color" as string]: i === activeSlide ? "#0C0E58" : "#D0CFCD" }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Product panel */}
            <div>
              {/* Choose boxes */}
              <div style={{ marginBottom: 26 }}>
                <label className="form-label">
                  Choose Your Boxes{cartCount > 0 ? ` (${cartCount} ${cartCount === 1 ? "box" : "boxes"})` : ""}
                </label>
                <div className="giftbox-packs">
                  {PACKS.map((p) => {
                    const qty = qtyFor(p.size);
                    return (
                      <div key={p.size} className={`giftbox-pack-row${qty > 0 ? " is-selected" : ""}`}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className="giftbox-pack-name">{p.label}</div>
                          <div className="giftbox-pack-price">{fmt(p.price)} each</div>
                        </div>
                        <div className="giftbox-stepper">
                          <button
                            type="button"
                            onClick={() => adjustQty(p.size, -1)}
                            disabled={qty === 0}
                            aria-label={`Decrease ${p.label} quantity`}
                            className="giftbox-cart-qty-btn"
                            style={{ opacity: qty === 0 ? 0.4 : 1, cursor: qty === 0 ? "not-allowed" : "pointer" }}
                          >
                            −
                          </button>
                          <span className="giftbox-stepper-value" aria-live="polite">{qty}</span>
                          <button
                            type="button"
                            onClick={() => adjustQty(p.size, 1)}
                            aria-label={`Increase ${p.label} quantity`}
                            className="giftbox-cart-qty-btn"
                          >
                            +
                          </button>
                        </div>
                        <div className="giftbox-pack-total">
                          {qty > 0 ? fmt(p.price * qty) : "-"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Printed note */}
              <div style={{ marginBottom: 26 }}>
                <label className="form-label">Personalised Note</label>
                <label
                  style={{
                    display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer",
                    backgroundColor: includeNote ? "#fff" : "#FAFAF8",
                    border: includeNote ? "2px solid #0C0E58" : "1.5px solid #D0CFCD",
                    borderRadius: 2, padding: "14px 16px",
                    fontFamily: "'Inter', sans-serif", fontSize: 14, lineHeight: 1.5, color: "#0C0E58",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={includeNote}
                    onChange={(e) => { setIncludeNote(e.target.checked); if (!e.target.checked) setNote(""); }}
                    style={{ width: 20, height: 20, marginTop: 1, flexShrink: 0 }}
                  />
                  <span>
                    <strong style={{ fontWeight: 700 }}>Include a printed personalised note</strong>
                    <span style={{ display: "block", fontSize: 13, color: "#666", marginTop: 2 }}>
                      Free. We&apos;ll print it and pop it in the box.
                    </span>
                  </span>
                </label>

                {includeNote && (
                  <div style={{ marginTop: 12 }}>
                    <label className="form-label" htmlFor="gb-note">Your Note *</label>
                    <textarea
                      id="gb-note"
                      className="form-field"
                      value={note}
                      onChange={(e) => setNote(e.target.value.slice(0, NOTE_MAX))}
                      maxLength={NOTE_MAX}
                      rows={4}
                      placeholder="Happy Father's Day, Dad. Thanks for everything. Love, the kids."
                      style={{ resize: "vertical", minHeight: 96, lineHeight: 1.5 }}
                    />
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif", fontSize: 12, marginTop: 6, textAlign: "right",
                        color: note.length >= NOTE_MAX ? "#FB3D03" : "#888",
                      }}
                    >
                      {note.length}/{NOTE_MAX} characters
                    </div>
                  </div>
                )}
              </div>

              {/* Contact details */}
              <h3 style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: 16, color: "#0C0E58", marginBottom: 4 }}>
                Your Details
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#888", marginBottom: 12 }}>
                All fields required so we can confirm your order.
              </p>
              <div className="form-two-col" style={{ marginBottom: 16 }}>
                <div>
                  <label className="form-label" htmlFor="gb-name">Name *</label>
                  <input id="gb-name" type="text" required className="form-field" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" autoComplete="name" />
                </div>
                <div>
                  <label className="form-label" htmlFor="gb-email">Email *</label>
                  <input id="gb-email" type="email" required inputMode="email" className="form-field" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" />
                </div>
              </div>
              <div style={{ marginBottom: 26 }}>
                <label className="form-label" htmlFor="gb-phone">Phone *</label>
                <input id="gb-phone" type="tel" required inputMode="tel" className="form-field" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="021 000 0000" autoComplete="tel" style={{ maxWidth: 320 }} />
              </div>

              {/* Delivery method */}
              <div style={{ marginBottom: 22 }}>
                <label className="form-label" htmlFor="gb-fulfillment">Pickup or Delivery *</label>
                <select
                  id="gb-fulfillment"
                  className="form-field form-select"
                  value={fulfillment}
                  onChange={(e) => { setFulfillment(e.target.value as Fulfillment); setConfirmUrban(false); }}
                >
                  {FULFILLMENT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label} ({opt.fee === 0 ? "Free" : fmt(opt.fee)})
                    </option>
                  ))}
                </select>

                {fulfillment === "pickup" && (
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif", fontSize: 13, lineHeight: 1.6, color: "#555",
                      backgroundColor: "#fff", border: "1.5px solid #D4D9EE", borderRadius: 2,
                      padding: "12px 14px", marginTop: 12,
                    }}
                  >
                    We&apos;ll be in touch soon to arrange a time for you to come by and pick them up.
                  </p>
                )}
              </div>

              {/* Delivery address */}
              {needsAddress && (
                <div style={{ marginBottom: 26 }}>
                  <h3 style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: 16, color: "#0C0E58", marginBottom: 12 }}>
                    Delivery Address
                  </h3>

                  <div style={{ marginBottom: 14, position: "relative" }}>
                    <label className="form-label" htmlFor="gb-address">Address *</label>
                    <input
                      id="gb-address"
                      type="text"
                      required
                      className="form-field"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      onKeyDown={handleAddressKeyDown}
                      onFocus={() => { if (suggestions.length) setShowSuggestions(true); }}
                      onBlur={() => setShowSuggestions(false)}
                      placeholder="Start typing your address..."
                      autoComplete="off"
                      role="combobox"
                      aria-expanded={showSuggestions && suggestions.length > 0}
                      aria-autocomplete="list"
                      aria-controls="gb-address-suggestions"
                    />
                    {lookingUp && (
                      <span style={{ position: "absolute", right: 12, top: 38, fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#AAA" }}>
                        Searching…
                      </span>
                    )}
                    {showSuggestions && suggestions.length > 0 && (
                      <ul id="gb-address-suggestions" role="listbox" className="address-suggestions">
                        {suggestions.map((s, i) => (
                          <li key={`${s.address}-${i}`} role="option" aria-selected={i === highlighted}>
                            <button
                              type="button"
                              // onMouseDown fires before the input's blur, so the click still registers.
                              onMouseDown={(e) => { e.preventDefault(); chooseSuggestion(s); }}
                              onMouseEnter={() => setHighlighted(i)}
                              className="address-suggestion"
                              style={{ backgroundColor: i === highlighted ? "#F0F1F8" : "transparent" }}
                            >
                              <span>{s.address}</span>
                              {s.postcode && <span style={{ color: "#888", marginLeft: 8 }}>{s.postcode}</span>}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#888", marginTop: 6 }}>
                      Pick your address from the list, or type it in full if it isn&apos;t there.
                    </p>
                  </div>

                  <div style={{ marginBottom: 14 }}>
                    <label className="form-label" htmlFor="gb-postcode">Postcode *</label>
                    <input
                      id="gb-postcode"
                      type="text"
                      required
                      inputMode="numeric"
                      className="form-field"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value)}
                      placeholder="5012"
                      autoComplete="postal-code"
                      style={{ maxWidth: 200 }}
                    />
                  </div>

                  {isCourier && (
                    <>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, lineHeight: 1.6, color: "#888", marginBottom: 10 }}>
                        Courier delivery is available to urban addresses only. We can&apos;t currently
                        deliver to rural addresses. If you&apos;re unsure or your address is rural, please
                        choose pickup or <a href="/contact" style={{ color: "#0C0E58" }}>contact us</a> instead.
                      </p>
                      <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontFamily: "'Inter', sans-serif", fontSize: 13, lineHeight: 1.5, color: "#444", cursor: "pointer" }}>
                        <input
                          type="checkbox"
                          checked={confirmUrban}
                          onChange={(e) => setConfirmUrban(e.target.checked)}
                          style={{ width: 20, height: 20, marginTop: 1, flexShrink: 0 }}
                        />
                        This is an urban (non-rural) delivery address.
                      </label>
                    </>
                  )}
                </div>
              )}

              {/* Order summary */}
              <div
                style={{
                  backgroundColor: "#fff",
                  border: "1.5px solid #D4D9EE",
                  borderRadius: 2,
                  padding: "18px 20px",
                  marginBottom: 20,
                }}
              >
                {cart.length === 0 ? (
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#888", marginBottom: 6 }}>
                    <span>No boxes added yet</span>
                    <span>-</span>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.packSize} style={{ display: "flex", justifyContent: "space-between", gap: 12, fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#444", marginBottom: 6 }}>
                      <span>{item.qty} × {item.packSize} Pack</span>
                      <span style={{ fontWeight: 600, color: "#0C0E58" }}>{fmt(priceFor(item.packSize) * item.qty)}</span>
                    </div>
                  ))
                )}
                {includeNote && (
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#444", marginBottom: 6 }}>
                    <span>Printed personalised note</span>
                    <span style={{ fontWeight: 600, color: "#0C0E58" }}>Free</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#444", marginBottom: 10 }}>
                  <span>{fulfillment === "pickup" ? "Pickup" : "Shipping"}</span>
                  <span style={{ fontWeight: 600, color: "#0C0E58" }}>{shippingFee === 0 ? "Free" : fmt(shippingFee)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 700, color: "#0C0E58", borderTop: "1px solid #C8CCE0", paddingTop: 10 }}>
                  <span>Total</span>
                  <span style={{ fontSize: 20, fontFamily: "'Nunito', sans-serif", fontWeight: 900 }}>{fmt(total)}</span>
                </div>
              </div>

              {error && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, lineHeight: 1.5, color: "#FB3D03", fontWeight: 500, marginBottom: 12 }}>{error}</p>}

              <button
                onClick={handleSubmit}
                disabled={loading || cart.length === 0}
                className="btn-red"
                style={{
                  width: "100%", padding: "16px", fontSize: 15,
                  opacity: loading || cart.length === 0 ? 0.5 : 1,
                  cursor: loading || cart.length === 0 ? "not-allowed" : "pointer",
                }}
              >
                {loading
                  ? "Redirecting to payment..."
                  : cart.length === 0
                  ? "Add a Gift Box to Continue"
                  : `Pay ${fmt(total)} NZD`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
