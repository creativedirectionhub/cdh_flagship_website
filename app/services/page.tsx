import type { Metadata } from "next";
import Link from "next/link";
import WorkCard from "../components/WorkCard";
import WaysToStart from "../components/WaysToStart";
import { BOOKING_URL } from "../config";
import { bySlug } from "../content/work";
import { disciplines, faqs } from "../content/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Brand, campaigns and ads, content and production, and digital. One creative director over all four, and a network to make it.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  const book = BOOKING_URL || "/start";
  const bookProps = BOOKING_URL ? { target: "_blank", rel: "noopener" } : {};
  return (
    <>
      <section className="gutter py-16 md:py-24">
        <div className="mx-auto max-w-[1440px]">
          <p className="slate text-gaffer">Services</p>
          <h1 className="t-xl mt-4">Five ways we put you on your <span className="tape-word"><i aria-hidden="true" className="tape-edge" /><b>mark.</b></span></h1>
          <p className="mt-6 max-w-[52ch] text-[18px] leading-[1.55] text-body">Five disciplines, one director. Pick the one you need now; the others are there when you need them, with the same person holding the look.</p>
          <ol className="mt-12 flex flex-wrap gap-3">
            {disciplines.map((d, n) => (
              <li key={d.id}><a href={`#${d.id}`} className="inline-flex min-h-[44px] items-center gap-3 rounded-sm border border-line px-4 text-[15px] font-semibold hover:border-muted"><span className="slate text-[12px] text-muted">0{n + 1}</span>{d.name}</a></li>
            ))}
          </ol>
        </div>
      </section>

      {disciplines.map((d, n) => (
        <section key={d.id} id={d.id} className={`gutter scroll-mt-20 border-t border-line py-20 md:py-28 ${n % 2 === 1 ? "bg-raised" : ""}`} aria-labelledby={`${d.id}-title`}>
          <div className="mx-auto max-w-[1440px]">
            <div className="reveal grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
              <div className="min-w-0">
                <p className="slate text-muted">0{n + 1}</p>
                <h2 id={`${d.id}-title`} className="t-l mt-4">{d.name}<span className="text-gaffer">.</span></h2>
                <p className="mt-4 text-[22px] font-semibold leading-[1.3] tracking-[-0.01em]">{d.short}</p>
                <p className="mt-6 max-w-[50ch] text-[17px] leading-[1.6] text-body">{d.what}</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a href={book} {...bookProps} className="btn-primary">Book a call</a>
                  <Link href="/start" className="btn-secondary">Free audit first</Link>
                </div>
              </div>
              <div className="min-w-0">
                <p className="slate text-muted">What you get</p>
                <ul className="mt-5 grid border-t border-line">
                  {d.get.map((g) => (
                    <li key={g} className="relative border-b border-line py-4 pl-7 text-[17px] font-semibold leading-[1.4]">
                      <span aria-hidden="true" className="absolute left-0 top-[22px] h-[3px] w-3 bg-gaffer" />{g}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="reveal mt-14 grid gap-8 md:grid-cols-2">
              {d.proof.map((slug) => { const c = bySlug(slug); return c ? <WorkCard key={slug} c={c} sizes="(min-width: 768px) 46vw, 92vw" /> : null; })}
            </div>
          </div>
        </section>
      ))}

      <WaysToStart />

      <section id="faq" className="gutter scroll-mt-20 border-t border-line py-20 md:py-28" aria-labelledby="faq-title">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="reveal min-w-0">
            <p className="slate text-muted">Questions</p>
            <h2 id="faq-title" className="t-l mt-4">Before you ask.</h2>
          </div>
          <div className="reveal min-w-0 border-t border-line">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-line">
                <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-5 text-[20px] font-extrabold tracking-[-0.01em] [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden="true" className="relative h-4 w-4 shrink-0">
                    <span className="absolute left-0 top-[7px] h-[2px] w-4 bg-gaffer" />
                    <span className="absolute left-[7px] top-0 h-4 w-[2px] bg-gaffer transition-transform group-open:scale-y-0" />
                  </span>
                </summary>
                <p className="max-w-[62ch] pb-6 text-[17px] leading-[1.6] text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
