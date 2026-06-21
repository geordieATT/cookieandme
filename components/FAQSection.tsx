"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is the minimum order quantity?",
    a: "Our minimum order is 24 cookies.",
  },
  {
    q: "How long does it take?",
    a: "We require up to 10 days lead time depending on order size and our current schedule. You're welcome to book in advance. Get in touch and we may be able to accommodate sooner depending on availability.",
  },
  {
    q: "Where do you deliver?",
    a: "Free pickup or delivery in Lower Hutt. Nationwide courier — get in touch.",
  },
  {
    q: "How long do the cookies last?",
    a: "Our cookies stay fresh for up to 4 weeks from their production date.",
  },
  {
    q: "What flavours do you offer?",
    a: "Classic Vanilla, Vanilla Chocolate Chip, Dark Salted Chocolate, Ginger, and Spiced.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section style={{ padding: "96px 0", backgroundColor: "#F4F4F2" }}>
      <div className="section-container">
        <h2
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(26px, 3.5vw, 38px)",
            color: "#0C0E58",
            marginBottom: 48,
            textAlign: "center",
          }}
        >
          Frequently Asked Questions
        </h2>

        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.q} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                    style={{
                      flexShrink: 0,
                      marginLeft: 12,
                      transition: "transform 0.2s",
                      transform: isOpen ? "rotate(180deg)" : "none",
                    }}
                  >
                    <path
                      d="M3 6L8 11L13 6"
                      stroke="#6A3EA2"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {isOpen && <div className="faq-answer">{faq.a}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
