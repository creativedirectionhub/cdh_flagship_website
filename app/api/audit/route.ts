import { NextResponse } from "next/server";
import { BREVO_LIST_ID, NOTIFY_EMAIL, SENDER, BOOKING_URL, MAKE_WEBHOOK } from "../../config";

// Free Creative Audit intake. Also served at /api/ad-check for the old form.
// Each request is posted as JSON to the Make.com webhook (MAKE_WEBHOOK), which emails it on.
// With BREVO_API_KEY set in Vercel, it also saves the contact in Brevo and sends the alert and confirmation directly.
// With neither configured, the route answers 503 and the form shows the email fallback.

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

const LANES = ["Consumer brand", "Personal brand", "Hospitality", "Other"];
const NEEDS = ["Brand", "Campaigns and ads", "Content", "Website", "Not sure"];

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

const clean = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);
const pick = (v: unknown, list: string[]) => (list.includes(String(v)) ? String(v) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  // Honeypot: real visitors never see or fill this field.
  if (body.company) return NextResponse.json({ ok: true });

  const email = clean(body.email, 200);
  const website = clean(body.website, 300);
  const name = clean(body.name, 120);
  const lane = pick(body.lane, LANES);
  const need = pick(body.need, NEEDS);
  const notes = clean(body.notes, 500);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 422 });
  }
  if (!website) return NextResponse.json({ error: "missing_website" }, { status: 422 });

  const key = process.env.BREVO_API_KEY;
  const hook = MAKE_WEBHOOK;
  if (!key && !hook) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  const lead = { name, email, website, lane, need, notes, source: "Free Creative Audit", at: new Date().toISOString() };
  let delivered = false;

  if (hook) {
    try {
      const r = await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead), signal: AbortSignal.timeout(10000) });
      delivered = delivered || r.ok;
    } catch (e) {
      console.error("make webhook failed", e);
    }
  }

  if (key) {
    const saved = await brevo("/contacts", key, {
      email,
      attributes: { FIRSTNAME: name, WEBSITE: website, LANE: lane, NEED: need, SOURCE: "Free Creative Audit" },
      ...(BREVO_LIST_ID ? { listIds: [BREVO_LIST_ID] } : {}),
      updateEnabled: true,
    });

    const rows = [["Name", name], ["Email", email], ["Website or Instagram", website], ["Lane", lane], ["Needs most", need], ["Notes", notes], ["When", new Date().toUTCString()]]
      .filter(([, v]) => v)
      .map(([k, v]) => `<b>${k}:</b> ${esc(v)}`)
      .join("<br>");
    const alerted = await brevo("/smtp/email", key, {
      sender: SENDER,
      to: [{ email: NOTIFY_EMAIL, name: "Willie Bernoudy" }],
      replyTo: { email },
      subject: `New Free Creative Audit: ${website}`,
      htmlContent: `<p>New Free Creative Audit request.</p><p>${rows}</p><p>Reply to this email to answer them directly. Promise on the site: audit back within 3 business days.</p>`,
    });

    const booking = BOOKING_URL ? `<p>Want to talk it through sooner? <a href="${BOOKING_URL}">Book a 30-minute call</a>.</p>` : "";
    await brevo("/smtp/email", key, {
      sender: SENDER,
      to: [{ email, ...(name ? { name } : {}) }],
      replyTo: { email: NOTIFY_EMAIL, name: "Willie Bernoudy" },
      subject: "Your Free Creative Audit is in",
      htmlContent: `<p>Thanks for sending ${esc(website)} over.</p><p>I'm reviewing your brand, your site and your last three pieces now. You'll get what's holding them back, with fixes, within 3 business days. They're yours to keep whether you hire us or not.</p>${booking}<p>Willie Bernoudy<br>Founder and Creative Director, Creative Direction Hub<br>Your brand, directed.</p>`,
    });

    delivered = delivered || saved || alerted;
  }

  if (!delivered) return NextResponse.json({ error: "upstream" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
