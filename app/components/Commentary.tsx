"use client";

import { useEffect, useSyncExternalStore } from "react";
import { allNotes, intro, notes, type Note } from "../content/commentary";

// Director's commentary, like the commentary track on a film disc.
// Turn it on in the header and orange markers appear on the home page. Tap one and the director talks you
// through that section while the rest of the page dims. Captions always show, so it works with the sound off.

type State = { on: boolean; id: string | null; playing: boolean; progress: number };
let state: State = { on: false, id: null, playing: false, progress: 0 };
const subs = new Set<() => void>();
const emit = (next: Partial<State>) => { state = { ...state, ...next }; subs.forEach((f) => f()); };
const subscribe = (f: () => void) => { subs.add(f); return () => { subs.delete(f); }; };
const snap = () => state;
const serverSnap = () => state;

let audio: HTMLAudioElement | null = null;
const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function spotlight(id: string | null) {
  const root = document.documentElement;
  document.querySelectorAll("[data-cm-on]").forEach((el) => el.removeAttribute("data-cm-on"));
  if (!id || id === "intro") { delete root.dataset.spot; return; }
  const el = document.querySelector(`[data-cm="${id}"]`);
  if (!el) { delete root.dataset.spot; return; }
  el.setAttribute("data-cm-on", "");
  root.dataset.spot = id;
  const r = el.getBoundingClientRect();
  if (r.top < 70 || r.top > window.innerHeight * 0.45) {
    window.scrollTo({ top: r.top + window.scrollY - 96, behavior: reduced() ? "auto" : "smooth" });
  }
}

export function play(id: string) {
  if (!audio) {
    audio = new Audio();
    audio.preload = "auto";
    audio.addEventListener("timeupdate", () => { if (audio && audio.duration) emit({ progress: audio.currentTime / audio.duration }); });
    audio.addEventListener("ended", () => { emit({ playing: false, progress: 1 }); setTimeout(() => { if (!state.playing) spotlight(null); }, 700); });
    audio.addEventListener("pause", () => emit({ playing: false }));
    audio.addEventListener("play", () => emit({ playing: true }));
  }
  audio.pause();
  audio.src = `/media/commentary/${id}.mp3`;
  emit({ id, progress: 0, playing: true });
  spotlight(id);
  audio.play().catch(() => emit({ playing: false }));
}

function stop() {
  audio?.pause();
  spotlight(null);
  emit({ on: false, id: null, playing: false, progress: 0 });
}

function toggle() {
  if (state.on) return stop();
  emit({ on: true });
  play(intro.id);
}

const useCommentary = () => useSyncExternalStore(subscribe, snap, serverSnap);

/** Header switch. */
export function CommentaryToggle() {
  const s = useCommentary();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={s.on}
      className={`slate inline-flex min-h-[44px] items-center gap-2 rounded-sm px-3 text-[12px] transition-colors ${s.on ? "bg-gaffer text-on-gaffer" : "text-ink hover:text-gaffer"}`}
    >
      <span aria-hidden="true" className={`cm-dot ${s.on ? "is-on" : ""}`} />
      <span className="hidden sm:inline">Commentary</span>
      <span className="sr-only sm:hidden">Director&apos;s commentary</span>
    </button>
  );
}

/** A section's marker. Renders nothing until commentary is on. */
export function CommentaryMarker({ id, className = "" }: { id: string; className?: string }) {
  const s = useCommentary();
  const n = notes.findIndex((x) => x.id === id);
  if (!s.on || n < 0) return null;
  const note = notes[n];
  const active = s.id === id;
  return (
    <button
      type="button"
      onClick={() => (active && s.playing ? audio?.pause() : play(id))}
      aria-label={`${active && s.playing ? "Pause" : "Play"} the director's note: ${note.label}`}
      className={`cm-marker absolute z-20 ${active ? "is-active" : ""} ${className}`}
    >
      <span aria-hidden="true" className="cm-ring" />
      <span aria-hidden="true" className="relative">{String(n + 1).padStart(2, "0")}</span>
    </button>
  );
}

/** The caption bar along the bottom while commentary is on. */
export function CommentaryBar() {
  const s = useCommentary();
  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape" && state.on) stop(); };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);
  if (!s.on) return null;
  const note: Note | undefined = allNotes.find((x) => x.id === s.id);
  const n = notes.findIndex((x) => x.id === s.id);
  return (
    <div role="region" aria-label="Director's commentary" className="cm-bar fixed inset-x-3 bottom-3 z-50 mx-auto max-w-[760px] overflow-hidden rounded-md border border-line bg-raised/95 shadow-[0_18px_60px_rgba(0,0,0,.55)] backdrop-blur-md md:bottom-6">
      <div className="h-[3px] bg-line"><div className="h-full bg-gaffer transition-[width] duration-200" style={{ width: `${Math.round(s.progress * 100)}%` }} /></div>
      <div className="flex items-start gap-4 p-4 md:p-5">
        <button
          type="button"
          onClick={() => (s.playing ? audio?.pause() : note && play(note.id))}
          aria-label={s.playing ? "Pause" : "Play"}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gaffer text-on-gaffer"
        >
          {s.playing
            ? <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor" aria-hidden="true"><path d="M0 0h4v14H0zM8 0h4v14H8z" /></svg>
            : <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor" aria-hidden="true" className="ml-[2px]"><path d="M0 0l12 7-12 7z" /></svg>}
        </button>
        <div className="min-w-0 flex-1">
          <p className="slate text-[12px] text-gaffer">Director&apos;s commentary{note && note.id !== "intro" ? ` · ${String(n + 1).padStart(2, "0")} ${note.label}` : ""}</p>
          <p aria-live="polite" className="mt-2 text-[16px] font-semibold leading-[1.45] text-ink md:text-[17px]">{note?.text}</p>
        </div>
        <button type="button" onClick={stop} aria-label="Turn commentary off" className="grid h-11 w-11 shrink-0 place-items-center text-muted hover:text-ink">
          <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M1 1l12 12M13 1L1 13" /></svg>
        </button>
      </div>
    </div>
  );
}
