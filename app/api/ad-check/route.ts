import { NextResponse } from "next/server";
import { BREVO_LIST_ID, NOTIFY_EMAIL, SENDER, BOOKING_URL, MAKE_WEBHOOK } from "../../config";

// Free Ad Check intake.
// With BREVO_API_KEY set in Vercel, each request:
//   1. adds or updates the contact in Brevo (and the Ad Check list, if BREVO_LIST_ID is set)
//   2. emails the lead to NOTIFY_EMAIL
//   3. sends the brand a confirmation from SENDER
// MAKE_WEBHOOK_URL, if set, also gets a copy (for a Make.com scenario).
// With neither set, the route answers 503 and the form shows the email fallback.

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

async function brevo(path: string, key: string, body: unknown) {
  try {
    const res = await fetch(`https://api.brevo.com/v3${path}`, {
      method: "POST",
      headers: { "api-key": key, "Content-Type": "application/json", accept: "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok && res.status !== 204) {
      console.error(`brevo ${path} ${res.status}: ${(await res.text()).slice(0, 300)}`);
      return false;
    }
    return true;
  } catch (e) {
    console.error(`brevo ${path} failed`, e);
    return false;
  }
}

export async function POST(req: Request) {
  let body: { website?: string; email?: string; company?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  // Honeypot: real visitors never see or fill this field.
  if (body.company) return NextResponse.json({ ok: true });

  const email = String(body.email || "").trim().slice(0, 200);
  const website = String(body.website || "").trim().slice(0, 300);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 422 });
  }

  const key = process.env.BREVO_API_KEY;
  const hook = MAKE_WEBHOOK;
  if (!key && !hook) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  let delivered = false;

  if (hook) {
    try {
      const r = await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website, source: "Free Ad Check", at: new Date().toISOString() }),
      });
      delivered = delivered || r.ok;
    } catch (e) {
      console.error("make webhook failed", e);
    }
  }

  if (key) {
    const saved = await brevo("/contacts", key, {
      email,
      attributes: { WEBSITE: website, SOURCE: "Free Ad Check" },
      ...(BREVO_LIST_ID ? { listIds: [BREVO_LIST_ID] } : {}),
      updateEnabled: true,
    });

    const alerted = await brevo("/smtp/email", key, {
      sender: SENDER,
      to: [{ email: NOTIFY_EMAIL, name: "Willie Bernoudy" }],
      replyTo: { email },
      subject: `New Free Ad Check: ${website || email}`,
      htmlContent: `<p>New Free Ad Check request.</p><p><b>Website:</b> ${esc(website || "(none given)")}<br><b>Email:</b> ${esc(email)}<br><b>When:</b> ${new Date().toUTCString()}</p><p>Reply to this email to answer them directly. Promise on the site: three ads checked, fixes sent by email.</p>`,
    });

    const booking = BOOKING_URL
      ? `<p>Want to talk it through sooner? <a href="${BOOKING_URL}">Book a 20-minute intro call</a>.</p>`
      : "";
    await brevo("/smtp/email", key, {
      sender: SENDER,
      to: [{ email }],
      replyTo: { email: NOTIFY_EMAIL, name: "Willie Bernoudy" },
      subject: "Your Free Ad Check is in",
      htmlContent: `<p>Thanks for sending ${esc(website || "your brand")} over.</p><p>We're pulling your three most recent ads now. A director will mark what's holding each one back (the hook, the angle, the cut) and email you the fixes. They're yours to keep whether you hire us or not.</p>${booking}<p>Willie Bernoudy<br>Founder and Creative Director, Creative Direction Hub<br>Your brand, directed.</p>`,
    });

    delivered = delivered || saved || alerted;
  }

  if (!delivered) return NextResponse.json({ error: "upstream" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
