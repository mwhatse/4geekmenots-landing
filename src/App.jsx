// apps/app/src/App.jsx
import React from "react";
import "./style.css";
import { products, STORE_URL } from "./products.js";

/*
  Paste this file exactly as-is into apps/app/src/App.jsx
  - Clickable logo is an anchor <a className="logo" href="/">...</a>
  - Hero uses inline style background: "var(--brand)" so color stays consistent
  - No extra JS required
*/

export default function App() {
  return (
    <div id="app-root">
      {/* NAV / HEADER */}
      <header className="nav" role="banner">
        <div className="container nav-row">
          {/* Clickable logo (goes to site root) */}
          <a className="logo" href="/" aria-label="4GeekMeNots home">4GeekMeNots</a>

          <nav className="nav-links" aria-label="Main navigation">
            <a href="#shop">Shop</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <a className="btn primary" href={STORE_URL} target="_blank" rel="noopener noreferrer">Shop Etsy</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="hero section" aria-labelledby="hero-heading">
        {/* Inline styles here lock the hero to your brand color and text color */}
        <div
          className="container card center"
          style={{
            padding: "3rem 2rem",
            background: "var(--brand)",
            color: "var(--brand-ink)",
            borderRadius: "20px",
            boxShadow: "0 16px 60px var(--ring)",
          }}
        >
          <h1 id="hero-heading" style={{ color: "var(--brand-ink)" }}>Wear Your Story</h1>
          <p className="lead" style={{ color: "var(--brand-ink)" }}>Say more with fewer colors.</p>

          <div style={{ margin: "1.25rem 0" }}>
            <a className="btn cta lg" href={STORE_URL} target="_blank" rel="noopener noreferrer">
              Shop New Drops
            </a>
          </div>

          <p className="trust" style={{ color: "var(--brand-ink)", opacity: 0.95 }}>
            Wear your story — bold, comfy, built to last.
          </p>
        </div>
      </section>

      {/* PRODUCTS / SHOP */}
      <section id="shop" className="section" aria-labelledby="featured-heading">
        <div className="container">
          <h2 id="featured-heading">Featured Tees</h2>

          <div className="product-grid" role="list">
            {Array.isArray(products) && products.length ? (
              products.map((p) => (
                <article className="product" key={p.title} role="listitem">
                  <img src={p.img} alt={p.title} />
                  <h3>{p.title}</h3>
                  {p.desc && <p>{p.desc}</p>}
                  <a
                    className="btn cta"
                    href={p.url ?? STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Buy ${p.title} on Etsy`}
                  >
                    Buy on Etsy
                  </a>
                </article>
              ))
            ) : (
              <p style={{ color: "var(--muted)" }}>
                No products found — add listings to <code>src/products.js</code>.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section" aria-labelledby="about-heading">
        <div className="container">
          <h2 id="about-heading" style={{ color: "var(--brand)" }}>About 4GeekMeNots</h2>
          <p style={{ color: "var(--ink)", fontSize: "1.05rem", lineHeight: 1.6 }}>
            At 4Geekmenots, we believe clothing should be more than just something you wear—it should tell your story.
            Our geek-inspired, bold, and playful designs celebrate individuality, humor, and confidence. Every piece is
            crafted to let you stand out, speak up, and proudly wear your story.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section" aria-labelledby="contact-heading">
        <div className="container">
          <h2 id="contact-heading">Contact Us</h2>
          <p style={{ color: "var(--muted)" }}>
            For questions or custom designs, email us at <strong>4geekmenots@gmail.com</strong>.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" role="contentinfo">
        <div className="container">
          <small>© {new Date().getFullYear()} 4GeekMeNots — Wear Your Story</small>
        </div>
      </footer>
    </div>
  );
}
