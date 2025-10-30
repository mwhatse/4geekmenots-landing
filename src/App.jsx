// src/App.jsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./style.css";
import { products, STORE_URL } from "./products.js";

// currency helper
const fmtUSD = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n ?? 0);

// ====== PAGES ======
function Home() {
  return (
    <>
      {/* subtle background logo */}
      <div className="bg-logo" aria-hidden="true" />

      {/* HERO (smaller) */}
      <section className="hero">
        <div className="hero-inner">
          <h1 className="hero-title">Wear Your Story.</h1>
          <p className="hero-sub">
            Travel-tech, geek-chic tees. Minimal colors. Bold vibes.
          </p>
          <div className="hero-cta">
            <a href={STORE_URL} target="_blank" rel="noreferrer" className="btn buy">
              Shop on Etsy
            </a>
            {/* make Custom yellow like the Shop button */}
            <Link to="/custom" className="btn buy">Custom Design</Link>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <main className="page">
        <h2 className="section-title">Featured Tees</h2>

        <section className="grid">
          {products.map((p) => (
            <article key={p.id} className="card">
              <div className="thumb">
                <img src={p.img} alt={p.title} loading="lazy" />
              </div>

              <div className="info">
                <h3 className="title">{p.title}</h3>
                {p.desc && <p className="desc">{p.desc}</p>}

                <div className="row">
                  <span className="price">{fmtUSD(p.price)}</span>
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

        <p className="store-more">
          Want everything?{" "}
          <a href={STORE_URL} target="_blank" rel="noreferrer">
            See all listings →
          </a>
        </p>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="foot-inner">
          <span>© {new Date().getFullYear()} 4GeekMeNot</span>
          <a href={STORE_URL} target="_blank" rel="noreferrer">Etsy</a>
          <Link to="/custom">Custom</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </footer>
    </>
  );
}

function Custom() {
  return (
    <main className="page">
      <h1 className="tag hot">Custom Design Request</h1>
      <p>Tell us the destination, vibe, or idea. We’ll design it and send a proof.</p>

      <div className="custom-placeholder">
        <p>
          Branded intake form goes here (name, email, shirt color/size, design brief, upload, timeline).
        </p>
        <p>
          Prefer email? <a href="mailto:hello@4geekmenot.com">hello@4geekmenot.com</a>
        </p>
      </div>
    </main>
  );
}

function Contact() {
  return (
    <main className="page">
      <h1 className="tag">Contact</h1>
      <p>Email: <a href="mailto:hello@4geekmenot.com">hello@4geekmenot.com</a></p>
      <p>Instagram: <a href="https://4geekmenots.etsy.com" target="_blank" rel="noreferrer">Etsy shop</a></p>
    </main>
  );
}

export default function App() {
  return (
    <>
      {/* HEADER: brand left, nav right */}
      <header className="topbar">
        <div className="brandbar">
          <Link to="/" className="brand">4GeekMeNot</Link>
          <nav className="nav right">
            <Link to="/">Home</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/custom">Custom</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/custom" element={<Custom />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      {/* Global floating CTA (bottom-right) */}
      <Link to="/custom" className="floating-cta" aria-label="Custom Design Request">
        Custom Design Request
      </Link>
    </>
  );
}
