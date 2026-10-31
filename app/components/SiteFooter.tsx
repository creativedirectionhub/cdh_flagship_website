import Link from "next/link";
import { TapeMark } from "./Brand";
import { BOOKING_URL } from "../config";
import { site } from "../content/services";

export default function SiteFooter() {
  return (
    <footer className="gutter border-t border-line pb-10 pt-20 md:pt-28">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-end">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end">
            <TapeMark size={96} className="shrink-0" />
            <p className="text-[clamp(38px,5vw,76px)] font-black leading-[0.92] tracking-tightest">We put brands{" "}<br />on their mark<span className="text-gaffer">.</span></p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <ul className="grid text-[16px] font-semibold">
              <li><Link href="/work" className="inline-block py-2 hover:text-gaffer">Work</Link></li>
              <li><Link href="/services" className="inline-block py-2 hover:text-gaffer">Services</Link></li>
              <li><Link href="/about" className="inline-block py-2 hover:text-gaffer">About</Link></li>
              <li><Link href="/start" className="inline-block py-2 hover:text-gaffer">Free Creative Audit</Link></li>
              <li><Link href="/#wall" className="inline-block py-2 hover:text-gaffer">Sign the wall</Link></li>
            </ul>
            <div className="grid content-start gap-2 text-[16px]">
              <span className="slate text-muted">Say hello</span>
              <a href={`mailto:${site.email}`} className="inline-block py-2 font-semibold hover:text-gaffer">{site.email}</a>
              {BOOKING_URL && <a href={BOOKING_URL} target="_blank" rel="noopener" className="inline-block py-2 font-semibold text-gaffer hover:underline">Book a 30-minute call</a>}
              <a href="https://www.linkedin.com/in/wbernoudy/" target="_blank" rel="noopener me" className="inline-block py-2 font-semibold hover:text-gaffer">Willie on LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-[14px] text-muted">
          <span className="slate text-ink">Directed from everywhere.</span>
          <span>© 2026 Creative Direction Hub · Concepts and AI performers are labeled. · <a href="/privacy" className="underline hover:text-gaffer">Privacy</a> · <a href="/terms" className="underline hover:text-gaffer">Terms</a></span>
        </div>
      </div>
    </footer>
  );
}
