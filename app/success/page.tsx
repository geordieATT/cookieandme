import Link from "next/link";

export default function SuccessPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#FAFAF8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 24px",
      }}
    >
      <div style={{ maxWidth: 480, textAlign: "center" }}>
        <div
          style={{
            width: 56,
            height: 56,
            backgroundColor: "#0C0E58",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 28px",
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 12L10 17L19 7"
              stroke="#FAFAF8"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 900,
            fontSize: 32,
            color: "#0C0E58",
            marginBottom: 12,
          }}
        >
          Thank you for your order
        </h1>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 15,
            color: "#555",
            lineHeight: 1.7,
            marginBottom: 36,
          }}
        >
          Your payment was successful. We have received your order and will be
          in touch shortly to confirm the details.
        </p>
        <Link
          href="/"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: 14,
            letterSpacing: "0.02em",
            color: "#FAFAF8",
            backgroundColor: "#0C0E58",
            padding: "13px 32px",
            borderRadius: 2,
            display: "inline-block",
          }}
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
