import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./style.css";
import { products, STORE_URL } from "./products.js";

const fmtUSD = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);

function Hero() {
  return (
    <section className="hero container">
      <div id="watermark" aria-hidden="true"></div>

      <h1>Wear your story</h1>
      <p>Culture meets comfort — designed for the ones who wear their story.</p>

      <div className="actions">
        <a className="btn btn-outline-yellow" href={STORE_URL} target="_blank" rel="noreferrer">
          Shop Products
        </a>
        <Link className="btn btn-outline-yellow" to="/custom">
          Custom Design Request
        </Link>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <Link to="/custom" className="btn btn-outline-yellow fab">Custom Design Request</Link>
      <main className="container" style={{ marginTop: 18 }} />
    </>
  );
}

function Products() {
  return (
    <main className="container" style={{ marginTop: 24 }}>
      <div className="grid grid-3">
        {products.map((p) => (
          <article className="card" key={p.id}>
            <img src={p.img} alt={p.title} loading="lazy" />
            <div className="body">
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="row">
                <strong>{fmtUSD(p.price)}</strong>
                <a href={p.url} target="_blank" rel="noreferrer" className="btn btn-outline-yellow">View</a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div style={{ marginTop: 20, textAlign: "center" }}>
        <a className="btn btn-outline-yellow" href={STORE_URL} target="_blank" rel="noreferrer">
          Visit Full Etsy Store
        </a>
      </div>
    </main>
  );
}

function Custom() {
  return (
    <>
      <Link to="/" className="btn btn-outline-yellow back-fab">← Back to Home</Link>
      <main className="container" style={{ marginTop: 28 }}>
        <section className="card" style={{ padding: 22 }}>
          <h2 style={{ marginTop: 0 }}>Custom Design Request</h2>
          <p style={{ color: "var(--muted)" }}>
            Tell us what you want to wear and we’ll help you bring it to life.
          </p>

          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <label>
              <div>Name</div>
              <input style={inputStyle} placeholder="Your name" />
            </label>
            <label>
              <div>Email</div>
              <input style={inputStyle} placeholder="you@example.com" />
            </label>
            <label style={{ gridColumn: "1 / -1" }}>
              <div>Project details</div>
              <textarea style={{ ...inputStyle, minHeight: 120 }} placeholder="Sizes, colors, deadlines…" />
            </label>
          </div>

          <div style={{ marginTop: 16 }}>
            <button className="btn btn-outline-yellow" type="button">Send Request</button>
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

export default function App() {
  return (
    <div>
      {/* Header is static in index.html now */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/custom" element={<Custom />} />
      </Routes>
      <footer className="footer">© {new Date().getFullYear()} 4Geekmenot — Wear your story.</footer>
    </div>
  );
}
