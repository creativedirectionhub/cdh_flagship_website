"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// The opening: every visit is a take. The slate drops in with your take number, claps, and the reel cuts in
// on a director's monitor. "Another take" claps again and cuts to the next shot.
// The intro runs in CSS, so the page is complete without JavaScript; reduced motion skips straight to the reel.

// Start time of each shot in the reel (seconds), matching the cut in kie/reel/reel1080.py.
const SHOTS = [0, 2.4, 4.6, 6.6, 8.6, 10.4, 12.2, 13.7, 15.2];
const LINES = [
  "Rolling.",
  "Again, with feeling.",
  "Tighter. Faster. Better.",
  "Hold that look.",
  "That's the one. Print it.",
  "One more for safety.",
  "You're a natural. Book the call.",
];
const FPS = 24;

function pad(n: number) { return String(n).padStart(2, "0"); }

function clapSound() {
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AC();
    const len = Math.floor(ctx.sampleRate * 0.09);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 6);
    const src = ctx.createBufferSource(); src.buffer = buf;
    const bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 2200; bp.Q.value = 0.7;
    const g = ctx.createGain(); g.gain.value = 0.35;
    src.connect(bp).connect(g).connect(ctx.destination);
    const o = ctx.createOscillator(); const og = ctx.createGain();
    o.frequency.setValueAtTime(160, ctx.currentTime); o.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.08);
    og.gain.setValueAtTime(0.25, ctx.currentTime); og.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    o.connect(og).connect(ctx.destination);
    src.start(); o.start(); o.stop(ctx.currentTime + 0.12);
    setTimeout(() => ctx.close(), 400);
  } catch { /* no audio, no problem */ }
}

function Stripes({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`slate-stripes ${className}`} />;
}

