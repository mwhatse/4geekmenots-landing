// src/App.jsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";

function Home() {
  return (
    <main className="page">
      <h1 className="tag">HOME — live</h1>
      <p>
        Go to <Link to="/custom">/custom</Link> or <Link to="/zzz">/zzz</Link>
      </p>
    </main>
  );
}

function Custom() {
  return (
    <main className="page">
      <h1 className="tag hot">CUSTOM — live smoke test</h1>
      <p>If you can see this, routing is fixed. Next we swap in your branded form.</p>
    </main>
  );
}

function Zzz() {
  return (
    <main className="page">
      <h1 className="tag">ZZZ</h1>
      <p>Just a stub route.</p>
    </main>
  );
}

export default function App() {
  return (
    <>
      <header className="topbar">
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/custom">Custom</Link>
          <Link to="/zzz">ZZZ</Link>
        </nav>

        {/* Floating CTA */}
        <Link to="/custom" className="floating-cta" aria-label="Custom Design Request">
          Custom Design Request
        </Link>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/custom" element={<Custom />} />
        <Route path="/zzz" element={<Zzz />} />
      </Routes>
    </>
  );
}
