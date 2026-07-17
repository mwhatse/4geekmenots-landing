const PRINTIFY_API_URL = "https://api.printify.com/v1";
const PAGE_SIZE = 50;
const MAX_PAGES = 20;
let discoveredShopId = "";

const COLLECTIONS = [
  {
    id: "travel",
    label: "Travel",
    keywords: ["travel", "airplane", "airport", "boarding", "flight", "non-rev", "nonrev"],
  },
  {
    id: "pride",
    label: "Pride",
    keywords: ["pride", "rainbow", "lgbt", "lgbtq", "ally"],
  },
  {
    id: "mindset",
    label: "Mindset",
    keywords: ["mental health", "wellness", "self care", "self-care", "mindset", "heal", "healing"],
  },
  {
    id: "humor",
    label: "Humor",
    keywords: ["funny", "humor", "joke", "sleep", "bed is calling", "thick thick"],
  },
  {
    id: "culture",
    label: "Culture",
    keywords: ["black joy", "black culture", "black history", "black lives", "blm", "melanin", "culture", "rooted"],
  },
  {
    id: "statement",
    label: "Statement",
    keywords: ["statement", "equality", "justice", "protest", "activism"],
  },
];

function sendJson(response, status, body, cacheControl = "no-store") {
  response.setHeader("Cache-Control", cacheControl);
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("X-Content-Type-Options", "nosniff");
  return response.status(status).json(body);
}

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function stripHtml(value) {
  return cleanText(value)
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, "\"")
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function shortenDescription(value, maxLength = 170) {
  const plainText = stripHtml(value);
  if (!plainText) return "Made to order and available in multiple sizes and colors on Etsy.";

  const firstSentence = plainText.match(/^.+?[.!?](?:\s|$)/)?.[0]?.trim();
  if (firstSentence && firstSentence.length >= 35 && firstSentence.length <= maxLength) {
    return firstSentence;
  }

  if (plainText.length <= maxLength) return plainText;

  const shortened = plainText.slice(0, maxLength + 1);
  const lastSpace = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, lastSpace > 80 ? lastSpace : maxLength).trim()}...`;
}

function classifyCollection(product) {
  const tags = Array.isArray(product.tags) ? product.tags : [];
  const searchText = [product.title, ...tags].filter(Boolean).join(" ").toLowerCase();

  for (const collection of COLLECTIONS) {
    if (
      searchText.includes(`4gmn:${collection.id}`)
      || searchText.includes(`4gmn-${collection.id}`)
      || collection.keywords.some((keyword) => searchText.includes(keyword))
    ) {
      return { id: collection.id, label: collection.label };
    }
  }

  return { id: "statement", label: "Statement" };
}

function normalizeExternalItems(external) {
  if (Array.isArray(external)) return external;
  return external && typeof external === "object" ? [external] : [];
}

function normalizeEtsyUrl(external) {
  const externalItems = normalizeExternalItems(external);
  const preferred = externalItems.find((item) => /etsy\.com/i.test(cleanText(item?.handle)))
    || externalItems.find((item) => cleanText(item?.handle))
    || externalItems[0];

  if (!preferred) return null;

  const handle = cleanText(preferred.handle);
  if (/^https?:\/\//i.test(handle)) return handle;
  if (handle.startsWith("//")) return `https:${handle}`;
  if (handle.startsWith("/")) return `https://www.etsy.com${handle}`;
  if (/etsy\.com/i.test(handle)) return `https://${handle}`;

  const externalId = cleanText(String(preferred.id || ""));
  if (/^\d+$/.test(externalId)) {
    return `https://www.etsy.com/listing/${externalId}`;
  }

  return null;
}

function getListingId(url) {
  return cleanText(url).match(/\/listing\/(\d+)/)?.[1] || null;
}

function getDefaultImage(product) {
  const images = Array.isArray(product.images) ? product.images : [];
  return images.find((image) => image?.is_default && cleanText(image.src))
    || images.find((image) => image?.position === "front" && cleanText(image.src))
    || images.find((image) => cleanText(image?.src))
    || null;
}

function getStartingPrice(product) {
  const variants = Array.isArray(product.variants) ? product.variants : [];
  const enabledPrices = variants
    .filter((variant) => variant?.is_enabled !== false)
    .map((variant) => Number(variant?.price))
    .filter((price) => Number.isFinite(price) && price > 0);

  return enabledPrices.length ? Math.min(...enabledPrices) / 100 : null;
}

