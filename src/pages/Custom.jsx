// src/pages/Custom.jsx
import React, { useMemo, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style.css";

/** ========= CONFIG (final) ========= */
const EMAIL_TO      = "4Geekmenots@gmail.com";
const GS_ENDPOINT   = "https://script.google.com/macros/s/AKfycbzIel_qStEaWzARLw-zBh1DLgRZID4OsVQXepgBtDr2M-0NejKnTNz0bxgmTUGKkTMltQ/exec";
const CLOUD_NAME    = "dnwe4h1i8";
const UPLOAD_PRESET = "unsigned_dtf";
/** ================================= */

export default function Custom() {
  const [name, setName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [qty, setQty] = useState("");
  const [due, setDue] = useState("");
  const [details, setDetails] = useState("");
  const [files, setFiles] = useState([]); // [{url, public_id}]
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const widgetRef = useRef(null);

  // Optional email fallback (prefills message)
  const mailtoHref = useMemo(() => {
    const subject = `Custom Design Request — 4Geekmenot`;
    const lines = [
      `Name: ${name || ""}`,
      `Email: ${fromEmail || ""}`,
      `Phone: ${phone || ""}`,
      `Quantity: ${qty || ""}`,
      `Due date: ${due || ""}`,
      "",
      "Project details:",
      details || "",
      "",
      "Attachments:",
      ...(files.length ? files.map(f => f.url) : ["(none)"]),
    ].join("\n");
    const params = new URLSearchParams({ subject, body: lines });
    return `mailto:${EMAIL_TO}?${params.toString()}`;
  }, [name, fromEmail, phone, qty, due, details, files]);

  // Cloudinary widget (init once)
  useEffect(() => {
    if (widgetRef.current || !window.cloudinary) return;
    widgetRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName: CLOUD_NAME,
        uploadPreset: UPLOAD_PRESET,
        multiple: true,
        sources: ["local", "url", "camera"],
        clientAllowedFormats: ["png", "jpg", "jpeg", "webp", "pdf"],
        maxFiles: 6,
        folder: "4geekmenot_custom",
      },
      (err, result) => {
        if (err) return console.error(err);
        if (result?.event === "success") {
          setFiles(prev => [
            ...prev,
            { url: result.info.secure_url, public_id: result.info.public_id },
          ]);
        }
      }
    );
  }, []);

  const openUpload = () => widgetRef.current && widgetRef.current.open();

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const payload = {
      name,
      email: fromEmail,
      phone,
      qty,
      due,
      details,
      files, // [{url, public_id}]
      submittedAt: new Date().toISOString(),
      source: "website",
    };

    try {
      const res = await fetch(GS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Apps Script can return an "opaque" response if CORS headers aren’t exposed—treat as success.
      const ok = res.ok || res.type === "opaque";
      if (!ok) throw new Error(`Bad response: ${res.status}`);

      // Try to parse JSON; don't block if opaque
      try { await res.json(); } catch (_) {}

      // Clear + show confirmation
      setName(""); setFromEmail(""); setPhone(""); setQty(""); setDue(""); setDetails("");
      setFiles([]);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Could not submit right now. Try again or use Send via Email.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <>
        <Link to="/" className="btn btn-outline-yellow back-fab">← Back to Home</Link>
        <main className="container" style={{ marginTop: 28 }}>
          <section className="card" style={{ padding: 22, textAlign: "center" }}>
            <h2 style={{ marginTop: 0 }}>Thanks — we got it!</h2>
            <p style={{ color: "var(--muted)" }}>
              You’ll get a confirmation from <strong>{EMAIL_TO}</strong> soon.
            </p>
            <div style={{ marginTop: 18, display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
              <button className="btn btn-outline-yellow" onClick={() => setSubmitted(false)}>
                Submit another request
              </button>
              <a className="btn btn-outline-yellow" href={mailtoHref}>Send details via Email</a>
            </div>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <Link to="/" className="btn btn-outline-yellow back-fab">← Back to Home</Link>

      <main className="container" style={{ marginTop: 28 }}>
        <section className="card" style={{ padding: 22 }}>
          <h1 style={{ marginTop: 0 }}>Custom Design Request</h1>
          <p style={{ color: "var(--muted)" }}>
            Fill this out to start a custom project. You can also attach assets (logos, sketches, references).
          </p>

          <form onSubmit={handleSubmit} className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <label>
              <div>Name</div>
              <input style={inputStyle} value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" required/>
            </label>

            <label>
              <div>Email</div>
              <input style={inputStyle} type="email" value={fromEmail} onChange={e=>setFromEmail(e.target.value)} placeholder="you@example.com" required/>
            </label>

            <label>
              <div>Phone (optional)</div>
              <input style={inputStyle} value={phone} onChange={e=>setPhone(e.target.value)} placeholder="(###) ###-####"/>
            </label>

            <label>
              <div>Quantity</div>
              <input style={inputStyle} inputMode="numeric" value={qty} onChange={e=>setQty(e.target.value)} placeholder="e.g., 12"/>
            </label>

            <label>
              <div>Target due date</div>
              <input style={inputStyle} type="date" value={due} onChange={e=>setDue(e.target.value)}/>
            </label>

            <label style={{ gridColumn: "1 / -1" }}>
              <div>Project details</div>
              <textarea style={{ ...inputStyle, minHeight: 140 }} value={details} onChange={e=>setDetails(e.target.value)}
                placeholder="Sizes, colors, placement (front/back/sleeve), deadlines, links…" required/>
            </label>

            {/* Uploads */}
            <div style={{ gridColumn: "1 / -1" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                <button type="button" className="btn btn-outline-yellow" onClick={openUpload}>Upload files (Cloudinary)</button>
                {files.length > 0 && <span style={{ color: "var(--muted)" }}>{files.length} file(s) attached</span>}
              </div>

              {files.length > 0 && (
                <ul style={{ margin: "10px 0 0", padding: 0, listStyle: "none", display: "grid", gap: 8 }}>
                  {files.map((f, i) => (
                    <li key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                      <a href={f.url} target="_blank" rel="noreferrer" style={{ color: "var(--text)" }}>{f.url}</a>
                      <button type="button" className="btn btn-outline-yellow" onClick={() => setFiles(prev => prev.filter((_, idx) => idx !== i))}>
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Actions */}
            <div style={{ gridColumn: "1 / -1", display: "flex", gap: 12, flexWrap: "wrap", marginTop: 6 }}>
              <button className="btn btn-outline-yellow" type="submit" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit to Google Sheets"}
              </button>
              <a className="btn btn-outline-yellow" href={mailtoHref}>Send via Email</a>
            </div>

            {error && <div style={{ gridColumn: "1 / -1", color: "#ffb3b3", marginTop: 8 }}>{error}</div>}
          </form>
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
