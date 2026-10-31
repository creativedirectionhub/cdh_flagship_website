"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Still until you point at it, then it plays. On touch screens it plays while it's in view.
export default function PlayTile({
  href, poster, video, alt, title, kicker, label, sizes, ratio = "16 / 10", className = "", titleClass = "",
}: {
  href: string; poster: string; video?: string; alt: string; title: React.ReactNode; kicker?: string; label?: string;
  sizes: string; ratio?: string; className?: string; titleClass?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const box = useRef<HTMLAnchorElement>(null);
  const [on, setOn] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const touch = window.matchMedia("(hover: none)").matches;
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setLoad(true);
      if (touch) setOn(e.intersectionRatio > 0.6);
    }, { threshold: [0, 0.6], rootMargin: "300px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [video]);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (on) v.play().catch(() => {}); else v.pause();
  }, [on, load]);

  return (
    <Link
      ref={box}
      href={href}
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      onFocus={() => setOn(true)}
      onBlur={() => setOn(false)}
      className={`play-tile group relative block overflow-hidden bg-surface ${on ? "is-on" : ""} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <Image src={poster} alt={alt} fill sizes={sizes} className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
      {video && load && <video ref={ref} src={video} muted loop playsInline preload="none" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />}
      <div className="absolute inset-0 bg-gradient-to-t from-[#121110]/95 via-[#121110]/25 to-transparent" />
      {label && <span className="slate absolute left-4 top-4 rounded-tape bg-[#121110]/85 px-2 py-1 text-[12px] text-[#efe9df]">{label}</span>}
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
        {kicker && <p className="slate text-[12px] text-[#efe9df]/85"><span aria-hidden="true" className="mr-2 inline-block h-[3px] w-4 -translate-y-[3px] bg-gaffer" />{kicker}</p>}
        <h3 className={`mt-2 text-[#efe9df] ${titleClass || "t-m"}`}>{title}</h3>
      </div>
    </Link>
  );
}
