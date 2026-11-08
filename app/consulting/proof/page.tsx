import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TapeMark } from "../../components/Brand";
import WaysToStart from "../../components/WaysToStart";

export const metadata: Metadata = {
  title: { absolute: "Proof: Black Travel Gram, Awards and Travel Work | Creative Direction Hub" },
  description: "The receipts: two years as Black Travel Gram's photographer and creative, the account's own growth numbers, a 2020 ND Awards honorable mention, and the travel work behind it.",
  alternates: { canonical: "/consulting/proof" },
};

// Every number here comes from Black Travel Gram's own posts and profile (screenshots below).
const numbers = [
  { k: "~38K", v: "followers when Willie joined the creative squad, 2019" },
  { k: "90K", v: "followers in Black Travel Gram's own post, Jan 24, 2021" },
  { k: "900K", v: "impressions a week, same post" },
  { k: "118K", v: "followers on the profile, 3,209 posts" },
];

const timeline = [
  { d: "Jul 2019", t: "Black Travel Gram books Willie", b: "Their first message: “You do video too, don't you?” The first trip is on the calendar the same day." },
  { d: "Sep 2019", t: "The brief", b: "Be more than an Instagram page. Every trip after that is shot like a campaign: people first, places second, nobody posing for a postcard." },
  { d: "Nov 2020", t: "ND Awards honorable mention", b: "“The Beautiful Shot” is recognized in the Neutral Density Photography Awards, People: Travel / Culture." },
  { d: "Jan 2021", t: "90,000 followers", b: "Black Travel Gram posts its numbers: 90,000 followers, 214,000 hashtag uses, 900,000 impressions a week." },
  { d: "2021", t: "100K and the press", b: "The account passes 100K, and Travel Noire covers Black Travel Gram's group trips and its Black Yacht Experience in Tulum." },
];

const gallery = [
  { src: "/proof/cartagena-palenqueras.webp", w: 1600, h: 1137, alt: "A traveler in a red tiered dress stands with four Palenquera fruit vendors in Cartagena, Colombia, fruit bowls on their heads", place: "Cartagena, Colombia", span: "col-span-2" },
  { src: "/proof/reykjavik.webp", w: 900, h: 1600, alt: "A woman in a pink coat stands before Hallgrímskirkja church in Reykjavík, snow on the ground", place: "Reykjavík, Iceland" },
  { src: "/proof/giza.webp", w: 900, h: 1600, alt: "A woman in an orange coat and black scarf in front of the Sphinx and the pyramids at Giza", place: "Giza, Egypt" },
  { src: "/proof/bangkok.webp", w: 900, h: 1600, alt: "A woman in an orange print gown at night before the lit spires of Wat Arun", place: "Bangkok, Thailand" },
  { src: "/proof/karnak.webp", w: 900, h: 1600, alt: "A man in a brown henley and wide-brim hat among the ruins at Karnak, an obelisk behind him", place: "Luxor, Egypt" },
  { src: "/proof/cartagena-pair.webp", w: 900, h: 1600, alt: "Two women in mustard and red ruffled outfits against a white gate in Cartagena", place: "Cartagena, Colombia" },
  { src: "/proof/snow.webp", w: 900, h: 1600, alt: "A smiling woman with long red braids in a snowfall, hood up", place: "Iceland" },
  { src: "/proof/barcelona.webp", w: 1600, h: 1137, alt: "Plaça d\u2019Espanya in Barcelona under a bright sky, a lone walker and her dog crossing the empty square", place: "Barcelona, Spain", span: "col-span-2 md:col-span-4", wide: true },
];

const ads = [
  { f: "01-grandma", h: "Grandma never saw it from up here." },
  { f: "02-first-stamp", h: "Your first stamp hits different." },
  { f: "03-landing", h: "Every landing is a before and after." },
  { f: "04-mountains", h: "They said we don't do mountains." },
  { f: "05-iceland", h: "Iceland was always for us." },
  { f: "06-northern-lights", h: "We don't do cold. We do the Northern Lights." },
  { f: "07-barcelona", h: "Barcelona. 9 a.m. No alarm." },
  { f: "08-group-chat", h: "The group chat finally booked it." },
];

