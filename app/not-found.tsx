import Link from "next/link";
import { TapeMark } from "./components/Brand";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="gutter py-24 md:py-36">
      <div className="mx-auto max-w-[1440px]">
        <TapeMark size={96} className="-rotate-6" />
        <p className="slate mt-10 text-gaffer">404</p>
        <h1 className="mt-4 max-w-[14ch] text-[clamp(48px,8vw,128px)] font-black leading-[0.9] tracking-tightest">This page missed its mark.</h1>
        <p className="mt-6 max-w-[46ch] text-[18px] leading-[1.55] text-body">The link may be old, or the page moved. Here's where to go next.</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/" className="btn-primary">Back to home</Link>
          <Link href="/work" className="btn-secondary">See the work</Link>
          <Link href="/start" className="btn-secondary">Get a Free Creative Audit</Link>
        </div>
      </div>
    </section>
  );
}
