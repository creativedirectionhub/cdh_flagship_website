import type { Metadata } from "next";
import WorkGrid from "../components/WorkGrid";
import WaysToStart from "../components/WaysToStart";
import { DISCIPLINES, LANES, type Discipline, type Lane } from "../content/work";

export const metadata: Metadata = {
  title: "Work",
  description: "Brand, campaigns, content, digital and AI art direction for consumer brands, personal brands and hospitality, directed by Willie Bernoudy. Client work first; concepts labeled.",
  alternates: { canonical: "/work" },
};

export default function WorkPage({ searchParams }: { searchParams: { lane?: string; discipline?: string } }) {
  const lane = (searchParams.lane && searchParams.lane in LANES ? searchParams.lane : "") as Lane | "";
  const discipline = (searchParams.discipline && searchParams.discipline in DISCIPLINES ? searchParams.discipline : "") as Discipline | "";
  return (
    <>
      <section className="bone gutter py-16 md:py-24">
        <div className="mx-auto max-w-[1440px]">
          <p className="slate text-gaffer">Work</p>
          <h1 className="mt-4 text-[clamp(48px,8vw,128px)] font-black leading-[0.9] tracking-tightest">Every piece has a director.</h1>
          <p className="mt-6 max-w-[52ch] text-[18px] leading-[1.55] text-body">Filter by who it was for or what kind of work it was. Client work is labeled Client. Concepts are labeled Concept and are not commissioned by the brands shown.</p>
          <WorkGrid lane={lane} discipline={discipline} />
        </div>
      </section>
      <WaysToStart />
    </>
  );
}
