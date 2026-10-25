import Image from "next/image";
import Hero from "./components/Hero";
import FilmReel from "./components/FilmReel";
import AdCheckForm from "./components/AdCheckForm";
import { TapeMark, Wordmark } from "./components/Brand";
import { specAds } from "./components/ads";

const promises = [
  { title: "A director on every ad", body: "Someone with taste decides the hook, the angle and the cut before anything gets made." },
  { title: "Made fast, made right", body: "AI production for speed, real creators for trust, a shoot day when the brand needs real footage." },
  { title: "Run, not just delivered", body: "We launch the ads on Meta and TikTok, set up the DM flows and keep the account moving." },
  { title: "Told the truth", body: "A plain report every week: what worked, what didn't, and what we make next." },
];

const loop = [
  { step: "Find", body: "The insight in your reviews, comments and best sellers." },
  { step: "Direct", body: "The hook, the angle and the shot list, decided up front." },
  { step: "Make", body: "AI video, creator UGC, statics and edits." },
  { step: "Launch", body: "Into Meta and TikTok with clean tests." },
  { step: "Read", body: "The numbers, ad by ad, in plain words." },
  { step: "Scale or kill", body: "More budget for what works. The rest gets cut." },
];

const plans = [
  {
    label: "Start here",
    name: "Creative Sprint",
    pace: "30 days",
    term: "one time",
    items: ["12 directed pieces", "Hooks, scripts and edits", "A clear read on what to scale"],
    cta: "Start a Sprint",
  },
  {
    label: "Most brands",
    name: "Growth Retainer",
    pace: "16 ads",
    term: "a month",
    items: ["16 new ads a month, 3 hooks each", "Meta and TikTok ads run for you", "DM automation and a weekly report"],
    cta: "Book a call",
    featured: true,
  },
  {
    label: "The big swing",
    name: "Commercial Production",
    pace: "Seasonal",
    term: "per project",
    items: ["A cinematic spot for the season", "Directed by Willie Bernoudy", "Cut-downs for every platform"],
    cta: "Talk to us",
  },
];

const fit = {
  yes: ["Online consumer brands already selling every day", "Already running ads on Meta or TikTok", "A founder or marketer who wants one team to own the creative"],
  no: ["Brands that haven't launched yet", "B2B software and lead-gen businesses", "Anyone shopping for the cheapest clip per dollar"],
};

const testCard = [
  { k: "The bet", v: "People buy a silk pillowcase for the morning result: less breakage, less frizz. Price only lands once they believe the result." },
  { k: "Three hooks", v: "Review: \u201cHair doesn't break like it did before.\u201d Price: \u201cAbout 29\u00a2 a night for better mornings.\u201d Routine: \u201cYour hair care doesn't stop at bedtime.\u201d" },
  { k: "What we'd read", v: "Thumb-stop rate in the first 3 seconds, click-through, then cost per purchase once each ad has enough spend to judge." },
  { k: "What we'd make next", v: "Three new hooks on the winning angle, a creator version of it, and a cut-down for Stories. The losing angle gets switched off." },
];

const faqs = [
  { q: "Who owns the ads?", a: "You do, once the work is paid for. Creator usage terms (how long and where a creator's face can run) are written into each deal before filming." },
  { q: "How do you use AI?", a: "For speed: concepts, edits, product shots, voice and AI talent. Every AI performer is labeled as AI, and a director checks every piece before you see it. Where a real face matters, we cast real creators." },
  { q: "How many revisions do I get?", a: "Two rounds of revisions on every ad." },
  { q: "How fast is the first cut?", a: "Within 5 business days of the brief being approved." },
  { q: "What's in the Growth Retainer?", a: "16 new ads a month, each with 3 hook variations and sized for Meta and TikTok, plus running the ads, DM automation and a weekly report. Month to month." },
  { q: "How does the Free Ad Check work?", a: "Send your website. We pull your three most recent ads, mark what's holding each one back, and email you the fixes. It's free, and you keep it whether you hire us or not." },
];

const addOns = ["AI Spokesperson", "Landing Page and Funnel", "Email and SMS Automation", "Creative Audit", "Influencer Campaigns"];

const facts = [
  { k: "15 years", v: "in creative strategy, direction and photography" },
  { k: "38k to 100k+", v: "Blacktravelgram followers, grown with its creative brand squad" },
  { k: "2 awards", v: "Corporate Vision Awards for social media marketing and strategy, 2022 and 2023, won by blacksheepfocus, the agency I owned" },
  { k: "23 countries", v: "photographed, from Havana to the Great Wall" },
];

