const stats = [
  "4,000+ Cookies Baked So Far",
  "Based in Lower Hutt, NZ",
];

export default function SocialProofBar() {
  return (
    <div
      style={{
        backgroundColor: "var(--tint)",
        borderBottom: "1px solid var(--line)",
        padding: "0 24px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={stat}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "18px 48px",
              borderRight:
                i < stats.length - 1 ? "1px solid var(--accent)" : "none",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: 14,
                color: "var(--ink)",
                whiteSpace: "nowrap",
              }}
            >
              {stat}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
