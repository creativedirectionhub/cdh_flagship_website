// A torn strip of gaffer tape slapped across the page between scenes.
export default function TapeWipe({ tilt = -1.2, side = "left" }: { tilt?: number; side?: "left" | "right" }) {
  return (
    <div aria-hidden="true" className="pointer-events-none relative z-10 -my-4 h-8 overflow-hidden">
      <div
        className={`tape-edge tape-wipe absolute top-1 h-6 bg-gaffer ${side === "left" ? "left-0 origin-left" : "right-0 origin-right"}`}
        style={{ width: "62%", transform: `rotate(${tilt}deg)` }}
      />
    </div>
  );
}
