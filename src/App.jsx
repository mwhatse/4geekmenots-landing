import React, { useMemo, useState } from "react";
import { collections, products, STORE_URL } from "./products.js";
import { siteConfig } from "./config.js";
import "./style.css";

const fmtUSD = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

function ProductImage({ product, eager = false, className = "" }) {
  return (
    <picture className={className}>
      <source srcSet={product.image} type="image/avif" />
      <img
        src={product.fallbackImage}
        alt={product.alt}
        width="1200"
        height="1200"
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}

function Header() {
  const navItems = [
    ["Shop", "#shop"],
    ["Custom", "#custom"],
    ["Process", "#process"],
    ["About", "#about"],
  ];

  return (
    <header className="site-header">
      <div className="shell header-row">
        <a className="brand-lockup" href="#top" aria-label="4GeekMeNot home">
          <span className="brand-mark" aria-hidden="true">4G</span>
          <span>
            <strong>4GeekMeNot</strong>
            <small>Apparel by RJ Creative Group</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
          <a className="button button-small button-accent" href={STORE_URL} target="_blank" rel="noreferrer">
            Shop Etsy
          </a>
        </nav>

        <details className="mobile-nav">
          <summary>Menu</summary>
          <nav aria-label="Mobile navigation">
            {navItems.map(([label, href]) => (
              <a key={href} href={href}>{label}</a>
            ))}
            <a href={STORE_URL} target="_blank" rel="noreferrer">Shop Etsy</a>
          </nav>
        </details>
      </div>
    </header>
  );
}

function Hero() {
  const heroProduct = products.find((product) => product.id === "atl-pride-boarding-pass");
  const supportingProduct = products.find((product) => product.id === "mental-health-wealth-crowned");

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="shell hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Apparel by RJ Creative Group</p>
          <h1 id="hero-title">Shop originals. Make yours.</h1>
          <p className="hero-intro">
            Original apparel and custom printing for your people, event, brand, or next favorite piece.
          </p>
          <div className="button-row">
            <a className="button button-accent" href="#shop">Shop collections</a>
            <a className="button button-outline" href="#custom">Start custom order</a>
          </div>
        </div>

        <div className="hero-art" aria-label="Featured 4GeekMeNot apparel">
          <figure className="hero-product hero-product-main">
            <ProductImage product={heroProduct} eager />
            <figcaption>ATL Pride Boarding Pass</figcaption>
          </figure>
          <figure className="hero-product hero-product-secondary">
            <ProductImage product={supportingProduct} eager />
            <figcaption>Mental Health Is Wealth</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function CustomerPaths() {
  return (
    <section className="path-section" aria-labelledby="path-title">
      <div className="shell">
        <h2 id="path-title">Two ways to make it yours.</h2>
        <div className="path-grid">
          <article className="path path-shop">
            <div>
              <p className="path-index">Ready to wear</p>
              <h3>Shop original 4GeekMeNot designs.</h3>
              <p>Browse graphic tees, hoodies, and statement pieces. Etsy handles secure checkout and nationwide shipping.</p>
              <a className="text-link" href="#shop">Shop collections</a>
            </div>
            <ProductImage product={products.find((product) => product.id === "travel-love-language")} />
          </article>

          <article className="path path-custom">
            <p className="path-index">Built for you</p>
            <h3>Bring the idea. We will choose the right way to produce it.</h3>
            <p>
              One-offs, local runs, family events, business apparel, and group orders can be produced in-house or through a trusted partner.
            </p>
            <a className="text-link" href="#custom">Start custom order</a>
          </article>
        </div>
      </div>
    </section>
  );
}

function ProductCatalog() {
  const [activeCollection, setActiveCollection] = useState("all");
  const visibleProducts = useMemo(
    () => activeCollection === "all"
      ? products
      : products.filter((product) => product.collection === activeCollection),
    [activeCollection],
  );

  return (
    <section id="shop" className="catalog-section" aria-labelledby="catalog-title">
      <div className="shell">
        <div className="section-heading">
          <h2 id="catalog-title">The current catalog.</h2>
          <p>Original graphics, made to order. Final sizes, colors, and shipping details are shown on Etsy.</p>
        </div>

        <div className="collection-filter" aria-label="Filter products by collection">
          {collections.map((collection) => (
            <button
              key={collection.id}
              type="button"
              className={activeCollection === collection.id ? "is-active" : ""}
              aria-pressed={activeCollection === collection.id}
              onClick={() => setActiveCollection(collection.id)}
            >
              {collection.label}
            </button>
          ))}
        </div>

        <div className="product-grid" aria-live="polite">
          {visibleProducts.map((product, index) => (
            <article
              className={`product-card ${index === 0 && activeCollection === "all" ? "product-card-featured" : ""}`}
              key={product.id}
            >
              <a className="product-image-link" href={product.url} target="_blank" rel="noreferrer" aria-label={`View ${product.title} on Etsy`}>
                <ProductImage product={product} />
              </a>
              <div className="product-content">
                <div className="product-meta">
                  <span>{product.collectionLabel}</span>
                  <span>From {fmtUSD(product.price)}</span>
                </div>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <a className="text-link" href={product.url} target="_blank" rel="noreferrer">View on Etsy</a>
              </div>
            </article>
          ))}
        </div>

        <div className="catalog-footer">
          <p>Looking for every available color and size?</p>
          <a className="button button-outline" href={STORE_URL} target="_blank" rel="noreferrer">Shop Etsy</a>
        </div>
      </div>
    </section>
  );
}

function CustomOrderForm() {
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));

    if (siteConfig.quoteUrl) {
      const destination = new URL(siteConfig.quoteUrl);
      Object.entries(data).forEach(([key, value]) => destination.searchParams.set(key, value));
      destination.searchParams.set("source", "4geekmenot");
      window.location.assign(destination.toString());
      return;
    }

    const subject = encodeURIComponent(`Custom apparel request from ${data.name}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\nProject type: ${data.projectType}\nQuantity: ${data.quantity || "Not sure"}\nNeeded by: ${data.deadline || "Flexible"}\n\nProject details:\n${data.details}`,
    );
    setMessage("Your email app should open with the project details ready to send.");
    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <form className="quote-form" onSubmit={handleSubmit}>
      <div className="field-row">
        <label>
          Name
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>

      <div className="field-row">
        <label>
          Project type
          <select name="projectType" defaultValue="" required>
            <option value="" disabled>Select one</option>
            <option>One personalized item</option>
            <option>Family or group order</option>
            <option>Event apparel</option>
            <option>Business or organization</option>
            <option>Design help only</option>
            <option>Not sure yet</option>
          </select>
        </label>
        <label>
          Estimated quantity
          <input name="quantity" type="number" min="1" inputMode="numeric" placeholder="Optional" />
        </label>
      </div>

      <label>
        Needed by
        <input name="deadline" type="date" />
      </label>

      <label>
        Tell us what you want to make
        <textarea name="details" rows="5" required placeholder="Product type, colors, sizes, artwork, occasion, and anything else that matters." />
      </label>

      <p className="form-note">Artwork and detailed files can be shared after we review your project.</p>
      <button className="button button-accent" type="submit">Send project brief</button>
      {message && <p className="form-status" role="status">{message}</p>}
    </form>
  );
}

