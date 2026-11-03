// Names taped down on set: every name on its own strip of gaffer tape, written on in marker,
// the way a crew labels the floor. Tilts are fixed per name so the layout never jumps between renders.

const hash = (s: string) => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };

export default function TapeNames({ names, tone = "gaffer", className = "" }: { names: string[]; tone?: "gaffer" | "bone"; className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-x-4 gap-y-5 md:gap-x-6 md:gap-y-7 ${className}`}>
      {names.map((n) => {
        const h = hash(n);
        const tilt = ((h % 7) - 3) * 0.7; // -2.1deg to 2.1deg
        const lift = ((h >> 3) % 3) - 1; // -1, 0, 1 → small vertical stagger
        return (
          <li key={n} className="tape-name-wrap" style={{ ["--tilt" as string]: `${tilt}deg`, ["--lift" as string]: `${lift * 3}px` }}>
            <span className={`tape-name tape-edge ${tone === "bone" ? "tape-name-bone" : ""}`}>{n}</span>
          </li>
        );
      })}
    </ul>
  );
}
