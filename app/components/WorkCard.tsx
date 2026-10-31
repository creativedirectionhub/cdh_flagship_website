import Link from "next/link";
import CaseMedia from "./CaseMedia";
import { LABELS, LANES, type Case } from "../content/work";

export default function WorkCard({ c, sizes, priority = false, big = false }: { c: Case; sizes: string; priority?: boolean; big?: boolean }) {
  const cover = big ? { ...c.cover, w: 16, h: 10 } : { ...c.cover, w: 4, h: 5 };
  return (
    <article className="group min-w-0">
      <Link href={`/work/${c.slug}`} className="block">
        <CaseMedia m={cover} sizes={sizes} priority={priority} label={LABELS[c.label]} className="rounded-sm border border-line transition-[filter] group-hover:brightness-110" />
        <div className="mt-4">
          <div className="min-w-0">
            <h3 className={`font-black leading-[0.95] tracking-tighter ${big ? "text-[clamp(28px,3.4vw,44px)]" : "text-[26px]"}`}>{c.title}</h3>
            <p className="mt-2 text-[15px] font-semibold text-muted">{c.client}</p>
          </div>
          <p className="slate mt-2 text-[12px] text-muted">{c.lanes.map((l) => LANES[l]).join(" · ")}</p>
        </div>
      </Link>
    </article>
  );
}
