// The wall: rolls of gaffer tape, lines for when you're stuck, and CDH's own set dressing. Safe for the browser.

export type Tape = {
  k: string;
  name: string;
  line: string;
  from?: string;
  color: RollKey;
  x: number; // percent across the wall (older tapes)
  y: number; // percent down the wall (older tapes)
  slot?: number; // where it sits in the wall's grid
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
  k: "willie", name: "Willie Bernoudy", from: "CDH", line: "Bold. Southern. Directed.", color: "orange", x: 50, y: 37, slot: 7, tilt: -2.5, at: "2026-10-30T00:00:00Z",
};

// CDH's own set dressing: what's already on any stage wall. Not visitors.
// Each piece holds a cell on the wall's grid: land = desktop [col,row] on 6 columns, port = phone [col,row] on 2 columns.
export type Dressing = { k: string; text?: string; sub?: string; quip: string; color: RollKey; tilt: number; size?: number; kind?: "strip" | "x" | "t"; land: [number, number]; port?: [number, number] };
export const DRESSING: Dressing[] = [
  { k: "hot", text: "HOT SET", sub: "don't touch. (ok, you can)", quip: "Told you. Hot set.", color: "yellow", tilt: -6, size: 1, land: [0, 0], port: [0, 0] },
  { k: "quiet", text: "QUIET ON SET", quip: "Shhh. We're rolling.", color: "bone", tilt: -3, size: 0.85, land: [3, 0] },
  { k: "places", text: "PLACES.", quip: "Back to one. Going again.", color: "pink", tilt: 5, size: 1.1, land: [5, 0], port: [1, 3] },
  { k: "sign", text: "SIGN HERE", sub: "anywhere, really", quip: "Right there. Go on.", color: "orange", tilt: 4, land: [1, 2], port: [1, 1] },
  { k: "cam", text: "CAM A", quip: "Camera A is rolling.", color: "blue", tilt: 88, size: 0.9, land: [5, 2] },
  { k: "x", quip: "First position.", color: "green", tilt: 0, kind: "x", land: [0, 2] },
  { k: "mark1", text: "MARK 1", quip: "First team, on your marks.", color: "bone", tilt: -3, size: 0.6, land: [0, 3] },
  { k: "wrap", text: "WRAP · SC 01 · TK 1", quip: "That's lunch, actually.", color: "black", tilt: 3, size: 0.95, land: [1, 3] },
  { k: "t", quip: "Our mark. Now leave yours.", color: "orange", tilt: 7, kind: "t", land: [4, 3], port: [0, 4] },
];
