// The wall: rolls of gaffer tape, lines for when you're stuck, and CDH's own set dressing. Safe for the browser.

export type Tape = {
  k: string;
  name: string;
  line: string;
  from?: string;
  color: RollKey;
  x: number; // percent across the wall
  y: number; // percent down the wall
  tilt: number;
  at: string;
  own?: boolean;
};

export const ROLLS = {
  orange: { label: "CDH orange", tape: "#ff5a1f", ink: "#141312" },
  pink: { label: "Fluoro pink", tape: "#ff4f9a", ink: "#141312" },
  yellow: { label: "Fluoro yellow", tape: "#e6f03a", ink: "#141312" },
  blue: { label: "Electric blue", tape: "#2c5cff", ink: "#f3f0ea" },
  green: { label: "Kelly green", tape: "#22b36a", ink: "#141312" },
  bone: { label: "Bone", tape: "#ece5d8", ink: "#141312" },
  black: { label: "Black", tape: "#232120", ink: "#e6e2da" },
} as const;
export type RollKey = keyof typeof ROLLS;
export const ROLL_KEYS = Object.keys(ROLLS) as RollKey[];

// "Another take": a line fed from the script supervisor when you're stuck. Yours to change.
export const SPARKS = [
  "Was here. Left my mark.",
  "Mississippi to the world.",
  "Golden hour or don't shoot it.",
  "Put my grandma's recipe on a billboard.",
  "Next stop: my name in lights.",
  "My brand in three words: ",
  "First ad I ever loved: ",
  "Hey Willie, call me. We got work.",
  "If my brand was a song, it'd be ",
  "Shot list: me, a Cadillac, slow motion.",
];

// Willie's own tape, signed by him.
export const FIRST_TAPE: Tape = {
  k: "willie", name: "Willie Bernoudy", from: "CDH", line: "Bold. Southern. Directed.", color: "orange", x: 47, y: 42, tilt: -2.5, at: "2026-10-30T00:00:00Z",
};

// CDH's own set dressing: what's already on any stage wall. Not visitors.
export type Dressing = { k: string; text?: string; sub?: string; color: RollKey; x: number; y: number; tilt: number; size?: number; kind?: "strip" | "x" | "t" };
export const DRESSING: Dressing[] = [
  { k: "hot", text: "HOT SET", sub: "don't touch. (ok, you can)", color: "yellow", x: 15, y: 15, tilt: -6, size: 1.25 },
  { k: "places", text: "PLACES.", color: "pink", x: 83, y: 13, tilt: 5, size: 1.1 },
  { k: "cam", text: "CAM A", color: "blue", x: 95, y: 50, tilt: 88, size: 0.9 },
  { k: "wrap", text: "WRAP · SC 01 · TK 1", color: "black", x: 21, y: 87, tilt: 3, size: 0.95 },
  { k: "quiet", text: "QUIET ON SET", color: "bone", x: 58, y: 16, tilt: -3, size: 0.85 },
  { k: "sign", text: "SIGN HERE", sub: "anywhere, really", color: "orange", x: 31, y: 64, tilt: 4, size: 1 },
  { k: "x", color: "green", x: 7, y: 55, tilt: 0, kind: "x" },
  { k: "mark1", text: "MARK 1", color: "bone", x: 9, y: 70, tilt: -3, size: 0.6 },
  { k: "t", color: "orange", x: 79, y: 79, tilt: 7, kind: "t" },
];
