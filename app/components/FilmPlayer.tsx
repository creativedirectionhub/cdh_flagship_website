"use client";

import Image from "next/image";
import { useRef, useState } from "react";

// The film, featured. Nothing downloads until someone presses play, so it never costs the page its speed.
// Phones held upright get the vertical cut; everything else gets the 16:9 master.
export default function FilmPlayer({
  poster, src, srcVertical, alt, title, length, label,
}: {
  poster: string; src: string; srcVertical?: string; alt: string; title: string; length: string; label: string;
}) {
  const [playing, setPlaying] = useState(false);
  const [vertical, setVertical] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  function play() {
    const v = !!srcVertical && window.matchMedia("(max-width: 767px) and (orientation: portrait)").matches;
    setVertical(v);
    setPlaying(true);
    requestAnimationFrame(() => ref.current?.play().catch(() => {}));
  }

  return (
    <div className={`relative mx-auto overflow-hidden rounded-sm bg-surface ${playing && vertical ? "aspect-[9/16] max-w-[440px]" : "aspect-video"}`}>
      {playing ? (
        <video
          ref={ref}
          src={vertical ? srcVertical : src}
          poster={vertical ? undefined : poster}
          controls
          playsInline
          autoPlay
          preload="auto"
          aria-label={alt}
          className="absolute inset-0 h-full w-full bg-black object-contain"
        />
      ) : (
        <button type="button" onClick={play} className="group absolute inset-0 block w-full text-left" aria-label={`Play ${title}, ${length}`}>
          <Image src={poster} alt={alt} fill sizes="(min-width: 1440px) 1296px, 92vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
          <span className="absolute inset-0 bg-gradient-to-t from-[#121110]/85 via-[#121110]/10 to-[#121110]/20" />
          <span className="slate absolute left-4 top-4 rounded-tape bg-[#121110]/85 px-2 py-1 text-[12px] text-[#efe9df]">{label}</span>
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-gaffer text-on-gaffer shadow-[0_10px_40px_rgba(0,0,0,.45)] transition-transform duration-300 group-hover:scale-110 md:h-28 md:w-28">
              <svg width="26" height="30" viewBox="0 0 12 14" fill="currentColor" aria-hidden="true" className="ml-1"><path d="M0 0l12 7-12 7z" /></svg>
            </span>
          </span>
          <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-8">
            <span className="text-[clamp(28px,4vw,64px)] font-black leading-[0.92] tracking-tighter text-[#efe9df]">{title}</span>
            <span className="slate shrink-0 text-[12px] text-[#efe9df]/85 tabular-nums">{length}</span>
          </span>
        </button>
      )}
    </div>
  );
}
