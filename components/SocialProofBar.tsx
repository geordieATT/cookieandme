const stats = [
  { value: "1,500", label: "Cookies Baked So Far" },
  { value: "Lower Hutt, NZ", label: "Based In" },
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
            key={stat.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "24px 48px",
              borderRight:
                i < stats.length - 1 ? "1px solid #D8D7D5" : "none",
              flex: "1 1 180px",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 900,
                fontSize: 20,
                color: "#1B2B6B",
                marginBottom: 4,
                whiteSpace: "nowrap",
              }}
            >
              {stat.value}
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: "#666",
                fontWeight: 500,
                letterSpacing: "0.01em",
                whiteSpace: "nowrap",
              }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
