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

// The wall is laid out on an invisible grid so it stays organized as it fills.
// Each tape asks for the cell nearest the spot it was stuck; first come keeps its cell.
// When open cells run low, the wall grows another row: it makes room for the next one.
type Mode = "land" | "port";
const GRID = {
  land: { cols: 6, base: 4, cellH: 0.15625, minFree: 4 }, // cell height as a fraction of wall width
  port: { cols: 2, base: 6, cellH: 0.36, minFree: 2 },
} as const;
type Cell = [number, number];
const ck = (c: number, r: number) => `${c},${r}`;

function wants(t: Tape, mode: Mode): Cell {
  const x = Number.isFinite(t.x) && t.x > 0 ? t.x : 12 + (hash(t.k) % 76);
  const y = Number.isFinite(t.y) && t.y > 0 ? t.y : 14 + (hash(t.name) % 72);
  if (mode === "land") return [Math.min(5, Math.max(0, Math.floor((x / 100) * 6))), Math.max(0, Math.floor((y / 100) * 4))];
  return [x < 50 ? 0 : 1, Math.max(0, Math.floor((y / 100) * 6))];
}

function nearestFree(want: Cell, taken: Set<string>, cols: number, maxRows: number): Cell {
  let best: Cell = [0, maxRows]; let bd = Infinity;
  for (let r = 0; r < maxRows; r++) for (let c = 0; c < cols; c++) {
    if (taken.has(ck(c, r))) continue;
    const d = (c - want[0]) ** 2 + 1.3 * (r - want[1]) ** 2 + r * 0.01;
    if (d < bd) { bd = d; best = [c, r]; }
  }
  return best;
}

function layout(tapes: Tape[], mode: Mode, hold?: Cell) {
  const g = GRID[mode];
  const taken = new Set<string>();
  DRESSING.forEach((d) => { const cell = mode === "land" ? d.land : d.port; if (cell) taken.add(ck(cell[0], cell[1])); });
  if (hold) taken.add(ck(hold[0], hold[1]));
  const pos = new Map<string, Cell>();
  let rows: number = g.base;
  const cap = g.base + Math.ceil((tapes.length + 2) / g.cols) + 2;
  for (const t of tapes) {
    const cell = nearestFree(wants(t, mode), taken, g.cols, cap);
    taken.add(ck(cell[0], cell[1])); pos.set(t.k, cell); rows = Math.max(rows, cell[1] + 1);
  }
  const free = () => { const f: Cell[] = []; for (let r = 0; r < rows; r++) for (let c = 0; c < g.cols; c++) if (!taken.has(ck(c, r))) f.push([c, r]); return f; };
  while (free().length < g.minFree) rows++;
  return { pos, rows, free: free(), taken };
}

// Where a cell sits on the wall, in percent, with a little hand-placed wobble.
function spot(cell: Cell, mode: Mode, rows: number, seed: number) {
  const g = GRID[mode]; const r = rng(seed);
  const jx = mode === "land" ? 0.2 : 0.1;
  return { left: ((cell[0] + 0.5) / g.cols) * 100 + (r() - 0.5) * (100 / g.cols) * jx, top: ((cell[1] + 0.5) / rows) * 100 + (r() - 0.5) * (100 / rows) * 0.22 };
}

const when = (iso: string) => { const d = new Date(iso); return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); };

function TapeBody({ color, seed, size = 1, children, className = "" }: { color: RollKey; seed: number; size?: number; children: React.ReactNode; className?: string }) {
  const roll = ROLLS[color] || ROLLS.orange;
  return (
    <div className={`gt ${className}`} style={{ background: roll.tape, color: roll.ink, clipPath: torn(seed), ["--s" as string]: size }}>
      {children}
      <span aria-hidden="true" className="gt-curl" />
    </div>
  );
}

function Strip({ t, fresh, at, peeled, onPeel }: { t: Tape; fresh?: boolean; at: { left: number; top: number }; peeled: boolean; onPeel: () => void }) {
  return (
    <li className={`gt-pin ${fresh ? "gt-slap" : ""} ${peeled ? "is-peeled" : ""}`} style={{ left: `${at.left}%`, top: `${at.top}%`, ["--tilt" as string]: `${t.tilt || ((hash(t.k) % 80) / 10 - 4)}deg` }}>
      <button type="button" onClick={(e) => { e.stopPropagation(); onPeel(); }} className="gt-flap block text-left" aria-label={`Tape by ${t.name}: ${t.line}. Peel it up.`}>
        <TapeBody color={t.color} seed={hash(t.k)}>
          <p className="gt-line">{t.line}</p>
          <p className="gt-sign">— {t.name}{t.from ? `, ${t.from}` : ""}{t.own ? " (you)" : ""}</p>
        </TapeBody>
      </button>
      <span aria-hidden="true" className="gt-tag slate">{ROLLS[t.color]?.label || "Tape"} · {when(t.at) || "today"}</span>
    </li>
  );
}

