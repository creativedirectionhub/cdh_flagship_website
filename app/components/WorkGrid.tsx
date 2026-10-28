import Link from "next/link";
import WorkCard from "./WorkCard";
import { cases, DISCIPLINES, LANES, type Discipline, type Lane } from "../content/work";

// Filters are links, so the state lives in the URL (/work?lane=…&discipline=…) and the grid is in the HTML.
export default function WorkGrid({ lane, discipline }: { lane: Lane | ""; discipline: Discipline | "" }) {
  const shown = cases.filter((c) => (!lane || c.lanes.includes(lane)) && (!discipline || c.disciplines.includes(discipline)));
  const href = (l: string, d: string) => {
    const q = new URLSearchParams();
    if (l) q.set("lane", l);
    if (d) q.set("discipline", d);
    const s = q.toString();
    return s ? `/work?${s}` : "/work";
  };
  const chip = (on: boolean) => `inline-flex min-h-[44px] items-center rounded-sm border px-4 text-[14px] font-semibold ${on ? "border-ink bg-ink text-ground" : "border-line hover:border-muted"}`;

  return (
    <>
      <nav className="mt-12 grid gap-4 border-y border-line py-6" aria-label="Filters">
        <div className="flex flex-wrap items-center gap-2">
          <span className="slate mr-2 text-muted">Lane</span>
          <Link href={href("", discipline)} aria-current={!lane ? "true" : undefined} className={chip(!lane)}>All</Link>
          {(Object.keys(LANES) as Lane[]).map((k) => (
            <Link key={k} href={href(lane === k ? "" : k, discipline)} aria-current={lane === k ? "true" : undefined} className={chip(lane === k)}>{LANES[k]}</Link>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="slate mr-2 text-muted">Discipline</span>
          <Link href={href(lane, "")} aria-current={!discipline ? "true" : undefined} className={chip(!discipline)}>All</Link>
          {(Object.keys(DISCIPLINES) as Discipline[]).map((k) => (
            <Link key={k} href={href(lane, discipline === k ? "" : k)} aria-current={discipline === k ? "true" : undefined} className={chip(discipline === k)}>{DISCIPLINES[k]}</Link>
          ))}
        </div>
      </nav>
      <h2 className="sr-only">Cases</h2>
      <p className="slate mt-6 text-muted">{shown.length} {shown.length === 1 ? "case" : "cases"}</p>
      <div className="mt-8 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((c, n) => (
          <WorkCard key={c.slug} c={c} sizes="(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 92vw" priority={n < 3} />
        ))}
      </div>
      {shown.length === 0 && <p className="mt-8 text-[17px] text-muted">Nothing in that combination yet. <Link href="/work" className="font-semibold text-ink hover:text-gaffer">Clear the filters.</Link></p>}
    </>
  );
}
