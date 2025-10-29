// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import CustomOrderForm from "./components/CustomOrderForm";
import "./style.css";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {
    path: "/custom",
    element: (
      <div className="min-h-screen flex flex-col">
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

        <main style={{ flex: 1, padding: "2rem 1rem" }}>
          <section style={{ maxWidth: 900, margin: "0 auto 2rem" }}>
            <h2 style={{ marginTop: 0, fontSize: 28, fontWeight: 800 }}>
              Custom All-Over & DTF Orders
            </h2>
            <p style={{ marginTop: 8, lineHeight: 1.6 }}>
              Wrap-around designs, sleeve runs, hem wraps—send your idea and
              references below. You’ll get a confirmation email after
              submitting.
            </p>
          </section>

          <section id="custom" style={{ maxWidth: 900, margin: "0 auto" }}>
            <CustomOrderForm />
          </section>
        </main>

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
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
