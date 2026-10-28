import type { Metadata } from "next";
import AuditForm from "../components/AuditForm";
import { BOOKING_URL } from "../config";
import { site } from "../content/services";

export const metadata: Metadata = {
  title: "Start",
  description: "Get a Free Creative Audit: we review your brand, your site and your last three pieces, and email you the fixes within 3 business days.",
  alternates: { canonical: "/start" },
};

const next = [
  { t: "Within a day", b: "You get a note that it's in hand, with anything we need to see that we couldn't find." },
  { t: "Within 3 business days", b: "Your audit lands by email: what's holding the brand, the site and the last three pieces back, with fixes you can use whether you hire us or not." },
  { t: "If it fits", b: "A 20-minute call. We agree a scope and a fixed price, or a monthly retainer, and start." },
];

export default function StartPage() {
  return (
    <>
      <section className="gutter py-16 md:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <div className="min-w-0">
            <p className="slate text-gaffer">Free Creative Audit</p>
            <h1 className="mt-4 text-[clamp(44px,6.6vw,104px)] font-black leading-[0.9] tracking-tightest">Start here. It's free.</h1>
            <p className="mt-6 max-w-[46ch] text-[18px] leading-[1.55] text-body">Send your website or Instagram. Willie reviews the brand, the site and your last three pieces of content or ads, and emails you what's holding them back, with fixes. Yours to keep.</p>
            <h2 className="slate mt-12 text-muted">What happens next</h2>
            <ol className="mt-5 grid border-t border-line">
              {next.map((n, i) => (
                <li key={n.t} className="grid gap-2 border-b border-line py-5 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-6">
                  <span className="text-[17px] font-extrabold"><span className="slate mr-3 text-[11px] text-muted">0{i + 1}</span>{n.t}</span>
                  <span className="text-[16px] leading-[1.55] text-body">{n.b}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-[15px] text-muted">Rather talk first? Email <a href={`mailto:${site.email}`} className="font-semibold text-ink hover:text-gaffer">{site.email}</a>{BOOKING_URL && <> or <a href={BOOKING_URL} target="_blank" rel="noopener" className="font-semibold text-gaffer hover:underline">book a 20-minute call</a></>}.</p>
          </div>
          <div className="min-w-0 rounded-md border border-line bg-raised p-7 md:p-10">
            <AuditForm />
          </div>
        </div>
      </section>
      {BOOKING_URL && (
        <section className="gutter border-t border-line py-16 md:py-24" aria-labelledby="book-title">
          <div className="mx-auto max-w-[1440px]">
            <h2 id="book-title" className="text-[clamp(32px,4vw,56px)] font-black leading-[0.95] tracking-tighter">Or book a call now.</h2>
            <iframe src={BOOKING_URL} title="Book a call with Willie Bernoudy" className="mt-8 h-[720px] w-full rounded-md border border-line bg-surface" loading="lazy" />
          </div>
        </section>
      )}
    </>
  );
}
