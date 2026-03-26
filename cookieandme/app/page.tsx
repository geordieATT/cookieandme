import Link from "next/link";

export default function SuccessPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#F7F5F0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Nunito', sans-serif",
        padding: 24,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: 28,
          padding: "64px 48px",
          maxWidth: 520,
          width: "100%",
          textAlign: "center",
          boxShadow: "0 8px 48px rgba(0,32,91,0.10)",
        }}
      >
        <div style={{ fontSize: 64, marginBottom: 16 }}>🍪</div>
        <h1
          style={{
            fontWeight: 900,
            fontSize: 32,
            color: "#00205B",
            marginBottom: 12,
          }}
        >
          Order Confirmed!
        </h1>
        <p
          style={{
            color: "#555",
            fontWeight: 600,
            fontSize: 17,
            lineHeight: 1.6,
            marginBottom: 32,
          }}
        >
          Thank you — your order is in! We&apos;ll be in touch to confirm the details
          and bake your cookies fresh. ✨
        </p>
        <Link
          href="/"
          style={{
            backgroundColor: "#C04B2B",
            color: "#fff",
            fontWeight: 900,
            fontSize: 16,
            padding: "14px 32px",
            borderRadius: 50,
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
