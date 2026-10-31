export default function SectionHead({ slate, title, children, light = false }: { slate: string; title: React.ReactNode; children?: React.ReactNode; light?: boolean }) {
  return (
    <div className="reveal grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end">
      <div className="min-w-0">
        <p className={`slate ${light ? "text-gaffer" : "text-muted"}`}>{slate}</p>
        <h2 className="t-l mt-4">{title}</h2>
      </div>
      {children && <div className="max-w-[46ch] text-[18px] leading-[1.55] text-body lg:justify-self-end">{children}</div>}
    </div>
  );
}
