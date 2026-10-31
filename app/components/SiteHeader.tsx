"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { TapeMark, Wordmark } from "./Brand";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/start", label: "Free Audit" },
];

// Wordmark left, menu right, on every screen. The menu is a full-screen set of big links.
export default function SiteHeader() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", esc);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", esc); };
  }, [open]);

  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <>
    <header className="gutter sticky top-0 z-40 border-b border-line/60 bg-ground/85 backdrop-blur-sm" style={{ top: "env(safe-area-inset-top, 0px)" }}>
      <nav className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between gap-6" aria-label="Main">
        <Link href="/" className="shrink-0 py-3">
          <Wordmark size={28} />
          <span className="sr-only">Creative Direction Hub, home</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/start" className="btn-primary min-h-[40px] px-4 text-[13px] sm:min-h-[42px] sm:px-5 sm:text-[14px]">Free Audit</Link>
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
          <div className="gutter mx-auto grid max-w-[1440px] gap-10 py-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)] md:py-14">
            <ul className="grid">
              {links.map((l, n) => (
                <li key={l.href} className="border-b border-line">
                  <Link href={l.href} aria-current={active(l.href) ? "page" : undefined} className={`group flex items-baseline gap-5 py-4 text-[clamp(44px,8vw,112px)] font-black leading-[0.95] tracking-tightest ${active(l.href) ? "text-gaffer" : "hover:text-gaffer"}`}>
                    <span className="slate text-[12px] text-muted">0{n + 1}</span>{l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col justify-end gap-6">
              <TapeMark size={96} />
              <p className="text-[22px] font-extrabold leading-tight">We put brands on their mark.</p>
              <a href="mailto:hello@creativedirectionhub.com" className="text-[16px] font-semibold hover:text-gaffer">hello@creativedirectionhub.com</a>
              <p className="slate text-muted">Directed from everywhere.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