function Dress({ d, at, peeled, onPeel }: { d: Dressing; at: { left: number; top: number }; peeled: boolean; onPeel: () => void }) {
  const style = { left: `${at.left}%`, top: `${at.top}%`, ["--tilt" as string]: `${d.tilt}deg` };
  let body: React.ReactNode;
  if (d.kind === "x") {
    body = (
      <div className="relative h-[var(--u7)] w-[var(--u7)]">
        <div className="absolute left-1/2 top-1/2 w-[var(--u85)] -translate-x-1/2 -translate-y-1/2 rotate-45"><TapeBody color={d.color} seed={11} size={0.5}><span className="block h-[0.9em]" /></TapeBody></div>
        <div className="absolute left-1/2 top-1/2 w-[var(--u85)] -translate-x-1/2 -translate-y-1/2 -rotate-45"><TapeBody color={d.color} seed={23} size={0.5}><span className="block h-[0.9em]" /></TapeBody></div>
      </div>
    );
  } else if (d.kind === "t") {
    body = (
      <div className="flex w-[var(--u13)] flex-col items-center">
        <TapeBody color={d.color} seed={31} size={0.5} className="w-full"><span className="block h-[1.4em]" /></TapeBody>
        <div className="-mt-[2px] w-[20%]" style={{ height: "var(--u8)", background: ROLLS[d.color].tape, clipPath: "polygon(0 0,100% 0,100% 96%,80% 100%,60% 96%,40% 100%,20% 96%,0 100%)" }} />
      </div>
    );
  } else {
    body = (
      <TapeBody color={d.color} seed={hash(d.k)} size={d.size}>
        <p className="gt-line whitespace-nowrap">{d.text}</p>
        {d.sub && <p className="gt-sign">{d.sub}</p>}
      </TapeBody>
    );
  }
  return (
    <li className={`gt-pin gt-dress ${peeled ? "is-peeled" : ""}`} style={style}>
      <button type="button" onClick={(e) => { e.stopPropagation(); onPeel(); }} className="gt-flap block" aria-label={`${d.text || "Tape mark"}: ${d.quip}`}>{body}</button>
      <span aria-hidden="true" className="gt-tag slate">{d.quip}</span>
    </li>
  );
}

type Draft = { cell: Cell; tilt: number; color: RollKey; seed: number };

