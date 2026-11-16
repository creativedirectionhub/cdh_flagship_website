import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SceneSlate from "../../components/SceneSlate";
import WorkCard from "../../components/WorkCard";
import WaysToStart from "../../components/WaysToStart";
import { BOOKING_URL } from "../../config";
import { bySlug } from "../../content/work";
import { site } from "../../content/services";
import { deptById, offerBySlug, offers, pad2, sceneOf } from "../../content/offer";
import { notesFor } from "../../content/notes";

export const dynamicParams = false;
export function generateStaticParams() {
  return offers.map((o) => ({ slug: o.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const o = offerBySlug(params.slug);
  if (!o) return {};
  return {
    title: { absolute: o.meta.title },
    description: o.meta.description,
    alternates: { canonical: `/services/${o.slug}` },
    openGraph: { title: `${o.long ?? o.name} · Creative Direction Hub`, description: o.answer },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const o = offerBySlug(params.slug);
  if (!o) notFound();
  const d = deptById(o.dept);
  const scene = sceneOf(o.slug);
  const prev = offers[(scene - 2 + offers.length) % offers.length];
  const next = offers[scene % offers.length];
  const proof = o.proof.map(bySlug).filter((c): c is NonNullable<typeof c> => Boolean(c));
  const book = BOOKING_URL || "/start";
  const bookProps = BOOKING_URL ? { target: "_blank", rel: "noopener" } : {};
  const pageUrl = `${site.url}/services/${o.slug}`;
  // "Logo design." with the last word on tape; "What is logo design?" with acronyms and names left alone.
  const words = o.name.split(" ");
  const tail = words.pop();
  const head = words.join(" ");
  const asked = /^(SEO|AEO|GEO|AI|Google)\b/.test(o.name) ? o.name : o.name[0].toLowerCase() + o.name.slice(1);

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: o.long ?? o.name,
        alternateName: o.long ? o.name : undefined,
        serviceType: o.long ?? o.name,
        category: d.name,
        description: o.answer,
        url: pageUrl,
        provider: { "@id": `${site.url}/#org` },
        areaServed: "Worldwide",
        hasOfferCatalog: { "@type": "OfferCatalog", name: "What you get", itemListElement: o.get.map((g) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: g } })) },
      },
      { "@type": "FAQPage", mainEntity: o.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
        { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services` },
        { "@type": "ListItem", position: 3, name: o.name, item: pageUrl },
      ] },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      {/* Slate */}
      <section className="gutter pb-16 pt-10 md:pb-24 md:pt-16">
        <div className="mx-auto max-w-[1440px]">
          <nav aria-label="Breadcrumb" className="slate flex flex-wrap items-center gap-x-3 text-[12px] text-muted">
            <Link href="/services" className="inline-flex min-h-[44px] items-center hover:text-gaffer">Services</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/services#${d.id}`} className="inline-flex min-h-[44px] items-center hover:text-gaffer">{d.name}</Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink" aria-current="page">Scene {pad2(scene)}</span>
          </nav>
          <div className="mt-6 grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
            <div className="min-w-0">
              <h1 className={`rise font-black leading-[0.86] tracking-tightest ${o.name.length <= 4 ? "text-[clamp(112px,17vw,260px)]" : "text-[clamp(56px,9.4vw,168px)]"}`}>
                {head && <>{head} </>}<span className={`tape-word ${head ? "ml-[0.1em]" : "ml-[0.08em]"}`}><i aria-hidden="true" className="tape-edge tape-slap" /><b>{tail}.</b></span>
                {o.long && <span className="slate mt-5 block text-[13px] leading-normal tracking-[0.14em] text-muted">{o.long}</span>}
              </h1>
              <p className="mt-8 max-w-[22ch] text-[clamp(26px,3vw,44px)] font-extrabold leading-[1.05] tracking-[-0.02em]">{o.line}</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/start" className="btn-primary">Get a Free Creative Audit</Link>
                <a href={book} {...bookProps} className="btn-secondary">Book a call</a>
              </div>
            </div>
            <SceneSlate scene={scene} dept={d.name} shape={o.shape} />
          </div>
        </div>
      </section>

      {/* The answer, in one line */}
      <section className="bone gutter py-20 md:py-28" aria-labelledby="answer-title">
        <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[minmax(0,0.3fr)_minmax(0,1fr)]">
          <h2 id="answer-title" className="slate text-gaffer">What is {asked}?</h2>
          <p className="reveal max-w-[28ch] text-[clamp(28px,3.6vw,56px)] font-extrabold leading-[1.08] tracking-[-0.025em]">{o.answer}</p>
        </div>
      </section>

      {/* How we do it, what you get */}
      <section className="gutter py-20 md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div className="reveal min-w-0">
            <h2 className="slate text-muted">How we do it</h2>
            <div className="mt-5 grid gap-5">
              {o.body.map((p, i) => (
                <p key={i} className={i === 0 ? "max-w-[36ch] text-[clamp(22px,2.2vw,30px)] font-semibold leading-[1.3] tracking-[-0.01em]" : "max-w-[52ch] text-[18px] leading-[1.6] text-body"}>{p}</p>
              ))}
            </div>
            <h2 className="slate mt-14 text-muted">Call us when</h2>
            <ul className="mt-5 grid gap-3">
              {o.when.map((w, i) => (
                <li key={w} className="tape-name-wrap self-start justify-self-start" style={{ ["--tilt" as string]: `${[-1.2, 0.8, -0.6][i % 3]}deg` }}>
                  <span className="tape-name tape-name-bone tape-edge !whitespace-normal !text-[clamp(17px,1.5vw,22px)] !leading-[1.15]">{w}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal min-w-0">
            <h2 className="slate text-muted">What you get</h2>
            <ul className="mt-5 grid border-t border-line">
              {o.get.map((g, i) => (
                <li key={g} className="grid grid-cols-[40px_minmax(0,1fr)] items-baseline border-b border-line py-5 text-[clamp(18px,1.5vw,22px)] font-semibold leading-[1.35]">
                  <span className="slate text-[12px] text-gaffer">{pad2(i + 1)}</span>{g}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-[46ch] text-[15px] leading-[1.55] text-muted">Fixed scope and price agreed before we start. Two rounds of revisions. You own the work once it's paid for.</p>
          </div>
        </div>
      </section>

      {/* Proof */}
      {proof.length > 0 && (
        <section className="gutter border-t border-line bg-raised py-20 md:py-28" aria-labelledby="proof-title">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end">
              <h2 id="proof-title" className="reveal text-[clamp(40px,6vw,96px)] font-black leading-[0.92] tracking-tighter">On the monitor.</h2>
              {o.proofNote && <p className="max-w-[46ch] text-[17px] leading-[1.55] text-body">{o.proofNote}</p>}
            </div>
            <div className={`reveal mt-12 grid gap-8 ${proof.length > 1 ? "md:grid-cols-2" : "md:max-w-[760px]"}`}>
              {proof.map((c) => <WorkCard key={c.slug} c={c} big={proof.length === 1} sizes="(min-width: 768px) 46vw, 92vw" />)}
            </div>
          </div>
        </section>
      )}

      {/* Questions */}
      <section className="gutter border-t border-line py-20 md:py-28" aria-labelledby="faq-title">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="reveal min-w-0">
            <p className="slate text-muted">Questions</p>
            <h2 id="faq-title" className="mt-4 text-[clamp(40px,5.6vw,84px)] font-black leading-[0.92] tracking-tighter">Before you ask.</h2>
          </div>
          <div className="reveal min-w-0 border-t border-line">
            {o.faq.map((f, i) => (
              <details key={f.q} className="group border-b border-line" open={i === 0}>
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

      {notesFor(o.slug).length > 0 && (
        <section className="gutter border-t border-line py-14 md:py-20" aria-labelledby="notes-title">
          <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <h2 id="notes-title" className="slate text-muted">Read before you hire anyone</h2>
            <ul className="border-t border-line">
              {notesFor(o.slug).map((n) => (
                <li key={n.slug} className="border-b border-line">
                  <Link href={`/notes/${n.slug}`} className="block py-5 text-[clamp(20px,2vw,28px)] font-extrabold leading-[1.15] tracking-[-0.015em] hover:text-gaffer">{n.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Next scene */}
      <nav aria-label="More services" className="gutter border-t border-line">
        <div className="mx-auto grid max-w-[1440px] md:grid-cols-2">
          {[{ o: prev, k: "Previous scene" }, { o: next, k: "Next scene" }].map(({ o: x, k }, i) => (
            <Link key={k} href={`/services/${x.slug}`} className={`group block py-10 md:py-16 ${i === 1 ? "border-t border-line md:border-l md:border-t-0 md:pl-12 md:text-right" : "md:pr-12"}`}>
              <span className="slate text-[12px] text-muted">{k} · {pad2(sceneOf(x.slug))}</span>
              <span className="mt-3 block text-[clamp(32px,4.4vw,72px)] font-black leading-[0.95] tracking-tighter transition-colors group-hover:text-gaffer">{x.name}</span>
            </Link>
          ))}
        </div>
      </nav>

      <WaysToStart />
    </>
  );
}
