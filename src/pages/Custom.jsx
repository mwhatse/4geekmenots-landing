// apps/app/src/pages/Custom.jsx
import React, { useState } from "react";

export default function Custom() {
  const [deadline] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;
  });

  return (
    <>
      {/* Brand hero */}
      <section className="page-hero" aria-labelledby="custom-heading">
        <div className="container">
          <h1 id="custom-heading">Custom Design Request</h1>
          <p className="kicker">DTF • All-over print • Sleeve/hem wraps • Neck tags • Minimal, 2–3 colors.</p>
        </div>
      </section>

      {/* Body */}
      <section className="section">
        <div className="container grid-2">
          {/* LEFT: Form */}
          <div className="card form-card">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Submitted! (Wire this to Google Forms or your backend when ready.)");
              }}
            >
              {/* Contact */}
              <div className="brand-outline" style={{ padding: 14, marginBottom: 14 }}>
                <h3 style={{ margin: "0 0 8px" }}>Contact</h3>

                <div className="form-row" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
                  <input className="input" name="name" placeholder="Name*" required />
                  <input className="input" type="email" name="email" placeholder="Email*" required />
                  <input className="input" name="phone" placeholder="Phone" />
                </div>

                <div className="form-row">
                  <input
                    className="input"
                    name="title"
                    placeholder="Project title*  e.g., 'AOP wrap: ATL Boarding Pass'"
                    required
                  />
                </div>
              </div>

              {/* Placement */}
              <fieldset className="fieldset">
                <legend>Placement <span className="kicker">(select all that apply)</span></legend>
                <div className="checks">
                  {[
                    "Front",
                    "Back",
                    "Left Sleeve",
                    "Right Sleeve",
                    "Hem Wrap",
                    "Neck Tag",
                    "All-Over (AOP)",
                  ].map((lbl) => (
                    <label key={lbl} className="check">
                      <input type="checkbox" name="placement" value={lbl} />
                      <span>{lbl}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Specs */}
              <div
                className="form-row"
                style={{
                  gridTemplateColumns:
                    "minmax(120px, 180px) 1fr 1fr minmax(120px,160px) minmax(160px,1fr)",
                }}
              >
                <select className="select" name="method" defaultValue="DTF" aria-label="Print method">
                  <option>DTF</option>
                  <option>Screen Print</option>
                  <option>Embroidery</option>
                  <option>Vinyl</option>
                </select>
                <input
                  className="input"
                  name="baseColors"
                  placeholder="Shirt/base colors  e.g., black, sand, heather"
                />
                <input className="input" name="sizes" placeholder="Sizes  e.g., S:10, M:12, L:8, XL:4" />
                <input className="input" type="number" name="qty" placeholder="Quantity" min="1" />
                <input className="input" type="date" name="deadline" defaultValue={deadline} />
              </div>

              <div className="form-row" style={{ gridTemplateColumns: "1fr minmax(200px, 260px)" }}>
                <textarea
                  className="textarea"
                  name="notes"
                  placeholder="Design notes — theme, colors, placement, references…"
                />
                <input className="input" type="number" name="budget" placeholder="Budget (USD, optional)" min="0" />
              </div>

              {/* Uploads */}
              <div className="brand-outline" style={{ padding: 14, marginBottom: 14 }}>
                <label style={{ display: "block", marginBottom: 8, fontWeight: 800 }}>
                  Upload art / references
                </label>
                <p className="kicker" style={{ marginBottom: 8 }}>
                  Max 6 files, up to 20MB each (PNG/JPG/PDF/SVG)
                </p>
                {/* Use .input so file control is branded */}
                <input className="input" type="file" name="files" accept=".png,.jpg,.jpeg,.pdf,.svg" multiple />
              </div>

              {/* Submit */}
              <div className="form-row">
                {/* Branded yellow/black button */}
                <button className="button-brand button-lg" type="submit">
                  Submit Request
                </button>
              </div>

              <p className="kicker">We’ll reply within 24–48 hours with a concept & quote.</p>
            </form>
          </div>

          {/* RIGHT: Info */}
          <aside className="card info-card">
            <div className="brand-outline" style={{ padding: 14 }}>
              <h3 style={{ margin: "0 0 6px" }}>How it works</h3>
              <ol style={{ margin: 0, paddingLeft: 18, lineHeight: 1.6 }}>
                <li>Submit the form with details + refs.</li>
                <li>Get a concept & quote in 24–48h.</li>
                <li>One refinement round included.</li>
                <li>Deliverables: DTF-ready transparent PNG (300 DPI) + mockups.</li>
              </ol>
            </div>

            <div className="brand-outline" style={{ padding: 14, marginTop: 14 }}>
              <h3 style={{ margin: "0 0 6px" }}>Brand specs</h3>
              <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.6 }}>
                <li>Palette: brand yellow + black, high contrast.</li>
                <li>2–3 ink colors; flat blacks preferred.</li>
                <li>Typography-forward; travel/minimal vibe.</li>
              </ul>
            </div>

            <div className="brand-outline" style={{ padding: 14, marginTop: 14 }}>
              <h3 style={{ margin: "0 0 6px" }}>Need inspo?</h3>
              <p className="kicker" style={{ margin: 0 }}>
                Boarding-pass type • Airport tags • Minimal icons (planes, passports) • “Wear Your Story”
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
