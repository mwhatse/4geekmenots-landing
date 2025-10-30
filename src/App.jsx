// src/App.jsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./style.css";
import { products, STORE_URL } from "./products.js";

// Always show two decimals (USD)
const fmtUSD = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);

function Home() {
  return (
    <main className="page">
      <h1 className="tag">Featured Tees</h1>

      {/* Product grid */}
      <section className="grid">
        {products.map((p) => (
          <article key={p.id} className="card">
            <div className="thumb">
              <img src={p.img} alt={p.title} loading="lazy" />
            </div>

            <div className="info">
              <h2 className="title">{p.title}</h2>
              {p.desc && <p className="desc">{p.desc}</p>}

              <div className="row">
                <span className="price">{fmtUSD(p.price ?? 0)}</span>
                <a
                  className="btn buy"
                  href={p.url || STORE_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  View on Etsy
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Store footer link */}
      <p className="store-more">
        Want everything? <a href={STORE_URL} target="_blank" rel="noreferrer">See all listings →</a>
      </p>
    </main>
  );
}

function Custom() {
  return (
    <main className="page">
      <h1 className="tag hot">Custom Design Request</h1>
      <p>Tell us the destination, vibe, or idea. We’ll design it and send a proof.</p>

      {/* Placeholder body — we’ll swap for your real form next */}
      <div className="custom-placeholder">
        <p>
          Coming up: branded intake form (name, email, shirt color/size, design brief, upload, timeline).
        </p>
        <p>
          If you’d rather start now, email us at <a href="mailto:hello@4geekmenot.com">hello@4geekmenot.com</a>.
        </p>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <>
      <header className="topbar">
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/custom">Custom</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/custom" element={<Custom />} />
      </Routes>

      {/* Floating CTA (bottom-right) */}
      <Link to="/custom" className="floating-cta" aria-label="Custom Design Request">
        Custom Design Request
      </Link>
    </>
  );
}
