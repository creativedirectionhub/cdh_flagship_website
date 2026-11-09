import type { Metadata } from "next";
import Link from "next/link";
import SlateOpener from "./components/SlateOpener";
import WallSection from "./components/WallSection";
import PlayTile from "./components/PlayTile";
import FilmPlayer from "./components/FilmPlayer";
import TapeNames from "./components/TapeNames";
import Showreel from "./components/Showreel";
import DirectedSlider from "./components/DirectedSlider";
import { CommentaryMarker } from "./components/Commentary";
import { readyPairs } from "./content/directed";
import TapeWipe from "./components/TapeWipe";
import { TapeMark } from "./components/Brand";
import { BOOKING_URL } from "./config";
import { clients, brandDeals, brandDealsLine, talent, values, network, process } from "./content/services";

const services: { id: string; name: string; line: string; poster: string; video?: string; alt: string; ai: boolean }[] = [
  { id: "identity", name: "Brand identity", line: "The whole world your brand lives in.", poster: "/work/black-birdie-farms/cover.webp", alt: "Black Birdie Farms: the blackbird mark beside gourmet mushrooms in a barn at dawn", ai: true },
  { id: "logo", name: "Logo design", line: "A mark that means something.", poster: "/work/logo-wall.webp", alt: "Four logos by CDH: Black Birdie Farms, Soulful Ties, Trading One and Good Laughs", ai: false },
  { id: "packaging", name: "Packaging design", line: "Sells before anyone picks it up.", poster: "/work/black-birdie-farms/tile-packaging.webp", alt: "Black Birdie Farms packaging: a golden oyster pouch and a pink oyster grow kit box", ai: true },
  { id: "social", name: "Social media branding", line: "Your feed, looking like a brand.", poster: "/work/gfx-liceria-coffee.webp", alt: "Social design for a cafe: a cold cappuccino with the line Fresh on the menu", ai: false },
  { id: "rollout", name: "Brand rollout", line: "Carried everywhere, the same way.", poster: "/work/spec-blacksox-3.webp", alt: "Billboard layout for the Hattiesburg Black Sox: More Than a Game", ai: false },
];

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { title: "Creative Direction Hub · We put brands on their mark.", description: "Brand identity, logos, packaging and social media branding for consumer brands, personal brands and hospitality, led by Willie Bernoudy." },
};

