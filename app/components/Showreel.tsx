"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// The reel: plays muted on a loop while it's on screen, with a sound toggle.
// Nothing downloads until it's close to the viewport. Reduced motion shows the poster and a play button instead.
export default function Showreel() {
  const box = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [muted, setMuted] = useState(true);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setStill(reduce);
    const sm = window.matchMedia("(max-width: 767px)").matches;
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSrc((s) => s ?? (sm ? "/media/showreel-sm.mp4" : "/media/showreel.mp4"));
        if (!reduce) vid.current?.play().catch(() => {});
      } else vid.current?.pause();
    }, { rootMargin: "200px 0px", threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function sound() {
    const v = vid.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) { v.currentTime = 0; v.play().catch(() => {}); }
  }
  function playStill() {
    setStill(false);
    requestAnimationFrame(() => vid.current?.play().catch(() => {}));
  }

  return (
    <div ref={box} className="relative aspect-video overflow-hidden rounded-sm border border-line bg-surface">
      <Image src="/media/showreel.webp" alt="" fill sizes="(min-width: 1440px) 1296px, 92vw" className="object-cover" aria-hidden="true" />
      {src && (
        <video
          ref={vid}
          src={src}
          muted
          loop
          playsInline
          preload="auto"
          poster="/media/showreel.webp"
          aria-label="CDH showreel: a baker calling in a crew, a face oil at dawn, a hot sauce bottle on its mark, a cliffside hotel, a chef at the pass, a potter in her studio, a son coming home, a cold pour, a private jet and a billboard at dusk"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <span className="absolute inset-0 bg-gradient-to-t from-[#121110]/85 via-transparent to-[#121110]/25" />
      <span className="slate absolute left-4 top-4 rounded-tape bg-[#121110]/85 px-2 py-1 text-[12px] text-[#efe9df]">Showreel · AI concepts</span>
      <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-5 md:p-8">
        <p className="text-[clamp(32px,5vw,80px)] font-black leading-[0.92] tracking-tightest text-[#efe9df]">Directed at the{" "}<br />speed of culture.</p>
        {still ? (
          <button type="button" onClick={playStill} className="btn-primary">Play the reel</button>
        ) : (
          <button type="button" onClick={sound} aria-pressed={!muted} className="slate inline-flex min-h-[44px] items-center gap-2 rounded-sm border border-[#efe9df]/40 bg-[#121110]/50 px-4 text-[12px] text-[#efe9df] backdrop-blur-sm hover:border-[#efe9df]">
            <span aria-hidden="true">{muted ? "Sound off" : "Sound on"}</span>
            <span className="sr-only">{muted ? "Turn the reel's sound on" : "Turn the reel's sound off"}</span>
          </button>
        )}
      </div>
      <Link href="/work" className="sr-only focus:not-sr-only focus:absolute focus:right-4 focus:top-4">See the work</Link>
    </div>
  );
}