// A strip of CDH gaffer tape: pins evidence to the page.
function Tape({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`tape-edge pointer-events-none absolute z-10 block h-[26px] w-[110px] bg-gaffer shadow-[0_2px_8px_rgba(0,0,0,0.35)] ${className}`} />;
}

const receipt = [
  { l: "Followers, 2019", r: "~38,000" },
  { l: "Followers, Jan 24 2021", r: "90,000" },
  { l: "Hashtag uses", r: "214,000" },
  { l: "Impressions / week", r: "900,000" },
  { l: "Followers, profile", r: "118,000" },
  { l: "Posts", r: "3,209" },
];

export default function ProofPage() {
  return (
    <>
      {/* Open: the claim, on one of his own frames */}
      <section className="relative overflow-hidden bg-ground text-[#efe9df]">
        <Image src="/proof/window-sunset.webp" alt="" fill priority sizes="100vw" className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-[#121110]/50 to-[#121110]/30" />
        <div className="gutter relative py-24 md:py-40">
          <div className="mx-auto max-w-[1440px]">
            <p className="slate text-[#efe9df]/80">Proof</p>
            <h1 className="mt-4 max-w-[14ch] text-[clamp(52px,8.4vw,140px)] font-black leading-[0.92] tracking-tightest">The receipts<span className="text-gaffer">.</span></h1>
            <p className="mt-8 max-w-[54ch] text-[18px] leading-[1.6] text-[#efe9df]/90">Starting in 2019, Willie was Black Travel Gram's photographer and creative, on the trips and behind the page. These are the account's own numbers, the award the photos earned, and the work itself.</p>
          </div>
        </div>
      </section>

      {/* The numbers: a printed receipt, with the evidence taped beside it */}
      <section className="gutter overflow-hidden border-b border-line py-20 md:py-28" aria-labelledby="numbers-title">
        <div className="mx-auto grid max-w-[1440px] items-start gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <div className="min-w-0">
            <h2 id="numbers-title" className="text-[clamp(36px,4.4vw,68px)] font-black leading-[0.95] tracking-tighter">By their own count<span className="text-gaffer">.</span></h2>
            <p className="mt-5 max-w-[44ch] text-[17px] leading-[1.6] text-body">Every number below comes from Black Travel Gram's own post and profile. The screenshots are pinned right next to it.</p>
            <figure className="relative mx-auto mt-12 w-full max-w-[400px] drop-shadow-[0_28px_36px_rgba(0,0,0,0.5)] lg:mx-0">
              <Tape className="-top-3 left-1/2 -translate-x-1/2 -rotate-2" />
              <div className="receipt -rotate-[1.5deg] bg-[#f3eee4] px-7 pb-12 pt-10 text-[#1b1a18] sm:px-9" style={{ fontFamily: "var(--font-mono), ui-monospace, monospace" }}>
                <p className="text-center text-[13px] tracking-[0.2em]">BLACK TRAVEL GRAM</p>
                <p className="mt-1 text-center text-[12px] tracking-[0.14em] text-[#1b1a18]/60">CREATIVE SQUAD · SINCE 2019</p>
                <p className="mt-5 border-y border-dashed border-[#1b1a18]/40 py-2 text-center text-[12px] tracking-[0.14em]">PHOTOGRAPHER / CREATIVE: STACKZ</p>
                <dl className="mt-5 grid gap-3 text-[14px]">
                  {receipt.map((r) => (
                    <div key={r.l} className="flex items-baseline gap-2">
                      <dt className="shrink-0">{r.l}</dt>
                      <span aria-hidden="true" className="min-w-[12px] flex-1 translate-y-[-3px] border-b border-dotted border-[#1b1a18]/45" />
                      <dd className="shrink-0 font-medium tabular-nums">{r.r}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 flex items-baseline justify-between border-t-2 border-[#1b1a18] pt-4">
                  <span className="text-[14px] tracking-[0.1em]">TOTAL GROWTH</span>
                  <span className="text-[34px] font-black leading-none tracking-[-0.02em]" style={{ fontFamily: "var(--font-display)" }}>3x</span>
                </div>
                <p className="mt-6 text-center text-[12px] tracking-[0.18em] text-[#1b1a18]/70">THANK YOU · KEEP DOING IT</p>
              </div>
            </figure>
          </div>

          <div className="relative min-w-0">
            <div className="grid grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] items-start gap-5 sm:gap-8">
              <figure className="relative mt-10 rotate-[2deg]">
                <Tape className="-top-3 left-6 rotate-[-8deg] !w-[84px]" />
                <div className="overflow-hidden bg-white p-2 shadow-[0_24px_50px_rgba(0,0,0,0.45)]">
                  <Image src="/proof/btg-90k-post.webp" alt="Black Travel Gram's Facebook post from January 24, 2021: 90,000 followers, 214,000 hashtags, 900,000 impressions a week, with a 90k Followers Thank You graphic" width={700} height={1037} sizes="(min-width: 1024px) 26vw, 44vw" className="w-full" />
                </div>
                <figcaption className="slate mt-4 text-[12px] text-muted">Their post · Jan 24, 2021</figcaption>
              </figure>
              <div className="grid gap-8">
                <figure className="relative -rotate-[1.5deg]">
                  <Tape className="-top-3 right-6 rotate-[6deg] !w-[84px]" />
                  <div className="overflow-hidden bg-white p-2 shadow-[0_24px_50px_rgba(0,0,0,0.45)]">
                    <Image src="/proof/btg-profile-118k.webp" alt="Black Travel Gram's Instagram profile: 3,209 posts, 118K followers, Travel Company, We curate Black Travel Experiences around the world" width={900} height={467} sizes="(min-width: 1024px) 30vw, 48vw" className="w-full" />
                  </div>
                  <figcaption className="slate mt-4 text-[12px] text-muted">Their profile · 118K</figcaption>
                </figure>
                <figure className="relative hidden rotate-[1deg] sm:ml-6 sm:block">
                  <Tape className="-left-4 top-5 -rotate-[38deg] !w-[70px]" />
                  <blockquote className="bg-gaffer px-6 py-7 text-[#141312] shadow-[0_24px_50px_rgba(0,0,0,0.45)] sm:px-8">
                    <p className="text-[clamp(22px,2.4vw,34px)] font-black leading-[1.05] tracking-tighter">“BlackTravelGram ➕ Stackz = DIGITAL CREATIVES”</p>
                    <footer className="slate mt-4 text-[12px] text-[#141312]/75">Black Travel Gram · public comment</footer>
                  </blockquote>
                </figure>
              </div>
            </div>
            <figure className="relative mt-12 rotate-[1deg] sm:hidden">
              <Tape className="-left-4 top-5 -rotate-[38deg] !w-[70px]" />
              <blockquote className="bg-gaffer px-6 py-7 text-[#141312] shadow-[0_24px_50px_rgba(0,0,0,0.45)] sm:px-8">
                <p className="text-[clamp(22px,2.4vw,34px)] font-black leading-[1.05] tracking-tighter">“BlackTravelGram ➕ Stackz = DIGITAL CREATIVES”</p>
                <footer className="slate mt-4 text-[12px] text-[#141312]/75">Black Travel Gram · public comment</footer>
              </blockquote>
            </figure>
            <blockquote className="mt-14 border-l-4 border-gaffer pl-6 md:ml-[8%]">
              <p className="text-[clamp(22px,2.2vw,30px)] font-extrabold leading-[1.25]">“BlackTravelGram is all you been talking bout! KEEP DOING IT!”</p>
              <footer className="slate mt-4 text-[12px] text-muted">De'Aaron Paige, founder of Black Travel Gram</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="gutter py-20 md:py-28" aria-labelledby="timeline-title">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
          <h2 id="timeline-title" className="reveal self-start text-[clamp(36px,4.4vw,68px)] font-black leading-[0.95] tracking-tighter">Two years on the road with them.</h2>
          <ol className="min-w-0 border-t border-line">
            {timeline.map((s) => (
              <li key={s.d} className="grid gap-2 border-b border-line py-7 sm:grid-cols-[120px_minmax(0,1fr)] sm:gap-8">
                <p className="slate pt-1 text-[12px] text-gaffer">{s.d}</p>
                <div>
                  <h3 className="text-[22px] font-extrabold leading-tight">{s.t}</h3>
                  <p className="mt-2 max-w-[58ch] text-[17px] leading-[1.55] text-body">{s.b}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The award */}
      <section className="bone gutter py-20 md:py-28" aria-labelledby="award-title">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <figure className="relative min-w-0">
            <Image src="/proof/the-beautiful-shot.webp" alt="“The Beautiful Shot”: a woman in a pink floral top seated at a hand drum, surrounded by young dancers in leopard and orange prints, smiling" width={1128} height={1414} sizes="(min-width: 1024px) 45vw, 92vw" className="w-full rounded-md object-cover" />
            <TapeMark size={84} className="absolute -right-3 -top-5 rotate-[8deg]" />
            <figcaption className="slate mt-4 text-[12px] text-muted">“The Beautiful Shot” · Willie Bernoudy</figcaption>
          </figure>
          <div className="min-w-0 self-center">
            <p className="slate text-gaffer">Awards</p>
            <h2 id="award-title" className="mt-4 text-[clamp(36px,4.6vw,72px)] font-black leading-[0.95] tracking-tighter">Honorable mention, ND Awards 2020.</h2>
            <p className="mt-6 max-w-[52ch] text-[18px] leading-[1.6] text-body">The Neutral Density Photography Awards recognized “The Beautiful Shot” in People: Travel / Culture. Certified November 22, 2020.</p>
            <div className="relative mt-10 max-w-[560px]">
              <div className="relative overflow-hidden rounded-sm bg-[#141312] px-7 py-9 text-[#efe9df] sm:px-10 sm:py-11">
                <span aria-hidden="true" className="absolute inset-3 rounded-[2px] border border-[#efe9df]/15" />
                <p className="slate relative text-[12px] text-[#efe9df]/60">Neutral Density Photography Awards · 2020</p>
                <p className="relative mt-5 text-[clamp(30px,3.4vw,46px)] font-black leading-[0.95] tracking-tighter">Honorable<br />Mention</p>
                <p className="relative mt-4 text-[15px] text-[#efe9df]/80">People: Travel / Culture</p>
                <div className="relative mt-8 grid gap-1 border-t border-[#efe9df]/15 pt-5 sm:max-w-[62%]">
                  <p className="text-[17px] font-extrabold">Willie Bernoudy</p>
                  <p className="text-[15px] text-[#efe9df]/75">“The Beautiful Shot”</p>
                  <p className="slate mt-2 text-[12px] text-[#efe9df]/55">Certified 22 Nov 2020</p>
                </div>
              </div>
              <Image src="/proof/nd-seal.webp" alt="ND Awards 2020 Honorable Mention seal" width={727} height={698} className="absolute -bottom-8 -right-4 w-[124px] rotate-[8deg] drop-shadow-[0_14px_24px_rgba(0,0,0,0.35)] sm:-right-8 sm:w-[156px]" />
            </div>
            <a href="/proof/nd-certificate.webp" target="_blank" rel="noopener" className="slate mt-12 inline-block border-b border-current pb-0.5 text-[12px] hover:text-gaffer">View the certificate</a>
            <ul className="mt-10 grid border-t border-line text-[16px]">
              <li className="border-b border-line py-4"><span className="font-extrabold">Corporate Vision Awards 2022</span> · Best Social Media Marketing Agency, Blacksheepfocus</li>
              <li className="border-b border-line py-4"><span className="font-extrabold">Corporate Vision Awards 2023</span> · Best Social Media Strategy Agency, Blacksheepfocus</li>
            </ul>
          </div>
        </div>
      </section>

      {/* The work */}
      <section className="gutter py-20 md:py-28" aria-labelledby="gallery-title">
        <div className="mx-auto max-w-[1440px]">
          <p className="slate text-muted">Photographed by Willie</p>
          <h2 id="gallery-title" className="mt-4 text-[clamp(40px,5.6vw,84px)] font-black leading-[0.92] tracking-tighter">People first. Places second.</h2>
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {gallery.map((g) => (
              <figure key={g.src} className={`min-w-0 ${g.span ?? ""}`}>
                <Image src={g.src} alt={g.alt} width={g.w} height={g.h} sizes={"wide" in g ? "100vw" : g.span ? "(min-width: 768px) 50vw, 92vw" : "(min-width: 768px) 25vw, 46vw"} className={`w-full rounded-md object-cover ${"wide" in g ? "aspect-[16/9] object-bottom md:aspect-[21/9]" : g.span ? "aspect-[16/11]" : "aspect-[9/16]"}`} />
                <figcaption className="slate mt-2 text-[12px] text-muted">{g.place}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* What we'd run now */}
      <section className="gutter border-t border-line bg-raised py-20 md:py-28" aria-labelledby="spec-title">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
            <div>
              <p className="slate text-gaffer">Spec campaign</p>
              <h2 id="spec-title" className="mt-4 text-[clamp(40px,5.6vw,84px)] font-black leading-[0.92] tracking-tighter">The window seat.</h2>
              <p className="mt-6 max-w-[56ch] text-[18px] leading-[1.6] text-body">What we'd run for Black Travel Gram today, built from Willie's own window-seat photos and the beach shot from the original “Book that vacation” ad. New copy and design by CDH. Not commissioned.</p>
            </div>
            <figure className="mx-auto w-full max-w-[300px] lg:justify-self-end">
              <video src="/proof/group-chat-story.mp4" poster="/proof/group-chat-poster.webp" controls playsInline preload="none" className="aspect-[9/16] w-full rounded-md border border-line bg-ground" aria-label="Story ad: years of group-chat messages about a girls trip end with 'deposit sent', then two friends run into the surf. The group chat finally booked it." />
              <figcaption className="slate mt-3 text-[12px] text-muted">Story ad · 11 seconds · sound on</figcaption>
            </figure>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {ads.map((a) => (
              <Image key={a.f} src={`/proof/ad-${a.f}.webp`} alt={`Feed ad for Black Travel Gram: ${a.h}`} width={720} height={900} sizes="(min-width: 768px) 25vw, 46vw" className="w-full rounded-md border border-line" />
            ))}
          </div>
        </div>
      </section>

      {/* Press and dedication */}
      <section className="gutter border-t border-line py-16 md:py-20">
        <div className="mx-auto grid max-w-[1440px] gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <p className="slate text-muted">Coverage of Black Travel Gram</p>
            <ul className="mt-6 grid border-t border-line text-[17px]">
              <li className="border-b border-line py-4"><a className="font-extrabold underline decoration-line underline-offset-4 hover:text-gaffer" href="https://travelnoire.com/blacktravelgrams-black-yacht-experience-tulum" target="_blank" rel="noopener noreferrer">Travel Noire: BlackTravelGram's Black Yacht Experience in Tulum</a> · 2021</li>
              <li className="border-b border-line py-4"><a className="font-extrabold underline decoration-line underline-offset-4 hover:text-gaffer" href="https://www.facebook.com/blacktravelgram/videos/931281567664067/" target="_blank" rel="noopener noreferrer">Black Travel Gram: “Thank you, 100K followers”</a></li>
            </ul>
            <p className="mt-4 text-[14px] text-muted">Articles credit their photos to Black Travel Gram.</p>
          </div>
          <div className="self-end">
            <p className="text-[clamp(22px,2.4vw,30px)] font-extrabold leading-[1.3]">In memory of De'Aaron Paige, founder of Black Travel Gram, who passed in 2021. He asked for more than an Instagram page, and he built it.</p>
            <Link href="/start" className="btn-primary mt-10 inline-flex">Get your Free Creative Audit</Link>
          </div>
        </div>
      </section>
      <WaysToStart />
    </>
  );
}
