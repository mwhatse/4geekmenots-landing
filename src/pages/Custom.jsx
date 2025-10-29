// apps/app/src/pages/Custom.jsx
import React from "react";

export default function Custom() {
  return (
    <>
      {/* Page intro */}
      <section className="page-hero" aria-labelledby="custom-heading">
        <div className="container">
          <h1 id="custom-heading">Custom Design Request</h1>
          <p className="kicker">Tell us the story you want to wear—clean, minimal, and built for DTF.</p>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container grid-2">
          {/* Left: Form */}
          <div className="card form-card">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Submitted! (Hook this up to Google Forms or your backend)");
              }}
            >
              <div className="form-row">
                <label htmlFor="name">Full Name</label>
                <input id="name" className="input" name="name" placeholder="Your name" required />
              </div>

              <div className="form-row">
                <label htmlFor="email">Email</label>
                <input id="email" className="input" type="email" name="email" placeholder="you@example.com" required />
              </div>

              <div className="form-row">
                <label htmlFor="size">Shirt Color &amp; Size</label>
                <input id="size" className="input" name="size" placeholder="Ex: Black / XL" />
              </div>

              <div className="form-row">
                <label htmlFor="theme">Project Theme</label>
                <select id="theme" className="select" name="theme" defaultValue="">
                  <option value="" disabled>
                    Select a theme…
                  </option>
                  <option>Travel / Destination</option>
                  <option>Typography-Forward</option>
                  <option>Minimal Graphic (2–3 colors)</option>
                  <option>Luxury Streetwear</option>
                  <option>Other (describe below)</option>
                </select>
              </div>

              <div className="form-row">
                <label htmlFor="brief">Describe your idea</label>
                <textarea
                  id="brief"
                  className="textarea"
                  name="brief"
                  placeholder="Vibe, text, references…"
                />
              </div>

              <div className="form-row">
                <label htmlFor="placement">Placement</label>
                <input
                  id="placement"
                  className="input"
                  name="placement"
                  placeholder="Front center / Back large / Sleeve, etc."
                />
              </div>

              <div className="form-row">
                <button className="button-brand button-lg" type="submit">
                  Submit Custom Request
                </button>
              </div>

              <p className="kicker" style={{ marginTop: 8 }}>
                We’ll reply within 24–48 hours with a concept &amp; quote.
              </p>
            </form>
          </div>

          {/* Right: Info */}
          <aside className="card info-card">
            <div className="brand-outline" style={{ padding: 14 }}>
              <h3 style={{ margin: "0 0 6px" }}>How it works</h3>
              <ol style={{ margin: 0, paddingLeft: 18, lineHeight: 1.6 }}>
                <li>Share your vision (form on the left).</li>
                <li>We send a concept + mockup (2–3 color minimal).</li>
                <li>One round of refinements is included.</li>
                <li>We prep DTF-ready art; you choose garment.</li>
              </ol>
            </div>

            <div className="brand-outline" style={{ padding: 14, marginTop: 14 }}>
              <h3 style={{ margin: "0 0 6px" }}>Brand specs</h3>
              <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.6 }}>
                <li>Palette: brand yellow + black (high contrast)</li>
                <li>Print: DTF-friendly, flat blacks, 2–3 inks</li>
                <li>File: transparent PNG, 300 DPI minimum</li>
              </ul>
            </div>

            <div className="brand-outline" style={{ padding: 14, marginTop: 14 }}>
              <h3 style={{ margin: "0 0 6px" }}>Need inspo?</h3>
              <p className="kicker" style={{ margin: 0 }}>
                Travel tags • Boarding-pass type • Minimal icons (planes, passports) • Strong type first.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
