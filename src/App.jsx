// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./style.css";
import { products, STORE_URL } from "./products.js";
import Custom from "./pages/Custom.jsx"; // <- matches your folder: src/pages/Custom.jsx

// USD formatter
const fmtUSD = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);

function Home() {
  return (
    <main id="home">
      {/* NAV */}
      <header className="nav">
        <div className="container nav-row">
          <Link to="/" className="logo">4Geekmenot</Link>
          <nav className="nav-links">
            <Link to="/" className="link">Home</Link>
            <a href={STORE_URL} target="_blank" rel="noreferrer" className="link">Products</a>
            <Link to="/custom" className="btn outline">Custom</Link>
            <a href="mailto:hello@4geekmenot.com" className="link">Contact</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="hero section">
        <div className="container">
          <h1>Wear your story</h1>
          <p className="lead">Travel-flavored, elevated tees with that 4Geekmenot edge.</p>
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.9rem" }}>
            <a href={STORE_URL} target="_blank" rel="noreferrer" className="btn cta">
              Shop Products
            </a>
            <Link to="/custom" className="btn outline">
              Custom Design Request
            </Link>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="section">
        <div className="container">
          <div className="product-grid">
            {products.map((p) => (
              <a key={p.id} href={p.url} target="_blank" rel="noreferrer" className="product">
                <img src={p.img} alt={p.title} loading="lazy" />
                <h3>{p.title}</h3>
                {p.desc && <p>{p.desc}</p>}
                <div className="price">
                  <span className="new">{fmtUSD(p.price)}</span>
                </div>
                <span className="btn primary" style={{ alignSelf: "start" }}>
                  View
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container center">
          <small>© {new Date().getFullYear()} 4Geekmenot — Wear your story.</small>
        </div>
      </footer>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/custom" element={<Custom />} />
      </Routes>
    </BrowserRouter>
  );
}
