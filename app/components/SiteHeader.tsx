"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "./Brand";

const links = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
];

export default function SiteHeader() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="gutter sticky top-0 z-40 border-b border-line/70 bg-ground/90 backdrop-blur-sm" style={{ top: "env(safe-area-inset-top, 0px)" }}>
      <nav className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-6" aria-label="Main">
        <Link href="/" className="shrink-0">
          <Wordmark size={30} />
          <span className="sr-only">Creative Direction Hub, home</span>
        </Link>
        <ul className="hidden items-center gap-8 text-[15px] font-semibold md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={path.startsWith(l.href) ? "page" : undefined} className={`hover:text-gaffer ${path.startsWith(l.href) ? "text-gaffer" : ""}`}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <Link href="/start" className="btn-primary min-h-[44px] px-5 text-[14px]">Free Audit</Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-11 w-11 place-items-center rounded-sm border border-line md:hidden"
          >
            <span className="relative block h-3 w-5" aria-hidden="true">
              <span className={`absolute left-0 top-0 h-[2px] w-5 bg-ink transition-transform ${open ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`absolute bottom-0 left-0 h-[2px] w-5 bg-ink transition-transform ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </nav>
      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-auto bg-ground md:hidden">
          <ul className="gutter grid py-6">
            {[{ href: "/", label: "Home" }, ...links, { href: "/start", label: "Free Audit" }].map((l) => (
              <li key={l.href} className="border-b border-line">
                <Link href={l.href} className="block py-6 text-[40px] font-black leading-none tracking-tighter">{l.label}</Link>
              </li>
            ))}
          </ul>
          <p className="gutter slate py-6 text-muted">We put brands on their mark.</p>
        </div>
      )}
    </header>
  );
}