export default function Home() {
  const book = BOOKING_URL || "/start";
  return (
    <>
      <SlateOpener />

      {/* What we do, in one breath */}
      <section className="gutter py-24 md:py-36" aria-labelledby="breath-title">
        <div className="mx-auto max-w-[1440px]">
          <p className="slate text-gaffer">For consumer brands · personal brands · hospitality</p>
          <h2 id="breath-title" className="reveal mt-6 max-w-[22ch] text-[clamp(34px,4.8vw,76px)] font-black leading-[1] tracking-tighter">
            The brand studio for growing businesses. One director over the identity, the logo, the pack and the feed, <span className="text-muted">and a crew built for every job.</span>
          </h2>
          <div className="mt-16 grid gap-6 md:grid-cols-2 md:gap-8">
            <PlayTile href="/work/hattiesburg-black-sox" poster="/work/blacksox-huddle.webp" alt="The Hattiesburg Black Sox in a huddle on the field before a game, seen from behind, in black and white" kicker="Hattiesburg Black Sox" title="More than a game." label="Client" sizes="(min-width: 768px) 46vw, 92vw" ratio="3 / 2" className="reveal rounded-sm" />
            <PlayTile href="/work/her-mark" poster="/media/her-mark-cover.webp" video="/media/her-mark-cover.mp4" alt="Hot sauce ribbons off a wooden spoon beside a Mama Lou's bottle on an orange tape mark" kicker="The film · Her Mark" title="Same kitchen. Directed." label="AI concept" sizes="(min-width: 768px) 46vw, 92vw" ratio="3 / 2" className="reveal rounded-sm" />
          </div>
        </div>
      </section>

      {/* The film */}
      <section id="film" data-cm="film" className="gutter relative scroll-mt-24 border-t border-line py-24 md:py-32" aria-labelledby="film-title">
        <CommentaryMarker id="film" className="right-5 top-8 md:right-10" />
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end">
            <div className="min-w-0">
              <p className="slate text-gaffer">The film · CDH concept</p>
              <h2 id="film-title" className="reveal mt-5 text-[clamp(44px,7vw,120px)] font-black leading-[0.9] tracking-tightest">Three likes.{" "}<br />Then the crew.</h2>
            </div>
            <p className="reveal max-w-[44ch] text-[18px] leading-[1.6] text-body">A Mississippi baker posts the same pound cake she's made since '87 and gets three likes. She calls in a crew. By morning there's a line around the block. Thirty seconds on what direction does for a business, made with AI performers and directed frame by frame.</p>
          </div>
          <div className="reveal mt-12">
            <FilmPlayer
              poster="/media/heist-film-poster.webp"
              src="/media/heist.mp4"
              srcVertical="/media/heist-sm.mp4"
              alt="The Heist, a CDH concept film with AI performers: a Mississippi baker whose post gets three likes calls in a creative crew, and by morning there is a line around the block"
              title="The Heist."
              length="0:30"
              label="AI concept · AI performers"
            />
          </div>
        </div>
      </section>

      <TapeWipe />

      {/* Who we've worked with */}
      <section data-cm="brands" className="gutter relative py-20 md:py-28" aria-labelledby="brands-title">
        <CommentaryMarker id="brands" className="right-5 top-6 md:right-10" />
        <div className="mx-auto max-w-[1440px]">
          <h2 id="brands-title" className="slate text-muted">Clients and partners</h2>
          <TapeNames names={clients} className="reveal mt-8" />
          <h2 className="slate mt-16 text-muted">Brand deals</h2>
          <p className="mt-3 max-w-[56ch] text-[17px] leading-[1.55] text-body">{brandDealsLine}</p>
          <TapeNames names={brandDeals} tone="bone" className="reveal mt-8" />
          <h2 className="slate mt-16 text-muted">Talent photographed</h2>
          <p className="reveal mt-5 max-w-[60ch] text-[clamp(18px,1.8vw,24px)] font-semibold leading-[1.45] text-body">{talent.join(" · ")}</p>
        </div>
      </section>

      {/* Services teaser */}
      <section className="gutter border-t border-line py-24 md:py-36" aria-labelledby="teaser-title">
        <div className="mx-auto max-w-[1440px]">
          <h2 id="teaser-title" className="reveal text-[clamp(40px,7vw,120px)] font-black leading-[0.92] tracking-tightest">
            A mark that means something. Packs that sell from the shelf. A feed that looks like a brand. <span className="text-gaffer">Carried everywhere, the same way.</span>
          </h2>
          <Link href="/services" className="slate mt-12 inline-flex min-h-[44px] items-end border-b-2 border-gaffer pb-1 pt-3 hover:text-gaffer">See all services</Link>
        </div>
      </section>

      {/* Undirected / directed */}
      {readyPairs.length > 0 && <section data-cm="directed" className="gutter relative border-t border-line py-24 md:py-32" aria-labelledby="directed-title">
        <CommentaryMarker id="directed" className="right-5 top-8 md:right-10" />
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-14 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end">
            <div className="min-w-0">
              <p className="slate text-gaffer">What direction does</p>
              <h2 id="directed-title" className="reveal mt-5 text-[clamp(44px,7vw,120px)] font-black leading-[0.9] tracking-tightest">Same subject.{" "}<br />Directed.</h2>
            </div>
            <p className="reveal max-w-[44ch] text-[18px] leading-[1.6] text-body">Most businesses don&apos;t have a product problem. They have a picture problem. Drag the line to see what changes when someone decides the light, the lens and the frame on purpose.</p>
          </div>
          <DirectedSlider pairs={readyPairs} />
        </div>
      </section>}

      {/* The work */}
      <section className="gutter pb-24 md:pb-36" aria-label="The work">
        <div className="mx-auto max-w-[1440px]">
          <Showreel />
          <Link href="/work" className="slate mt-8 inline-flex min-h-[44px] items-end border-b-2 border-gaffer pb-1 pt-3 hover:text-gaffer">See all the work</Link>
        </div>
      </section>

      <TapeWipe side="right" tilt={1} />

      {/* The crew */}
      <section className="gutter py-24 md:py-32" aria-labelledby="crew-title">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
          <div className="min-w-0">
            <p className="slate text-gaffer">The crew</p>
            <h2 id="crew-title" className="reveal mt-5 text-[clamp(44px,7vw,120px)] font-black leading-[0.9] tracking-tightest">One director.{" "}<br />A crew built for the job.</h2>
          </div>
          <div className="reveal min-w-0">
            <p className="max-w-[46ch] text-[18px] leading-[1.6] text-body">Willie directs every project. A vetted network of {network.slice(0, -1).join(", ").toLowerCase()} and {network[network.length - 1].toLowerCase()} makes it with him, picked for each job. You get the right people without paying for a bench.</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {["Brand", "Campaigns", "Content", "Digital", "AI"].map((t) => (
                <li key={t} className="slate rounded-sm border border-line px-3 py-2 text-[12px] text-body">{t}</li>
              ))}
            </ul>
            <a href="mailto:hello@creativedirectionhub.com?subject=Joining%20the%20CDH%20crew" className="slate mt-10 inline-flex min-h-[44px] items-end border-b-2 border-gaffer pb-1 pt-3 hover:text-gaffer">Work with the crew</a>
          </div>
        </div>
      </section>

      {/* How a project runs */}
      <section data-cm="process" className="gutter relative border-t border-line py-24 md:py-32" aria-labelledby="process-title">
        <CommentaryMarker id="process" className="right-5 top-8 md:right-10" />
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end">
            <div className="min-w-0">
              <p className="slate text-gaffer">How a project runs</p>
              <h2 id="process-title" className="reveal mt-5 text-[clamp(40px,6vw,96px)] font-black leading-[0.92] tracking-tightest">From audit{" "}<br />to results.</h2>
            </div>
            <p className="reveal max-w-[44ch] text-[18px] leading-[1.6] text-body">A fixed scope and a fixed price before anything gets made. Willie directs every project, the first cut lands within 5 business days of an approved brief, and every piece gets two rounds of revisions.</p>
          </div>
          <ol className="mt-14 grid border-t border-line sm:grid-cols-2 lg:grid-cols-5">
            {process.map((p, i) => (
              <li key={p.step} className="reveal border-b border-line py-8 sm:pr-6 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0">
                <span className="slate text-[13px] text-gaffer">0{i + 1}</span>
                <h3 className="mt-4 text-[26px] font-black leading-none tracking-[-0.02em]">{p.step}</h3>
                <p className="mt-3 max-w-[30ch] text-[16px] leading-[1.5] text-muted">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The five services */}
      <section className="gutter border-t border-line py-20 md:py-28" aria-labelledby="five-title">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="five-title" className="text-[clamp(36px,4.8vw,72px)] font-black leading-[0.95] tracking-tighter">Five ways we put you on your mark.</h2>
            <Link href="/services" className="slate inline-flex min-h-[44px] items-end border-b-2 border-gaffer pb-1 pt-3 hover:text-gaffer">All services</Link>
          </div>
          <div className="-mx-5 mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-5">
            {services.map((s, n) => (
              <PlayTile key={s.id} href={`/services#${s.id}`} poster={s.poster} video={s.video} alt={s.alt} kicker={`0${n + 1}`} title={s.name} sub={s.line} label={s.ai ? "AI" : undefined} sizes="(min-width: 1024px) 19vw, (min-width: 640px) 46vw, 92vw" ratio="3 / 4" className="reveal w-[72vw] shrink-0 snap-start rounded-sm sm:w-auto" titleClass="text-[clamp(26px,2.2vw,34px)]" />
            ))}
          </div>
        </div>
      </section>

      {/* MARK */}
      <section className="gutter border-t border-line py-24 md:py-32" aria-labelledby="values-title">
        <div className="mx-auto max-w-[1440px]">
          <p className="slate text-gaffer">What we stand for</p>
          <h2 id="values-title" className="sr-only">Our values spell MARK</h2>
          <ol className="mt-10 grid grid-cols-2 border-t border-line md:grid-cols-4">
            {values.map((v) => (
              <li key={v.l} className="reveal border-b border-line py-8 odd:border-r odd:pr-5 even:pl-5 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:odd:pr-8 md:even:pl-8">
                <span aria-hidden="true" className="block text-[clamp(96px,12vw,200px)] font-black leading-[0.8] tracking-tightest text-gaffer">{v.l}</span>
                <h3 className="mt-8 text-[26px] font-black leading-none tracking-[-0.02em]">{v.name}</h3>
                <p className="mt-3 max-w-[30ch] text-[16px] leading-[1.5] text-muted">{v.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <WallSection />

      {/* Close */}
      <section data-cm="close" className="gutter relative overflow-hidden border-t border-line py-28 md:py-40" aria-labelledby="close-title">
        <CommentaryMarker id="close" className="right-5 top-8 md:right-10" />
        <TapeMark size={520} className="pointer-events-none absolute -right-10 -top-10 hidden opacity-[0.07] md:block" />
        <div className="relative mx-auto max-w-[1440px]">
          <h2 id="close-title" className="text-[clamp(56px,11vw,190px)] font-black leading-[0.86] tracking-tightest">
            Ready for{" "}<br />your <span className="tape-word"><i aria-hidden="true" className="tape-edge" /><b>mark?</b></span>
          </h2>
          <div className="mt-14 grid gap-10 border-t border-line pt-10 md:grid-cols-2 md:gap-16">
            <div className="min-w-0">
              <p className="slate text-gaffer">Not sure yet</p>
              <p className="mt-4 max-w-[42ch] text-[19px] leading-[1.55] text-body">Send your site or Instagram. Willie reviews the brand, the site and your last three pieces, and emails you the fixes in 3 business days. Free, and yours to keep.</p>
              <Link href="/start" className="btn-primary mt-8">Get a Free Creative Audit</Link>
            </div>
            <div className="min-w-0">
              <p className="slate text-gaffer">Ready to build</p>
              <p className="mt-4 max-w-[42ch] text-[19px] leading-[1.55] text-body">Tell us what you're launching, when, and the budget you're working with. You'll get a fixed scope and price after a 30-minute call with Willie.</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/start#project" className="btn-secondary">Start a project</Link>
                <a href={book} {...(BOOKING_URL ? { target: "_blank", rel: "noopener" } : {})} className="slate inline-flex min-h-[52px] items-center border-b-2 border-gaffer hover:text-gaffer">Book a call</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
