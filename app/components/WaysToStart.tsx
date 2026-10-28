import Link from "next/link";
import { BOOKING_URL } from "../config";
import { ways } from "../content/services";
import SectionHead from "./SectionHead";

export default function WaysToStart({ id = "start-here" }: { id?: string }) {
  const book = BOOKING_URL || "/start";
  const bookProps = BOOKING_URL ? { target: "_blank", rel: "noopener" } : {};
  return (
    <section id={id} className="gutter scroll-mt-20 border-t border-line py-24 md:py-32" aria-labelledby={`${id}-title`}>
      <div className="mx-auto max-w-[1440px]">
        <SectionHead slate="Three ways to start" title={<span id={`${id}-title`}>Start with the audit. It's free.</span>}>
          Projects are quoted on a short call after your audit, with a fixed price before we begin. Retainers run month to month.
        </SectionHead>
        <ul className="reveal mt-14 grid gap-6 lg:grid-cols-3">
          {ways.map((w) => (
            <li key={w.id} className={`flex flex-col gap-5 rounded-md border bg-surface p-7 ${w.featured ? "border-gaffer" : "border-line"}`}>
              <p className={`slate ${w.featured ? "text-gaffer" : "text-muted"}`}>{w.label}</p>
              <h3 className="text-[30px] font-extrabold leading-[1.05] tracking-[-0.02em] lg:min-h-[2.1em]">{w.name}</h3>
              <p className="text-[40px] font-black leading-none tracking-[-0.03em]">
                {w.pace} <span className="text-[16px] font-normal tracking-normal text-muted">{w.term}</span>
              </p>
              <p className="text-[16px] leading-[1.55] text-body">{w.body}</p>
              <ul className="grid gap-2.5 text-[15px] leading-[1.45]">
                {w.items.map((it) => (
                  <li key={it} className="relative pl-6">
                    <span aria-hidden="true" className="absolute left-0 top-[9px] h-[3px] w-3 bg-gaffer" />
                    {it}
                  </li>
                ))}
              </ul>
              {w.href === "book" ? (
                <a href={book} {...bookProps} className={`mt-auto ${w.featured ? "btn-primary" : "btn-secondary"}`}>{w.cta}</a>
              ) : (
                <Link href={w.href} className={`mt-auto ${w.featured ? "btn-primary" : "btn-secondary"}`}>{w.cta}</Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
