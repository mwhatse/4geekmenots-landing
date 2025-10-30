// src/pages/Custom.jsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../style.css";

/** ===== Config ===== */
const EMAIL_TO = "4Geekmenots@gmail.com"; // ✅ correct address

export default function Custom() {
  // Simple controlled form
  const [name, setName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [qty, setQty] = useState("");
  const [due, setDue] = useState("");
  const [details, setDetails] = useState("");

  // Build mailto: link from current inputs
  const mailtoHref = useMemo(() => {
    const subject = `Custom Design Request — 4Geekmenot`;
    const lines = [
      `Name: ${name || ""}`,
      `Email: ${fromEmail || ""}`,
      `Phone: ${phone || ""}`,
      `Quantity: ${qty || ""}`,
      `Due date: ${due || ""}`,
      "",
      `Project details:`,
      `${details || ""}`,
    ].join("\n");

    const params = new URLSearchParams({
      subject,
      body: lines,
    });

    return `mailto:${EMAIL_TO}?${params.toString()}`;
  }, [name, fromEmail, phone, qty, due, details]);

  return (
    <>
      {/* Loop-back button with unified style */}
      <Link to="/" className="btn btn-outline-yellow back-fab">
        ← Back to Home
      </Link>

      <main className="container" style={{ marginTop: 28 }}>
        <section className="card" style={{ padding: 22 }}>
          <h1 className="page-title" style={{ marginTop: 0 }}>Custom Design Request</h1>
          <p style={{ color: "var(--muted)", marginTop: 6 }}>
            Tell us what you want to wear and we’ll help you bring it to life. Fill this out and
            hit <em>Send via Email</em>—we’ll reply from <strong>{EMAIL_TO}</strong>.
          </p>

          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <label>
              <div>Name</div>
              <input
                style={inputStyle}
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label>
              <div>Email</div>
              <input
                style={inputStyle}
                placeholder="you@example.com"
                type="email"
                value={fromEmail}
                onChange={(e) => setFromEmail(e.target.value)}
              />
            </label>

            <label>
              <div>Phone (optional)</div>
              <input
                style={inputStyle}
                placeholder="(###) ###-####"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>

            <label>
              <div>Quantity</div>
              <input
                style={inputStyle}
                placeholder="e.g., 12"
                inputMode="numeric"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
            </label>

            <label>
              <div>Target due date</div>
              <input
                style={inputStyle}
                type="date"
                value={due}
                onChange={(e) => setDue(e.target.value)}
              />
            </label>

            <label style={{ gridColumn: "1 / -1" }}>
              <div>Project details</div>
              <textarea
                style={{ ...inputStyle, minHeight: 140 }}
                placeholder="Sizes, colors, placement (front/back/sleeve), deadlines, inspiration links…"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </label>
          </div>

          <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
            {/* Primary action uses mailto built from the form */}
            <a className="btn btn-outline-yellow" href={mailtoHref}>
              Send via Email
            </a>

            {/* Secondary: plain contact link to the same address */}
            <a className="btn btn-outline-yellow" href={`mailto:${EMAIL_TO}`}>
              Contact {EMAIL_TO}
            </a>
          </div>
        </section>
      </main>
    </>
  );
}

const inputStyle = {
  width: "100%",
  marginTop: 6,
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid #18202b",
  background: "#0b1117",
  color: "var(--text)",
  outline: "none",
};
