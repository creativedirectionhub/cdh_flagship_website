import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import BirdieMark from "../../components/BirdieMark";
import WorkCard from "../../components/WorkCard";
import { BOOKING_URL } from "../../config";
import { bySlug, shownCases } from "../../content/work";

const SLUG = "black-birdie-farms";
const base = "https://www.creativedirectionhub.com";

const boards = [
  { src: "board-01.webp", slate: "01 · Market day", alt: "A smiling Black farmer in a canvas apron printed with the Black Birdie Farms bird weighs lion's mane on a hanging scale at his market table under a green tent, with kraft boxes of oyster, lion's mane and chestnut mushrooms stamped with the farm seal" },
  { src: "board-02.webp", slate: "02 · The mark", alt: "The mark: the original Blac Birdie blackbird in flight, now carrying a bunch of three chestnut mushrooms in its beak, shown large on cream beside the old Blac Birdie logo and in small sizes on cream, kraft and black" },
  { src: "board-03.webp", slate: "03 · Lockups and the market stamp", alt: "Four lockups: horizontal with the Black Birdie wordmark and Farms, South Mississippi; stacked in cream on black; a round one-color stamp reading Black Birdie Farms, Fresh by the Pound on kraft; and the wordmark alone with the line Mississippi grown. Skillet ready. on pine green" },
  { src: "board-04.webp", slate: "04 · Color, type and the variety code", alt: "Palette of Crow black, Cotton, Kraft, Longleaf green and Chestnut; type specimens of Source Serif 4, IBM Plex Mono and Instrument Sans; and the variety code: slate for oyster, honey for lion's mane, chestnut for chestnut" },
  { src: "board-05.webp", slate: "05 · Fresh by the pound", alt: "Three kraft produce boxes on a market table, filled with oyster, lion's mane and chestnut mushrooms, each with a cream Black Birdie Farms label showing the variety, its Latin name and write-in lines for net weight and pick date" },
  { src: "board-06.webp", slate: "06 · Labels, seals, price card and tent", alt: "The by-the-pound system on kraft: three variety labels, round one-pound and half-pound seals, a black price card listing oyster, lion's mane and chestnut with write-in prices per pound, and a pine-green tent banner with the bird and Black Birdie Farms" },
  { src: "board-07.webp", slate: "07 · Market-day ads", alt: "Three phone story ads: Meet the man who grew your dinner, with the farmer at his tent; Sear it in butter. Thank us later, over a labeled box of lion's mane; and Twisted off the bag. Not off a truck, over hands picking an oyster cluster" },
];

// Story beats that sit between the boards, so the page reads like a walk through the work.
const beats: Record<number, { kicker: string; line: string }> = {
  1: { kicker: "The mark", line: "Same bird, line for line. The tee came out of its beak and a bunch of chestnut mushrooms went in." },
  2: { kicker: "The system", line: "Built to live on kraft. Every lockup works in one color, so it can be a rubber stamp, a screen print or a sticker." },
  4: { kicker: "Fresh by the pound", line: "Nothing is pre-packed. The label leaves room for the weight and the day it was picked, written by hand at the scale." },
};

export const metadata: Metadata = {
  title: "Black Birdie Farms · Brand identity for a south Mississippi mushroom farm",
  description: "Brand identity for Black Birdie Farms, a south Mississippi mushroom farm: the original Blac Birdie bird carrying a bunch of mushrooms, by-the-pound labels, market signage and social ads.",
  alternates: { canonical: `/work/${SLUG}` },
  openGraph: { title: "Black Birdie Farms: brand identity", description: "Same bird, new harvest. Logo, by-the-pound packaging, market signage and ads for a south Mississippi mushroom farm.", images: [{ url: `/work/${SLUG}/board-01.webp` }] },
};

