import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BirdieMark from "../../components/BirdieMark";
import WorkCard from "../../components/WorkCard";
import { BOOKING_URL } from "../../config";
import { bySlug, shownCases } from "../../content/work";

const SLUG = "black-birdie-farms";
const base = "https://www.creativedirectionhub.com";

const boards = [
  { src: "board-01.webp", slate: "Board 01 · The world", alt: "Black Birdie Farms hero: golden oyster, pink oyster, lion's mane and shiitake mushrooms on kraft paper in a barn at dawn, with the Black Birdie Farms logo in cream and gold" },
  { src: "board-02.webp", slate: "Board 02 · The mark", alt: "The logo system: the primary mark of a blackbird whose wing is an oyster mushroom, a horizontal lockup on dark brown, a one-color version on gold, and a round farm stamp on moss green" },
  { src: "board-03.webp", slate: "Board 03 · Color and type", alt: "Color and type: Fraunces for headlines, IBM Plex Mono for the stamp on every bag, Instrument Sans for reading, and the palette Forest Floor, Spore, Golden Oyster, Moss and Pink Oyster" },
  { src: "board-04.webp", slate: "Board 04 · Packaging", alt: "Packaging: three kraft pouches with cream labels for dried shiitake, lion's mane and golden oyster, and a black Pink Oyster Grow Kit box with the farm stamp" },
  { src: "board-05.webp", slate: "Board 05 · The farm", alt: "The farm: a painted Black Birdie Farms sign by the drive in front of a black barn, a hoop house, hens and goats; a grow room of golden and pink oyster mushrooms; a farmer's hands lifting a pink oyster cluster" },
  { src: "board-06.webp", slate: "Board 06 · Social and merch", alt: "Social and merch: a nine-post Instagram grid mixing farm photography with typographic posts in brand colors, and a black tote and cream cap with the logo on a fence post" },
];

export const metadata: Metadata = {
  title: "Black Birdie Farms · Brand identity for a gourmet mushroom farm",
  description: "A full brand identity for Black Birdie Farms, a gourmet mushroom farm: a blackbird whose wing is an oyster mushroom, packaging, signage, social and merch.",
  alternates: { canonical: `/work/${SLUG}` },
  openGraph: { title: "Black Birdie Farms: brand identity", description: "A blackbird whose wing is an oyster mushroom. Logo, packaging, signage, social and merch for a gourmet mushroom farm.", images: [{ url: `/work/${SLUG}/board-01.webp` }] },
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
      { "@type": "CreativeWork", name: "Black Birdie Farms: brand identity", description: c.brief, url: `${base}/work/${SLUG}`, image: `${base}/work/${SLUG}/board-01.webp`, creator: { "@id": `${base}/about#willie` }, publisher: { "@id": `${base}/#org` }, genre: "Brand identity, Logo design, Packaging design, Social media branding" },
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
              <div className="grid h-[180px] w-[180px] place-items-center rounded-full bg-[#F1EADB] md:h-[240px] md:w-[240px]">
                <BirdieMark className="w-[78%]" />
              </div>
            </div>

            <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-20">
              <div className="grid max-w-[60ch] gap-6 text-[19px] leading-[1.6] text-body md:text-[21px]">
                <p>Black Birdie started as Willie&apos;s own brand, a bird holding a golf tee. Now it&apos;s a farm: gourmet mushrooms grown, processed and sold by hand, with hens, goats and a garden around them. The brand had to feel like soil, morning light and a good kitchen, and still be the same bird.</p>
                <p>Mushrooms are the main character, so rule one was to stay away from the red toadstool most mushroom brands reach for, which reads as a fairy tale or worse. The answer was in the oyster mushroom itself: a fan of gills that already looks like a wing. So the blackbird&apos;s wing became an oyster mushroom, and its beak and feet took the golden oyster&apos;s color. Everything else came from the farm: forest-floor brown, spore cream, moss green and pink oyster.</p>
              </div>
              <div className="border-t border-line pt-6">
                <h2 className="slate text-[12px] text-muted">Deliverables</h2>
                <ul className="mt-4 grid gap-2 text-[18px] font-semibold">
                  {["Logo design", "Brand identity", "Color and type", "Packaging design", "Social media branding", "Signage and merch"].map((d) => (
                    <li key={d} className="flex items-center gap-3"><span aria-hidden="true" className="h-[3px] w-3 bg-gaffer" />{d}</li>
                  ))}
                </ul>
                <p className="slate mt-8 text-[12px] text-muted">Logo, system and layouts designed by CDH. Photography is AI-generated; packaging, signage and merch are mockups.</p>
              </div>
            </div>
          </div>
        </header>

        <div className="gutter">
          <div className="mx-auto grid max-w-[1440px] gap-6 md:gap-10">
            {boards.map((b, n) => (
              <figure key={b.src} className={n === 0 ? "" : "reveal"}>
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
