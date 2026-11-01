import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TapeMark } from "../components/Brand";
import WaysToStart from "../components/WaysToStart";

export const metadata: Metadata = {
  title: { absolute: "Proof: Black Travel Gram, Awards and Travel Work | Creative Direction Hub" },
  description: "The receipts: two years as Black Travel Gram's photographer and creative, the account's own growth numbers, a 2020 ND Awards honorable mention, and the travel work behind it.",
  alternates: { canonical: "/proof" },
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
  { src: "/proof/aurora.webp", w: 1600, h: 1137, alt: "Green northern lights over a snowfield and a single yellow house", place: "Iceland", span: "col-span-2 md:col-span-4", wide: true },
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

      {/* The numbers */}
      <section className="gutter border-b border-line py-16 md:py-24" aria-labelledby="numbers-title">
        <div className="mx-auto max-w-[1440px]">
          <h2 id="numbers-title" className="slate text-muted">Black Travel Gram, by its own count</h2>
          <dl className="mt-8 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {numbers.map((n, i) => (
              <div key={n.k} className={`border-b border-line py-8 lg:border-b-0 ${i > 0 ? "lg:border-l lg:pl-8" : ""} ${i % 2 ? "sm:border-l sm:pl-8 lg:pl-8" : "sm:pr-8"}`}>
                <dt className="text-[clamp(48px,6vw,88px)] font-black leading-none tracking-[-0.04em]">{n.k}</dt>
                <dd className="mt-3 max-w-[26ch] text-[15px] leading-[1.5] text-muted">{n.v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-12 grid gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <figure className="min-w-0">
              <Image src="/proof/btg-90k-post.webp" alt="Black Travel Gram's Facebook post from January 24, 2021: 90,000 followers, 214,000 hashtags, 900,000 impressions a week, with a 90k Followers Thank You graphic" width={700} height={1037} sizes="(min-width: 768px) 40vw, 92vw" className="w-full rounded-md border border-line" />
              <figcaption className="slate mt-3 text-[12px] text-muted">Their post · Jan 24, 2021</figcaption>
            </figure>
            <div className="grid min-w-0 content-start gap-6">
              <figure>
                <Image src="/proof/btg-profile-118k.webp" alt="Black Travel Gram's Instagram profile: 3,209 posts, 118K followers, Travel Company, We curate Black Travel Experiences around the world" width={900} height={467} sizes="(min-width: 768px) 50vw, 92vw" className="w-full rounded-md border border-line" />
                <figcaption className="slate mt-3 text-[12px] text-muted">Their profile · 118K followers</figcaption>
              </figure>
              <blockquote className="rounded-md border border-line bg-surface p-7 md:p-9">
                <p className="text-[clamp(26px,3vw,40px)] font-black leading-[1.08] tracking-tighter">“BlackTravelGram ➕ Stackz = DIGITAL CREATIVES”</p>
                <footer className="slate mt-5 text-[12px] text-muted">Black Travel Gram, public comment</footer>
              </blockquote>
              <blockquote className="rounded-md border border-line p-7 md:p-9">
                <p className="text-[22px] font-extrabold leading-[1.25]">“BlackTravelGram is all you been talking bout! KEEP DOING IT!”</p>
                <footer className="slate mt-5 text-[12px] text-muted">De'Aaron Paige, founder of Black Travel Gram</footer>
              </blockquote>
            </div>
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
            <div className="mt-8 grid grid-cols-[96px_minmax(0,1fr)] items-center gap-6">
              <Image src="/proof/nd-badge.webp" alt="ND Awards 2020 Honorable Mention seal" width={500} height={480} className="w-24" />
              <Image src="/proof/nd-certificate.webp" alt="Certificate: Neutral Density Photography Awards certifies that Willie Bernoudy was awarded an Honorable Mention in People: Travel / Culture, issued 22 Nov 2020" width={1060} height={870} sizes="(min-width: 1024px) 30vw, 70vw" className="w-full rounded-sm border border-line bg-white" />
            </div>
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
                <Image src={g.src} alt={g.alt} width={g.w} height={g.h} sizes="(min-width: 768px) 25vw, 46vw" className={`w-full rounded-md object-cover ${"wide" in g ? "aspect-[16/9] md:aspect-[21/9]" : g.span ? "aspect-[16/11]" : "aspect-[9/16]"}`} />
                <figcaption className="slate mt-2 text-[11px] text-muted">{g.place}</figcaption>
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
              <figcaption className="slate mt-3 text-[11px] text-muted">Story ad · 11 seconds · sound on</figcaption>
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
