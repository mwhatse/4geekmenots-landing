// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Mount React 18 to #root (defined in index.html)
const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("Root element #root not found");
}
createRoot(rootEl).render(<App />);
