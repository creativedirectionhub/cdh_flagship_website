import type { Metadata } from "next";
import { site } from "../content/services";

export const metadata: Metadata = {
  title: "Terms",
  description: "How Creative Direction Hub works with clients: scope and price, timing, revisions, ownership, how the work is made and payment.",
  alternates: { canonical: "/terms" },
};

const sections: { h: string; p: string[] }[] = [
  {
    h: "Scope and price",
    p: [
      "Every project starts with a written scope and a fixed price, agreed before work begins. Anything outside that scope is quoted separately before we do it.",
      "Retainers have a 3-month minimum, then run month to month with 30 days’ notice.",
    ],
  },
  {
    h: "Timing and revisions",
    p: [
      "The first cut of each piece lands within 5 business days of an approved brief, unless the scope says otherwise.",
      "Each piece includes two rounds of revisions. More rounds are quoted before they start.",
    ],
  },
  {
    h: "Who owns the work",
    p: [
      "You own the finished work once it's paid for.",
      "When a creator or on-camera talent appears, their usage terms (how long and where their face can run) are written into that deal before filming.",
    ],
  },
  {
    h: "How the work is made",
    p: ["We use the tools that fit the job, including AI tools, and a director checks every piece before you see it.", "Work on this site marked Concept was made by CDH and was not commissioned by a client. Ask how any piece was made and we'll tell you.", "Ads that run on platforms with their own disclosure rules are delivered to meet those rules."],
  },
  {
    h: "Payment",
    p: ["Invoices are sent through Stripe, with the amount and due date on each invoice."],
  },
  {
    h: "Questions",
    p: [`Email ${site.email}. The signed scope for your project is the final word wherever it differs from this page.`],
  },
];

export default function TermsPage() {
  return (
    <section className="gutter py-16 md:py-24">
      <div className="mx-auto max-w-[760px]">
        <p className="slate text-gaffer">Terms</p>
        <h1 className="mt-4 text-[clamp(40px,6vw,72px)] font-black leading-[0.95] tracking-tighter">How we work together.</h1>
        <p className="mt-6 text-[18px] leading-[1.6] text-body">The short version of how projects run. Your signed scope covers the details. Last updated October 2026.</p>
        <div className="mt-12 grid gap-10">
          {sections.map((s) => (
            <div key={s.h} className="border-t border-line pt-8">
              <h2 className="text-[26px] font-extrabold leading-tight tracking-tight">{s.h}</h2>
              {s.p.map((t) => (
                <p key={t} className="mt-4 text-[17px] leading-[1.65] text-body">{t}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
