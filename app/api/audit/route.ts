import { NextResponse } from "next/server";
import { BREVO_LIST_ID, NOTIFY_EMAIL, SENDER, BOOKING_URL, MAKE_WEBHOOK } from "../../config";

// Free Creative Audit and project inquiry intake. Also served at /api/ad-check for the old form.
// kind: "project" adds budget and timeline, and is labeled "Project inquiry" everywhere it lands.
// Each request is posted as JSON to the Make.com webhook (MAKE_WEBHOOK), which emails it on.
// With BREVO_API_KEY set in Vercel, it also saves the contact in Brevo and sends the alert and confirmation directly.
// With neither configured, the route answers 503 and the form shows the email fallback.

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

const LANES = ["Consumer brand", "Personal brand", "Hospitality", "Other"];
const NEEDS = ["Brand", "Campaigns and ads", "Content", "Website", "AI art direction", "Not sure"];
const BUDGETS = ["$5k to $15k", "$15k to $35k", "$35k to $75k", "$75k+", "Not sure yet"];
const TIMELINES = ["ASAP", "Within 1 month", "1 to 3 months", "3+ months"];

// Light spam brake: at most 3 requests per address per 10 minutes on each server instance.
const hits = new Map<string, number[]>();
function tooMany(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 3;
}

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
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (tooMany(ip)) return NextResponse.json({ error: "slow_down" }, { status: 429 });
  // Honeypot: real visitors never see or fill this field.
  if (body.company) return NextResponse.json({ ok: true });

  const email = clean(body.email, 200);
  const website = clean(body.website, 300);
  const name = clean(body.name, 120);
  const lane = pick(body.lane, LANES);
  const need = pick(body.need, NEEDS);
  const project = body.kind === "project";
  const budget = project ? pick(body.budget, BUDGETS) : "";
  const timeline = project ? pick(body.timeline, TIMELINES) : "";
  const source = project ? "Project inquiry" : "Free Creative Audit";
  const typed = clean(body.notes, 500);
  // Budget and timeline also ride inside notes, so they show up in the existing Make.com email without remapping it.
  const notes = project ? [budget && `Budget: ${budget}`, timeline && `Timeline: ${timeline}`, typed].filter(Boolean).join(" · ") : typed;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 422 });
  }
  if (!website) return NextResponse.json({ error: "missing_website" }, { status: 422 });

  const key = process.env.BREVO_API_KEY;
  const hook = MAKE_WEBHOOK;
  if (!key && !hook) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  const lead = { name, email, website, lane, need, notes, budget, timeline, source, at: new Date().toISOString() };
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
      attributes: { FIRSTNAME: name, WEBSITE: website, LANE: lane, NEED: need, SOURCE: source },
      ...(BREVO_LIST_ID ? { listIds: [BREVO_LIST_ID] } : {}),
      updateEnabled: true,
    });

    const rows = [["Name", name], ["Email", email], ["Website or Instagram", website], ["Lane", lane], ["Needs most", need], ["Budget", budget], ["Timeline", timeline], ["Notes", typed], ["When", new Date().toUTCString()]]
      .filter(([, v]) => v)
      .map(([k, v]) => `<b>${k}:</b> ${esc(v)}`)
      .join("<br>");
    const alerted = await brevo("/smtp/email", key, {
      sender: SENDER,
      to: [{ email: NOTIFY_EMAIL, name: "Willie Bernoudy" }],
      replyTo: { email },
      subject: project ? `New project inquiry (${budget || "budget not given"}): ${website}` : `New Free Creative Audit: ${website}`,
      htmlContent: project
        ? `<p>New project inquiry.</p><p>${rows}</p><p>Reply to this email to answer them directly. Next step on the site: a 30-minute call, then a fixed scope and price.</p>`
        : `<p>New Free Creative Audit request.</p><p>${rows}</p><p>Reply to this email to answer them directly. Promise on the site: audit back within 3 business days.</p>`,
    });

    const booking = BOOKING_URL ? `<p>Want to talk it through sooner? <a href="${BOOKING_URL}">Book a 30-minute call</a>.</p>` : "";
    await brevo("/smtp/email", key, {
      sender: SENDER,
      to: [{ email, ...(name ? { name } : {}) }],
      replyTo: { email: NOTIFY_EMAIL, name: "Creative Direction Hub" },
      subject: project ? "Your project inquiry is in" : "Your Free Creative Audit is in",
      htmlContent: project
        ? `<p>Thanks for telling us about ${esc(website)}.</p><p>We'll reply to set up a 30-minute call. After the call you'll get a fixed scope and a fixed price before anything starts.</p>${booking}<p>Willie Bernoudy<br>Founder and Creative Director, Creative Direction Hub<br>We put brands on their mark.</p>`
        : `<p>Thanks for sending ${esc(website)} over.</p><p>We're reviewing your brand, your site and your last three pieces now. You'll get what's holding them back, with fixes, within 3 business days. They're yours to keep whether you hire us or not.</p>${booking}<p>Willie Bernoudy<br>Founder and Creative Director, Creative Direction Hub<br>We put brands on their mark.</p>`,
    });

    delivered = delivered || saved || alerted;
  }

  if (!delivered) return NextResponse.json({ error: "upstream" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
