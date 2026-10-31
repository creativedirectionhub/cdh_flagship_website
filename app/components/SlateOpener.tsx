"use client";

import { useEffect, useRef, useState } from "react";

// The opening: every visit is a take. The slate drops in with your take number, claps, and the reel cuts in
// on a director's monitor. (Another take now lives on the wall, further down the home page.)
// The intro runs in CSS, so the page is complete without JavaScript; reduced motion skips straight to the reel.

const FPS = 24;

function pad(n: number) { return String(n).padStart(2, "0"); }

function Stripes({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`slate-stripes ${className}`} />;
}

export default function SlateOpener() {
  const video = useRef<HTMLVideoElement>(null);
  const tc = useRef<HTMLSpanElement>(null);
  const [take, setTake] = useState(1);
  const [today, setToday] = useState("");

  // Visits become take numbers.
  useEffect(() => {
    let n = 1;
    try {
      n = (parseInt(localStorage.getItem("cdh-takes") || "0", 10) || 0) + 1;
      localStorage.setItem("cdh-takes", String(n));
    } catch { /* private window: always take 1 */ }
    setTake(n);
    const d = new Date();
    setToday(`${pad(d.getMonth() + 1)}.${pad(d.getDate())}.${String(d.getFullYear()).slice(2)}`);
  }, []);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const sm = window.matchMedia("(max-width: 767px) and (orientation: portrait)").matches;
    v.src = sm ? "/media/heist-sm.mp4" : "/media/heist.mp4";
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


  return (
    <section aria-label="Reel" className="relative h-[calc(100svh-68px)] min-h-[560px] overflow-hidden bg-ground">
      <video ref={video} muted playsInline loop autoPlay preload="metadata" poster="/media/heist-poster.webp" aria-label="The Heist, a CDH concept spot with AI performers: a Mississippi baker whose post gets three likes calls in a creative crew, and by morning there is a line around the block" className="absolute inset-0 h-full w-full object-cover" />
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
          <p className="slate flex items-center gap-2 text-[12px] md:text-[13px]"><span aria-hidden="true" className="rec-dot" />Rec · Take {pad(take)}</p>
          <p className="slate text-[12px] tabular-nums md:text-[13px]" aria-hidden="true"><span ref={tc}>00:00:00:00</span></p>
        </div>
      </div>

      {/* Headline lands on its mark */}
      <div className="gutter absolute inset-x-0 bottom-0 pb-10 md:pb-16">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-end justify-between gap-8">
          <h1 className="text-[clamp(52px,8.6vw,148px)] font-black leading-[0.88] tracking-tightest text-[#efe9df]">
            <span className="sr-only">Creative Direction Hub, a media company specializing in creative direction and AI art direction. </span>
            <span className="op-line block">We put brands</span>{" "}
            <span className="op-line op-line-2 block">on their <span className="tape-word ml-[0.1em]"><i aria-hidden="true" className="tape-edge op-tape" /><b className="op-ink">mark.</b></span></span>
          </h1>
          <span className="op-ui slate pb-2 text-[11px] text-[#efe9df]/70">Creative Direction Hub</span>
        </div>
      </div>

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
