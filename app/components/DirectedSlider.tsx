"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

export type Pair = { id: string; lane: string; title: string; before: string; after: string; beforeAlt: string; afterAlt: string; notes: string[] };

// Same subject, two takes. Drag the line (or use the arrow keys) to see what direction changes.
export default function DirectedSlider({ pairs }: { pairs: Pair[] }) {
  const [i, setI] = useState(0);
  const [pos, setPos] = useState(50);
  const [moved, setMoved] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const p = pairs[i];

  const at = useCallback((clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
    setMoved(true);
  }, []);

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

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-16">
      <div className="min-w-0">
        <div
          ref={box}
          onPointerDown={down}
          onPointerMove={move}
          className="relative mx-auto aspect-[4/5] w-full max-w-[640px] cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-sm bg-surface"
        >
          <Image src={p.after} alt={p.afterAlt} fill sizes="(min-width: 1024px) 44vw, 92vw" className="object-cover" draggable={false} />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <Image src={p.before} alt={p.beforeAlt} fill sizes="(min-width: 1024px) 44vw, 92vw" className="object-cover" draggable={false} />
          </div>
          <span className="slate absolute left-4 top-4 rounded-tape bg-[#121110]/85 px-2 py-1 text-[12px] text-[#efe9df]">Undirected</span>
          <span className="slate absolute right-4 top-4 rounded-tape bg-gaffer px-2 py-1 text-[12px] text-on-gaffer">Directed</span>

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
          {!moved && <span className="slate pointer-events-none absolute bottom-4 right-4 rounded-tape bg-[#121110]/85 px-2 py-1 text-[12px] text-[#efe9df]">Drag the line</span>}
        </div>
      </div>

      <div className="min-w-0">
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
        <h3 className="mt-8 text-[clamp(28px,3vw,44px)] font-black leading-[0.95] tracking-tighter">{p.title}</h3>
        <p className="slate mt-6 text-[12px] text-muted">What the director changed</p>
        <ol className="mt-3 grid border-t border-line">
          {p.notes.map((t, n) => (
            <li key={t} className="flex gap-4 border-b border-line py-4 text-[16px] leading-[1.5] text-body">
              <span className="slate shrink-0 pt-[3px] text-[12px] text-gaffer">0{n + 1}</span>{t}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
