import Link from "next/link";
import { byDept, depts, pad2, sceneOf, type Dept } from "../content/offer";

// The services menu as a production call sheet: every service is a scene, grouped by department.
// Point at a scene and a strip of gaffer tape slaps down behind it (CSS only, see .cs-row).
export default function CallSheet({ only }: { only?: Dept }) {
  const shown = only ? depts.filter((d) => d.id === only) : depts;
  return (
    <div className="grid">
      {shown.map((d) => {
        const rows = byDept(d.id);
        return (
          <section key={d.id} id={d.id} aria-labelledby={`cs-${d.id}`} className="grid scroll-mt-24 gap-x-12 gap-y-6 border-t-2 border-ink py-10 md:py-14 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)]">
            <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
              <p className="slate text-gaffer">Dept. {pad2(depts.indexOf(d) + 1)} · {rows.length === 1 ? "1 scene" : `${rows.length} scenes`}</p>
              <h2 id={`cs-${d.id}`} className="mt-3 text-[clamp(40px,4.6vw,72px)] font-black leading-[0.92] tracking-tighter">{d.name}<span className="text-gaffer">.</span></h2>
              <p className="mt-4 max-w-[30ch] text-[17px] leading-[1.5] text-body">{d.blurb}</p>
            </div>
            <ol className="min-w-0 border-b border-line">
              {rows.map((o) => (
                <li key={o.slug} className="border-t border-line">
                  <Link href={`/services/${o.slug}`} className="cs-row grid min-h-[72px] grid-cols-[44px_minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-1 py-5 md:grid-cols-[56px_minmax(0,0.9fr)_minmax(0,1fr)_auto] md:py-6">
                    <span className="cs-num slate text-[12px] text-muted">{pad2(sceneOf(o.slug))}</span>
                    <span className="text-[clamp(26px,3vw,44px)] font-black leading-[0.95] tracking-tighter">{o.name}</span>
                    <span className="cs-sub col-start-2 text-[16px] leading-[1.4] text-muted md:col-start-3">{o.line}</span>
                    <span aria-hidden="true" className="cs-go col-start-3 row-start-1 self-center text-[22px] font-black md:col-start-4">→</span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
