// src/App.jsx
import React from "react";
import "./style.css";
import { products, STORE_URL } from "./products.js";

function ProductCard({ p }) {
  return (
    <a
      href={p.url || STORE_URL}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition"
      style={{ background: "rgba(255,255,255,0.02)" }}
    >
      <div
        style={{
          aspectRatio: "1 / 1",
          overflow: "hidden",
          display: "grid",
          placeItems: "center",
          background: "rgba(0,0,0,0.1)",
        }}
      >
        {/* Use /public assets like /img/xyz.png */}
        <img
          src={p.img}
          alt={p.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform .25s ease",
          }}
          className="group-hover:scale-[1.03]"
        />
      </div>
      <div style={{ padding: "0.9rem 1rem" }}>
        <div style={{ fontWeight: 700 }}>{p.title}</div>
        {p.desc && (
          <div style={{ fontSize: 13, opacity: 0.75, marginTop: 4 }}>
            {p.desc}
          </div>
        )}
        {p.price != null && (
          <div style={{ marginTop: 8, fontWeight: 700 }}>
            ${Number(p.price).toFixed(2)}
          </div>
        )}
        <div
          style={{
            marginTop: 10,
            fontSize: 13,
            opacity: 0.85,
            textDecoration: "underline",
          }}
        >
          View on Etsy →
        </div>
      </div>
    </a>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header
        style={{ padding: "1.25rem 1rem", borderBottom: "1px solid #eee" }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>
            4GeekMeNot
          </h1>
          <nav style={{ fontSize: 14, opacity: 0.8 }}>
            <a href="/" style={{ marginRight: 16 }}>
              Home
            </a>
            <a href="/custom">Custom Orders</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main style={{ flex: 1 }}>
        <section style={{ padding: "2rem 1rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <h2 style={{ marginTop: 0, fontSize: 28, fontWeight: 800 }}>
              Featured Tees
            </h2>
            <p style={{ marginTop: 8, lineHeight: 1.6, maxWidth: 900 }}>
              Explore bold, travel-inspired designs and elevated streetwear
              concepts. Printed with DTF precision for quality that lasts.
            </p>
          </div>
        </section>

        {/* Product Grid */}
        <section style={{ padding: "0 1rem 2.5rem" }}>
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              display: "grid",
              gap: "1rem",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 240px), 1fr))",
            }}
          >
            {products.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </section>

        {/* CTA to entire Etsy store */}
        <section style={{ padding: "0 1rem 3rem" }}>
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <a
              href={STORE_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl"
              style={{
                padding: "0.85rem 1.2rem",
                border: "1px solid #222",
                fontWeight: 600,
              }}
            >
              Shop the full collection on Etsy
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{
          padding: "1.5rem 1rem",
          borderTop: "1px solid #eee",
          fontSize: 13,
          opacity: 0.8,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          © {new Date().getFullYear()} 4GeekMeNot — Wear Your Story
        </div>
      </footer>
    </div>
  );
}
