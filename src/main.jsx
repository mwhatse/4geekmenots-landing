// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  Link,
} from "react-router-dom";
import App from "./App.jsx";
import CustomOrderForm from "./components/CustomOrderForm";
import "./style.css";

function FloatingCTA() {
  const { pathname } = useLocation();
  const isCustom = pathname === "/custom";

  // Inline, brand-matched, immune to site CSS overrides
  const baseStyle = {
    position: "fixed",
    right: "24px",
    bottom: "24px",
    zIndex: 99999,
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "16px 24px",            // bigger pill
    borderRadius: "999px",
    background: "var(--brand)",      // your yellow
    color: "var(--brand-ink)",       // your black ink
    textDecoration: "none",
    fontWeight: 800,
    fontSize: "1rem",
    lineHeight: 1,
    boxShadow: "0 12px 32px rgba(0,0,0,.35)",
    border: "none",
    transform: "translateZ(0)",      // avoids jitter
  };

  // tiny “hover” nudge via inline style attribute
  const [hover, setHover] = React.useState(false);
  const style = {
    ...baseStyle,
    transform: hover ? "translateY(-2px)" : baseStyle.transform,
    boxShadow: hover ? "0 16px 36px rgba(0,0,0,.4)" : baseStyle.boxShadow,
  };

  return isCustom ? (
    <Link
      to="/"
      aria-label="Back to Home"
      style={style}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      ← Back to Home
    </Link>
  ) : (
    <Link
      to="/custom"
      aria-label="Custom Design Request"
      style={style}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      Custom Design Request →
    </Link>
  );
}

function WithFloatingCTA({ children }) {
  return (
    <>
      {children}
      <FloatingCTA />
    </>
  );
}

const router = createBrowserRouter([
  { path: "/", element: <WithFloatingCTA><App /></WithFloatingCTA> },
  { path: "/custom", element: <WithFloatingCTA><CustomOrderForm /></WithFloatingCTA> },
]);

createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
