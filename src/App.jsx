// apps/app/src/App.jsx
import React from "react";
import "./style.css";
import { Routes, Route, Link } from "react-router-dom"; // <-- no BrowserRouter here
import { products, STORE_URL } from "./products.js";
import Custom from "./pages/Custom.jsx"; // make sure this file exists

// Always show two decimals (USD)
const fmtUSD = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);

/* ----- Shared Layout: header/footer on every page ----- */
function Layout({ children }) {
  return (
    <div id="app-root">
      {/* NAV / HEADER */}
      <header className="nav" role="banner">
        <div className="container nav-row">
          <Link className="logo" to="/" aria-label="4GeekMeNot home">4GeekMeNot</Link>

          <nav className="nav-links" aria-label="Main navigation">
            {/* Jump to sections on Home */}
            <Link to="/#shop">Shop</Link>
            <Link to="/#about">About</Link>
            <Link to="/#contact">Contact</Link>

            {/* Internal CTA to /custom */}
            <Link className="btn primary" to="/custom">
              Custom Design Request
            </Link>

            {/* External Etsy */}
            <a className="btn primary" href={STORE_URL} target="_blank" rel="noopener noreferrer">
              Shop Etsy
            </a>
          </nav>
        </div>
      </header>

      {children}

      {/* FOOTER */}
      <footer className="footer" role="contentinfo">
        <div className="container">
          <small>© {new Date().getFullYear()} 4GeekMeNot — Wear Your Story</small>
        </div>
      </footer>
    </div>
  );
}

/* ----- Home content ----- */
function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero section" aria-labelledby="hero-heading">
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
              products.map((p) => {
                const href = p.url ?? STORE_URL;
                const hasPrice = typeof p.price === "number";
                const onSale = typeof p.salePrice === "number";

                return (
                  <article className="product" key={p.id || p.title} role="listitem">
                    <img src={p.img} alt={p.title} />
                    <h3>{p.title}</h3>
                    {p.desc && <p>{p.desc}</p>}

                    {hasPrice && (
                      <p className="price" aria-label={`Price for ${p.title}`}>
                        {onSale ? (
                          <>
                            <span className="old">{fmtUSD(p.price)}</span>
                            <span className="new">{fmtUSD(p.salePrice)}</span>
                            <span className="from"> • from</span>
                          </>
                        ) : (
                          <>
                            <span className="from">from </span>
                            <span className="new">{fmtUSD(p.price)}</span>
                          </>
                        )}
                      </p>
                    )}

                    <a
                      className={`btn ${p.url ? "primary" : "cta"}`}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Buy ${p.title} on Etsy`}
                    >
                      {p.url ? "View on Etsy" : "Shop the Store"}
                    </a>
                  </article>
                );
              })
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
          <h2 id="about-heading" style={{ color: "var(--brand)" }}>About 4GeekMeNot</h2>
          <p style={{ color: "var(--ink)", fontSize: "1.05rem", lineHeight: 1.6 }}>
            At 4GeekMeNot, we believe clothing should be more than just something you wear—it should tell your story.
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
            For questions or custom designs, email us at <strong>4geekmenot@gmail.com</strong>.
          </p>
        </div>
      </section>
    </>
  );
}

/* ----- App: only Routes (no BrowserRouter) ----- */
export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/custom" element={<Custom />} />
      </Routes>
    </Layout>
  );
}
