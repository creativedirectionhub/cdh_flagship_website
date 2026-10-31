import type { Metadata } from "next";
import Link from "next/link";
import SlateOpener from "./components/SlateOpener";
import PlayTile from "./components/PlayTile";
import TapeWipe from "./components/TapeWipe";
import { TapeMark } from "./components/Brand";
import { BOOKING_URL } from "./config";
import { brands, talent, values, network } from "./content/services";

const services = [
  { id: "brand", name: "Brand", line: "Who you are, decided once.", poster: "/media/golf-lifestyle.webp", video: "/media/golf-lifestyle.mp4", alt: "A hand sets a golf ball on a tee in low gold light", ai: true },
  { id: "campaigns", name: "Campaigns", line: "One idea, every channel.", poster: "/work/spec-blacksox-3.webp", alt: "Billboard layout for the Hattiesburg Black Sox: More Than a Game", ai: false },
  { id: "content", name: "Content", line: "Pictures and film that sell.", poster: "/media/dinner-service.webp", video: "/media/dinner-service.mp4", alt: "A chef plates seared fish at the pass of a candlelit restaurant", ai: true },
  { id: "digital", name: "Digital", line: "A site that closes.", poster: "/work/gfx-liceria-coffee.webp", alt: "Social design for Liceria Coffee Shop: Fresh on the menu", ai: false },
  { id: "ai", name: "AI art direction", line: "AI that looks like your brand.", poster: "/media/art-direction.webp", video: "/media/art-direction.mp4", alt: "An amber dropper bottle on warm travertine, leaf shadows drifting across the stone", ai: true },
];

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { title: "Creative Direction Hub · We put brands on their mark.", description: "Creative direction and AI art direction for consumer brands, personal brands and hospitality, led by Willie Bernoudy." },
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
            The creative department for growing brands. One director over the brand, the campaign, the content, the site and the AI, <span className="text-muted">and a crew built for every job.</span>
          </h2>
          <div className="mt-16 grid gap-6 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-8">
            <PlayTile href="/work/hattiesburg-black-sox" poster="/work/events-27.webp" alt="A Black Sox player, number 13, seen from behind in the dugout" kicker="Hattiesburg Black Sox" title="More than a game." label="Client" sizes="(min-width: 768px) 56vw, 92vw" ratio="4 / 3" className="reveal rounded-sm" />
            <PlayTile href="/work/her-mark" poster="/media/her-mark-cover.webp" video="/media/her-mark-cover.mp4" alt="Hot sauce ribbons off a wooden spoon beside a Mama Lou's bottle on an orange tape mark" kicker="The film · Her Mark" title="Same kitchen. Directed." label="AI concept" sizes="(min-width: 768px) 40vw, 92vw" ratio="4 / 3" className="reveal rounded-sm md:mt-24" />
          </div>
        </div>
      </section>

      <TapeWipe />

      {/* Who we've worked with */}
      <section className="gutter py-20 md:py-28" aria-labelledby="brands-title">
        <div className="mx-auto max-w-[1440px]">
          <h2 id="brands-title" className="slate text-muted">Brands Willie has worked with</h2>
          <ul className="reveal mt-8 grid grid-cols-2 items-baseline gap-x-6 gap-y-3 sm:flex sm:flex-wrap text-[clamp(26px,3.6vw,56px)] font-black leading-[1.05] tracking-tighter">
            {brands.map((b, i) => (
              <li key={b} className="flex items-baseline gap-6">
                {b}
                {i < brands.length - 1 && <span aria-hidden="true" className="tape-edge hidden h-[0.2em] w-[0.42em] -translate-y-[0.26em] -rotate-6 bg-gaffer sm:inline-block" />}
              </li>
            ))}
          </ul>
          <h2 className="slate mt-16 text-muted">Talent photographed</h2>
          <p className="reveal mt-5 max-w-[60ch] text-[clamp(18px,1.8vw,24px)] font-semibold leading-[1.45] text-body">{talent.join(" · ")}</p>
        </div>
      </section>

      {/* Services teaser */}
      <section className="gutter border-t border-line py-24 md:py-36" aria-labelledby="teaser-title">
        <div className="mx-auto max-w-[1440px]">
          <h2 id="teaser-title" className="reveal text-[clamp(40px,7vw,120px)] font-black leading-[0.92] tracking-tightest">
            Bold brands. Campaigns that sell. Content that stops the scroll. Sites that close. <span className="text-gaffer">AI that looks like you.</span>
          </h2>
          <Link href="/services" className="slate mt-12 inline-block border-b-2 border-gaffer pb-1 pt-3 hover:text-gaffer">See all services</Link>
        </div>
      </section>

      {/* The work */}
      <section className="gutter pb-24 md:pb-36" aria-label="The work">
        <div className="mx-auto max-w-[1440px]">
          <PlayTile href="/work" poster="/media/spots-cover.webp" video="/media/spots-cover.mp4" alt="Morning sun across a travertine shelf with an amber dropper bottle" kicker="The work" title={<>Directed at the{" "}<br />speed of culture.</>} label="AI concept" sizes="(min-width: 1440px) 1296px, 92vw" ratio="21 / 9" className="reveal rounded-sm" titleClass="text-[clamp(36px,6vw,104px)]" />
          <Link href="/work" className="slate mt-8 inline-block border-b-2 border-gaffer pb-1 pt-3 hover:text-gaffer">Watch the work</Link>
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
            <a href="mailto:hello@creativedirectionhub.com?subject=Joining%20the%20CDH%20crew" className="slate mt-10 inline-block border-b-2 border-gaffer pb-1 pt-3 hover:text-gaffer">Work with the crew</a>
          </div>
        </div>
      </section>

      {/* The five services */}
      <section className="gutter border-t border-line py-20 md:py-28" aria-labelledby="five-title">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="five-title" className="text-[clamp(36px,4.8vw,72px)] font-black leading-[0.95] tracking-tighter">Five ways we put you on your mark.</h2>
            <Link href="/services" className="slate inline-block border-b-2 border-gaffer pb-1 pt-3 hover:text-gaffer">All services</Link>
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

      {/* Close */}
      <section className="gutter relative overflow-hidden border-t border-line py-28 md:py-40" aria-labelledby="close-title">
        <TapeMark size={520} className="pointer-events-none absolute -right-10 -top-10 hidden opacity-[0.07] md:block" />
        <div className="relative mx-auto max-w-[1440px]">
          <h2 id="close-title" className="text-[clamp(56px,11vw,190px)] font-black leading-[0.86] tracking-tightest">
            Ready for{" "}<br />your <span className="tape-word"><i aria-hidden="true" className="tape-edge" /><b>mark?</b></span>
          </h2>
          <p className="mt-10 max-w-[48ch] text-[19px] leading-[1.55] text-body">Send your site or Instagram. Willie reviews the brand, the site and your last three pieces, and emails you the fixes in 3 business days. Free, and yours to keep.</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/start" className="btn-primary">Get a Free Creative Audit</Link>
            <a href={book} {...(BOOKING_URL ? { target: "_blank", rel: "noopener" } : {})} className="btn-secondary">Book a call</a>
          </div>
        </div>
      </section>
    </>
  );
}
