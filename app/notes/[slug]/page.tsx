import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import WaysToStart from "../../components/WaysToStart";
import { noteBySlug, notes } from "../../content/notes";
import { offerBySlug, pad2, sceneOf } from "../../content/offer";
import { site } from "../../content/services";

export const dynamicParams = false;
export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const n = noteBySlug(params.slug);
  if (!n) return {};
  return {
    title: n.title,
    description: n.answer.length > 158 ? `${n.answer.slice(0, n.answer.lastIndexOf(". ", 156) + 1)}` : n.answer,
    alternates: { canonical: `/notes/${n.slug}` },
    openGraph: { type: "article", title: n.title, description: n.answer, publishedTime: n.date },
  };
}

export default function NotePage({ params }: { params: { slug: string } }) {
  const n = noteBySlug(params.slug);
  if (!n) notFound();
  const url = `${site.url}/notes/${n.slug}`;
  const related = n.services.map(offerBySlug).filter((o): o is NonNullable<typeof o> => Boolean(o));
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: n.title,
        description: n.answer,
        datePublished: n.date,
        dateModified: n.date,
        mainEntityOfPage: url,
        author: { "@id": `${site.url}/#org` },
        publisher: { "@id": `${site.url}/#org` },
        about: related.map((o) => ({ "@id": `${site.url}/services/${o.slug}#service` })),
      },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
        { "@type": "ListItem", position: 2, name: "Notes", item: `${site.url}/notes` },
        { "@type": "ListItem", position: 3, name: n.title, item: url },
      ] },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <article>
        <header className="gutter pb-14 pt-10 md:pb-20 md:pt-16">
          <div className="mx-auto max-w-[1440px]">
            <nav aria-label="Breadcrumb" className="slate flex items-center gap-x-3 text-[12px] text-muted">
              <Link href="/notes" className="inline-flex min-h-[44px] items-center hover:text-gaffer">Notes</Link>
              <span aria-hidden="true">/</span>
              <time dateTime={n.date} className="text-ink">{new Date(`${n.date}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}</time>
            </nav>
            <h1 className="rise mt-6 max-w-[18ch] text-[clamp(40px,6.4vw,104px)] font-black leading-[0.92] tracking-tightest">{n.title}</h1>
          </div>
        </header>
        <section className="bone gutter py-16 md:py-24" aria-label="The short answer">
          <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[minmax(0,0.3fr)_minmax(0,1fr)]">
            <h2 className="slate text-gaffer">The short answer</h2>
            <p className="max-w-[30ch] text-[clamp(26px,3.2vw,48px)] font-extrabold leading-[1.1] tracking-[-0.025em]">{n.answer}</p>
          </div>
        </section>
        <div className="gutter py-16 md:py-24">
          <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[minmax(0,0.3fr)_minmax(0,0.7fr)_minmax(0,0.3fr)]">
            <div aria-hidden="true" className="hidden lg:block" />
            <div className="min-w-0">
              {n.sections.map((s, i) => (
                <section key={s.h} className={i ? "mt-14" : ""}>
                  <h2 className="text-[clamp(28px,3vw,44px)] font-black leading-[1] tracking-tighter"><span className="slate mr-4 align-middle text-[12px] text-gaffer">{pad2(i + 1)}</span>{s.h}</h2>
                  {s.p.map((p) => <p key={p} className="mt-5 max-w-[62ch] text-[19px] leading-[1.65] text-body">{p}</p>)}
                </section>
              ))}
            </div>
            <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start" aria-label="Services in this note">
              <p className="slate text-muted">On the call sheet</p>
              <ul className="mt-4 border-t border-line">
                {related.map((o) => (
                  <li key={o.slug} className="border-b border-line">
                    <Link href={`/services/${o.slug}`} className="flex min-h-[56px] items-baseline gap-3 py-3 text-[20px] font-extrabold tracking-[-0.015em] hover:text-gaffer"><span className="slate text-[12px] text-muted">{pad2(sceneOf(o.slug))}</span>{o.name}</Link>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </article>
      <WaysToStart />
    </>
  );
}
