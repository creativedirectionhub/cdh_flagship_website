import Link from "next/link";
import { TapeMark } from "./Brand";
import { BOOKING_URL } from "../config";
import { site } from "../content/services";

export default function SiteFooter() {
  return (
    <footer className="gutter border-t border-line pb-10 pt-20 md:pt-28">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-end">
          <div className="flex items-end gap-6">
            <TapeMark size={120} className="shrink-0" />
            <p className="text-[clamp(40px,6vw,96px)] font-black leading-[0.9] tracking-tightest">We put brands<br />on their mark<span className="text-gaffer">.</span></p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <ul className="grid gap-2 text-[16px] font-semibold">
              <li><Link href="/work" className="hover:text-gaffer">Work</Link></li>
              <li><Link href="/services" className="hover:text-gaffer">Services</Link></li>
              <li><Link href="/about" className="hover:text-gaffer">About</Link></li>
              <li><Link href="/start" className="hover:text-gaffer">Free Creative Audit</Link></li>
            </ul>
            <div className="grid content-start gap-2 text-[16px]">
              <span className="slate text-muted">Say hello</span>
              <a href={`mailto:${site.email}`} className="font-semibold hover:text-gaffer">{site.email}</a>
              {BOOKING_URL && <a href={BOOKING_URL} target="_blank" rel="noopener" className="mt-1 font-semibold text-gaffer hover:underline">Book a 30-minute call</a>}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-[13px] text-muted">
          <span className="slate text-ink">Directed from everywhere.</span>
          <span>© 2026 Creative Direction Hub · Concepts and AI performers are labeled. · <a href="/privacy" className="underline hover:text-gaffer">Privacy</a></span>
        </div>
      </div>
    </footer>
  );
}
