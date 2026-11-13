import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import BirdieMark from "../../components/BirdieMark";
import WorkCard from "../../components/WorkCard";
import { BOOKING_URL } from "../../config";
import { bySlug, shownCases } from "../../content/work";

const SLUG = "blac-birdie-farms";
const base = "https://www.creativedirectionhub.com";

const boards = [
  { src: "board-01.webp", slate: "01 · Market day", alt: "Four matte black produce boxes on a black market table at sunrise, filled with grey oyster, pink oyster, yellow oyster and lion's mane mushrooms, each with a cream Blac Birdie Farms variety label" },
  { src: "board-02.webp", slate: "02 · The mark", alt: "The mark: the original Blac Birdie bird, still black, rising out of a dark circle, outlined by a thin cut inside the circle, shown large on cream beside the old Blac Birdie logo" },
  { src: "board-03.webp", slate: "03 · Lockups, seal and pick stamp", alt: "Horizontal and stacked lockups of the mark with the Blac Birdie wordmark and Farms, Magee, Mississippi; a one-color kraft seal reading Blac Birdie Farms, Picked at First Light; and a gold pick stamp reading Picked at first light, 6:40 AM" },
  { src: "board-04.webp", slate: "04 · Color, type and the variety code", alt: "Palette of Blac, Cotton, Kraft and First Light gold; Source Serif 4, IBM Plex Mono and Instrument Sans; and the variety code: slate for grey oyster, pink for pink oyster, yellow for yellow oyster, cream for lion's mane" },
  { src: "board-05.webp", slate: "05 · The ritual", alt: "Hands cradling a just-picked pink oyster cluster in a shaft of first light inside a dark grow room, beside the line Grown in the dark. Picked at first light. and a gold pick-time stamp" },
  { src: "board-06.webp", slate: "06 · Chef flat, care cards, price card", alt: "A kraft 5 lb chef flat with a black band, four variety care cards with keep and cook instructions, including Don't refrigerate for pink oyster, and a black by-the-pound price card" },
  { src: "board-07.webp", slate: "07 · For chefs", alt: "Seared grey and yellow oyster mushrooms and a lion's mane steak basting in butter in a cast iron skillet, beside the line Picked this morning. On your stove tonight." },
  { src: "board-08.webp", slate: "08 · The entrance", alt: "A farm entrance at sunrise in Mississippi: a steel disc with the bird cut free stands on the gate's crossbeam over a red clay drive, with a cut-steel plate reading Blac Birdie Farms, Magee, Mississippi hanging below" },
  { src: "board-09.webp", slate: "09 · Ads", alt: "Three phone story ads: Look for the black tent; Picked before the sun clears the trees; and Lion's mane, seared like a steak" },
];

// Story beats that sit between the boards, so the page reads like a walk through the work.
const beats: Record<number, { kicker: string; line: string }> = {
  1: { kicker: "The mark", line: "Same bird, line for line. Still black. Rising out of the dark it grew up in." },
  4: { kicker: "The ritual", line: "The freshness isn't a promise. It's stamped on the box, to the minute." },
  6: { kicker: "Two customers", line: "Locals buy it by the pound at the black tent. Chefs get it by the flat, picked the morning it ships." },
};

export const metadata: Metadata = {
  title: "Blac Birdie Farms · Brand identity for a Mississippi mushroom farm",
  description: "Brand identity for Blac Birdie Farms in Magee, Mississippi: a black bird rising out of the dark, black market boxes, pick-time stamps, care cards, a chef program, the farm entrance and ads.",
  alternates: { canonical: `/work/${SLUG}` },
  openGraph: { title: "Blac Birdie Farms: brand identity", description: "Grown in the dark. Picked at first light. Logo, packaging, entrance and ads for a Mississippi mushroom farm.", images: [{ url: `/work/${SLUG}/board-01.webp` }] },
};

export default function BlacBirdieFarms() {
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
        { "@type": "ListItem", position: 3, name: "Blac Birdie Farms", item: `${base}/work/${SLUG}` },
      ] },
      { "@type": "CreativeWork", name: "Blac Birdie Farms: brand identity", description: c.brief, url: `${base}/work/${SLUG}`, image: `${base}/work/${SLUG}/board-01.webp`, creator: { "@id": `${base}/about#willie` }, publisher: { "@id": `${base}/#org` }, genre: "Brand identity, Logo design, Packaging design, Social ads" },
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
              <span className="slate text-ink">Blac Birdie Farms</span>
              <span className="slate rounded-tape border border-line px-2 py-1 text-[12px] text-muted">Studio</span>
            </p>
            <div className="mt-8 grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
              <div className="min-w-0">
                <p className="slate text-gaffer">Brand identity / Take 03</p>
                <h1 className="mt-5 text-[clamp(52px,9vw,148px)] font-black leading-[0.88] tracking-tightest">Blac Birdie Farms.</h1>
              </div>
              <div className="grid h-[180px] w-[180px] place-items-center rounded-full bg-[#F3EBDD] md:h-[240px] md:w-[240px]">
                <BirdieMark className="w-[70%]" />
              </div>
            </div>

            <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-20">
              <div className="grid max-w-[60ch] gap-6 text-[19px] leading-[1.6] text-body md:text-[21px]">
                <p>Blac Birdie started as Willie&apos;s own brand, a black bird in flight. Now it&apos;s a farm in Magee, Mississippi, growing grey, pink and yellow oyster and lion&apos;s mane mushrooms for chefs, restaurants and the people who shop the local market.</p>
                <p>Every farm brand reaches for the same barn, rooster and chalkboard, and every table at the market is kraft and green. So this one went black. Mushrooms grow in the dark and get picked at first light, and the brand is built on that true line. The bird rises out of a dark circle, the boxes are matte black so the pink and yellow glow, and every box is stamped with the minute it was picked.</p>
              </div>
              <div className="border-t border-line pt-6">
                <h2 className="slate text-[12px] text-muted">Deliverables</h2>
                <ul className="mt-4 grid gap-2 text-[18px] font-semibold">
                  {["Logo design", "Brand identity", "Color and type", "Packaging and care cards", "Chef program", "Entrance and market signage", "Social ads"].map((d) => (
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
                <figure className={n === 0 ? "" : "reveal"}>
                  <Image src={`/work/${SLUG}/${b.src}`} alt={b.alt} width={2000} height={1350} sizes="(min-width: 1440px) 1296px, 92vw" priority={n === 0} className="h-auto w-full rounded-md border border-line" />
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
