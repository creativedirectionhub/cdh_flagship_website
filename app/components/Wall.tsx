"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { clapSound, ripSound, slapSound } from "./clap";
import { ROLLS, ROLL_KEYS, SPARKS, FIRST_TAPE, DRESSING, type Tape, type RollKey, type Dressing } from "../content/wall-data";

// The wall. On set, the crew signs the wall when the job is done; this one's ours.
// Grab a roll, tap a spot, a strip rips off right there. Write on it, stick it. It stays up for everyone.

const hash = (s: string) => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
function rng(seed: number) { let s = seed || 1; return () => ((s = Math.imul(s ^ (s >>> 15), 2246822507) ^ Math.imul(s ^ (s >>> 13), 3266489909)), ((s ^= s >>> 16) >>> 0) / 4294967296); }

// Torn ends: straight top and bottom edges, ragged fibers at both ends.
function torn(seed: number) {
  const r = rng(seed); const n = 9; const right: string[] = []; const left: string[] = [];
  for (let i = 0; i <= n; i++) right.push(`${(100 - r() * 3.2).toFixed(1)}% ${((i / n) * 100).toFixed(1)}%`);
  for (let i = n; i >= 0; i--) left.push(`${(r() * 3.2).toFixed(1)}% ${((i / n) * 100).toFixed(1)}%`);
  return `polygon(${right.join(",")},${left.join(",")})`;
}

function placeFor(t: { k: string; name: string }) {
  const r = rng(hash(t.k + t.name));
  return { x: 12 + r() * 76, y: 14 + r() * 72, tilt: r() * 9 - 4.5 };
}

// On phones the wall stands up: the collage is transposed so it fills a tall screen.
const flip = (x: number, y: number, portrait: boolean) => (portrait ? { x: 22 + y * 0.56, y: 6 + x * 0.88 } : { x, y });
// Inverse, for a tap on the standing wall.
const unflip = (x: number, y: number, portrait: boolean) => (portrait ? { x: (y - 6) / 0.88, y: (x - 22) / 0.56 } : { x, y });

function TapeBody({ color, seed, size = 1, children, className = "" }: { color: RollKey; seed: number; size?: number; children: React.ReactNode; className?: string }) {
  const roll = ROLLS[color] || ROLLS.orange;
  return (
    <div className={`gt ${className}`} style={{ background: roll.tape, color: roll.ink, clipPath: torn(seed), fontSize: `${1.6 * size}cqw` }}>
      {children}
    </div>
  );
}

function Strip({ t, fresh, portrait }: { t: Tape; fresh?: boolean; portrait: boolean }) {
  const p0 = Number.isFinite(t.x) && t.x > 0 ? { x: t.x, y: t.y, tilt: t.tilt } : placeFor(t);
  const p = { ...p0, ...flip(p0.x, p0.y, portrait) };
  return (
    <li className={`gt-pin ${fresh ? "gt-slap" : ""}`} style={{ left: `${p.x}%`, top: `${p.y}%`, ["--tilt" as string]: `${p.tilt}deg` }}>
      <TapeBody color={t.color} seed={hash(t.k)}>
        <p className="gt-line">{t.line}</p>
        <p className="gt-sign">— {t.name}{t.from ? `, ${t.from}` : ""}{t.own ? " (you)" : ""}</p>
      </TapeBody>
    </li>
  );
}

function Dress({ d, portrait }: { d: Dressing; portrait: boolean }) {
  const q = flip(d.x, d.y, portrait);
  const style = { left: `${q.x}%`, top: `${q.y}%`, ["--tilt" as string]: `${d.tilt}deg` };
  if (d.kind === "x") {
    return (
      <li aria-hidden="true" className="gt-pin gt-dress" style={style}>
        <div className="relative h-[7cqw] w-[7cqw]">
          <div className="absolute left-1/2 top-1/2 w-[8.5cqw] -translate-x-1/2 -translate-y-1/2 rotate-45"><TapeBody color={d.color} seed={11} size={0.5}><span className="block h-[0.9cqw]" /></TapeBody></div>
          <div className="absolute left-1/2 top-1/2 w-[8.5cqw] -translate-x-1/2 -translate-y-1/2 -rotate-45"><TapeBody color={d.color} seed={23} size={0.5}><span className="block h-[0.9cqw]" /></TapeBody></div>
        </div>
      </li>
    );
  }
  if (d.kind === "t") {
    return (
      <li aria-hidden="true" className="gt-pin gt-dress" style={style}>
        <div className="flex w-[13cqw] flex-col items-center">
          <TapeBody color={d.color} seed={31} size={0.5} className="w-full"><span className="block h-[1.4cqw]" /></TapeBody>
          <div className="-mt-[0.3cqw] w-[2.6cqw]" style={{ height: "8cqw", background: ROLLS[d.color].tape, clipPath: "polygon(0 0,100% 0,100% 96%,80% 100%,60% 96%,40% 100%,20% 96%,0 100%)" }} />
        </div>
      </li>
    );
  }
  return (
    <li aria-hidden="true" className="gt-pin gt-dress" style={style}>
      <TapeBody color={d.color} seed={hash(d.k)} size={d.size}>
        <p className="gt-line whitespace-nowrap">{d.text}</p>
        {d.sub && <p className="gt-sign">{d.sub}</p>}
      </TapeBody>
    </li>
  );
}

