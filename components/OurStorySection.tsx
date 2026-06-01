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
          <div>
            {/* Placeholder — restore original copy below when ready */}
            <div
              style={{
                backgroundColor: "#E8E8E5",
                borderRadius: 2,
                height: 280,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: "#AAA",
                }}
              >
                Copy goes here
              </span>
            </div>

            {/*
            <h2
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(26px, 3.5vw, 38px)",
                color: "#1B2B6B",
                marginBottom: 24,
              }}
            >
              Who We Are
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
              Cookie &amp; Me is a mother and son business based in Lower Hutt,
              New Zealand. Kersti brings the baking and the heart. Geordie brings
              the engineering — designing every custom stamp from scratch using
              CAD software and a 3D printer. Together, we make cookies that carry
              meaning: your logo, your message, your moment, pressed into every
              single one.
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                color: "#333",
                lineHeight: 1.8,
                marginBottom: 32,
              }}
            >
              We started Cookie &amp; Me because we believe a great gift should
              feel personal, not generic. That&apos;s why every order is made by
              hand, finished with care, and sent out with a label made just for
              you.
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: "#888",
                letterSpacing: "0.04em",
              }}
            >
              Lower Hutt, New Zealand &middot; Est. 2026 &middot; Mother &amp;
              Son
            </p>
            */}
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
