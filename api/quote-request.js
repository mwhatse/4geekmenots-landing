const ALLOWED_ORIGINS = new Set([
  "https://4geekmenot.com",
  "https://www.4geekmenot.com",
]);

const MAX_DETAILS_LENGTH = 5000;

function sendJson(response, status, body) {
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("X-Content-Type-Options", "nosniff");
  return response.status(status).json(body);
}

function getBody(request) {
  if (typeof request.body === "string") {
    return JSON.parse(request.body);
  }

  return request.body || {};
}

function cleanText(value, maxLength = 240) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return sendJson(response, 405, { error: "Method not allowed." });
  }

  const origin = request.headers.origin;
  const isProjectPreview = origin?.startsWith("https://4geekmenots-landing-") && origin.endsWith(".vercel.app");

  if (origin && !ALLOWED_ORIGINS.has(origin) && !isProjectPreview) {
    return sendJson(response, 403, { error: "Origin not allowed." });
  }

  let body;
  try {
    body = getBody(request);
  } catch {
    return sendJson(response, 400, { error: "Invalid request body." });
  }

  if (cleanText(body.website, 200)) {
    return sendJson(response, 201, { ok: true });
  }

  const name = cleanText(body.name, 120);
  const email = cleanText(body.email, 254).toLowerCase();
  const phone = cleanText(body.phone, 40);
  const projectType = cleanText(body.projectType, 120);
  const quantity = cleanText(body.quantity, 20);
  const deadline = cleanText(body.deadline, 20);
  const details = cleanText(body.details, MAX_DETAILS_LENGTH);

  if (name.length < 2 || !isValidEmail(email) || !projectType || details.length < 10) {
    return sendJson(response, 400, {
      error: "Please provide your name, a valid email, project type, and project details.",
    });
  }

  const supabaseUrl = process.env.RJ_SUPABASE_URL;
  const supabaseAnonKey = process.env.RJ_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("RJ CRM environment variables are missing.");
    return sendJson(response, 503, { error: "Quote intake is temporarily unavailable." });
  }

  const crmPayload = {
    full_name: name,
    email,
    phone: phone || null,
    preferred_contact: "email",
    quote_type: "tshirts",
    other_quote_type: null,
    request_mode: "quote",
    deadline_type: deadline ? "specific" : "no-rush",
    specific_deadline: deadline || null,
    deposit_acknowledged: false,
    refund_acknowledged: false,
    shirt_quantity: quantity || null,
    design_description: details,
    additional_notes: [
      "Source: 4GeekMeNot Apparel (4geekmenot.com)",
      `Project type: ${projectType}`,
      "Submitted directly through the 4GeekMeNot storefront.",
    ].join("\n"),
    needs_shipping: false,
  };

  const crmHeaders = {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`,
    "Content-Type": "application/json",
    Origin: "https://www.4geekmenot.com",
  };

  try {
    const crmResponse = await fetch(`${supabaseUrl}/rest/v1/quote_request_submissions`, {
      method: "POST",
      headers: {
        ...crmHeaders,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(crmPayload),
    });

    if (!crmResponse.ok) {
      console.error("RJ CRM insert failed.", crmResponse.status, await crmResponse.text());
      return sendJson(response, 502, { error: "We could not save your request. Please try again." });
    }

    const notificationResponse = await fetch(`${supabaseUrl}/functions/v1/send-notification`, {
      method: "POST",
      headers: crmHeaders,
      body: JSON.stringify({
        type: "quote",
        fullName: name,
        email,
        phone: phone || undefined,
        quoteType: "tshirts",
        requestMode: "quote",
        isNotary: false,
      }),
    });

    if (!notificationResponse.ok) {
      console.warn("Quote saved, but notification delivery failed.", notificationResponse.status);
    }

    return sendJson(response, 201, { ok: true, requestNumber: null });
  } catch (error) {
    console.error("RJ CRM request failed.", error instanceof Error ? error.message : "Unknown error");
    return sendJson(response, 502, { error: "We could not save your request. Please try again." });
  }
}
