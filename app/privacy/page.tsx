import type { Metadata } from "next";
import { site } from "../content/services";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What Creative Direction Hub collects through this site, why, and how to have it removed.",
  alternates: { canonical: "/privacy" },
};

const sections: { h: string; p: string[] }[] = [
  {
    h: "What we collect",
    p: [
      "When you request a Free Creative Audit, we collect what you type into the form: your name, email, website or social handle, the kind of business you run, what you need help with, and any notes.",
      "When you sign the wall on the home page, we keep what you write on your tape, the name you sign with, where you're from if you add it, and your email. The tape, name and place show publicly on the wall; your email never does. We use it to send you a copy of your tape and, only if you tick the box, Willie's occasional notes. Ask us and we'll take your tape down and delete your email.",
      "When you book a call, Cal.com handles the booking and shares your name, email and the time you picked with us.",
      "The site uses Vercel Analytics to count visits and see which pages are read, without cookies. If we run ads, the Meta and TikTok pixels may load so we can see whether those ads bring people here.",
    ],
  },
  {
    h: "How we use it",
    p: [
      "We use your details to review your brand, send your audit, answer your questions and follow up about working together. That is all.",
      "We do not sell your information or share it with anyone outside the tools that run this site and our inbox: Vercel (hosting), Brevo and Make.com (email and form delivery), Google (email) and Cal.com (booking).",
    ],
  },
  {
    h: "How long we keep it",
    p: ["We keep audit requests and emails for as long as they are useful to the conversation, then delete them. You can ask us to delete them at any time."],
  },
  {
    h: "Your choices",
    p: [
      `Email ${site.email} to see what we have about you, correct it, or have it deleted. Every email we send also has a way to stop hearing from us.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <section className="gutter py-16 md:py-24">
      <div className="mx-auto max-w-[760px]">
        <p className="slate text-gaffer">Privacy</p>
        <h1 className="mt-4 text-[clamp(40px,6vw,72px)] font-black leading-[0.95] tracking-tighter">Your details stay with us.</h1>
        <p className="mt-6 text-[18px] leading-[1.6] text-body">Plain answers about what this site collects and what we do with it. Last updated October 2026.</p>
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
