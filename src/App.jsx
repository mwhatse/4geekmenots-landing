import React from "react";
import "./style.css";
import { Routes, Route, Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ background: "#f6c10a", color: "#000", padding: 8, borderRadius: 8 }}>
        HOME — live
      </h1>
      <p>Go to <Link to="/custom">/custom</Link> or <Link to="/zzz">/zzz</Link></p>
    </div>
  );
}

function Custom() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ background: "hotpink", color: "#000", padding: 8, borderRadius: 8 }}>
        CUSTOM — live smoke test
      </h1>
      <p>If you can see this, routing is fixed. Next we swap in your branded form.</p>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <nav style={{ padding: 12, borderBottom: "1px solid #333" }}>
        <Link to="/" style={{ marginRight: 16 }}>Home</Link>
        <Link to="/custom" style={{ marginRight: 16 }}>Custom</Link>
        <Link to="/zzz">ZZZ</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/custom" element={<Custom />} />
        <Route path="/zzz" element={<div style={{ padding: 24 }}>ZZZ LIVE</div>} />
        <Route path="*" element={<div style={{ padding: 24 }}>404 (router is working)</div>} />
      </Routes>
    </div>
  );
}
