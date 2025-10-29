// src/App.jsx
import React from "react";
import "./style.css";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* --- Top bar / simple header --- */}
      <header
        style={{
          padding: "1.25rem 1rem",
          borderBottom: "1px solid #eee",
        }}
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

      {/* --- Main content --- */}
      <main style={{ flex: 1, padding: "2rem 1rem" }}>
        <section style={{ maxWidth: 900, margin: "0 auto 2rem" }}>
          <h2 style={{ marginTop: 0, fontSize: 28, fontWeight: 800 }}>
            Featured Tees
          </h2>
          <p style={{ marginTop: 8, lineHeight: 1.6 }}>
            Explore bold, travel-inspired designs and elevated streetwear
            concepts. Each drop is printed with DTF precision for quality that
            lasts.
          </p>
        </section>

        <section style={{ maxWidth: 900, margin: "0 auto" }}>
          <img
            src="/img/mental-health-wealth.png"
            alt="Sample 4GeekMeNot tee"
            style={{
              width: "100%",
              maxWidth: 400,
              borderRadius: 20,
              display: "block",
              margin: "0 auto",
            }}
          />
        </section>
      </main>

      {/* --- Footer --- */}
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
