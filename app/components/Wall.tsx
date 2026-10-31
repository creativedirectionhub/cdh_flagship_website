"use client";

import { useEffect, useMemo, useState } from "react";
import { clapSound } from "./clap";
import { PROMPTS, FIRST_TAPE, type Tape } from "../content/wall-data";

// The wall. Every set has a wall the crew signs on wrap day; this is ours.
// Visitors answer a prompt, sign a strip of gaffer tape and stick it up. "Another take" deals a new prompt.

const hash = (s: string) => { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return Math.abs(h); };
const TAPES = ["tape-orange", "tape-orange", "tape-bone", "tape-orange", "tape-black"] as const;

function Strip({ t, fresh }: { t: Tape; fresh?: boolean }) {
  const h = hash(t.k + t.name);
  const kind = TAPES[h % TAPES.length];
  const tilt = Number.isFinite(t.tilt) && t.tilt !== 0 ? t.tilt : ((h % 70) / 10 - 3.5);
  return (
    <li className={`wall-strip ${kind} ${fresh ? "wall-slap" : ""}`} style={{ ["--tilt" as string]: `${tilt}deg`, marginTop: `${(h % 5) * 6}px` }}>
      {t.prompt && <p className="slate text-[10px] leading-snug opacity-60">{t.prompt}</p>}
      <p className="mt-1 text-[clamp(19px,1.7vw,24px)] font-black leading-[1.08] tracking-[-0.02em]">{t.line}</p>
      <p className="slate mt-2 text-[11px] opacity-80">{t.name}{t.from ? ` · ${t.from}` : ""}{t.own ? " · You" : ""}</p>
    </li>
  );
}

export default function Wall({ initial }: { initial: Tape[] }) {
  const [p, setP] = useState(0);
  const [take, setTake] = useState(1);
  const [mine, setMine] = useState<Tape[]>([]);
  const [fresh, setFresh] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  const [clap, setClap] = useState(0);

  // Your own tapes stay on your screen, even before the wall refreshes for everyone.
  useEffect(() => {
    try { setMine(JSON.parse(localStorage.getItem("cdh-wall-mine") || "[]")); } catch { /* fine */ }
    setP(Math.floor(Math.random() * PROMPTS.length));
  }, []);

  const tapes = useMemo(() => {
    const seen = new Set(initial.map((t) => `${t.name}|${t.line}`));
    const own = mine.filter((t) => !seen.has(`${t.name}|${t.line}`)).map((t) => ({ ...t, own: true }));
    return [...own, ...initial, FIRST_TAPE];
  }, [initial, mine]);

  const another = () => { clapSound(); setP((x) => (x + 1) % PROMPTS.length); setTake((t) => t + 1); setClap((c) => c + 1); };

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = { name: f.get("name"), line: f.get("line"), from: f.get("from"), company: f.get("company"), prompt: PROMPTS[p] };
    setState("sending"); setMsg("");
    try {
      const res = await fetch("/api/wall", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.tape) {
        setState("error");
        setMsg(res.status === 422 ? "Keep it clean and link-free, and try again." : res.status === 429 ? "That's a lot of tape. Give it a few minutes." : res.status === 400 ? "Add your name and your answer." : "The wall is down for a minute. Try again shortly.");
        return;
      }
      const t: Tape = { ...data.tape, k: `me-${Date.now()}` };
      const next = [t, ...mine].slice(0, 6);
      setMine(next);
      try { localStorage.setItem("cdh-wall-mine", JSON.stringify(next)); } catch { /* fine */ }
      setFresh(t.k); clapSound(); setState("done");
      (e.target as HTMLFormElement).reset();
    } catch {
      setState("error"); setMsg("The wall is down for a minute. Try again shortly.");
    }
  }

  return (
    <section id="wall" className="gutter border-t border-line py-24 md:py-32" aria-labelledby="wall-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="slate text-gaffer">The wall</p>
          <h2 id="wall-title" className="mt-5 text-[clamp(48px,7vw,112px)] font-black leading-[0.9] tracking-tightest">Leave your{" "}<br /><span className="tape-word"><i aria-hidden="true" className="tape-edge" /><b>mark.</b></span></h2>
          <p className="mt-6 max-w-[42ch] text-[18px] leading-[1.6] text-body">Every set has a wall the crew signs on wrap day. This one's ours. Answer the prompt, sign a strip of tape, stick it up. Willie reads every one.</p>

          <div className="mt-10 border border-line bg-raised p-6 md:p-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="slate text-[12px] text-muted">Take {String(take).padStart(2, "0")} · Prompt</p>
                <p aria-live="polite" className="mt-3 text-[clamp(24px,2.4vw,34px)] font-black leading-[1.05] tracking-[-0.03em]">{PROMPTS[p]}</p>
              </div>
              <button type="button" onClick={another} className="group flex shrink-0 flex-col items-center gap-2 pt-1" aria-label="Another take: new prompt">
                <span key={clap} className={`mini-slate ${clap ? "mini-go" : ""}`} aria-hidden="true"><span className="slate-stripes mini-stick" /><span className="mini-board" /></span>
                <span className="slate text-[11px] group-hover:text-gaffer">Another take</span>
              </button>
            </div>

            <form onSubmit={submit} className="mt-8 grid gap-4">
              <label className="grid gap-2">
                <span className="slate text-[12px] text-muted">Your answer</span>
                <input id="wall-answer" name="line" required maxLength={70} autoComplete="off" placeholder="Write it like you'd say it" className="wall-input text-[20px] font-extrabold" />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="slate text-[12px] text-muted">Name or brand</span>
                  <input name="name" required maxLength={28} autoComplete="nickname" placeholder="How you sign it" className="wall-input" />
                </label>
                <label className="grid gap-2">
                  <span className="slate text-[12px] text-muted">From (optional)</span>
                  <input name="from" maxLength={28} autoComplete="off" placeholder="City or crew" className="wall-input" />
                </label>
              </div>
              <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" />
              <div className="mt-2 flex flex-wrap items-center gap-5">
                <button type="submit" disabled={state === "sending"} className="btn-primary">{state === "sending" ? "Taping…" : "Stick it up"}</button>
                <p role="status" className="text-[15px] text-body">{state === "done" ? "It's on the wall. That's a wrap on your take." : msg}</p>
              </div>
              <p className="text-[13px] leading-[1.5] text-muted">Your tape shows publicly on this wall. A first name or nickname is fine. No links.</p>
            </form>
          </div>
        </div>

        <div className="wall-board relative min-h-[300px] md:min-h-[520px] overflow-hidden p-5 sm:p-8 md:p-10">
          <p className="slate relative text-[11px] text-muted">{tapes.length} {tapes.length === 1 ? "mark" : "marks"} on the wall</p>
          <ul className="relative mt-6 flex flex-wrap items-start gap-x-4 gap-y-5">
            {tapes.map((t) => <Strip key={t.k} t={t} fresh={t.k === fresh} />)}
            <li className="wall-ghost" style={{ ["--tilt" as string]: "1.5deg" }}>
              <a href="#wall-answer" onClick={(e) => { e.preventDefault(); document.getElementById("wall-answer")?.focus(); }} className="block">
                <p className="slate text-[10px] leading-snug">Open spot</p>
                <p className="mt-1 text-[clamp(19px,1.7vw,24px)] font-black leading-[1.08] tracking-[-0.02em]">Your mark goes here.</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
