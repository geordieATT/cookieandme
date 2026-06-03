const steps = [
  {
    number: "01",
    title: "Submit Your Brief",
    description:
      "Tell us your design, colours, flavour, quantity, and date needed.",
  },
  {
    number: "02",
    title: "Pay Your Deposit",
    description:
      "Full payment upfront for orders under 100 cookies. 50% deposit for larger orders, secured via Stripe.",
  },
  {
    number: "03",
    title: "We Get to Work",
    description: "We design your stamp, bake, and package your cookies.",
  },
  {
    number: "04",
    title: "Delivery or Pickup",
    description:
      "Free pickup or delivery in Lower Hutt. Nationwide shipping from $8.",
  },
];

const stepColors = ["#FB3D03", "#6A3EA2", "#FB3D03", "#6A3EA2"];

export default function HowItWorksSection() {
  return (
    <section style={{ padding: "96px 0" }}>
      <div className="section-container">
        <h2
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(26px, 3.5vw, 38px)",
            color: "#0C0E58",
            marginBottom: 56,
            textAlign: "center",
          }}
        >
          How It Works
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
                  backgroundColor: stepColors[i],
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
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 900,
                    fontSize: 13,
                    color: "#FAFAF8",
                    letterSpacing: "0.05em",
                  }}
                >
                  {step.number}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 800,
                  fontSize: 17,
                  color: "#0C0E58",
                  marginBottom: 10,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: "#555",
                  lineHeight: 1.7,
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
