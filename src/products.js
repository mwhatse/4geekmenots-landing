// src/products.js
// Central catalog used by App.jsx — order controls display
export const STORE_URL = "https://4geekmenots.etsy.com";

export const products = [
  // 👉 NEW first row, first product
  {
    id: "mental-health-wealth-crowned",
    title: "Mental Health Is Wealth (Crowned)",
    img: "/img/mental-health-wealth.png", // or paste an Etsy image URL here
    desc: "Crowned edition—clean type, everyday weight.",
    url: "https://www.etsy.com/listing/4370730462/mental-health-is-wealth-shirt-crowned?ref=shop_home_active_1&logging_key=77a835de15ba8ff72cf4892a6216bdddfa2bf0cc%3A4370730462",
    price: null,        // set to a number (e.g., 28) when you want prices visible
    // salePrice: null, // optional
  },

  // Existing items (unchanged order)
  {
    id: "equality-division",
    title: "Equality > Division",
    img: "/img/equality-division.png",
    desc: "Bold, minimalist statement piece.",
    url: "https://www.etsy.com/listing/4344693260",
    price: null,
  },
  {
    id: "he-thick-thick",
    title: "He Thick Thick",
    img: "/img/he-thick.png",
    desc: "Premium cotton. Sizes S–3XL.",
    url: null,   // no listing yet → button will fall back to STORE_URL
    price: null,
  },
  {
    id: "airplane-mode",
    title: "Airplane Mode",
    img: "/img/airplane-mode.png",
    desc: "For non-rev ninjas and jet-setters.",
    url: null,
    price: null,
  },

  {
    id: "non-rev-barcode",
    title: "Non-Rev Life (Barcode) — ATL ➜ ?",
    img: "/img/non-rev-life-barcode.png",
    desc: "A wink to standby warriors and gate-change gladiators.",
    url: "https://www.etsy.com/listing/4362839119",
    price: null,
  },
  {
    id: "my-bed-is-calling",
    title: "My Bed Is Calling",
    img: "/img/my-bed-is-calling.png",
    desc: "Funny sleep tee for night shifters, dreamers, and snooze-button pros.",
    url: "https://www.etsy.com/listing/4363335234",
    price: null,
  },
  {
    id: "404-sleep-not-found",
    title: "404: Sleep Not Found",
    img: "/img/404-sleep-not-found.png",
    desc: "Geeky robot gag tee for devs and night owls.",
    url: "https://www.etsy.com/listing/4344683685",
    price: null,
  },
  {
    id: "heal-hoodie",
    title: "HEAL Hoodie (Healthy Emotionally)",
    img: "/img/heal-hoodie.png",
    desc: "Cozy statement piece for growth-minded humans.",
    url: "https://www.etsy.com/listing/4362682736",
    price: null,
  },

  // 🌈 New addition
  {
    id: "certified-rainbow-ally",
    title: "Certified Rainbow Ally",
    img: "/img/certified-rainbow-ally.png",
    desc: "Heavy tee of love—proud, loud, comfy.",
    url: "https://www.etsy.com/listing/4355134835",
    price: null,
  },
];