export default function Wall({ initial }: { initial: Tape[] }) {
  const board = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLTextAreaElement>(null);
  const draftEl = useRef<HTMLDivElement>(null);
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
  const [mode, setMode] = useState<Mode>("land");
  const [peeled, setPeeled] = useState("");
  const [grew, setGrew] = useState(false);

  useEffect(() => {
    try { setMine(JSON.parse(localStorage.getItem("cdh-wall-mine") || "[]")); } catch { /* fine */ }
    const mq = window.matchMedia("(max-width: 767px)");
    const on = () => setMode(mq.matches ? "port" : "land");
    on(); mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  // Oldest first, so the first to sign keeps their spot.
  const tapes = useMemo(() => {
    const seen = new Set(initial.map((t) => `${t.name}|${t.line}`));
    const own = mine.filter((t) => !seen.has(`${t.name}|${t.line}`)).map((t) => ({ ...t, own: true }));
    return [FIRST_TAPE, ...initial, ...own].sort((x, y) => (x.at < y.at ? -1 : x.at > y.at ? 1 : 0));
  }, [initial, mine]);

  const grid = useMemo(() => layout(tapes, mode, draft?.cell), [tapes, mode, draft]);
  const g = GRID[mode];

  // Tap a tape: it peels up with a rip, shows its tag, then slaps back down.
  const peelTimer = useRef<ReturnType<typeof setTimeout>>();
  function peelUp(k: string) {
    if (draft) return;
    clearTimeout(peelTimer.current);
    ripSound(); setPeeled(k);
    peelTimer.current = setTimeout(() => { setPeeled(""); slapSound(); }, 1700);
  }

  function tearAt(cell: Cell) {
    const color = roll || "orange";
    ripSound(); setPeeled("");
    setDraft({ cell, tilt: Math.round((Math.random() * 8 - 4) * 10) / 10, color, seed: Math.floor(Math.random() * 1e9) });
    setMsg("");
    setTimeout(() => { draftEl.current?.scrollIntoView({ block: "center", behavior: "smooth" }); text.current?.focus({ preventScroll: true }); }, 380);
  }

  function onBoard(e: React.MouseEvent<HTMLDivElement>) {
    if (!roll || draft) return;
    if ((e.target as HTMLElement).closest("textarea,button,input,a")) return;
    const r = board.current!.getBoundingClientRect();
    const want: Cell = [Math.floor(((e.clientX - r.left) / r.width) * g.cols), Math.floor(((e.clientY - r.top) / r.height) * grid.rows)];
    tearAt(nearestFree(want, grid.taken, g.cols, grid.rows + 1));
  }

  function anywhere() { if (grid.free.length) tearAt(grid.free[Math.floor(Math.random() * grid.free.length)]); }

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
    // Saved in wall coordinates, so it lands in the same neighborhood on every screen.
    const [c, r] = draft.cell;
    const x = mode === "land" ? ((c + 0.5) / 6) * 100 : c === 0 ? 25 : 75;
    const y = mode === "land" ? ((r + 0.5) / 4) * 100 : ((r + 0.5) / 6) * 100;
    const before = grid.rows;
    try {
      const res = await fetch("/api/wall", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ line, name, from, color: draft.color, x, y, tilt: draft.tilt }) });
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
      const after = layout([...tapes, t], mode).rows;
      setGrew(after > before);
      setMsg(after > before ? "It's on the wall. The wall just grew to make room for the next one." : "It's on the wall. That's a wrap on your take.");
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

  // Holding a roll: if every open spot is off screen, bring the nearest one into view.
  useEffect(() => {
    if (!roll || draft) return;
    const spots = Array.from(document.querySelectorAll<HTMLElement>(".gt-open"));
    const vis = spots.some((el) => { const r = el.getBoundingClientRect(); return r.top > 70 && r.bottom < window.innerHeight - 160; });
    if (!vis && spots.length) {
      const near = spots.sort((a, b) => Math.abs(a.getBoundingClientRect().top - innerHeight / 2) - Math.abs(b.getBoundingClientRect().top - innerHeight / 2))[0];
      near.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [roll, draft]);

  const count = tapes.length;
  const hint = draft ? "Write on your tape, sign it, stick it." : roll ? `${ROLLS[roll].label} it is. Tap an open spot on the wall.` : "Grab a roll, or tap any tape.";

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

      <div className="mt-12 md:mt-16">
        <div
          ref={board}
          onClick={onBoard}
          onPointerMove={light}
          role="group"
          aria-label={`The CDH wall: ${count} tapes signed`}
          data-mode={mode}
          className={`wall-flat relative mx-auto w-full md:max-w-[1920px] ${roll && !draft ? "cursor-crosshair" : ""} ${thump ? "wall-thump" : ""} ${grew ? "wall-grew" : ""}`}
          style={{ paddingBottom: `${grid.rows * g.cellH * 100}%` }}
          key={`b${thump}`}
        >
          <ul className="absolute inset-0">
            {DRESSING.map((d) => {
              const cell = mode === "land" ? d.land : d.port;
              if (!cell) return null;
              return <Dress key={d.k} d={d} at={spot(cell, mode, grid.rows, hash(d.k))} peeled={peeled === d.k} onPeel={() => peelUp(d.k)} />;
            })}
            {tapes.map((t) => {
              const cell = grid.pos.get(t.k); if (!cell) return null;
              return <Strip key={t.k} t={t} fresh={t.k === fresh} at={spot(cell, mode, grid.rows, hash(t.k))} peeled={peeled === t.k} onPeel={() => peelUp(t.k)} />;
            })}
            {roll && !draft && grid.free.map((cell) => {
              const at = spot(cell, mode, grid.rows, 7);
              return (
                <li key={ck(cell[0], cell[1])} className="gt-pin gt-open" style={{ left: `${at.left}%`, top: `${at.top}%`, ["--tilt" as string]: "0deg" }}>
                  <button type="button" onClick={(e) => { e.stopPropagation(); tearAt(cell); }} className="gt-open-btn" style={{ ["--roll" as string]: ROLLS[roll].tape }}>
                    <span className="slate">Open spot</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {draft && (() => {
            const at = spot(draft.cell, mode, grid.rows, draft.seed);
            return (
              <div ref={draftEl} className="gt-pin gt-draft z-20" style={{ left: `${at.left}%`, top: `${at.top}%`, ["--tilt" as string]: `${draft.tilt}deg` }}>
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
            );
          })()}
        </div>
      </div>

      {/* The dock: tape rack, then the signing tools */}
      <div className="gutter sticky bottom-3 z-30 mt-6 md:bottom-5">
        <div className="mx-auto max-w-[1100px] border border-line bg-raised/95 p-4 backdrop-blur-sm md:p-5">
          <p aria-live="polite" className="slate text-[12px] text-muted">{msg || hint}</p>
          {!draft ? (
            <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-4">
              <div className="flex items-end gap-[7px] md:gap-3" role="radiogroup" aria-label="Tape rolls">
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