function CustomApparel() {
  return (
    <section id="custom" className="custom-section" aria-labelledby="custom-title">
      <div className="shell custom-grid">
        <div className="custom-copy">
          <h2 id="custom-title">Custom apparel without production guesswork.</h2>
          <p>
            Tell us the goal, quantity, timeline, and destination. RJ Creative Group will recommend the right production path and prepare the quote.
          </p>

          <div className="capability-list">
            <div><strong>Personalized pieces</strong><span>Names, gifts, moments, and one-offs</span></div>
            <div><strong>Local small runs</strong><span>Events, reunions, teams, and community groups</span></div>
            <div><strong>Business apparel</strong><span>Branded shirts, launches, and staff gear</span></div>
            <div><strong>Flexible fulfillment</strong><span>In-house production or distributed shipping</span></div>
          </div>
        </div>
        <CustomOrderForm />
      </div>
    </section>
  );
}

function Process() {
  const items = [
    ["Share the idea", "Tell us who it is for, how many you need, when you need it, and what you want it to say."],
    ["Approve the proof", "We refine the artwork, confirm the garment and production method, then send a clear quote and visual proof."],
    ["We produce and deliver", "Your order is produced in-house or with a trusted partner, then prepared for pickup or shipping."],
  ];

  return (
    <section id="process" className="process-section" aria-labelledby="process-title">
      <div className="shell process-grid">
        <div>
          <h2 id="process-title">A clear path from idea to finished piece.</h2>
          <p>Customers describe the outcome. We handle the production decision.</p>
        </div>
        <div className="process-list">
          {items.map(([title, description]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const product = products.find((item) => item.id === "heal-hoodie");

  return (
    <section id="about" className="about-section" aria-labelledby="about-title">
      <div className="shell about-grid">
        <figure className="about-art">
          <ProductImage product={product} />
          <figcaption>Designed by 4GeekMeNot. Produced for the needs of the order.</figcaption>
        </figure>
        <div className="about-copy">
          <h2 id="about-title">One apparel brand. More ways to make the work real.</h2>
          <p>
            4GeekMeNot began as a print-on-demand graphic tee shop. Today it is the apparel arm of RJ Creative Group, combining original design, hands-on production, and trusted fulfillment partners.
          </p>
          <p>
            Ready-made products can ship through Etsy and Printify. Local, personalized, and small-run projects can be produced in-house. The customer gets one clear experience either way.
          </p>
          {siteConfig.rjSiteUrl && (
            <a className="text-link" href={siteConfig.rjSiteUrl}>Visit RJ Creative Group</a>
          )}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="final-cta" aria-labelledby="final-cta-title">
      <div className="shell final-cta-inner">
        <h2 id="final-cta-title">Have the idea? Let us help make it wearable.</h2>
        <a className="button button-dark" href="#custom">Start custom order</a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <strong>4GeekMeNot</strong>
          <p>An apparel brand of RJ Creative Group LLC.</p>
        </div>
        <div className="footer-links">
          <a href="#shop">Shop</a>
          <a href="#custom">Custom apparel</a>
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
        </div>
        <small>Copyright {new Date().getFullYear()} RJ Creative Group LLC.</small>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div id="top">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content">
        <Hero />
        <CustomerPaths />
        <ProductCatalog />
        <CustomApparel />
        <Process />
        <About />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
