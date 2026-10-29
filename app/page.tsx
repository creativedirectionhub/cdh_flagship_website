import Image from "next/image";
import Link from "next/link";
import Hero from "./components/Hero";
import WorkCard from "./components/WorkCard";
import WaysToStart from "./components/WaysToStart";
import AuditForm from "./components/AuditForm";
import SectionHead from "./components/SectionHead";
import CaseMedia from "./components/CaseMedia";
import { TapeMark } from "./components/Brand";
import { selectedCases, bySlug } from "./content/work";
import { lanes, disciplines, process, facts, network } from "./content/services";

export default function Home() {
  return (
    <>
      <Hero />

      {/* The film */}
      {(() => {
        const film = bySlug("her-mark");
        if (!film) return null;
        return (
          <section className="gutter border-t border-line py-16 md:py-24" aria-labelledby="film-title">
            <div className="mx-auto max-w-[1440px]">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div className="max-w-[46ch]">
                  <p className="slate text-gaffer">The film, 0:30, sound on</p>
                  <h2 id="film-title" className="mt-4 text-[clamp(36px,5vw,64px)] font-black leading-[0.95] tracking-tighter">Same kitchen. Same sauce. Directed.</h2>
                  <p className="mt-5 text-[17px] leading-[1.55] text-body">A founder at 1:47 AM, filming her own product under a ring light. Then what happens when her brand gets put on its mark.</p>
                </div>
                <Link href="/work/her-mark" className="btn-secondary">How we made it</Link>
              </div>
              <div className="reveal mt-10">
                <CaseMedia m={film.media[0]} sizes="(min-width: 1440px) 1296px, 92vw" className="rounded-md border border-line" />
              </div>
            </div>
          </section>
        );
      })()}

      {/* Selected work */}
      <section id="work" className="gutter scroll-mt-20 border-t border-line py-20 md:py-28" aria-labelledby="work-title">
        <div className="mx-auto max-w-[1440px]">
          <SectionHead slate="Selected work" title={<span id="work-title">The work is the pitch.</span>}>
            Client work first. Concepts are labeled as concepts, and every AI performer is labeled as AI.
          </SectionHead>
          <div className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2">
            {selectedCases.map((c, n) => (
              <div key={c.slug} className={`reveal ${n % 2 === 1 ? "md:translate-y-16" : ""}`}>
                <WorkCard c={c} sizes="(min-width: 768px) 46vw, 92vw" big />
              </div>
            ))}
          </div>
          <div className="mt-24 flex justify-start md:mt-32">
            <Link href="/work" className="btn-secondary">All the work</Link>
          </div>
        </div>
      </section>

      {/* Who we work with */}
      <section className="bone gutter py-20 md:py-28" aria-labelledby="lanes-title">
        <div className="mx-auto max-w-[1440px]">
          <SectionHead slate="Who we work with" title={<span id="lanes-title">Three kinds of business. One director.</span>} light>
            If your brand is the thing you sell, the person you are, or the place people come to, this is built for you.
          </SectionHead>
          <ul className="reveal mt-14 grid gap-px overflow-hidden rounded-md border border-line bg-line lg:grid-cols-3">
            {lanes.map((l) => {
              const proof = bySlug(l.proof);
              return (
                <li key={l.id} className="flex flex-col gap-6 bg-ground p-7 md:p-9">
                  <h3 className="text-[32px] font-black leading-none tracking-tighter">{l.name}</h3>
                  <p className="text-[16px] leading-[1.55] text-body">{l.who}</p>
                  <p className="text-[18px] font-semibold leading-[1.45]">{l.problem}</p>
                  {proof && (
                    <Link href={`/work/${proof.slug}`} className="group mt-auto flex items-center gap-4 border-t border-line pt-6">
                      <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-sm border border-line bg-surface">
                        <Image src={proof.cover.kind === "image" ? proof.cover.src : proof.cover.poster} alt="" fill sizes="56px" className="object-cover" />
                      </span>
                      <span className="min-w-0">
                        <span className="slate block text-[11px] text-muted">Proof</span>
                        <span className="block truncate text-[16px] font-extrabold group-hover:text-gaffer">{proof.client}</span>
                      </span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* What we do */}
      <section className="gutter border-t border-line py-20 md:py-28" aria-labelledby="do-title">
        <div className="mx-auto max-w-[1440px]">
          <SectionHead slate="What we do" title={<span id="do-title">Five disciplines, under one direction.</span>}>
            Hire one, or hire the department. The director stays the same either way.
          </SectionHead>
          <ol className="reveal mt-14 grid border-t border-line md:grid-cols-2">
            {disciplines.map((d, n) => (
              <li key={d.id} className="border-b border-line md:odd:border-r md:odd:pr-10 md:even:pl-10 md:last:col-span-2 md:last:!border-r-0 md:last:pr-0">
                <Link href={`/services#${d.id}`} className="group flex min-h-[200px] flex-col justify-between gap-8 py-8">
                  <span className="slate text-muted">0{n + 1}</span>
                  <span>
                    <span className="block text-[clamp(32px,4vw,52px)] font-black leading-none tracking-tighter group-hover:text-gaffer">{d.name}</span>
                    <span className="mt-3 block text-[17px] leading-[1.5] text-body">{d.short}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="gutter scroll-mt-20 border-t border-line bg-raised py-20 md:py-28" aria-labelledby="how-title">
        <div className="mx-auto max-w-[1440px]">
          <SectionHead slate="How it works" title={<span id="how-title">Direction first. Then production.</span>}>
            Nothing gets made until the idea, the look and the shot list are decided. That's the whole difference.
          </SectionHead>
          <ol className="reveal mt-14 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {process.map((s, n) => (
              <li key={s.step} className="flex min-h-[220px] flex-col gap-10 bg-ground p-6">
                <span className={`slate ${n === process.length - 1 ? "text-gaffer" : "text-muted"}`}>Step {String(n + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-[24px] font-black leading-none tracking-[-0.03em]">{s.step}</h3>
                  <p className="mt-3 text-[15px] leading-[1.5] text-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* About strip */}
      <section className="bone gutter py-20 md:py-28" aria-labelledby="about-title">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] lg:gap-20">
          <div className="reveal relative min-w-0 self-start rounded-md border border-line bg-surface p-7 md:p-9">
            <p className="slate text-muted">Credits</p>
            <dl className="mt-6 grid gap-3 text-[15px]">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 border-b border-line pb-3">
                <dt className="slate text-[11px] text-muted">Directed by</dt>
                <dd className="font-extrabold">Willie Bernoudy</dd>
              </div>
              {network.map((n) => (
                <div key={n} className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 border-b border-line pb-3">
                  <dt className="slate text-[11px] text-muted">{n}</dt>
                  <dd className="font-semibold text-body">CDH network</dd>
                </div>
              ))}
            </dl>
            <TapeMark size={72} className="absolute -bottom-5 -right-3 rotate-6" />
          </div>
          <div className="reveal min-w-0">
            <p className="slate text-gaffer">The director</p>
            <h2 id="about-title" className="mt-4 text-[clamp(40px,5.6vw,84px)] font-black leading-[0.92] tracking-tighter">I direct every project. A network makes it with me.</h2>
            <p className="mt-8 max-w-[60ch] text-[18px] leading-[1.6] text-body">
              Fifteen years in creative strategy, direction and photography. Editors, designers, photographers, motion artists and creators, picked for each job, under one director. That's the department.
            </p>
            <dl className="mt-10 grid border-t border-line sm:grid-cols-2">
              {facts.map((f) => (
                <div key={f.k} className="border-b border-line py-5 sm:odd:pr-8 sm:even:border-l sm:even:pl-8">
                  <dt className="text-[30px] font-black leading-none tracking-[-0.03em]">{f.k}</dt>
                  <dd className="mt-2 text-[15px] leading-[1.5] text-muted">{f.v}</dd>
                </div>
              ))}
            </dl>
            <Link href="/about" className="btn-secondary mt-10">About Willie and the network</Link>
          </div>
        </div>
      </section>

      <WaysToStart />

      {/* Audit form */}
      <section id="audit" className="gutter scroll-mt-20 border-t border-line py-20 md:py-28" aria-labelledby="audit-title">
        <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div className="reveal min-w-0">
            <p className="slate text-gaffer">Free Creative Audit</p>
            <h2 id="audit-title" className="mt-4 text-[clamp(44px,6.6vw,104px)] font-black leading-[0.9] tracking-tighter">See what's holding your brand back.</h2>
            <ol className="mt-10 grid max-w-[52ch] gap-4 text-[17px] leading-[1.5]">
              <li className="grid grid-cols-[44px_minmax(0,1fr)] gap-3"><span className="slate pt-1 text-muted">01</span><span>Send your website or Instagram.</span></li>
              <li className="grid grid-cols-[44px_minmax(0,1fr)] gap-3"><span className="slate pt-1 text-muted">02</span><span>Willie reviews the brand, the site and your last three pieces, and marks what's holding each one back.</span></li>
              <li className="grid grid-cols-[44px_minmax(0,1fr)] gap-3"><span className="slate pt-1 text-muted">03</span><span>You get the fixes by email within 3 business days. Keep them whether you hire us or not.</span></li>
            </ol>
          </div>
          <div className="reveal min-w-0 rounded-md border border-line bg-raised p-7 md:p-10">
            <AuditForm />
          </div>
        </div>
      </section>
    </>
  );
}