export default function SlateOpener() {
  const video = useRef<HTMLVideoElement>(null);
  const tc = useRef<HTMLSpanElement>(null);
  const [take, setTake] = useState(1);
  const [line, setLine] = useState(LINES[0]);
  const [shot, setShot] = useState(0);
  const [cut, setCut] = useState(0); // bumps to replay the flash and the mini clap
  const [today, setToday] = useState("");

  // Visits become take numbers.
  useEffect(() => {
    let n = 1;
    try {
      n = (parseInt(localStorage.getItem("cdh-takes") || "0", 10) || 0) + 1;
      localStorage.setItem("cdh-takes", String(n));
    } catch { /* private window: always take 1 */ }
    setTake(n);
    if (n > 1) setLine(`Back on set. ${LINES[Math.min(n - 1, LINES.length - 1)]}`);
    const d = new Date();
    setToday(`${pad(d.getMonth() + 1)}.${pad(d.getDate())}.${String(d.getFullYear()).slice(2)}`);
  }, []);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const sm = window.matchMedia("(max-width: 767px) and (orientation: portrait)").matches;
    v.src = sm ? "/media/reel-sm.mp4" : "/media/reel.mp4";
    v.play().catch(() => {});
  }, []);

  // Running timecode on the monitor.
  useEffect(() => {
    const t0 = performance.now();
    let raf = 0;
    const tick = () => {
      const s = (performance.now() - t0) / 1000;
      if (tc.current) tc.current.textContent = `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(Math.floor(s) % 60)}:${pad(Math.floor((s % 1) * FPS))}`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const another = () => {
    clapSound();
    const next = (shot + 1) % SHOTS.length;
    setShot(next);
    setTake((t) => t + 1);
    setLine(take + 1 > 8 ? `Take ${take + 1}. The crew is getting hungry.` : LINES[take % LINES.length]);
    setCut((c) => c + 1);
    const v = video.current;
    if (v) { v.currentTime = SHOTS[next] + 0.35; v.play().catch(() => {}); }
  };

  return (
    <section aria-label="Reel" className="relative h-[calc(100svh-68px)] min-h-[560px] overflow-hidden bg-ground">
      <video ref={video} muted playsInline loop autoPlay preload="metadata" poster="/media/reel-poster.webp" aria-label="Reel: Hattiesburg Black Sox campaign, talent portraits, travel photography, then AI concept films including a pop-up rush for Mama Lou's hot sauce" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#121110]/90 via-[#121110]/15 to-[#121110]/45" />

      {/* Monitor: frame lines, REC, take, timecode */}
      <div className="op-ui pointer-events-none absolute inset-4 md:inset-8" aria-hidden="true">
        <i className="frame-corner left-0 top-0 border-l-2 border-t-2" />
        <i className="frame-corner right-0 top-0 border-r-2 border-t-2" />
        <i className="frame-corner bottom-0 left-0 border-b-2 border-l-2" />
        <i className="frame-corner bottom-0 right-0 border-b-2 border-r-2" />
      </div>
      <div className="op-ui gutter absolute inset-x-0 top-7 md:top-12">
        <div className="mx-auto flex max-w-[1440px] items-start justify-between gap-6 text-[#efe9df]">
          <div>
            <p className="slate flex items-center gap-2 text-[12px] md:text-[13px]"><span aria-hidden="true" className="rec-dot" />Rec · Take {pad(take)}</p>
            <p aria-live="polite" className="mt-2 max-w-[26ch] text-[15px] font-extrabold leading-snug md:text-[18px]">“{line}”</p>
          </div>
          <p className="slate text-[12px] tabular-nums md:text-[13px]" aria-hidden="true"><span ref={tc}>00:00:00:00</span></p>
        </div>
      </div>

      {/* Headline lands on its mark */}
      <div className="gutter absolute inset-x-0 bottom-0 pb-10 md:pb-16">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-end justify-between gap-8">
          <h1 className="text-[clamp(52px,8.6vw,148px)] font-black leading-[0.88] tracking-tightest text-[#efe9df]">
            <span className="op-ui slate mb-5 block text-[12px] leading-normal tracking-[0.14em] text-[#efe9df]/80 md:text-[13px]">Creative Direction Hub · Creative direction and AI art direction agency</span>
            <span className="op-line block">We put brands</span>{" "}
            <span className="op-line op-line-2 block">on their <span className="tape-word ml-[0.1em]"><i aria-hidden="true" className="tape-edge op-tape" /><b className="op-ink">mark.</b></span></span>
          </h1>
          <div className="op-ui flex flex-col items-start gap-4 pb-2">
            <button type="button" onClick={another} className="group flex items-center gap-3 text-left text-[#efe9df]" aria-label={`Call take ${take + 1}`}>
              <span key={cut} className={`mini-slate ${cut ? "mini-go" : ""}`} aria-hidden="true"><Stripes className="mini-stick" /><span className="mini-board" /></span>
              <span className="slate border-b-2 border-gaffer pb-1 pt-3 group-hover:text-gaffer">Another take</span>
            </button>
            <Link href="/about" className="slate inline-block border-b-2 border-[#efe9df]/30 pb-1 pt-3 text-[#efe9df] hover:border-gaffer hover:text-gaffer">About us</Link>
            <span className="slate text-[12px] text-[#efe9df]/70">Reel includes AI concepts, labeled on each piece</span>
          </div>
        </div>
      </div>

      {cut > 0 && <div key={`f${cut}`} aria-hidden="true" className="cut-flash pointer-events-none absolute inset-0" />}

      {/* The intro: black stage, the slate drops, claps, cut. Pure CSS. */}
      <div aria-hidden="true" className="op-cover pointer-events-none absolute inset-0 grid place-items-center bg-ground">
        <div className="op-slate w-[min(560px,86vw)]">
          <div className="op-shake">
            <Stripes className="op-stick h-[clamp(34px,5vw,52px)]" />
            <Stripes className="slate-stripes-rev mt-[3px] h-[clamp(30px,4.4vw,46px)]" />
            <div className="mt-[3px] grid grid-cols-3 border-2 border-[#efe9df]/80 bg-[#1b1a18] text-[#efe9df]">
              <div className="col-span-3 border-b-2 border-[#efe9df]/30 p-4"><p className="slate text-[11px] text-[#efe9df]/60">Prod.</p><p className="mt-1 text-[clamp(22px,3.4vw,34px)] font-black leading-none tracking-[-0.03em]">Creative Direction Hub</p></div>
              <div className="border-r-2 border-[#efe9df]/30 p-4"><p className="slate text-[11px] text-[#efe9df]/60">Roll</p><p className="mt-1 text-[clamp(28px,4.6vw,48px)] font-black leading-none">A</p></div>
              <div className="border-r-2 border-[#efe9df]/30 p-4"><p className="slate text-[11px] text-[#efe9df]/60">Scene</p><p className="mt-1 text-[clamp(28px,4.6vw,48px)] font-black leading-none">01</p></div>
              <div className="p-4"><p className="slate text-[11px] text-[#efe9df]/60">Take</p><p className="mt-1 text-[clamp(28px,4.6vw,48px)] font-black leading-none text-gaffer">{pad(take)}</p></div>
              <div className="col-span-2 border-r-2 border-t-2 border-[#efe9df]/30 p-4"><p className="slate text-[11px] text-[#efe9df]/60">Director</p><p className="mt-1 text-[clamp(16px,2.2vw,22px)] font-black leading-none">Willie Bernoudy</p></div>
              <div className="border-t-2 border-[#efe9df]/30 p-4"><p className="slate text-[11px] text-[#efe9df]/60">Date</p><p className="mt-1 text-[clamp(16px,2.2vw,22px)] font-black leading-none tabular-nums">{today || "—"}</p></div>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="op-flash pointer-events-none absolute inset-0 bg-[#efe9df]" />
    </section>
  );
}
