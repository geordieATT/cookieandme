const steps = [
  {
    number: "01",
    title: "Submit your brief",
    description:
      "Tell us your design, colours, flavour, quantity, and date needed.",
  },
  {
    number: "02",
    title: "Pay your deposit",
    description:
      "Full payment upfront for orders under 100 cookies. 50% deposit for larger orders, secured via Stripe.",
  },
  {
    number: "03",
    title: "We get to work",
    description: "We design your stamp, bake, and package your cookies.",
  },
  {
    number: "04",
    title: "Delivery or pickup",
    description:
      "Free pickup or delivery in the Hutt Valley. Nationwide courier available on request.",
  },
];

export default function HowItWorksSection() {
  return (
    <section style={{ padding: "96px 0" }}>
      <div className="section-container">
        <h2
          style={{
            color: "var(--ink)",
            marginBottom: 56,
            textAlign: "center",
          }}
        >
          How it works
        </h2>

        <div className="four-col">
          {steps.map((step, i) => (
            <div key={step.number} style={{ position: "relative" }}>
              {i < steps.length - 1 && (
                <div className="step-connector-line" />
              )}
              <div
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "var(--tint)",
                  border: "1px solid var(--line)",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                  position: "relative",
                  zIndex: 1,
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 900,
                    fontSize: 15,
                    color: "var(--ink)",
                  }}
                >
                  {step.number}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 900,
                  fontSize: 17,
                  color: "var(--ink)",
                  marginBottom: 10,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  color: "var(--text-muted)",
                  lineHeight: 1.65,
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