function SectionHead({ slate, title, children }: { slate: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end">
      <div className="min-w-0">
        <p className="slate text-muted">{slate}</p>
        <h2 className="mt-4 text-[clamp(40px,6vw,88px)] font-black leading-[0.92] tracking-tighter">{title}</h2>
      </div>
      {children && <div className="max-w-[46ch] text-[18px] leading-[1.55] text-[#cfc8bc] lg:justify-self-end">{children}</div>}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-gaffer focus:px-4 focus:py-3 focus:text-on-gaffer">
        Skip to content
      </a>

      <header className="gutter sticky top-0 z-40 border-b border-line/70 bg-ground/90 backdrop-blur-sm" style={{ top: "env(safe-area-inset-top, 0px)" }}>
        <nav className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-6" aria-label="Main">
          <a href="#top" className="shrink-0">
            <Wordmark size={30} />
            <span className="sr-only">Creative Direction Hub, home</span>
          </a>
          <ul className="hidden items-center gap-8 text-[15px] font-semibold md:flex">
            <li><a href="#work" className="hover:text-gaffer">Work</a></li>
            <li><a href="#how" className="hover:text-gaffer">How it works</a></li>
            <li><a href="#plans" className="hover:text-gaffer">Plans</a></li>
            <li><a href="#about" className="hover:text-gaffer">About</a></li>
          </ul>
          <a href="#ad-check" className="btn-primary min-h-[44px] px-5 text-[14px]">Free Ad Check</a>
        </nav>
      </header>

      <main id="main">
        <div id="top" />
        <Hero />

        {/* Promise */}
        <section className="gutter border-t border-line py-24 md:py-32" aria-labelledby="promise">
          <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="min-w-0">
              <p className="slate text-muted">What you get</p>
              <h2 id="promise" className="mt-4 text-[clamp(44px,6.4vw,96px)] font-black leading-[0.92] tracking-tighter">
                Every ad has a director.
              </h2>
              <p className="mt-8 max-w-[38ch] text-[18px] leading-[1.55] text-[#cfc8bc]">
                Most brands have plenty of content and no direction. You keep building the product. We keep the ads moving.
              </p>
            </div>
            <ul className="min-w-0 border-t border-line">
              {promises.map((p) => (
                <li key={p.title} className="grid gap-2 border-b border-line py-7 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-8">
                  <h3 className="text-[24px] font-extrabold leading-tight tracking-[-0.02em]">{p.title}</h3>
                  <p className="text-[17px] leading-[1.55] text-muted">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Who it's for */}
        <section className="gutter border-t border-line py-16 md:py-20" aria-labelledby="fit-title">
          <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <h2 id="fit-title" className="text-[clamp(32px,4vw,56px)] font-black leading-[0.95] tracking-tighter">Who it's for.</h2>
            <div className="grid min-w-0 gap-10 sm:grid-cols-2">
              <div>
                <p className="slate text-gaffer">Built for</p>
                <ul className="mt-4 grid gap-3 text-[17px] leading-[1.5]">
                  {fit.yes.map((t) => (
                    <li key={t} className="relative pl-6"><span aria-hidden="true" className="absolute left-0 top-[11px] h-[3px] w-3 bg-gaffer" />{t}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="slate text-muted">Not a fit</p>
                <ul className="mt-4 grid gap-3 text-[17px] leading-[1.5] text-muted">
                  {fit.no.map((t) => (
                    <li key={t} className="relative pl-6"><span aria-hidden="true" className="absolute left-0 top-[11px] h-px w-3 bg-muted" />{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Work */}
        <section id="work" className="gutter scroll-mt-20 bg-raised py-24 md:py-32" aria-labelledby="work-title">
          <div className="mx-auto max-w-[1440px]">
            <SectionHead slate="The work" title={<span id="work-title">Spec ads, made to sell.</span>}>
              We make spec ads for brands we'd love to direct, to show the thinking before you hire us. Every one is labeled as a concept.
            </SectionHead>

            <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-y-24">
              {specAds.map((a, n) => (
                <li key={a.src} className={`min-w-0 ${n % 2 === 1 ? "lg:translate-y-10" : ""}`}>
                  <figure className="grid gap-3">
                    <div className="relative aspect-[9/16] overflow-hidden rounded-phone border border-line bg-surface">
                      <Image src={a.src} alt={`${a.brand} spec ad concept: ${a.headline}`} width={540} height={960} sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 46vw" className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]" />
                    </div>
                    <figcaption>
                      <span className="block text-[16px] font-extrabold">{a.brand}</span>
                      <span className="slate block text-[11px] text-muted">{a.category} · Concept</span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
            <p className="mt-20 max-w-[70ch] text-[14px] leading-[1.5] text-muted">
              Spec concepts made by Creative Direction Hub. Not commissioned by, affiliated with or endorsed by these brands.
            </p>

            <div className="mt-20 rounded-md border border-line bg-ground p-7 md:p-10">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h3 className="text-[clamp(28px,3.4vw,44px)] font-black leading-[0.95] tracking-tighter">How we'd test it: Blissy.</h3>
                <p className="slate text-muted">One spec set · Concept</p>
              </div>
              <dl className="mt-8 grid gap-px overflow-hidden rounded-sm bg-line md:grid-cols-2 lg:grid-cols-4">
                {testCard.map((c, n) => (
                  <div key={c.k} className="bg-ground p-6">
                    <dt className={`slate ${n === testCard.length - 1 ? "text-gaffer" : "text-muted"}`}>{c.k}</dt>
                    <dd className="mt-3 text-[16px] leading-[1.55]">{c.v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-24 border-t border-line pt-12">
              <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
                <h3 className="text-[clamp(32px,4vw,56px)] font-black leading-[0.95] tracking-tighter">Motion, directed.</h3>
                <p className="slate text-muted">Self-initiated spots · Made with Higgsfield</p>
              </div>
              <FilmReel />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="gutter scroll-mt-20 py-24 md:py-32" aria-labelledby="how-title">
          <div className="mx-auto max-w-[1440px]">
            <SectionHead slate="How it works" title={<span id="how-title">The weekly loop.</span>}>
              Six steps, every week. You see the ads, the numbers and the next move, without chasing anyone for an update.
            </SectionHead>
            <ol className="mt-16 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-6">
              {loop.map((s, n) => (
                <li key={s.step} className="flex min-h-[220px] flex-col gap-10 bg-ground p-6">
                  <span className={`slate ${n === loop.length - 1 ? "text-gaffer" : "text-muted"}`}>Step {String(n + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-[26px] font-black leading-none tracking-[-0.03em]">{s.step}</h3>
                    <p className="mt-3 text-[15px] leading-[1.5] text-muted">{s.body}</p>
                    {n === loop.length - 1 && (
                      <div className="mt-4 flex flex-wrap gap-2" aria-hidden="true">
                        <span className="slate inline-flex items-center gap-1.5 rounded-tape border border-line px-2 py-1 text-[11px] text-scale"><span className="h-2 w-2 rounded-full bg-scale" />Scale</span>
                        <span className="slate inline-flex items-center gap-1.5 rounded-tape border border-line px-2 py-1 text-[11px] text-kill"><span className="h-2 w-2 rounded-full bg-kill" />Kill</span>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Plans */}
        <section id="plans" className="gutter scroll-mt-20 border-t border-line py-24 md:py-32" aria-labelledby="plans-title">
          <div className="mx-auto max-w-[1440px]">
            <SectionHead slate="Plans" title={<span id="plans-title">Three ways to work with us.</span>}>
              Every plan is quoted on a short call, after you've seen your Free Ad Check. The Retainer runs month to month.
            </SectionHead>
            <ul className="mt-14 grid gap-6 lg:grid-cols-3">
              {plans.map((p) => (
                <li key={p.name} className={`flex flex-col gap-5 rounded-md border bg-surface p-7 ${p.featured ? "border-gaffer" : "border-line"}`}>
                  <p className={`slate ${p.featured ? "text-gaffer" : "text-muted"}`}>{p.label}</p>
                  <h3 className="text-[32px] font-extrabold leading-[1.1] tracking-[-0.02em] lg:min-h-[2.2em]">{p.name}</h3>
                  <p className="text-[40px] font-black leading-none tracking-[-0.03em]">
                    {p.pace} <span className="text-[16px] font-normal tracking-normal text-muted">{p.term}</span>
                  </p>
                  <ul className="grid gap-2.5 text-[16px] leading-[1.45]">
                    {p.items.map((it) => (
                      <li key={it} className="relative pl-6">
                        <span aria-hidden="true" className="absolute left-0 top-[10px] h-[3px] w-3 bg-gaffer" />
                        {it}
                      </li>
                    ))}
                  </ul>
                  <a href="#ad-check" className={`mt-auto ${p.featured ? "btn-primary" : "btn-secondary"}`}>{p.cta}</a>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-8">
              <p className="slate text-muted">Add-ons</p>
              {addOns.map((a) => (
                <span key={a} className="text-[16px] font-semibold">{a}</span>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="gutter scroll-mt-20 bg-raised py-24 md:py-32" aria-labelledby="about-title">
          <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <figure className="min-w-0">
              <div className="relative">
                <Image src="/media/about-willie.webp" alt="Willie Bernoudy photographing on the Great Wall of China" width={600} height={800} sizes="(min-width: 1024px) 34vw, 92vw" className="aspect-[3/4] w-full rounded-md border border-line object-cover" />
                <TapeMark size={88} className="absolute -bottom-6 -right-4 rotate-6" />
              </div>
              <figcaption className="slate mt-8 text-[11px] text-muted">On set · The Great Wall, China</figcaption>
            </figure>
            <div className="min-w-0">
              <p className="slate text-muted">The director</p>
              <h2 id="about-title" className="mt-4 text-[clamp(40px,5.6vw,84px)] font-black leading-[0.92] tracking-tighter">
                From Mississippi to 23 countries.
              </h2>
              <div className="mt-8 grid max-w-[60ch] gap-5 text-[18px] leading-[1.6] text-[#cfc8bc]">
                <p>I'm Willie Bernoudy. My work started behind the camera in Mississippi, shooting talent, events and travel, and grew into brand strategy and social growth for media brands.</p>
                <p>I founded Creative Direction Hub to give consumer brands what most of them never hire: a creative director over every ad. Today I write, direct and produce with AI, cast real creators where a real face matters, and build the systems that run it all.</p>
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

        {/* FAQ */}
        <section id="faq" className="gutter scroll-mt-20 border-t border-line py-24 md:py-32" aria-labelledby="faq-title">
          <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div className="min-w-0">
              <p className="slate text-muted">Questions</p>
              <h2 id="faq-title" className="mt-4 text-[clamp(40px,5.6vw,84px)] font-black leading-[0.92] tracking-tighter">Before you ask.</h2>
            </div>
            <div className="min-w-0 border-t border-line">
              {faqs.map((f) => (
                <details key={f.q} className="group border-b border-line">
                  <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-5 text-[20px] font-extrabold tracking-[-0.01em] [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span aria-hidden="true" className="relative h-4 w-4 shrink-0">
                      <span className="absolute left-0 top-[7px] h-[2px] w-4 bg-gaffer" />
                      <span className="absolute left-[7px] top-0 h-4 w-[2px] bg-gaffer transition-transform group-open:scale-y-0" />
                    </span>
                  </summary>
                  <p className="max-w-[62ch] pb-6 text-[17px] leading-[1.6] text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Free Ad Check */}
        <section id="ad-check" className="gutter scroll-mt-20 py-24 md:py-32" aria-labelledby="check-title">
          <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
            <div className="min-w-0">
              <p className="slate text-gaffer">Free Ad Check</p>
              <h2 id="check-title" className="mt-4 text-[clamp(44px,6.6vw,104px)] font-black leading-[0.9] tracking-tighter">
                Your ad isn't bad. It's undirected.
              </h2>
              <ol className="mt-10 grid max-w-[52ch] gap-4 text-[17px] leading-[1.5]">
                <li className="grid grid-cols-[44px_minmax(0,1fr)] gap-3"><span className="slate pt-1 text-muted">01</span><span>Send your website. We pull your three most recent ads.</span></li>
                <li className="grid grid-cols-[44px_minmax(0,1fr)] gap-3"><span className="slate pt-1 text-muted">02</span><span>A director marks what's holding each one back: the hook, the angle, the cut.</span></li>
                <li className="grid grid-cols-[44px_minmax(0,1fr)] gap-3"><span className="slate pt-1 text-muted">03</span><span>You get the fixes by email, free. Keep them whether you hire us or not.</span></li>
              </ol>
            </div>
            <div className="min-w-0 rounded-md border border-line bg-raised p-7 md:p-10">
              <AdCheckForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="gutter border-t border-line py-14">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-12">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="flex items-center gap-6">
              <TapeMark size={72} />
              <div>
                <Wordmark size={56} />
                <p className="mt-3 text-[15px] font-semibold">Your brand, directed<span className="text-gaffer">.</span></p>
              </div>
            </div>
            <div className="grid gap-2 text-[15px]">
              <span className="slate text-muted">Email</span>
              <span className="select-all font-semibold">hello@creativedirectionhub.com</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-between gap-4 border-t border-line pt-6 text-[13px] text-muted">
            <span>© 2026 Creative Direction Hub. Fully remote.</span>
            <span>Spec work shown is concept work, not client work.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
