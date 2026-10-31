import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { WALL_HOOK } from "../../content/wall";
import { ROLLS } from "../../content/wall-data";
import { guard } from "./guard";

// Sign the wall. The guard blocks slurs, hate, sexual content, profanity, threats and links, and holds
// borderline tapes hidden until Willie OKs them. Every tape is emailed to Willie so he can take one down.
const hits = new Map<string, number[]>();
function tooMany(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 2;
}

const clean = (v: unknown, max: number) => String(v ?? "").replace(/[\u0000-\u001f<>]/g, "").replace(/\s+/g, " ").trim().slice(0, max);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "bad_request" }, { status: 400 }); }
  if (body.company) return NextResponse.json({ ok: true }); // honeypot
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (tooMany(ip)) return NextResponse.json({ error: "slow_down" }, { status: 429 });

  const name = clean(body.name, 28);
  const line = clean(body.line, 70);
  const from = clean(body.from, 28);
  const color = String(body.color) in ROLLS ? String(body.color) : "orange";
  const num = (v: unknown, lo: number, hi: number, d: number) => { const n = Number(v); return Number.isFinite(n) ? Math.round(Math.min(hi, Math.max(lo, n)) * 10) / 10 : d; };
  const x = num(body.x, 2, 98, 50), y = num(body.y, 2, 600, 50), tilt = num(body.tilt, -6, 6, 0);
  const email = clean(body.email, 120).toLowerCase();
  const optin = body.optin === true;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return NextResponse.json({ error: "missing" }, { status: 400 });
  if (name.length < 2 || line.length < 2) return NextResponse.json({ error: "missing" }, { status: 400 });
  const verdict = guard({ line, name, from });
  if (verdict === "block") return NextResponse.json({ error: "keep_it_clean" }, { status: 422 });
  const held = verdict === "hold";

  const tape = { name, line, from, color, x, y, tilt, at: new Date().toISOString() };
  try {
    const res = await fetch(WALL_HOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "sign", ...tape, email, optin, hidden: held }),
      signal: AbortSignal.timeout(12000),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(String(res.status));
  } catch (e) {
    console.error("wall sign failed", e);
    return NextResponse.json({ error: "offline" }, { status: 503 });
  }
  if (!held) revalidateTag("wall");
  return NextResponse.json({ ok: true, tape, held });
}
