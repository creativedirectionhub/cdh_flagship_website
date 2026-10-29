"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Media } from "../content/work";

// One piece of work: an image, or a muted video that plays only while in view. Poster first.
export default function CaseMedia({ m, sizes = "100vw", priority = false, className = "", label }: { m: Media; sizes?: string; priority?: boolean; className?: string; label?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Videos wait until the page has painted and loaded, so they never compete with the first frame.
  useEffect(() => {
    if (m.kind !== "video" || m.sound) return;
    let t: ReturnType<typeof setTimeout>;
    const go = () => { t = setTimeout(() => setLoaded(true), 1200); };
    if (document.readyState === "complete") go(); else window.addEventListener("load", go, { once: true });
    return () => { clearTimeout(t); window.removeEventListener("load", go); };
  }, [m.kind]);

  // The video element is only created once it's near the viewport, so posters below the fold load lazily.
  useEffect(() => {
    const el = box.current;
    if (!el || m.kind !== "video" || m.sound) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setNear(true);
      setInView(e.intersectionRatio >= 0.35);
    }, { threshold: [0, 0.35], rootMargin: "200px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [m.kind]);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView, near, loaded]);

  const ratio = `${m.w} / ${m.h}`;
  return (
    <div ref={box} className={`relative overflow-hidden bg-surface ${className}`} style={{ aspectRatio: ratio }}>
      {m.kind === "image" ? (
        <Image src={m.src} alt={m.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : m.sound ? (
        <video src={m.src} poster={m.poster} controls playsInline preload="none" aria-label={m.alt} className="absolute inset-0 h-full w-full bg-black object-cover" />
      ) : (
        <>
          <Image src={m.poster} alt={m.alt} fill sizes={sizes} priority={priority} className="object-cover" />
          {near && loaded && <video ref={ref} src={m.src} poster={m.poster} muted playsInline loop preload="metadata" aria-label={m.alt} className="absolute inset-0 h-full w-full object-cover" />}
        </>
      )}
      {(label || (m.kind === "video" && m.ai)) && (
        <div className="pointer-events-none absolute left-3 top-3 flex gap-2">
          {label && <span className="slate rounded-tape bg-[#121110]/85 px-2 py-1 text-[11px] text-[#efe9df]">{label}</span>}
          {m.kind === "video" && m.ai && <span className="slate rounded-tape bg-[#121110]/85 px-2 py-1 text-[11px] text-[#ff5a1f]">AI</span>}
        </div>
      )}
    </div>
  );
}
