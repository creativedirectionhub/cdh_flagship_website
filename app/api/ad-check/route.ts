import { NextResponse } from "next/server";

// Free Ad Check intake. Connect one of these in Vercel env vars:
//   BREVO_API_KEY + BREVO_LIST_ID  -> adds the contact to a Brevo list (starts the follow-up sequence)
//   MAKE_WEBHOOK_URL               -> forwards the request to a Make.com scenario
// With neither set, the route answers 503 and the form shows the email fallback.

export async function POST(req: Request) {
  let body: { website?: string; email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const email = String(body.email || "").trim().slice(0, 200);
  const website = String(body.website || "").trim().slice(0, 300);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 422 });
  }

  const { BREVO_API_KEY, BREVO_LIST_ID, MAKE_WEBHOOK_URL } = process.env;

  try {
    if (BREVO_API_KEY && BREVO_LIST_ID) {
      const res = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: { "api-key": BREVO_API_KEY, "Content-Type": "application/json", accept: "application/json" },
        body: JSON.stringify({
          email,
          attributes: { WEBSITE: website, SOURCE: "Free Ad Check" },
          listIds: [Number(BREVO_LIST_ID)],
          updateEnabled: true,
        }),
      });
      if (!res.ok) return NextResponse.json({ error: "upstream" }, { status: 502 });
      return NextResponse.json({ ok: true });
    }
    if (MAKE_WEBHOOK_URL) {
      const res = await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website, source: "Free Ad Check", at: new Date().toISOString() }),
      });
      if (!res.ok) return NextResponse.json({ error: "upstream" }, { status: 502 });
      return NextResponse.json({ ok: true });
    }
  } catch {
    return NextResponse.json({ error: "upstream" }, { status: 502 });
  }

  return NextResponse.json({ error: "not_configured" }, { status: 503 });
}
