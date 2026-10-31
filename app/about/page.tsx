import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TapeMark } from "../components/Brand";
import WaysToStart from "../components/WaysToStart";
import { facts, network, site, values } from "../content/services";

export const metadata: Metadata = {
  title: "About",
  description: "Willie Bernoudy, founder and creative director of Creative Direction Hub, and the network of editors, designers, photographers, motion artists and creators that makes the work.",
  alternates: { canonical: "/about" },
};

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.url}/about#willie`,
  name: "Willie Bernoudy",
  jobTitle: "Founder and Creative Director",
  worksFor: { "@id": `${site.url}/#org` },
  image: `${site.url}/media/about-willie.webp`,
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <section className="gutter py-16 md:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <figure className="relative min-w-0 lg:order-2">
            <Image src="/media/about-willie.webp" alt="Willie Bernoudy on the Great Wall of China, camera raised" width={600} height={800} priority sizes="(min-width: 1024px) 40vw, 92vw" className="aspect-[3/4] w-full rounded-md border border-line object-cover" />
            <TapeMark size={88} className="absolute -bottom-6 -right-4 rotate-6" />
            <figcaption className="slate mt-8 text-[12px] text-muted">On set · The Great Wall, China</figcaption>
          </figure>
          <div className="min-w-0 lg:order-1">
            <p className="slate text-gaffer">About</p>
            <h1 className="t-xl mt-4">I direct every project.</h1>
            <div className="mt-8 grid max-w-[58ch] gap-5 text-[18px] leading-[1.6] text-body">
              <p>I'm Willie Bernoudy, creative director and AI art director. Fifteen years in creative strategy and direction, as a filmmaker, a photographer and a creative director. I started behind the camera in Mississippi, shooting talent, events and travel, grew into brand strategy and social growth for media brands, and now direct AI the same way I direct a set.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bone gutter py-20 md:py-28" aria-labelledby="story-title">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <h2 id="story-title" className="reveal t-m max-w-[12ch] self-start">From Mississippi to 23 countries.</h2>
          <div className="min-w-0">
            <div className="grid max-w-[58ch] gap-5 text-[18px] leading-[1.6] text-body">
              <p>Blacksheepfocus, the agency I owned, won two Corporate Vision Awards: Best Social Media Marketing Agency in 2022 and Best Social Media Strategy Agency in 2023. My travel and culture work earned an honorable mention at the ND Awards, and I've photographed in 23 countries.</p>
              <p>I built Creative Direction Hub for the businesses that have a product, a person or a place worth selling, and nobody with taste in charge of how it looks. That's the job I do.</p>
            </div>
            <dl className="mt-12 grid border-t border-line sm:grid-cols-2">
              {facts.map((f) => (
                <div key={f.k} className="border-b border-line py-6 sm:odd:pr-8 sm:even:border-l sm:even:pl-8">
                  <dt className="text-[34px] font-black leading-none tracking-[-0.03em]">{f.k}</dt>
                  <dd className="mt-2 text-[15px] leading-[1.5] text-muted">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="gutter border-t border-line py-20 md:py-28" aria-labelledby="network-title">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div className="reveal min-w-0">
            <p className="slate text-muted">The network</p>
            <h2 id="network-title" className="t-l mt-4">A team picked for each job.</h2>
            <p className="mt-8 max-w-[56ch] text-[18px] leading-[1.6] text-body">A vetted network of editors, designers, photographers, motion artists and creators makes the work with me, picked for what each project needs. You get the right people without paying for a bench. I stay on every project from the first brief to the last cut.</p>
          </div>
          <div className="reveal min-w-0 rounded-md border border-line bg-surface p-7 md:p-9">
            <p className="slate text-muted">Credits</p>
            <dl className="mt-6 grid gap-3 text-[15px]">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 border-b border-line pb-3">
                <dt className="slate text-[12px] text-muted">Directed by</dt>
                <dd className="font-extrabold">Willie Bernoudy</dd>
              </div>
              {network.map((n) => (
                <div key={n} className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 border-b border-line pb-3">
                  <dt className="slate text-[12px] text-muted">{n}</dt>
                  <dd className="font-semibold text-body">CDH network</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="gutter border-t border-line bg-raised py-20 md:py-28" aria-labelledby="ai-title">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div className="reveal min-w-0">
            <p className="slate text-muted">How we use AI</p>
            <h2 id="ai-title" className="t-m mt-4">For speed and range. Labeled every time.</h2>
          </div>
          <ul className="reveal min-w-0 grid border-t border-line">
            {[
              "We use AI tools for concepts, edits, product shots, voice and AI performers, when they get you a better result faster.",
              "Every AI person or scene is labeled as AI, on this site and in the work we hand you.",
              "Where a real face matters, we cast real people and shoot for real.",
              "A director checks every piece before you see it. Nothing ships straight from a model.",
              "You own what you pay for.",
            ].map((t) => (
              <li key={t} className="relative border-b border-line py-5 pl-7 text-[18px] leading-[1.5]">
                <span aria-hidden="true" className="absolute left-0 top-[27px] h-[3px] w-3 bg-gaffer" />{t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="gutter border-t border-line py-20 md:py-28" aria-labelledby="mark-title">
        <div className="mx-auto max-w-[1440px]">
          <p className="slate text-gaffer">What we stand for</p>
          <h2 id="mark-title" className="t-l mt-4">Our values spell <span className="text-gaffer">MARK</span>.</h2>
          <ol className="mt-12 grid grid-cols-2 border-t border-line md:grid-cols-4">
            {values.map((v) => (
              <li key={v.l} className="reveal border-b border-line py-8 pr-4 odd:border-r odd:pr-5 even:pl-5 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:odd:pr-8 md:even:pl-8">
                <span aria-hidden="true" className="block text-[clamp(64px,8vw,128px)] font-black leading-[0.8] tracking-tightest text-gaffer">{v.l}</span>
                <h3 className="t-s mt-7">{v.name}</h3>
                <p className="mt-3 max-w-[30ch] text-[16px] leading-[1.5] text-muted">{v.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <WaysToStart />
    </>
  );
}
