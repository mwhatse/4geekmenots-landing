// apps/app/src/products.js
// Central catalog used by App.jsx — order controls display

export const STORE_URL = "https://4geekmenots.etsy.com";

export const products = [
  // 👉 First row, first product (new)
  {
    id: "mental-health-wealth-crowned",
    title: "Mental Health Is Wealth (Crowned)",
    img: "/img/mental-health-wealth.png",
    desc: "Crowned edition—clean type, everyday weight.",
    url: "https://www.etsy.com/listing/4370730462/mental-health-is-wealth-shirt-crowned?ref=shop_home_active_1&logging_key=77a835de15ba8ff72cf4892a6216bdddfa2bf0cc%3A4370730462",
    price: 25.99, // set when ready
  },

  // 👉 New listing — Saturday Love (shows in the first row)
  {
    id: "saturday-love-lyrical",
    title: "Our Saturday Love — Lyrical Tee",
    img: "/img/saturday-love.png", // case-sensitive on Vercel (lowercase 's')
    desc: "Clean, lyric-forward design from the Lyrical Tees collection.",
    url: "https://www.etsy.com/listing/4373226626/our-saturday-love-t-shirt-lyrical-tees",
    price: 25.99, // set when ready (match Etsy)
  },

  {
    id: "equality-division",
    title: "Equality > Division",
    img: "/img/equality-division.png",
    desc: "Bold, minimalist statement piece.",
    url: "https://www.etsy.com/listing/4373319975",
    price: 23.99,
  },
  {
    id: "he-thick-thick",
    title: "He Thick Thick",
    img: "/img/he-thick.png",
    desc: "Premium cotton. Sizes S–3XL.",
    url: "https://www.etsy.com/listing/4362728564/oh-he-thick-thick-funny-bold-typography?ref=shop_home_active_8&logging_key=389b1f0c1dbb226a7365133a38afa8ca2c6b11a2%3A4362728564",
    price: 25.99,
  },
  {
    id: "airplane-mode",
    title: "Airplane Mode",
    img: "/img/airplane-mode.png",
    desc: "For non-rev ninjas and jet-setters.",
    url: "https://www.etsy.com/listing/4355745827/airplane-mode-shirt-fun-travel-tee?ref=shop_home_active_12&logging_key=a1970938ae399c3b7af8c9acfd26bf119d76124f%3A4355745827",
    price: 25.00,
  },

  {
    id: "non-rev-barcode",
    title: "Non-Rev Life (Barcode) — ATL ➜ ?",
    img: "/img/non-rev-life-barcode.png",
    desc: "A wink to standby warriors and gate-change gladiators.",
    url: "https://www.etsy.com/listing/4362839119",
    price: 39.00,
  },
  {
    id: "my-bed-is-calling",
    title: "My Bed Is Calling",
    img: "/img/my-bed-is-calling.png",
    desc: "Funny sleep tee for night shifters, dreamers, and snooze-button pros.",
    url: "https://www.etsy.com/listing/4363335234",
    price: 23.99,
  },
  {
    id: "404-sleep-not-found",
    title: "404: Sleep Not Found",
    img: "/img/404-sleep-not-found.png",
    desc: "Geeky robot gag tee for devs and night owls.",
    url: "https://www.etsy.com/listing/4344683685",
    price: 25.99,
  },
  {
    id: "heal-hoodie",
    title: "HEAL Hoodie (Healthy Emotionally)",
    img: "/img/heal-hoodie.png",
    desc: "Cozy statement piece for growth-minded humans.",
    url: "https://www.etsy.com/listing/4362682736",
    price: 35.99,
  },

  // 🌈 New addition
  {
    id: "certified-rainbow-ally",
    title: "Certified Rainbow Ally",
    img: "/img/certified-rainbow-ally.png",
    desc: "Heavy tee of love—proud, loud, comfy.",
    url: "https://www.etsy.com/listing/4355134835",
    price: 25.99,
  },
];
