import Image from "next/image";

export default function OurStorySection() {
  return (
    <section
      id="about"
      style={{ padding: "96px 0", backgroundColor: "#F4F4F2" }}
    >
      <div className="section-container">
        <div className="two-col">
          {/* Copy */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <h2
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(26px, 3.5vw, 38px)",
                color: "#0C0E58",
                marginBottom: 24,
              }}
            >
              Our Story
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                color: "#333",
                lineHeight: 1.8,
                marginBottom: 20,
              }}
            >
              Cookie &amp; Me is a mother-and-son business based in Lower Hutt.
              We started because we wanted to build something together that used
              both of our existing skills, while developing the experience,
              skills, and connections that will carry us into future ventures.
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                color: "#333",
                lineHeight: 1.8,
              }}
            >
              What sets us apart is the design work. Every stamp is created from
              scratch using CAD software and 3D-printed on a dedicated printer
              using FDA-approved food-safe filament. That&apos;s what lets us
              produce real logos, custom text, and detailed artwork, rather than
              relying on letter blocks and hand-iced icons like most bakeries.
            </p>
          </div>

          {/* Image */}
          <div
            style={{
              position: "relative",
              aspectRatio: "3/4",
              overflow: "hidden",
              borderRadius: 2,
            }}
          >
            <Image
              src="/images/geordie-and-kersti-kitchen.jpg"
              alt="Geordie and Kersti in the kitchen"
              fill
              style={{ objectFit: "cover", objectPosition: "left center", transform: "scale(1.06)", transformOrigin: "left center" }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
