import Image from "next/image";

// Photo on the left taking the wider share of the row, text on the right
// (photo on top on phones).
export default function OurStorySection() {
  return (
    <section id="about" style={{ padding: "88px 0 112px" }}>
      <div className="section-container">
        <div className="story-layout">
          <div className="story-photo">
            <Image
              src="/images/geordie-and-kersti-kitchen.jpg"
              alt="Geordie and Kersti in the kitchen"
              fill
              priority
              style={{ objectFit: "cover", objectPosition: "left center", transform: "scale(1.06)", transformOrigin: "left center" }}
              sizes="(max-width: 768px) 100vw, 640px"
            />
          </div>

          <div>
            <h1 style={{ marginBottom: 28 }}>Our story</h1>
            <p style={{ marginBottom: 20 }}>
              Cookie &amp; Me is a mother-and-son business based in Lower Hutt.
              We started because we wanted to build something together that used
              both of our existing skills, while developing the experience,
              skills, and connections that will carry us into future ventures.
            </p>
            <p style={{ marginBottom: 20 }}>
              What sets us apart is the design work. We custom design and make
              every stamp in house, using CAD software to replicate logos and
              fine details as thin as a business card. That&apos;s what lets us
              produce real logos, custom text, and detailed artwork, rather than
              relying on letter blocks and hand-iced icons like most bakeries.
            </p>
            <p>We have baked over 4,000 cookies so far.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
