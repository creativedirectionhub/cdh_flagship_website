// The Mark: tape T, and the W1 wordmark (CD + an H whose crossbar is gaffer tape).

const TAPE_TOP =
  "14,46 186,40 182,48 188,55 183,62 189,70 186,80 16,86 20,79 13,72 19,64 12,57 18,50";
const TAPE_STEM =
  "80,83 122,82 121,188 115,183 109,190 103,184 97,190 91,184 85,190 80,186";

export function TapeMark({
  size = 96,
  color = "#ff5a1f",
  className = "",
  label,
}: {
  size?: number;
  color?: string;
  className?: string;
  label?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <polygon data-tape="top" points={TAPE_TOP} fill={color} />
      <polygon data-tape="stem" points={TAPE_STEM} fill={color} />
    </svg>
  );
}

/** W1 wordmark. `size` is the font size of the letters in px. */
export function Wordmark({
  size = 32,
  ink = "#efe9df",
  tape = "#ff5a1f",
  className = "",
}: {
  size?: number;
  ink?: string;
  tape?: string;
  className?: string;
}) {
  const h = size * 0.73;
  const w = h * (150 / 146);
  return (
    <span
      className={`inline-flex items-baseline ${className}`}
      style={{ gap: size * 0.035 }}
      role="img"
      aria-label="CDH"
    >
      <span
        aria-hidden="true"
        className="font-display font-black"
        style={{ fontSize: size, lineHeight: 0.74, letterSpacing: "-0.045em", color: ink }}
      >
        CD
      </span>
      <svg aria-hidden="true" width={w} height={h} viewBox="0 0 150 146">
        <rect x="4" y="0" width="40" height="146" fill={ink} />
        <rect x="106" y="0" width="40" height="146" fill={ink} />
        <polygon
          points="0,56 150,52 146,59 150,66 145,73 150,80 149,88 1,92 5,85 0,78 4,71 0,64"
          fill={tape}
        />
      </svg>
    </span>
  );
}
