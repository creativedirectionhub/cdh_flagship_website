"use client";

import Image from "next/image";
import { preload } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { reel } from "./ads";

const STILL_MS = 3000;

export default function Hero() {
  preload("/media/golf-lifestyle.webp", { as: "image", fetchPriority: "high" });
    const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduce, setReduce] = useState(false);
  const total = reel.length;
  const next = () => setI((n) => (n + 1) % total);
  const prev = () => setI((n) => (n - 1 + total) % total);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Play only the active take. Videos advance when they end, stills after 3 seconds.
  useEffect(() => {
    videos.current.forEach((v, n) => {
      if (!v) return;
      if (n === i && !paused && !reduce) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
    if (paused || reduce || reel[i].kind === "video") return;
    const t = setTimeout(next, STILL_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, paused, reduce]);

  const item = reel[i];
  const take = String(i + 1).padStart(2, "0");

  return (
    <section className="gutter relative overflow-hidden pb-20 pt-10 md:pb-28 md:pt-16">
      <div className="mx-auto grid max-w-[1440px] items-center gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-10">
        <div className="min-w-0">
          <p data-fade className="slate text-gaffer">Your brand, directed.</p>
          <h1 className="mt-6 font-black leading-[0.9] tracking-tightest text-[clamp(54px,10vw,144px)]">
            <span className="block overflow-hidden pb-[0.04em]"><span data-line className="block">Ads people</span></span>
            <span className="block overflow-hidden pb-[0.1em]">
              <span data-line className="block">
                actually{" "}
                <span className="relative inline-block">
                  <span data-tape-word aria-hidden="true" className="tape-edge tape-slap absolute -left-[0.1em] -right-[0.14em] bottom-[0.02em] top-[0.14em] block bg-gaffer" />
                  <span className="relative text-on-gaffer">watch.</span>
                </span>
              </span>
            </span>
          </h1>
          <p data-fade className="mt-8 max-w-[36ch] text-[19px] leading-[1.55] text-[#cfc8bc] md:text-[21px]">
            Every ad has a director. We direct, make and run ads on Meta and TikTok for online consumer brands, every week.
          </p>
          <div data-fade className="mt-10 flex flex-wrap gap-4">
            <a href="#ad-check" className="btn-primary">Get a Free Ad Check</a>
            <a href="#work" className="btn-secondary">See the work</a>
          </div>
          <a data-fade href="#about" className="group mt-10 inline-flex items-center gap-4">
            <Image src="/media/about-willie.webp" alt="" width={56} height={56} className="h-14 w-14 rounded-full border border-line object-cover object-top grayscale" />
            <span>
              <span className="slate block text-[11px] text-muted">Every ad directed by</span>
              <span className="block text-[17px] font-extrabold group-hover:text-gaffer">Willie Bernoudy, founder and creative director</span>
            </span>
          </a>
        </div>

        <div data-reel className="rise flex min-w-0 flex-col items-center gap-5 lg:items-end">
          <div className="relative w-[min(340px,76vw)]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <div aria-hidden="true" className="absolute inset-0 -translate-x-5 translate-y-5 -rotate-3 rounded-phone border border-line bg-surface" />
            <div className="relative aspect-[9/16] overflow-hidden rounded-phone border border-line bg-surface">
              {reel.map((r, n) =>
                r.kind === "video" ? (
                  <video
                    key={r.src}
                    ref={(el) => { videos.current[n] = el; }}
                    src={r.src}
                    poster={r.poster}
                    muted
                    playsInline
                    preload="metadata"
                    aria-label={r.alt}
                    onEnded={() => n === i && next()}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${n === i ? "opacity-100" : "opacity-0"}`}
                  />
                ) : (
                  <Image
                    key={r.src}
                    src={r.src}
                    alt={r.alt}
                    fill
                    sizes="340px"
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${n === i ? "opacity-100" : "opacity-0"}`}
                  />
                ),
              )}
              <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4">
                <span className="slate rounded-tape bg-ground/80 px-2 py-1 text-[11px] text-ink">Take {take}</span>
                <span className="h-2.5 w-2.5 rounded-full bg-gaffer" aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className="flex w-[min(340px,76vw)] items-center justify-between gap-3">
            <p className="min-w-0" aria-live="polite">
              <span className="block text-[15px] font-extrabold">{item.title}</span>
              <span className="slate block text-[11px] text-muted">{item.label}</span>
            </p>
            <div className="flex shrink-0 gap-2">
              <button type="button" aria-label="Previous take" onClick={prev} className="grid h-11 w-11 place-items-center rounded-sm border border-line hover:border-muted">
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3 5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>
              </button>
              <button type="button" aria-label="Next take" onClick={next} className="grid h-11 w-11 place-items-center rounded-sm border border-line hover:border-muted">
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
