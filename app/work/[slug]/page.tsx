import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CaseMedia from "../../components/CaseMedia";
import WorkCard from "../../components/WorkCard";
import { BOOKING_URL } from "../../config";
import { cases, bySlug, DISCIPLINES, LABELS, LANES } from "../../content/work";

export const dynamicParams = false;
export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = bySlug(params.slug);
  if (!c) return {};
  const image = c.cover.kind === "image" ? c.cover.src : c.cover.poster;
  return {
    title: `${c.title} · ${c.client}`,
    description: c.brief,
    alternates: { canonical: `/work/${c.slug}` },
    openGraph: { title: `${c.client}: ${c.title}`, description: c.brief, images: [{ url: image }] },
  };
}

export default function CasePage({ params }: { params: { slug: string } }) {
  const c = bySlug(params.slug);
  if (!c) notFound();
  const i = cases.findIndex((x) => x.slug === c.slug);
  const next = cases[(i + 1) % cases.length];
  const book = BOOKING_URL || "/start";
  const lead = c.media[0];
  const rest = c.media.slice(lead.w >= lead.h ? 1 : 2);

  return (
    <>
      <article>
        <header className="gutter pb-10 pt-12 md:pt-20">
          <div className="mx-auto max-w-[1440px]">
            <p className="flex flex-wrap items-center gap-3">
              <Link href="/work" className="slate text-muted hover:text-gaffer">Work</Link>
              <span className="slate text-muted" aria-hidden="true">/</span>
              <span className="slate text-ink">{c.client}</span>
              <span className={`slate rounded-tape border px-2 py-1 text-[12px] ${c.label === "client" ? "border-gaffer text-gaffer" : "border-line text-muted"}`}>{LABELS[c.label]}</span>
            </p>
            <h1 className="t-xl mt-6">{c.title}</h1>
            <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-20">
              <p className="max-w-[48ch] text-[20px] leading-[1.5] text-body md:text-[24px]">{c.brief}</p>
              <dl className="grid gap-5 border-t border-line pt-6 text-[15px] sm:grid-cols-2">
                <div><dt className="slate text-[12px] text-muted">For</dt><dd className="mt-1 font-semibold">{c.lanes.map((l) => LANES[l]).join(", ")}</dd></div>
                <div><dt className="slate text-[12px] text-muted">Discipline</dt><dd className="mt-1 font-semibold">{c.disciplines.map((d) => DISCIPLINES[d]).join(", ")}</dd></div>
                {c.year && <div><dt className="slate text-[12px] text-muted">Year</dt><dd className="mt-1 font-semibold">{c.year}</dd></div>}
                <div>
                  <dt className="slate text-[12px] text-muted">What we did</dt>
                  <dd className="mt-1"><ul className="grid gap-1 font-semibold">{c.did.map((d) => <li key={d}>{d}</li>)}</ul></dd>
                </div>
              </dl>
            </div>
          </div>
        </header>

        <div className="gutter">
          <div className="mx-auto max-w-[1440px]">
            {lead.w >= lead.h ? (
              <CaseMedia m={lead} sizes="(min-width: 1440px) 1296px, 92vw" priority className="rounded-md border border-line" label={lead.caption} />
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {c.media.slice(0, 2).map((m, n) => (
                  <CaseMedia key={m.src} m={m} sizes="(min-width: 768px) 46vw, 92vw" priority={n === 0} className="rounded-md border border-line" label={m.caption} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bone gutter mt-16 py-16 md:mt-24 md:py-24">
          <div className="mx-auto max-w-[1440px]">
            {rest.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2">
                {rest.map((m, n) => (
                  <figure key={m.src + n} className={`reveal min-w-0 ${m.w > m.h ? "md:col-span-2" : ""}`}>
                    <CaseMedia m={m} sizes={m.w > m.h ? "(min-width: 768px) 62vw, 92vw" : "(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 92vw"} className="rounded-md border border-line" />
                    {m.caption && <figcaption className="slate mt-3 text-[12px] text-muted">{m.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            )}
          </div>
        </div>

        <footer className="bone gutter pb-16 md:pb-24">
          <div className="mx-auto grid max-w-[1440px] gap-12 border-t border-line pt-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div className="min-w-0">
              <p className="slate text-muted">Credits</p>
              <ul className="mt-5 grid gap-2 text-[17px] font-semibold">
                {c.credits.map((cr) => <li key={cr}>{cr}</li>)}
              </ul>
              {(c.ai || c.notice) && <p className="mt-6 max-w-[48ch] text-[14px] leading-[1.5] text-muted">{[c.ai, c.notice].filter(Boolean).join(" ")}</p>}
            </div>
            <div className="min-w-0 rounded-md bg-[#121110] p-7 text-[#efe9df] md:p-9">
              <p className="slate text-gaffer">Want this for your brand?</p>
              <p className="t-m mt-4">Let's find your mark.</p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link href="/start" className="btn-primary">Get a Free Creative Audit</Link>
                <a href={book} {...(BOOKING_URL ? { target: "_blank", rel: "noopener" } : {})} className="inline-flex min-h-[52px] items-center justify-center rounded-sm border border-[#efe9df]/30 px-7 text-[16px] font-semibold hover:border-[#efe9df]">Book a call</a>
              </div>
            </div>
          </div>
        </footer>
      </article>

      <section className="gutter border-t border-line py-16 md:py-24" aria-labelledby="next-title">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)]">
          <h2 id="next-title" className="t-m">Next up.</h2>
          <div className="max-w-[720px]"><WorkCard c={next} sizes="(min-width: 1024px) 50vw, 92vw" big /></div>
        </div>
      </section>
    </>
  );
}
