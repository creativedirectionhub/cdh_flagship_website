import type { Metadata } from "next";
import Link from "next/link";
import { notes } from "../content/notes";
import { pad2 } from "../content/offer";

export const metadata: Metadata = {
  title: { absolute: "Notes: Plain Answers on Branding, Search & Photography | CDH" },
  description: "Short, plain answers to the questions business owners ask before they hire a creative team: SEO, AEO and GEO, logos, websites and brand photography.",
  alternates: { canonical: "/notes" },
};

export default function NotesPage() {
  return (
    <section className="gutter py-16 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <p className="slate text-gaffer">Notes from set</p>
        <h1 className="rise mt-4 max-w-[14ch] text-[clamp(48px,8vw,128px)] font-black leading-[0.9] tracking-tightest">Plain answers<span className="text-gaffer">.</span></h1>
        <p className="mt-6 max-w-[50ch] text-[18px] leading-[1.55] text-body">The questions clients ask us before they hire anyone, answered in the first two lines. Read one in three minutes and use it today.</p>
        <ol className="mt-14 border-b border-line">
          {notes.map((n, i) => (
            <li key={n.slug} className="border-t border-line">
              <Link href={`/notes/${n.slug}`} className="cs-row grid min-h-[72px] grid-cols-[44px_minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-2 py-6 md:grid-cols-[56px_minmax(0,1fr)_minmax(0,0.9fr)_auto] md:py-8">
                <span className="cs-num slate text-[12px] text-muted">{pad2(i + 1)}</span>
                <span className="text-[clamp(24px,2.6vw,40px)] font-black leading-[1] tracking-tighter">{n.title}</span>
                <span className="cs-sub col-start-2 text-[16px] leading-[1.45] text-muted md:col-start-3">{n.answer}</span>
                <span aria-hidden="true" className="cs-go col-start-3 row-start-1 self-center text-[22px] font-black md:col-start-4">→</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
