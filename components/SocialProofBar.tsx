const stats = [
  "1,500 Cookies Baked So Far",
  "Based in Lower Hutt, NZ",
];

export default function SocialProofBar() {
  return (
    <div
      style={{
        backgroundColor: "#F4F4F2",
        borderBottom: "1px solid #E0DFDD",
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
                i < stats.length - 1 ? "1px solid #D8D7D5" : "none",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: 14,
                color: "#1B2B6B",
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
