// apps/app/scripts/etsy-oauth.mjs
import http from "node:http";
import crypto from "node:crypto";

const CLIENT_ID = process.env.ETSY_CLIENT_ID;
const REDIRECT_URI = "http://localhost:4321/callback";
const AUTH_URL = "https://www.etsy.com/oauth/connect";
const TOKEN_URL = "https://openapi.etsy.com/v3/public/oauth/token";

if (!CLIENT_ID) {
  console.error("Set ETSY_CLIENT_ID in your shell first: export ETSY_CLIENT_ID=your_keystring");
  process.exit(1);
}

// PKCE bits
function base64url(input) {
  return input.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
const codeVerifier = base64url(crypto.randomBytes(32));
const codeChallenge = base64url(crypto.createHash("sha256").update(codeVerifier).digest());

const state = base64url(crypto.randomBytes(16));
const auth = new URL(AUTH_URL);
auth.searchParams.set("response_type", "code");
auth.searchParams.set("client_id", CLIENT_ID);
auth.searchParams.set("redirect_uri", REDIRECT_URI);
auth.searchParams.set("scope", "listings_r listings_d shops_r"); // read listings + shop info
auth.searchParams.set("state", state);
auth.searchParams.set("code_challenge", codeChallenge);
auth.searchParams.set("code_challenge_method", "S256");

console.log("\n1) Open this URL in your browser and approve access:\n");
console.log(auth.toString(), "\n");

const server = http.createServer(async (req, res) => {
  if (!req.url.startsWith("/callback")) {
    res.statusCode = 404;
    return res.end("Not found");
  }
  const u = new URL(req.url, REDIRECT_URI);
  if (u.searchParams.get("state") !== state) {
    res.statusCode = 400;
    return res.end("State mismatch");
  }
  const code = u.searchParams.get("code");
  res.end("Success! You can close this tab and return to the terminal.");

  // Exchange code for tokens
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    code,
    code_verifier: codeVerifier,
  });

  const r = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const data = await r.json();
  if (!r.ok) {
    console.error("Token error:", data);
    process.exit(1);
  }

  console.log("\n2) COPY your refresh token below and store it in Vercel as ETSY_REFRESH_TOKEN:\n");
  console.log(data.refresh_token, "\n");
  server.close();
});

server.listen(4321, () => {
  console.log("Listening on http://localhost:4321 …");
});
