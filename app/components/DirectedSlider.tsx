"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type Pair = {
  id: string; lane: string; title: string; before: string; after: string; beforeAlt: string; afterAlt: string; notes: string[];
  /** Two takes of the same scene on film. When set, both play in step and the line wipes between them. */
  beforeVideo?: string; afterVideo?: string; beforeTag?: string; afterTag?: string;
};

// Same subject, two takes. Drag the line (or use the arrow keys) to see what direction changes.
// The first pair is moving film: both takes run together, so the wipe cuts between two live shots.
export default function DirectedSlider({ pairs }: { pairs: Pair[] }) {
  const [i, setI] = useState(0);
  const [pos, setPos] = useState(50);
  const [moved, setMoved] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const vBefore = useRef<HTMLVideoElement>(null);
  const vAfter = useRef<HTMLVideoElement>(null);
  const p = pairs[i];
  const film = Boolean(p.beforeVideo && p.afterVideo);

  const at = useCallback((clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
    setMoved(true);
  }, []);

  // Roll both takes only while the monitor is on screen, and keep them on the same frame.
  useEffect(() => {
    if (!film) return;
    const a = vBefore.current, b = vAfter.current, el = box.current;
    if (!a || !b || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { b.currentTime = a.currentTime; a.play().catch(() => {}); b.play().catch(() => {}); }
      else { a.pause(); b.pause(); }
    }, { threshold: 0.25 });
    io.observe(el);
    const sync = () => { if (Math.abs(a.currentTime - b.currentTime) > 0.08) b.currentTime = a.currentTime; };
    const t = window.setInterval(sync, 1000);
    return () => { io.disconnect(); window.clearInterval(t); };
  }, [film, i]);

  function down(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    at(e.clientX);
  }
  function move(e: React.PointerEvent<HTMLDivElement>) {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) at(e.clientX);
  }
  function key(e: React.KeyboardEvent) {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === "ArrowLeft") { setPos((v) => Math.max(0, v - step)); setMoved(true); e.preventDefault(); }
    if (e.key === "ArrowRight") { setPos((v) => Math.min(100, v + step)); setMoved(true); e.preventDefault(); }
    if (e.key === "Home") { setPos(0); e.preventDefault(); }
    if (e.key === "End") { setPos(100); e.preventDefault(); }
  }

  const tag = "slate absolute top-4 rounded-tape px-2 py-1 text-[12px]";
  const fill = "absolute inset-0 h-full w-full object-cover";

  const monitor = (
    <div
      ref={box}
      onPointerDown={down}
      onPointerMove={move}
      className={`relative w-full cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-sm bg-surface ${film ? "aspect-[4/3] sm:aspect-video" : "mx-auto aspect-[4/5] max-w-[640px]"}`}
    >
      {film ? (
        <video key={p.afterVideo} ref={vAfter} src={p.afterVideo} poster={p.after} muted loop playsInline preload="metadata" aria-label={p.afterAlt} className={fill} />
      ) : (
        <Image src={p.after} alt={p.afterAlt} fill sizes="(min-width: 1024px) 44vw, 92vw" className="object-cover" draggable={false} />
      )}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {film ? (
          <video key={p.beforeVideo} ref={vBefore} src={p.beforeVideo} poster={p.before} muted loop playsInline preload="metadata" aria-label={p.beforeAlt} className={fill} />
        ) : (
          <Image src={p.before} alt={p.beforeAlt} fill sizes="(min-width: 1024px) 44vw, 92vw" className="object-cover" draggable={false} />
        )}
      </div>
      {film && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-3 md:inset-5">
          <i className="frame-corner left-0 top-0 border-l-2 border-t-2" />
          <i className="frame-corner right-0 top-0 border-r-2 border-t-2" />
          <i className="frame-corner bottom-0 left-0 border-b-2 border-l-2" />
          <i className="frame-corner bottom-0 right-0 border-b-2 border-r-2" />
        </div>
      )}
      <span className={`${tag} left-4 bg-[#121110]/85 text-[#efe9df] ${film ? "md:left-8 md:top-8" : ""}`}>Undirected{p.beforeTag && <span className="max-sm:hidden"> · {p.beforeTag}</span>}</span>
      <span className={`${tag} right-4 bg-gaffer text-on-gaffer ${film ? "md:right-8 md:top-8" : ""}`}>Directed{p.afterTag && <span className="max-sm:hidden"> · {p.afterTag}</span>}</span>

      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
        <span className="tape-edge absolute inset-y-0 -left-[5px] w-[10px] bg-gaffer shadow-[0_0_24px_rgba(0,0,0,.5)]" />
      </div>
      <div
        role="slider"
        tabIndex={0}
        aria-label={`Undirected to directed: ${p.title}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`${Math.round(100 - pos)}% directed shown`}
        onKeyDown={key}
        className="absolute top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gaffer text-on-gaffer shadow-[0_10px_30px_rgba(0,0,0,.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#efe9df]"
        style={{ left: `${pos}%` }}
      >
        <svg width="26" height="14" viewBox="0 0 26 14" fill="currentColor" aria-hidden="true"><path d="M0 7l7-7v14zM26 7l-7-7v14z" /></svg>
      </div>
      {!moved && <span className={`slate pointer-events-none absolute bottom-4 right-4 rounded-tape bg-[#121110]/85 px-2 py-1 text-[12px] text-[#efe9df] ${film ? "md:bottom-8 md:right-8" : ""}`}>Drag the line</span>}
    </div>
  );

  const tabs = (
    <div role="tablist" aria-label="Choose a subject" className="flex flex-wrap gap-2">
      {pairs.map((x, n) => (
        <button
          key={x.id}
          role="tab"
          type="button"
          aria-selected={n === i}
          onClick={() => { setI(n); setPos(50); setMoved(false); }}
          className={`slate min-h-[44px] rounded-sm border px-4 text-[12px] transition-colors ${n === i ? "border-gaffer bg-gaffer text-on-gaffer" : "border-line text-body hover:border-muted"}`}
        >
          {x.lane}
        </button>
      ))}
    </div>
  );

  const notes = (cols: boolean) => (
    <>
      <p className="slate text-[12px] text-muted">What the director changed</p>
      <ol className={`mt-3 grid border-t border-line ${cols ? "md:grid-cols-3 md:border-t-0" : ""}`}>
        {p.notes.map((t, n) => (
          <li key={t} className={`flex gap-4 border-b border-line py-4 text-[16px] leading-[1.5] text-body ${cols ? "md:border-b-0 md:border-t md:py-5 md:pr-8" : ""}`}>
            <span className="slate shrink-0 pt-[3px] text-[12px] text-gaffer">0{n + 1}</span>{t}
          </li>
        ))}
      </ol>
    </>
  );

  if (film) {
    return (
      <div className="grid gap-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h3 className="text-[clamp(28px,3vw,44px)] font-black leading-[0.95] tracking-tighter">{p.title}</h3>
          {tabs}
        </div>
        {monitor}
        <div>{notes(true)}</div>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-16">
      <div className="min-w-0">{monitor}</div>
      <div className="min-w-0">
        {tabs}
        <h3 className="mt-8 text-[clamp(28px,3vw,44px)] font-black leading-[0.95] tracking-tighter">{p.title}</h3>
        <div className="mt-6">{notes(false)}</div>
      </div>
    </div>
  );
}
