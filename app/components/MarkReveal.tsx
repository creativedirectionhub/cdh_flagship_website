"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// The opening: the reel plays inside the tape T. Scroll, and the T opens until the reel fills the screen.
// Without JS, or with reduced motion, the reel simply shows full screen with the line on it.
const T_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><polygon points='14,46 186,40 182,48 188,55 183,62 189,70 186,80 16,86 20,79 13,72 19,64 12,57 18,50'/><polygon points='80,83 122,82 121,188 115,183 109,190 103,184 97,190 91,184 85,190 80,186'/></svg>`,
  );

export default function MarkReveal() {
  const wrap = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(false);
  const [p, setP] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setArmed(true);
    let raf = 0;
    const tick = () => {
      raf = 0;
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      setP(Math.min(1, Math.max(0, -r.top / (span || 1))));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const sm = window.matchMedia("(max-width: 767px)").matches;
    v.src = sm ? "/media/reel-sm.mp4" : "/media/reel.mp4";
    v.play().catch(() => {});
  }, []);

  // mask grows from the mark to far past the screen, pivoting on the stem so the reel fills the frame
  const [vp, setVp] = useState({ w: 1440, h: 900 });
  useEffect(() => {
    const r = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    r(); window.addEventListener("resize", r);
    return () => window.removeEventListener("resize", r);
  }, []);
  const ease = Math.min(1, p / 0.85) ** 2.2;
  const open = armed && p > 0.85;
  const base = Math.min(vp.w, vp.h) * (vp.w < 768 ? 0.62 : 0.5);
  const size = base + (Math.max(vp.w, vp.h) * 9 - base) * ease;
  const px = vp.w / 2 - size * 0.505, py = vp.h / 2 - size * 0.62;
  const maskStyle: React.CSSProperties = {};
  if (armed && !open) {
    Object.assign(maskStyle, {
      WebkitMaskImage: `url("${T_SVG}")`, maskImage: `url("${T_SVG}")`,
      WebkitMaskSize: `${size}px ${size}px`, maskSize: `${size}px ${size}px`,
      WebkitMaskPosition: `${px}px ${py}px`, maskPosition: `${px}px ${py}px`,
      WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat",
    });
  }
  const lineIn = !armed ? 1 : Math.min(1, Math.max(0, (p - 0.7) / 0.17));
  const cueOut = armed ? Math.max(0, 1 - p * 6) : 0;

  return (
    <section ref={wrap} aria-label="Reel" className={`relative bg-ground ${armed ? "h-[280vh]" : "h-[100svh]"}`}>
      <div ref={stage} className="sticky top-0 h-[100svh] overflow-hidden">
        {armed && !open && (
          <svg aria-hidden="true" viewBox="0 0 200 200" className="absolute" style={{ left: px - size * 0.03, top: py - size * 0.03 + size * 0.012, width: size * 1.06, height: size * 1.06, opacity: Math.max(0, 1 - p * 5) }}>
            <polygon points="14,46 186,40 182,48 188,55 183,62 189,70 186,80 16,86 20,79 13,72 19,64 12,57 18,50" fill="#ff5a1f" />
            <polygon points="80,83 122,82 121,188 115,183 109,190 103,184 97,190 91,184 85,190 80,186" fill="#ff5a1f" />
          </svg>
        )}
        <div className="absolute inset-0" style={maskStyle}>
          <video ref={video} muted playsInline loop autoPlay preload="metadata" poster="/media/reel-poster.webp" aria-label="Reel: Black Sox portraits, talent portraits, travel, a pop-up rush for Mama Lou's hot sauce, brand films" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121110]/85 via-[#121110]/10 to-[#121110]/30" style={{ opacity: lineIn }} />
        </div>

        <p className="slate absolute bottom-10 left-1/2 -translate-x-1/2 text-muted" style={{ opacity: cueOut }} aria-hidden={!armed}>Scroll</p>

        <div className="gutter absolute inset-x-0 bottom-0 pb-12 md:pb-16" style={{ opacity: lineIn, transform: `translateY(${(1 - lineIn) * 30}px)` }}>
          <div className="mx-auto flex max-w-[1440px] flex-wrap items-end justify-between gap-8">
            <h1 className="text-[clamp(52px,8.6vw,148px)] font-black leading-[0.88] tracking-tightest text-[#efe9df]">
              <span className="slate mb-5 block text-[12px] leading-normal tracking-[0.14em] text-[#efe9df]/80 md:text-[13px]">Creative Direction Hub · Creative direction and AI art direction agency</span>
              We put brands{" "}<br />on their <span className="tape-word ml-[0.1em]"><i aria-hidden="true" className="tape-edge" /><b>mark.</b></span>
            </h1>
            <div className="flex flex-col items-start gap-4 pb-2">
              <Link href="/about" className="slate inline-block border-b-2 border-gaffer pb-1 pt-3 text-[#efe9df] hover:text-gaffer">About us</Link>
              <span className="slate text-[11px] text-[#efe9df]/70">Reel includes AI concepts, labeled on each piece</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
