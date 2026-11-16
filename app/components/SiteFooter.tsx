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
          <div className="grid grid-cols-2 gap-x-8 gap-y-10">
            <div className="grid content-start gap-2 text-[16px]">
              <span className="slate text-muted">Services</span>
              <ul className="grid font-semibold">
                <li><Link href="/services#branding" className="inline-flex min-h-[44px] items-center hover:text-gaffer">Branding</Link></li>
                <li><Link href="/services#marketing" className="inline-flex min-h-[44px] items-center hover:text-gaffer">Marketing</Link></li>
                <li><Link href="/services/website-design" className="inline-flex min-h-[44px] items-center hover:text-gaffer">Websites</Link></li>
                <li><Link href="/services/brand-photography" className="inline-flex min-h-[44px] items-center hover:text-gaffer">Brand photography</Link></li>
                <li><Link href="/services" className="inline-flex min-h-[44px] items-center text-gaffer hover:underline">The call sheet</Link></li>
              </ul>
            </div>
            <div className="grid content-start gap-2 text-[16px]">
              <span className="slate text-muted">Studio</span>
              <ul className="grid font-semibold">
                <li><Link href="/work" className="inline-flex min-h-[44px] items-center hover:text-gaffer">Work</Link></li>
                <li><Link href="/proof" className="inline-flex min-h-[44px] items-center hover:text-gaffer">Proof</Link></li>
                <li><Link href="/about" className="inline-flex min-h-[44px] items-center hover:text-gaffer">About</Link></li>
                <li><Link href="/start" className="inline-flex min-h-[44px] items-center hover:text-gaffer">Free Creative Audit</Link></li>
                <li><Link href="/#wall" className="inline-flex min-h-[44px] items-center hover:text-gaffer">Sign the wall</Link></li>
              </ul>
            </div>
            <div className="col-span-2 flex flex-wrap items-center gap-x-8 gap-y-1 border-t border-line pt-6 text-[16px]">
              <span className="slate w-full text-muted">Say hello</span>
              <a href={`mailto:${site.email}`} className="inline-flex min-h-[44px] items-center font-semibold hover:text-gaffer">{site.email}</a>
              {BOOKING_URL && <a href={BOOKING_URL} target="_blank" rel="noopener" className="inline-flex min-h-[44px] items-center font-semibold text-gaffer hover:underline">Book a 30-minute call</a>}
              <a href="https://www.linkedin.com/in/wbernoudy/" target="_blank" rel="noopener me" className="inline-flex min-h-[44px] items-center font-semibold hover:text-gaffer">Willie on LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-[14px] text-muted">
          <span className="slate text-ink">Directed from everywhere.</span>
          <span>© 2026 Creative Direction Hub · <a href="/privacy" className="inline-block py-3 underline hover:text-gaffer">Privacy</a> · <a href="/terms" className="inline-block py-3 underline hover:text-gaffer">Terms</a></span>
        </div>
      </div>
    </footer>
  );
}
