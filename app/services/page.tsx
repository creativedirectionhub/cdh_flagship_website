import type { Metadata } from "next";
import Link from "next/link";
import CallSheet from "../components/CallSheet";
import WaysToStart from "../components/WaysToStart";
import { BOOKING_URL } from "../config";
import { faqs, site, takes } from "../content/services";
import { depts, offers } from "../content/offer";

export const metadata: Metadata = {
  title: { absolute: "Branding, Marketing, Websites & Brand Photography Services | CDH" },
  description: "Fourteen services in four departments: branding, marketing (SEO, AEO, GEO, social media, Google Ads, AI marketing), websites and brand photography, with one creative director over all of it.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  const book = BOOKING_URL || "/start";
  const bookProps = BOOKING_URL ? { target: "_blank", rel: "noopener" } : {};
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        name: "Creative Direction Hub services",
        numberOfItems: offers.length,
        itemListElement: offers.map((o, i) => ({ "@type": "ListItem", position: i + 1, name: o.long ?? o.name, url: `${site.url}/services/${o.slug}` })),
      },
      { "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
        { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services` },
      ] },
    ],
  };
  const sheet = [
    { k: "Prod.", v: "Creative Direction Hub" },
    { k: "Scenes", v: String(offers.length) },
    { k: "Depts.", v: String(depts.length) },
    { k: "Director", v: "One" },
    { k: "First call", v: "Free Creative Audit" },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="gutter pb-10 pt-16 md:pb-14 md:pt-24">
        <div className="mx-auto max-w-[1440px]">
          <p className="slate text-gaffer">Services · The call sheet</p>
          <h1 className="rise mt-4 text-[clamp(52px,9vw,152px)] font-black leading-[0.88] tracking-tightest">Fourteen scenes.{" "}<br />One <span className="tape-word ml-[0.1em]"><i aria-hidden="true" className="tape-edge tape-slap" /><b>director.</b></span></h1>
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
            <p className="max-w-[48ch] text-[19px] leading-[1.55] text-body">Everything a growing business needs to look right and get found, split into four departments. Hire one scene or the whole shoot. The same director holds the look from the logo to the last search result.</p>
            <ul className="flex flex-wrap gap-3 lg:justify-end">
              {depts.map((d, n) => (
                <li key={d.id}><a href={`#${d.id}`} className="inline-flex min-h-[44px] items-center gap-3 rounded-sm border border-line px-4 text-[15px] font-semibold hover:border-muted"><span className="slate text-[12px] text-muted">0{n + 1}</span>{d.name}</a></li>
              ))}
            </ul>
          </div>
          <dl className="mt-14 grid grid-cols-2 border-2 border-ink/80 sm:grid-cols-3 lg:grid-cols-[1.6fr_.7fr_.7fr_.8fr_1.4fr]">
            {sheet.map((c, i) => (
              <div key={c.k} className={`border-ink/25 p-4 md:p-5 ${i === 0 ? "col-span-2 border-b-2 sm:col-span-3 lg:col-span-1 lg:border-b-0 lg:border-r-2" : i < sheet.length - 1 ? "border-r-2 max-sm:[&:nth-child(3)]:border-r-0 max-sm:border-b-2 lg:border-b-0" : "max-lg:col-span-2 sm:max-lg:col-span-1"}`}>
                <dt className="slate text-[12px] text-muted">{c.k}</dt>
                <dd className={`mt-1 text-[clamp(20px,2.2vw,30px)] font-black leading-none tracking-[-0.02em] ${c.k === "Scenes" ? "text-gaffer" : ""}`}>{c.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="gutter pb-20 md:pb-28" aria-label="All services">
        <div className="mx-auto max-w-[1440px]">
          <CallSheet />
        </div>
      </section>

      <section id="takes" className="gutter scroll-mt-20 border-t border-line bg-raised py-20 md:py-28" aria-labelledby="takes-title">
        <div className="mx-auto max-w-[1440px]">
          <p className="slate text-gaffer">Branding packages</p>
          <h2 id="takes-title" className="reveal mt-4 text-[clamp(44px,6vw,96px)] font-black leading-[0.92] tracking-tighter">Three takes.</h2>
          <p className="mt-6 max-w-[52ch] text-[18px] leading-[1.55] text-body">Most branding projects come in one of three sizes. Each is quoted on a call, with a fixed price before anything starts.</p>
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
          <p className="mt-10 text-[16px] text-muted">Marketing, websites and photography are scoped one at a time. <Link href="/start#project" className="font-semibold text-ink underline decoration-gaffer decoration-2 underline-offset-4 hover:text-gaffer">Tell us what you need.</Link></p>
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
                <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[20px] font-extrabold tracking-[-0.01em]">{f.q}</h3>
                  <span aria-hidden="true" className="relative h-4 w-4 shrink-0">
                    <span className="absolute left-0 top-[7px] h-[2px] w-4 bg-gaffer" />
                    <span className="absolute left-[7px] top-0 h-4 w-[2px] bg-gaffer transition-transform group-open:scale-y-0" />
                  </span>
                </summary>
                <p className="max-w-[62ch] pb-6 text-[17px] leading-[1.6] text-body">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
