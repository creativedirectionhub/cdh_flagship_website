"use client";

import { useEffect, useRef, useState } from "react";
import { films } from "./ads";

// One wide player with three takes. Plays muted when it scrolls into view.
export default function FilmReel() {
  const [i, setI] = useState(0);
  const video = useRef<HTMLVideoElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!box.current) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    io.observe(box.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (inView && !reduce) v.play().catch(() => {});
    else v.pause();
  }, [inView, i]);

  const f = films[i];
  return (
    <div ref={box} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
      <div className="relative aspect-video overflow-hidden rounded-md border border-line bg-surface">
        <video
          key={f.src}
          ref={video}
          src={f.src}
          poster={f.poster}
          muted
          playsInline
          preload="metadata"
          aria-label={f.alt}
          onEnded={() => setI((n) => (n + 1) % films.length)}
          className="h-full w-full object-cover"
        />
      </div>
      <ol className="grid gap-0 border-t border-line">
        {films.map((x, n) => (
          <li key={x.src}>
            <button
              type="button"
              onClick={() => setI(n)}
              aria-current={n === i ? "true" : undefined}
              className="group grid w-full grid-cols-[44px_minmax(0,1fr)] items-baseline gap-3 border-b border-line py-4 text-left"
            >
              <span className={`slate ${n === i ? "text-gaffer" : "text-muted"}`}>{String(n + 1).padStart(2, "0")}</span>
              <span className="min-w-0">
                <span className={`block text-[22px] font-extrabold tracking-[-0.02em] ${n === i ? "text-ink" : "text-muted group-hover:text-ink"}`}>{x.title}</span>
                <span className="slate block text-[11px] text-muted">{x.label}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
