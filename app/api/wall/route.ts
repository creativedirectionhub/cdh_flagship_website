import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { WALL_HOOK } from "../../content/wall";
import { ROLLS } from "../../content/wall-data";

// Sign the wall. Light filters keep it clean; every tape is emailed to Willie so he can take one down.
const hits = new Map<string, number[]>();
function tooMany(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 2;
}

const BLOCK = /(https?:|www\.|\.(com|net|org|io|co|xyz|ru|ly)\b|@|\d{6,}|f+u+c+k|sh[i1]t|b[i1]tch|c+u+n+t|d[i1]ck|puss(y|ies)|n[i1]gg|f[a@]g|retard|wh[o0]re|sl[u]t|p[o0]rn|nazi|\bsex\b|\bcock|\bass(hole)?\b|kill yourself|kys)/i;
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
  if (BLOCK.test(`${name} ${line} ${from}`)) return NextResponse.json({ error: "keep_it_clean" }, { status: 422 });

  const tape = { name, line, from, color, x, y, tilt, at: new Date().toISOString() };
  try {
    const res = await fetch(WALL_HOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "sign", ...tape, email, optin }),
      signal: AbortSignal.timeout(12000),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(String(res.status));
  } catch (e) {
    console.error("wall sign failed", e);
    return NextResponse.json({ error: "offline" }, { status: 503 });
  }
  revalidateTag("wall");
  return NextResponse.json({ ok: true, tape });
}
