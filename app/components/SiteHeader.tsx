"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { TapeMark, Wordmark } from "./Brand";
import { CommentaryToggle } from "./Commentary";
import { byDept, depts, pad2, sceneOf, type Dept } from "../content/offer";

// Two departments open as menus (their scenes on the call sheet); the two single-scene departments are plain links.
const drops: Dept[] = ["branding", "marketing"];
const flat = [
  { href: "/services/website-design", label: "Websites" },
  { href: "/services/brand-photography", label: "Photography" },
  { href: "/work", label: "Work" },
];
const big = [
  { href: "/work", label: "Work" },
  { href: "/proof", label: "Proof" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/start", label: "Free Audit" },
];

// Wordmark left, departments and menu right. The menu button opens a full-screen set of big links plus every service.
export default function SiteHeader() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState<Dept | null>(null);
  const bar = useRef<HTMLUListElement>(null);

  useEffect(() => { setOpen(false); setDrop(null); }, [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); setDrop(null); } };
    const away = (e: PointerEvent) => { if (bar.current && !bar.current.contains(e.target as Node)) setDrop(null); };
    window.addEventListener("keydown", esc);
    window.addEventListener("pointerdown", away);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", esc); window.removeEventListener("pointerdown", away); };
  }, [open]);

  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));
  const inDept = (d: Dept) => byDept(d).some((o) => path === `/services/${o.slug}`);
  const top = "slate inline-flex min-h-[44px] items-center gap-2 px-3 text-[13px] transition-colors";

  return (
    <>
    <header className="gutter sticky top-0 z-40 border-b border-line/60 bg-ground/85 backdrop-blur-sm" style={{ top: "env(safe-area-inset-top, 0px)" }}>
      <nav className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between gap-6" aria-label="Main">
        <Link href="/" className="shrink-0 py-3">
          <Wordmark size={28} />
          <span className="sr-only">Creative Direction Hub, home</span>
        </Link>
        <div className="flex items-center gap-3">
          <ul ref={bar} className="mr-2 hidden items-center xl:flex">
            {drops.map((id) => {
              const d = depts.find((x) => x.id === id)!;
              const rows = byDept(id);
              const on = drop === id;
              return (
                <li key={id} className="relative" onPointerEnter={(e) => { if (e.pointerType === "mouse") setDrop(id); }} onPointerLeave={(e) => { if (e.pointerType === "mouse") setDrop(null); }}>
                  <button type="button" aria-expanded={on} aria-controls={`drop-${id}`} onClick={() => setDrop(on ? null : id)} className={`${top} ${inDept(id) || on ? "text-gaffer" : "text-ink hover:text-gaffer"}`}>
                    {d.name}
                    <span aria-hidden="true" className={`block h-[2px] w-3 bg-current transition-transform duration-200 ${on ? "rotate-90" : ""}`} />
                  </button>
                  {on && (
                    <div id={`drop-${id}`} className="absolute left-0 top-full w-[380px] pt-3">
                      <div className="drop border border-line bg-raised shadow-[0_24px_60px_rgba(0,0,0,.55)]">
                        <p className="slate flex items-center justify-between border-b border-line px-5 py-3 text-[12px] text-muted"><span>{d.name}</span><span>Scenes {pad2(sceneOf(rows[0].slug))} to {pad2(sceneOf(rows[rows.length - 1].slug))}</span></p>
                        <ul className="px-5 py-1">
                          {rows.map((o) => (
                            <li key={o.slug} className="border-b border-line/70 last:border-b-0">
                              <Link href={`/services/${o.slug}`} aria-current={path === `/services/${o.slug}` ? "page" : undefined} className="cs-row grid min-h-[52px] grid-cols-[34px_minmax(0,1fr)_auto] items-center gap-x-2 py-2">
                                <span className="cs-num slate text-[12px] text-muted">{pad2(sceneOf(o.slug))}</span>
                                <span className="text-[19px] font-extrabold leading-tight tracking-[-0.015em]">{o.nav}</span>
                                <span aria-hidden="true" className="cs-go text-[16px] font-black">→</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link href={`/services#${id}`} className="slate flex min-h-[48px] items-center justify-between border-t border-line px-5 text-[12px] text-gaffer hover:bg-surface">All {d.name.toLowerCase()} services<span aria-hidden="true">→</span></Link>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
            {flat.map((l) => (
              <li key={l.href}>
                <Link href={l.href} aria-current={active(l.href) ? "page" : undefined} className={`${top} ${active(l.href) ? "text-gaffer" : "text-ink hover:text-gaffer"}`}>{l.label}</Link>
              </li>
            ))}
          </ul>
          {path === "/" && <CommentaryToggle />}
          <Link href="/start" className="btn-primary min-h-[44px] px-4 text-[13px] sm:px-5 sm:text-[14px]">Free Audit</Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="group grid h-11 w-11 place-items-center"
          >
            <span className="relative block h-3 w-7" aria-hidden="true">
              <span className={`absolute left-0 top-0 h-[2px] w-7 bg-ink transition-transform duration-300 ${open ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`absolute bottom-0 left-0 h-[2px] bg-ink transition-all duration-300 ${open ? "w-7 -translate-y-[5px] -rotate-45" : "w-5 group-hover:w-7"}`} />
            </span>
          </button>
        </div>
      </nav>
    </header>
      {open && (
        <div id="site-menu" className="fixed inset-x-0 bottom-0 top-[68px] z-50 overflow-auto bg-ground">
          <div className="gutter mx-auto grid max-w-[1440px] gap-12 py-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20 lg:py-14">
            <ul className="grid content-start">
              {big.map((l, n) => (
                <li key={l.href} className="border-b border-line">
                  <Link href={l.href} aria-current={active(l.href) ? "page" : undefined} className={`flex items-baseline gap-5 py-3 text-[clamp(40px,6.4vw,92px)] font-black leading-[0.95] tracking-tightest ${active(l.href) ? "text-gaffer" : "hover:text-gaffer"}`}>
                    <span className="slate text-[12px] text-muted">{pad2(n + 1)}</span>{l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="grid content-start gap-10">
              <div className="grid gap-10 sm:grid-cols-2">
                {depts.map((d) => (
                  <div key={d.id} className="min-w-0">
                    <p className="slate border-b border-line pb-3 text-[12px] text-gaffer">{d.name}</p>
                    <ul className="mt-1">
                      {byDept(d.id).map((o) => (
                        <li key={o.slug}>
                          <Link href={`/services/${o.slug}`} aria-current={path === `/services/${o.slug}` ? "page" : undefined} className={`flex min-h-[44px] items-baseline gap-3 py-2 text-[19px] font-extrabold tracking-[-0.015em] ${path === `/services/${o.slug}` ? "text-gaffer" : "hover:text-gaffer"}`}>
                            <span className="slate text-[12px] text-muted">{pad2(sceneOf(o.slug))}</span>{o.dept === "websites" || o.dept === "photography" ? o.name : o.nav}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-end gap-6 border-t border-line pt-8">
                <TapeMark size={72} />
                <div className="grid gap-2">
                  <p className="text-[20px] font-extrabold leading-tight">We put brands on their mark.</p>
                  <a href="mailto:hello@creativedirectionhub.com" className="inline-flex min-h-[44px] items-center text-[16px] font-semibold hover:text-gaffer">hello@creativedirectionhub.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
