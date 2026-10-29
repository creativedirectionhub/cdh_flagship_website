import Link from "next/link";
import { TapeMark, Wordmark } from "./Brand";
import { BOOKING_URL } from "../config";
import { site } from "../content/services";

export default function SiteFooter() {
  return (
    <footer className="gutter border-t border-line py-14">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:items-end">
          <div className="flex items-center gap-6">
            <TapeMark size={72} />
            <div>
              <Wordmark size={56} />
              <p className="mt-3 text-[15px] font-semibold">We put brands on their mark<span className="text-gaffer">.</span></p>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <ul className="grid gap-2 text-[15px] font-semibold">
              <li><Link href="/work" className="hover:text-gaffer">Work</Link></li>
              <li><Link href="/services" className="hover:text-gaffer">Services</Link></li>
              <li><Link href="/about" className="hover:text-gaffer">About</Link></li>
              <li><Link href="/start" className="hover:text-gaffer">Free Creative Audit</Link></li>
            </ul>
            <div className="grid gap-2 text-[15px]">
              <span className="slate text-muted">Email</span>
              <a href={`mailto:${site.email}`} className="font-semibold hover:text-gaffer">{site.email}</a>
              {BOOKING_URL && <a href={BOOKING_URL} target="_blank" rel="noopener" className="mt-2 font-semibold text-gaffer hover:underline">Book a 30-minute call</a>}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-4 border-t border-line pt-6 text-[13px] text-muted">
          <span>© 2026 Creative Direction Hub. Fully remote.</span>
          <span>Concept work is labeled as concept. AI performers are labeled as AI. <a href="/privacy" className="underline hover:text-gaffer">Privacy</a></span>
        </div>
      </div>
    </footer>
  );
}