export default function BlackBirdieFarms() {
  const c = bySlug(SLUG)!;
  const i = shownCases.findIndex((x) => x.slug === SLUG);
  const next = shownCases[(i + 1) % shownCases.length];
  const book = BOOKING_URL || "/start";
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
        { "@type": "ListItem", position: 2, name: "Work", item: `${base}/work` },
        { "@type": "ListItem", position: 3, name: "Black Birdie Farms", item: `${base}/work/${SLUG}` },
      ] },
      { "@type": "CreativeWork", name: "Black Birdie Farms: brand identity", description: c.brief, url: `${base}/work/${SLUG}`, image: `${base}/work/${SLUG}/board-01.webp`, creator: { "@id": `${base}/about#willie` }, publisher: { "@id": `${base}/#org` }, genre: "Brand identity, Logo design, Packaging design, Social ads" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <article>
        <header className="gutter pb-14 pt-12 md:pb-20 md:pt-20">
          <div className="mx-auto max-w-[1440px]">
            <p className="flex flex-wrap items-center gap-3">
              <Link href="/work" className="slate text-muted hover:text-gaffer">Work</Link>
              <span className="slate text-muted" aria-hidden="true">/</span>
              <span className="slate text-ink">Black Birdie Farms</span>
              <span className="slate rounded-tape border border-line px-2 py-1 text-[12px] text-muted">Studio</span>
            </p>
            <div className="mt-8 grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
              <div className="min-w-0">
                <p className="slate text-gaffer">Brand identity / Take 03</p>
                <h1 className="mt-5 text-[clamp(52px,9vw,148px)] font-black leading-[0.88] tracking-tightest">Black Birdie Farms.</h1>
              </div>
              <div className="grid h-[180px] w-[180px] place-items-center rounded-full bg-[#F3EBDD] md:h-[240px] md:w-[240px]">
                <BirdieMark className="w-[84%]" />
              </div>
            </div>

            <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-20">
              <div className="grid max-w-[60ch] gap-6 text-[19px] leading-[1.6] text-body md:text-[21px]">
                <p>Blac Birdie was Willie&apos;s own brand: a blackbird in flight with a golf tee in its beak. Now it&apos;s Black Birdie Farms, a farm in south Mississippi run by a Black farmer who grows oyster, lion&apos;s mane and chestnut mushrooms and sells them fresh by the pound at the Saturday market.</p>
                <p>The one rule was that the bird couldn&apos;t change. So it didn&apos;t: we traced the original line for line, took the tee out of its beak and gave it a bunch of chestnut mushrooms, carried home by the stems. Everything around it came from the market table: kraft boxes, a rubber stamp, labels you write the weight on by hand, and the pine green of a tent under longleaf pines.</p>
              </div>
              <div className="border-t border-line pt-6">
                <h2 className="slate text-[12px] text-muted">Deliverables</h2>
                <ul className="mt-4 grid gap-2 text-[18px] font-semibold">
                  {["Logo design", "Brand identity", "Color and type", "By-the-pound labels", "Market signage", "Social ads"].map((d) => (
                    <li key={d} className="flex items-center gap-3"><span aria-hidden="true" className="h-[3px] w-3 bg-gaffer" />{d}</li>
                  ))}
                </ul>
                <p className="slate mt-8 text-[12px] text-muted">Logo, system and layouts designed by CDH. Photography is AI-generated; labels, stamps, signage and ads are mockups placed by CDH.</p>
              </div>
            </div>
          </div>
        </header>

        <div className="gutter">
          <div className="mx-auto grid max-w-[1440px] gap-6 md:gap-10">
            {boards.map((b, n) => (
              <Fragment key={b.src}>
                {beats[n] && (
                  <div className="reveal grid gap-3 py-8 md:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] md:gap-20 md:py-14">
                    <p className="slate text-gaffer">{beats[n].kicker}</p>
                    <p className="max-w-[30ch] text-[clamp(26px,3vw,42px)] font-black leading-[1.08] tracking-[-0.03em]">{beats[n].line}</p>
                  </div>
                )}
                {n === 6 && (
                  <div className="reveal grid items-center gap-8 py-8 md:grid-cols-2 md:gap-16 md:py-14">
                    <figure>
                      <Image src={`/work/${SLUG}/grow.webp`} alt="A Black farmer's hands twisting a fresh grey oyster mushroom cluster off a hanging grow bag in a misty grow room" width={1200} height={1509} sizes="(min-width: 768px) 46vw, 92vw" className="h-auto w-full rounded-md border border-line" />
                      <figcaption className="slate mt-3 text-[12px] text-muted">The grow room</figcaption>
                    </figure>
                    <div className="grid gap-5">
                      <p className="slate text-gaffer">Market-day ads</p>
                      <p className="max-w-[24ch] text-[clamp(26px,3vw,42px)] font-black leading-[1.08] tracking-[-0.03em]">The ads sell the farmer and the pick, not a discount.</p>
                      <p className="max-w-[44ch] text-[18px] leading-[1.6] text-body">Three story ads for the week before market: one for the man who grows it, one for what lion&apos;s mane does in a skillet, one for how it gets picked. Same offer on all three, so the hook is the only thing being tested.</p>
                    </div>
                  </div>
                )}
                <figure className={n === 0 ? "" : "reveal"}>
                  <Image
                    src={`/work/${SLUG}/${b.src}`}
                    alt={b.alt}
                    width={2000}
                    height={1350}
                    sizes="(min-width: 1440px) 1296px, 92vw"
                    priority={n === 0}
                    className="h-auto w-full rounded-md border border-line"
                  />
                  <figcaption className="slate mt-3 text-[12px] text-muted">{b.slate}</figcaption>
                </figure>
              </Fragment>
            ))}
          </div>
        </div>

        <section className="bone gutter mt-16 py-16 md:mt-24 md:py-24" aria-labelledby="note-title">
          <div className="mx-auto grid max-w-[1440px] gap-6 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] lg:gap-20">
            <h2 id="note-title" className="slate text-muted">Director&apos;s note</h2>
            <figure>
              <blockquote className="max-w-[34ch] text-[clamp(26px,3vw,42px)] font-black leading-[1.08] tracking-[-0.03em]">{c.note}</blockquote>
              <figcaption className="slate mt-6 text-muted">Willie Bernoudy, creative director</figcaption>
            </figure>
          </div>
        </section>

        <section className="gutter border-t border-line py-20 md:py-28" aria-labelledby="cta-title">
          <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
            <div className="min-w-0">
              <p className="slate text-gaffer">Want this for your brand?</p>
              <h2 id="cta-title" className="mt-4 text-[clamp(40px,5.6vw,84px)] font-black leading-[0.92] tracking-tighter">Let&apos;s build your world.</h2>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/start#project" className="btn-primary">Start a project</Link>
                <a href={book} {...(BOOKING_URL ? { target: "_blank", rel: "noopener" } : {})} className="btn-secondary">Book a call</a>
              </div>
            </div>
            <div className="min-w-0">
              <p className="slate mb-4 text-muted">Next up.</p>
              <WorkCard c={next} sizes="(min-width: 1024px) 40vw, 92vw" />
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
