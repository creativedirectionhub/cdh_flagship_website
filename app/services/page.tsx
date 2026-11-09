import type { Metadata } from "next";
import Link from "next/link";
import WorkCard from "../components/WorkCard";
import WaysToStart from "../components/WaysToStart";
import { BOOKING_URL } from "../config";
import { bySlug } from "../content/work";
import { disciplines, faqs, takes } from "../content/services";

export const metadata: Metadata = {
  title: { absolute: "Brand Identity, Logo, Packaging & Social Media Branding Services | CDH" },
  description: "Brand identity, logo design, packaging design, social media branding and brand rollout. Three packages, The Mark, The Identity and The World, with one creative director over all of it.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  const book = BOOKING_URL || "/start";
  const bookProps = BOOKING_URL ? { target: "_blank", rel: "noopener" } : {};
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      ...disciplines.map((d) => ({
        "@type": "Service",
        name: d.name,
        serviceType: d.name,
        description: d.what,
        provider: { "@id": "https://www.creativedirectionhub.com/#org" },
        areaServed: "Worldwide",
        url: `https://www.creativedirectionhub.com/services#${d.id}`,
      })),
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.creativedirectionhub.com/" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://www.creativedirectionhub.com/services" },
      ] },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="gutter py-16 md:py-24">
        <div className="mx-auto max-w-[1440px]">
          <p className="slate text-gaffer">Services</p>
          <h1 className="mt-4 text-[clamp(48px,8vw,128px)] font-black leading-[0.9] tracking-tightest">Five ways we put you on your <span className="tape-word"><i aria-hidden="true" className="tape-edge" /><b>mark.</b></span></h1>
          <p className="mt-6 max-w-[52ch] text-[18px] leading-[1.55] text-body">Five services, one director. Start with the mark or build the whole world. Every service is directed by the same person, so the brand looks the same from the logo to the last post.</p>
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
                <h2 id={`${d.id}-title`} className="mt-4 text-[clamp(44px,6vw,96px)] font-black leading-[0.92] tracking-tighter">{d.name}<span className="text-gaffer">.</span></h2>
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

      <section id="takes" className="gutter scroll-mt-20 border-t border-line py-20 md:py-28" aria-labelledby="takes-title">
        <div className="mx-auto max-w-[1440px]">
          <p className="slate text-gaffer">Packages</p>
          <h2 id="takes-title" className="reveal mt-4 text-[clamp(44px,6vw,96px)] font-black leading-[0.92] tracking-tighter">Three takes.</h2>
          <p className="mt-6 max-w-[52ch] text-[18px] leading-[1.55] text-body">Most brands start with one of these. Each is quoted on a call with a fixed price before anything starts.</p>
          <ol className="reveal mt-14 grid gap-6 lg:grid-cols-3">
            {takes.map((t, n) => (
              <li key={t.id} id={t.id} className={`flex flex-col rounded-md border p-7 md:p-9 ${n === 2 ? "border-gaffer" : "border-line"} bg-surface`}>
                <span className="tape-name-wrap self-start" style={{ ["--tilt" as string]: `${[-2, 1.5, -1][n]}deg` }}><span className="tape-name tape-edge !text-[clamp(18px,1.6vw,24px)]">{t.take}</span></span>
                <h3 className="mt-8 text-[clamp(32px,3vw,44px)] font-black leading-none tracking-tighter">{t.name}</h3>
                <p className="mt-3 text-[16px] leading-[1.5] text-muted">{t.for}</p>
                <ul className="mt-6 grid border-t border-line">
                  {t.items.map((it) => (
                    <li key={it} className="relative border-b border-line py-3.5 pl-7 text-[16px] font-semibold leading-[1.4]"><span aria-hidden="true" className="absolute left-0 top-[20px] h-[3px] w-3 bg-gaffer" />{it}</li>
                  ))}
                </ul>
                <a href={book} {...bookProps} className={`mt-8 self-start ${n === 2 ? "btn-primary" : "btn-secondary"}`}>Start {t.take}</a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <WaysToStart />

      <section id="faq" className="gutter scroll-mt-20 border-t border-line py-20 md:py-28" aria-labelledby="faq-title">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="reveal min-w-0">
            <p className="slate text-muted">Questions</p>
            <h2 id="faq-title" className="mt-4 text-[clamp(40px,5.6vw,84px)] font-black leading-[0.92] tracking-tighter">Before you ask.</h2>
          </div>
          <div className="reveal min-w-0 border-t border-line">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-line">
                <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-5 text-[20px] font-extrabold tracking-[-0.01em] [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[20px] font-extrabold tracking-[-0.01em]">{f.q}</h3>
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
