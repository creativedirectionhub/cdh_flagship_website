import Image from "next/image";
import Link from "next/link";
import { site } from "../content/services";

// The hero: the line, the positioning, two ways in, and the director. CSS-only intro so the first frame is complete.
export default function Hero() {
  return (
    <section className="gutter relative overflow-hidden pb-16 pt-10 md:pb-24 md:pt-16">
      <div className="mx-auto grid max-w-[1440px] items-end gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-16">
        <div className="min-w-0">
          <p className="slate text-gaffer">{site.promise}</p>
          <h1 className="mt-6 font-black leading-[0.9] tracking-tightest text-[clamp(52px,7.4vw,112px)]">
            <span className="block overflow-hidden pb-[0.04em]"><span className="block">We put brands</span></span>
            <span className="block overflow-hidden pb-[0.1em]">
              <span className="block">
                on their <span className="tape-word ml-[0.12em]"><i aria-hidden="true" className="tape-edge tape-slap" /><b>mark.</b></span>
              </span>
            </span>
          </h1>
          <p className="mt-8 max-w-[40ch] text-[19px] leading-[1.5] text-body md:text-[22px]">
            The creative department for growing businesses, led by creative director Willie Bernoudy. Brand, campaigns, content, digital and AI art direction, directed by one person and made by one team.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/start" className="btn-primary">Get a Free Creative Audit</Link>
            <Link href="/work" className="btn-secondary">See the work</Link>
          </div>
        </div>

        <figure className="rise relative min-w-0 lg:justify-self-end">
          <div className="relative aspect-[3/4] w-full max-w-[520px] overflow-hidden rounded-md border border-line bg-surface">
            <Image src="/media/about-willie.webp" alt="Willie Bernoudy on the Great Wall of China, camera raised, photographing the valley" fill sizes="(min-width: 1024px) 34vw, 92vw" className="object-cover object-top" />
            <span className="slate absolute left-4 top-4 rounded-tape bg-[#121110]/85 px-2 py-1 text-[11px] text-[#efe9df]">On set</span>
          </div>
          <figcaption className="mt-4 flex max-w-[520px] items-baseline justify-between gap-4 border-t border-line pt-4">
            <span>
              <span className="slate block text-[11px] text-muted">Every project directed by</span>
              <span className="mt-1 block text-[18px] font-extrabold leading-tight">Willie Bernoudy</span>
            </span>
            <span className="text-[14px] text-muted">Founder and creative director</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
