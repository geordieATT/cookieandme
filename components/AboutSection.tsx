"use client";

export default function AboutSection() {
  return (
    <section id="about" style={{ padding: "40px 20px 64px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="grid-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <span style={{ color: "#9B8EC4", fontWeight: 800, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", display: "block", marginBottom: 12 }}>
                Handmade with heart in Lower Hutt
              </span>
              <h2 style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: 32, color: "#00205B", marginBottom: 16 }}>
                Our Story
              </h2>
            </div>
            <div style={{ border: "2px dotted #CCC", borderRadius: 12, padding: "32px 24px", textAlign: "center" }}>
              <p style={{ color: "#AAA", fontWeight: 600, fontSize: 15 }}>Text coming soon</p>
            </div>
          </div>

          <div style={{ border: "2px dotted #CCC", borderRadius: 16, padding: "60px 24px", textAlign: "center", backgroundColor: "#F5F5F5" }}>
            <p style={{ color: "#AAA", fontWeight: 600, fontSize: 15 }}>Photo coming soon</p>
          </div>

        </div>
      </div>
    </section>
  );
}
