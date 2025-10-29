// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, useLocation, Link } from "react-router-dom";
import App from "./App.jsx";
import CustomOrderForm from "./components/CustomOrderForm";
import "./style.css";

/** A small floating button that doesn't touch your header styles */
function CustomLinkOverlay() {
  const { pathname } = useLocation();
  const isCustom = pathname === "/custom";

  const baseStyle = {
    position: "fixed",
    right: 16,
    bottom: 16,
    zIndex: 9999,
    padding: "10px 14px",
    borderRadius: 999,
    border: "1px solid #222",
    background: "#fff",
    fontWeight: 700,
    fontSize: 14,
    boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
    textDecoration: "none",
  };

  return isCustom ? (
    <Link to="/" style={baseStyle} aria-label="Back to Home">
      ← Back to Home
    </Link>
  ) : (
    <Link to="/custom" style={baseStyle} aria-label="Custom Orders">
      Custom Orders →
    </Link>
  );
}

/** Layout wrapper that renders a page + the floating link */
function WithOverlay({ children }) {
  return (
    <>
      {children}
      <CustomLinkOverlay />
    </>
  );
}

const router = createBrowserRouter([
  { path: "/", element: <WithOverlay><App /></WithOverlay> },
  { path: "/custom", element: <WithOverlay><CustomOrderForm /></WithOverlay> },
]);

createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
