// src/App.jsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";

function Home() {
  return (
    <main className="page">
      <h1 className="tag">HOME — live</h1>
      <p>Welcome to 4GeekMeNot — Wear Your Story.</p>
      <p>
        You can request a custom design using the button below or the link in
        the menu.
      </p>
    </main>
  );
}

function Custom() {
  return (
    <main className="page">
      <h1 className="tag hot">Custom Design Request</h1>
      <p>
        Fill out your design details here. (We’ll drop your branded form in
        this space next.)
      </p>
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
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/custom" element={<Custom />} />
      </Routes>

      {/* Floating CTA (bottom-right) */}
      <Link to="/custom" className="floating-cta" aria-label="Custom Design Request">
        Custom Design Request
      </Link>
    </>
  );
}
