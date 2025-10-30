import React, { useState } from "react";
import "./style.css";

const EMAIL_TO = "hello@4geekmenot.com";

export default function Custom() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    garment: "T-Shirt",
    colors: "Black / White",
    sizes: "S-3XL",
    qty: "1–25",
    due: "",
    notes: "",
    company: "", // honeypot
  });

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (form.company?.trim()) return; // bot trap

    const subject = encodeURIComponent("Custom Design Request — 4Geekmenot");
    const body = [
      "CUSTOM REQUEST",
      "-------------------------",
      `Name:   ${form.name}`,
      `Email:  ${form.email}`,
      `Phone:  ${form.phone || "(none)"}`,
      `Garment: ${form.garment}`,
      `Colors:  ${form.colors}`,
      `Sizes:   ${form.sizes}`,
      `Qty:     ${form.qty}`,
      `Need By: ${form.due || "(unspecified)"}`,
      "",
      "NOTES / CONCEPT:",
      form.notes || "(none)",
      "",
      "Source: 4Geekmenot.com/custom",
    ].join("\n");

    window.location.href =
      `mailto:${EMAIL_TO}?subject=${subject}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main id="custom">
      <section className="section">
        <div className="container">
          <header className="page-hero">
            <h1 className="page-title">Custom Design Request</h1>
            <p className="page-sub">
              Tell me the vision—garment, colors, placements, deadline. I’ll draft and quote.
            </p>
          </header>

          <div className="form-wrap">
            <form className="custom-form" onSubmit={submit} noValidate>
              <label className="hidden">
                Company
                <input name="company" value={form.company} onChange={update} tabIndex={-1} />
              </label>

              <div className="field two">
                <label>
                  Full name
                  <input required name="name" value={form.name} onChange={update} />
                </label>
                <label>
                  Email
                  <input required type="email" name="email" value={form.email} onChange={update} />
                </label>
              </div>

              <div className="field two">
                <label>
                  Phone
                  <input name="phone" value={form.phone} onChange={update} placeholder="optional" />
                </label>
                <label>
                  Need by (date)
                  <input type="date" name="due" value={form.due} onChange={update} />
                </label>
              </div>

              <div className="field three">
                <label>
                  Garment
                  <select name="garment" value={form.garment} onChange={update}>
                    <option>T-Shirt</option>
                    <option>Long Sleeve</option>
                    <option>Hoodie</option>
                    <option>Sweatshirt</option>
                    <option>Hat</option>
                    <option>Tote / Bag</option>
                  </select>
                </label>

                <label>
                  Colors
                  <input name="colors" value={form.colors} onChange={update} />
                </label>

                <label>
                  Sizes
                  <input name="sizes" value={form.sizes} onChange={update} />
                </label>
              </div>

              <div className="field">
                <label>
                  Quantity
                  <select name="qty" value={form.qty} onChange={update}>
                    <option>1–25</option>
                    <option>26–50</option>
                    <option>51–100</option>
                    <option>100+</option>
                  </select>
                </label>
              </div>

              <div className="field">
                <label>
                  Notes / concept (links welcome)
                  <textarea rows="6" name="notes" value={form.notes} onChange={update}
                    placeholder="DTF/UV DTF/embroidery, placements (e.g., left chest 3.5”), sizes, deadlines, links…" />
                </label>
              </div>

              <div className="actions">
                <button className="btn primary" type="submit">Send Request</button>
                <a className="btn outline" href={`mailto:${EMAIL_TO}`}>Email Instead</a>
              </div>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container center">
          <small>© {new Date().getFullYear()} 4Geekmenot — Wear your story.</small>
        </div>
      </footer>
    </main>
  );
}