export function normalizeProduct(product) {
  if (!product || product.visible === false) return null;

  const url = normalizeEtsyUrl(product.external);
  const image = getDefaultImage(product);
  const price = getStartingPrice(product);
  const title = stripHtml(product.title);

  if (!url || !image || !price || !title) return null;

  const collection = classifyCollection(product);
  const imageUrl = cleanText(image.src);

  return {
    id: `printify-${cleanText(String(product.id))}`,
    printifyId: cleanText(String(product.id)),
    etsyListingId: getListingId(url),
    title,
    image: imageUrl,
    fallbackImage: imageUrl,
    alt: `${title} product mockup`,
    description: shortenDescription(product.description),
    collection: collection.id,
    collectionLabel: collection.label,
    url,
    price,
    fulfillment: "printify",
    createdAt: cleanText(product.created_at),
    updatedAt: cleanText(product.updated_at || product.update_at),
  };
}

function getPrintifyHeaders(token) {
  return {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
    "User-Agent": "4GeekMeNot-Catalog/1.0",
  };
}

async function fetchJson(url, token) {
  const response = await fetch(url, {
    headers: getPrintifyHeaders(token),
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    throw new Error(`Printify returned ${response.status}.`);
  }

  return response.json();
}

function chooseShop(shops) {
  const validShops = Array.isArray(shops)
    ? shops.filter((shop) => /^\d+$/.test(cleanText(String(shop?.id))))
    : [];

  const etsyShops = validShops.filter(
    (shop) => cleanText(shop?.sales_channel).toLowerCase() === "etsy",
  );
  const candidates = etsyShops.length ? etsyShops : validShops;

  const brandedShop = candidates.find((shop) =>
    /4\s*geek|geek\s*me\s*not|geekmenot/i.test(cleanText(shop?.title)),
  );

  if (brandedShop) return cleanText(String(brandedShop.id));
  if (candidates.length === 1) return cleanText(String(candidates[0].id));

  throw new Error("Unable to identify one Printify shop.");
}

async function resolveShopId(configuredShopId, token) {
  if (/^\d+$/.test(configuredShopId)) return configuredShopId;
  if (discoveredShopId) return discoveredShopId;

  const shops = await fetchJson(`${PRINTIFY_API_URL}/shops.json`, token);
  discoveredShopId = chooseShop(shops);
  return discoveredShopId;
}

async function fetchProductPage(shopId, token, page) {
  const url = new URL(`${PRINTIFY_API_URL}/shops/${shopId}/products.json`);
  url.searchParams.set("limit", String(PAGE_SIZE));
  url.searchParams.set("page", String(page));

  return fetchJson(url, token);
}

async function fetchAllProducts(shopId, token) {
  const products = [];
  let page = 1;
  let lastPage = 1;

  do {
    const result = await fetchProductPage(shopId, token, page);
    if (Array.isArray(result?.data)) products.push(...result.data);
    lastPage = Math.min(Number(result?.last_page) || 1, MAX_PAGES);
    page += 1;
  } while (page <= lastPage);

  return products;
}

export default async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return sendJson(response, 405, { error: "Method not allowed." });
  }

  const token = cleanText(process.env.PRINTIFY_API_TOKEN);
  const configuredShopId = cleanText(process.env.PRINTIFY_SHOP_ID);

  if (!token) {
    return sendJson(response, 503, {
      configured: false,
      error: "Automated catalog is not configured.",
    });
  }

  try {
    const shopId = await resolveShopId(configuredShopId, token);
    const printifyProducts = await fetchAllProducts(shopId, token);
    const products = printifyProducts
      .map(normalizeProduct)
      .filter(Boolean)
      .sort((a, b) => Date.parse(b.createdAt || 0) - Date.parse(a.createdAt || 0));

    return sendJson(
      response,
      200,
      {
        configured: true,
        source: "printify",
        products,
        syncedAt: new Date().toISOString(),
      },
      "public, max-age=0, s-maxage=60, stale-while-revalidate=60",
    );
  } catch (error) {
    console.error("Printify catalog sync failed.", error instanceof Error ? error.message : "Unknown error");
    return sendJson(response, 502, {
      configured: true,
      error: "Automated catalog is temporarily unavailable.",
    });
  }
}
