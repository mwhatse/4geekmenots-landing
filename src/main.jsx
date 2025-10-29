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

function CustomLinkOverlay() {
  const { pathname } = useLocation();
  const isCustom = pathname === "/custom";

  return (
    <div className="overlay-cta-wrap">
      {isCustom ? (
        <Link to="/" className="overlay-cta yellow-btn" aria-label="Back to Home">
          ← Back to Home
        </Link>
      ) : (
        <Link
          to="/custom"
          className="overlay-cta yellow-btn"
          aria-label="Custom Design Request"
        >
          Custom Design Request →
        </Link>
      )}
    </div>
  );
}

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
