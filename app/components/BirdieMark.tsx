// The Black Birdie Farms mark, drawn inline so it can animate: the bird is already there in the first frame,
// then the oyster-mushroom wing fans open from the shoulder and the gills draw in, like a cap opening.
// Reduced motion gets the finished mark with no movement.
export default function BirdieMark({ className = "", animate = true }: { className?: string; animate?: boolean }) {
  const gills = [
    "M124 82.6 L148 75.7", "M124.7 86.2 L149.5 82.8", "M125 90 L150 90", "M124.7 93.8 L149.5 97.2", "M124 97.4 L148 104.3",
    "M122.7 101 L145.5 111.2", "M120.9 104.3 L142.1 117.6", "M118.7 107.4 L137.8 123.4", "M116.1 110.1 L132.8 128.6", "M113.1 112.4 L127.1 133.1",
  ];
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label="Black Birdie Farms mark: a blackbird whose wing is an oyster mushroom" className={`${animate ? "bbf-anim" : ""} ${className}`}>
      <g fill="#1E1A16">
        <circle cx="78" cy="66" r="17" />
        <path d="M66 76 C60 98 70 124 94 136 C110 144 130 145 144 140 L182 158 L185 150 L152 128 C152 104 140 84 120 74 C106 66 90 62 80 62 Z" />
      </g>
      <path d="M63 60 L42 67 L63 73 Z" fill="#D9A23B" />
      <circle cx="74" cy="62" r="4.6" fill="#D9A23B" />
      <circle cx="74" cy="62" r="2.3" fill="#1E1A16" />
      <path className="bbf-wing" d="M98 90 L150.1 66.8 Q156.8 70.3 153.5 77.2 Q159.5 81.9 155 88 Q159.9 93.8 154.3 98.9 Q158 105.5 151.6 109.5 Q154 116.7 146.9 119.4 Q147.8 126.9 140.4 128.1 Q139.9 135.7 132.3 135.5 Q130.4 142.9 123 141.2 Z" fill="#D9A23B" />
      <g stroke="#1E1A16" strokeWidth="1.7" strokeLinecap="round" fill="none">
        {gills.map((d, i) => <path key={d} className="bbf-gill" d={d} style={{ ["--i" as string]: i }} pathLength={1} />)}
      </g>
      <g stroke="#D9A23B" strokeWidth="3.4" strokeLinecap="round" fill="none">
        <path d="M100 140 L97 162 L90 166 M97 162 L104 166" />
        <path d="M114 143 L113 162 L106 166 M113 162 L120 166" />
      </g>
    </svg>
  );
}
