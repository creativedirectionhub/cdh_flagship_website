import { offers, pad2 } from "../content/offer";

// A clapper slate for a service page. The top stick claps once on load (CSS, see .scene-clap).
export default function SceneSlate({ scene, dept, shape }: { scene: number; dept: string; shape: string }) {
  const cell = "border-[#efe9df]/30 p-4";
  const k = "slate text-[12px] text-[#efe9df]/60";
  return (
    <div className="w-full max-w-[440px] text-[#efe9df]" role="group" aria-label={`Scene ${scene} of ${offers.length}, ${dept}, ${shape}`}>
      <div aria-hidden="true" className="slate-stripes scene-clap h-[40px]" />
      <div aria-hidden="true" className="slate-stripes slate-stripes-rev mt-[3px] h-[34px]" />
      <dl className="mt-[3px] grid grid-cols-3 border-2 border-[#efe9df]/80 bg-[#1b1a18]">
        <div className={`col-span-3 border-b-2 ${cell}`}><dt className={k}>Prod.</dt><dd className="mt-1 text-[24px] font-black leading-none tracking-[-0.03em]">Creative Direction Hub</dd></div>
        <div className={`border-r-2 ${cell}`}><dt className={k}>Scene</dt><dd className="mt-1 text-[44px] font-black leading-none text-gaffer tabular-nums">{pad2(scene)}</dd></div>
        <div className={`border-r-2 ${cell}`}><dt className={k}>Of</dt><dd className="mt-1 text-[44px] font-black leading-none tabular-nums">{pad2(offers.length)}</dd></div>
        <div className={cell}><dt className={k}>Take</dt><dd className="mt-1 text-[44px] font-black leading-none">01</dd></div>
        <div className={`col-span-2 border-r-2 border-t-2 ${cell}`}><dt className={k}>Dept.</dt><dd className="mt-1 text-[20px] font-black leading-none">{dept}</dd></div>
        <div className={`border-t-2 ${cell}`}><dt className={k}>Runs as</dt><dd className="mt-1 text-[16px] font-black leading-[1.05]">{shape}</dd></div>
      </dl>
    </div>
  );
}