type Draft = { x: number; y: number; tilt: number; color: RollKey; seed: number };

export default function Wall({ initial }: { initial: Tape[] }) {
  const board = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLTextAreaElement>(null);
  const [roll, setRoll] = useState<RollKey | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [line, setLine] = useState("");
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [mine, setMine] = useState<Tape[]>([]);
  const [fresh, setFresh] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [thump, setThump] = useState(0);
  const [spark, setSpark] = useState(-1);
  const [clap, setClap] = useState(0);
  const [portrait, setPortrait] = useState(false);
  const draftEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try { setMine(JSON.parse(localStorage.getItem("cdh-wall-mine") || "[]")); } catch { /* fine */ }
    const mq = window.matchMedia("(max-width: 767px)");
    const on = () => setPortrait(mq.matches);
    on(); mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const tapes = useMemo(() => {
    const seen = new Set(initial.map((t) => `${t.name}|${t.line}`));
    const own = mine.filter((t) => !seen.has(`${t.name}|${t.line}`)).map((t) => ({ ...t, own: true }));
    return [FIRST_TAPE, ...initial.slice().reverse(), ...own];
  }, [initial, mine]);

  function tear(x: number, y: number) {
    const color = roll || "orange";
    ripSound();
    setDraft({ x: Math.min(86, Math.max(14, x)), y: Math.min(90, Math.max(10, y)), tilt: Math.round((Math.random() * 8 - 4) * 10) / 10, color, seed: Math.floor(Math.random() * 1e9) });
    setMsg("");
    setTimeout(() => { draftEl.current?.scrollIntoView({ block: "center", behavior: "smooth" }); text.current?.focus({ preventScroll: true }); }, 380);
  }

  function onBoard(e: React.MouseEvent<HTMLDivElement>) {
    if (!roll || draft) return;
    if ((e.target as HTMLElement).closest("textarea,button,input,a")) return;
    const r = board.current!.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * 100, py = ((e.clientY - r.top) / r.height) * 100;
    const c = unflip(px, py, portrait); // store in landscape coordinates
    tear(c.x, c.y);
  }

  function anywhere() { tear(18 + Math.random() * 64, 18 + Math.random() * 64); }

  function another() {
    clapSound(); setClap((c) => c + 1);
    const n = (spark + 1) % SPARKS.length; setSpark(n); setLine(SPARKS[n]);
    text.current?.focus({ preventScroll: true });
  }

  function peel() { setDraft(null); setLine(""); setMsg(""); }

  async function stick() {
    if (!draft) return;
    if (line.trim().length < 2) { setMsg("Write something on your tape first."); text.current?.focus(); return; }
    if (name.trim().length < 2) { setMsg("Sign it: add your name or brand."); return; }
    setBusy(true); setMsg("");
    try {
      const res = await fetch("/api/wall", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ line, name, from, color: draft.color, x: draft.x, y: draft.y, tilt: draft.tilt }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.tape) {
        setMsg(res.status === 422 ? "Keep it clean and link-free, then stick it again." : res.status === 429 ? "That's a lot of tape. Give it a few minutes." : res.status === 400 ? "Write something and sign it." : "The wall's down for a minute. Try again shortly.");
        setBusy(false);
        return;
      }
      const t: Tape = { ...data.tape, k: `me-${Date.now()}` };
      const next = [...mine, t].slice(-6);
      setMine(next);
      try { localStorage.setItem("cdh-wall-mine", JSON.stringify(next)); } catch { /* fine */ }
      slapSound(); setFresh(t.k); setThump((n) => n + 1);
      setDraft(null); setLine(""); setRoll(null);
      setMsg("It's on the wall. That's a wrap on your take.");
    } catch {
      setMsg("The wall's down for a minute. Try again shortly.");
    }
    setBusy(false);
  }

  const light = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = board.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`); el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const count = tapes.length;
  const hint = draft ? "Write on your tape, sign it, stick it." : roll ? `${ROLLS[roll].label} it is. Now tap a spot on the wall.` : "Grab a roll.";

  return (
    <section id="wall" className="relative border-t border-line py-20 md:py-28" aria-labelledby="wall-title">
      <div className="gutter">
        <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,0.45fr)] lg:items-end">
          <div>
            <p className="slate text-gaffer">The wall · {count} {count === 1 ? "mark" : "marks"} and counting</p>
            <h2 id="wall-title" className="mt-5 text-[clamp(48px,8vw,136px)] font-black leading-[0.88] tracking-tightest">That&apos;s a wrap.{" "}<br />Sign the <span className="tape-word"><i aria-hidden="true" className="tape-edge" /><b>wall.</b></span></h2>
          </div>
          <p className="max-w-[44ch] text-[18px] leading-[1.6] text-body lg:pb-3">On set, the crew signs the wall when the job is done. This one&apos;s ours, and it&apos;s open to you. Grab a roll, tap a spot, write whatever you want. It stays up.</p>
        </div>
      </div>

      <div ref={scroller} className="mt-12 md:mt-16">
        <div
          ref={board}
          onClick={onBoard}
          onPointerMove={light}
          role="group"
          aria-label="The CDH wall: tape signed by visitors"
          className={`wall-flat relative mx-auto aspect-[2/3] w-full md:aspect-[16/10] md:max-w-[1920px] ${roll && !draft ? "cursor-crosshair" : ""} ${thump ? "wall-thump" : ""}`}
          key={`b${thump}`}
        >
          <ul className="absolute inset-0">
            {DRESSING.map((d) => <Dress key={d.k} d={d} portrait={portrait} />)}
            {tapes.map((t) => <Strip key={t.k} t={t} fresh={t.k === fresh} portrait={portrait} />)}
          </ul>

          {draft && (
            <div ref={draftEl} className="gt-pin gt-draft z-20" style={{ left: `${flip(draft.x, draft.y, portrait).x}%`, top: `${flip(draft.x, draft.y, portrait).y}%`, ["--tilt" as string]: `${draft.tilt}deg` }}>
              <TapeBody color={draft.color} seed={draft.seed} className="gt-unroll">
                <label className="sr-only" htmlFor="wall-line">What you write on your tape</label>
                <textarea
                  id="wall-line"
                  ref={text}
                  value={line}
                  onChange={(e) => setLine(e.target.value.replace(/\n/g, " "))}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); stick(); } if (e.key === "Escape") peel(); }}
                  maxLength={70}
                  rows={2}
                  placeholder="Write anything…"
                  className="gt-line gt-input"
                />
                <p className="gt-sign">— {name || "your name"}{from ? `, ${from}` : ""}</p>
              </TapeBody>
            </div>
          )}
        </div>
      </div>

      {/* The dock: tape rack, then the signing tools */}
      <div className="gutter sticky bottom-3 z-30 mt-6 md:bottom-5">
        <div className="mx-auto max-w-[1100px] border border-line bg-raised/95 p-4 backdrop-blur-sm md:p-5">
          <p aria-live="polite" className="slate text-[12px] text-muted">{msg || hint}</p>
          {!draft ? (
            <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-4">
              <div className="flex flex-wrap items-end gap-3" role="radiogroup" aria-label="Tape rolls">
                {ROLL_KEYS.map((k) => (
                  <button key={k} type="button" role="radio" aria-checked={roll === k} aria-label={ROLLS[k].label} onClick={() => setRoll(k)} className={`gt-roll ${roll === k ? "is-on" : ""}`} style={{ ["--roll" as string]: ROLLS[k].tape }}>
                    <span className="gt-roll-hole" /><span className="gt-roll-tail" />
                  </button>
                ))}
              </div>
              {roll && <button type="button" onClick={anywhere} className="slate border-b-2 border-gaffer pb-1 pt-2 text-[12px] hover:text-gaffer">Tear a strip for me</button>}
            </div>
          ) : (
            <div className="mt-3 grid grid-cols-2 items-end gap-x-4 gap-y-3 md:flex md:flex-wrap md:gap-x-5">
              <label className="grid min-w-0 gap-1">
                <span className="slate text-[11px] text-muted">Sign it</span>
                <input value={name} onChange={(e) => setName(e.target.value)} maxLength={28} autoComplete="nickname" placeholder="Name or brand" className="wall-input md:w-[180px]" onKeyDown={(e) => { if (e.key === "Enter") stick(); }} />
              </label>
              <label className="grid min-w-0 gap-1">
                <span className="slate text-[11px] text-muted">From (optional)</span>
                <input value={from} onChange={(e) => setFrom(e.target.value)} maxLength={28} autoComplete="off" placeholder="City or crew" className="wall-input md:w-[150px]" onKeyDown={(e) => { if (e.key === "Enter") stick(); }} />
              </label>
              <div className="col-span-2 flex items-center gap-3 md:ml-auto md:flex-1 md:gap-4">
                <button type="button" onClick={another} className="group mr-auto flex items-center gap-2" aria-label="Another take: feed me a line">
                <span key={clap} className={`mini-slate ${clap ? "mini-go" : ""}`} aria-hidden="true"><span className="slate-stripes mini-stick" /><span className="mini-board" /></span>
                <span className="slate whitespace-nowrap text-[12px] group-hover:text-gaffer">Another take</span>
              </button>
                <button type="button" onClick={peel} className="slate whitespace-nowrap text-[12px] text-muted hover:text-ink"><span className="md:hidden">Peel</span><span className="hidden md:inline">Peel it off</span></button>
                <button type="button" onClick={stick} disabled={busy} className="btn-primary whitespace-nowrap">{busy ? "Sticking…" : "Stick it"}</button>
              </div>
            </div>
          )}
          <p className={`mt-3 text-[12px] leading-[1.5] text-muted ${draft ? "hidden md:block" : ""}`}>Your tape shows publicly on this wall. A first name or nickname is fine. No links.</p>
        </div>
      </div>
    </section>
  );
}
