import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const ogSize = { width: 1200, height: 630 };

// One share card for every page: the tape T, two lines of headline with the last word on tape, a slate line under it.
export async function ogCard({ kicker, line1, line2, tape, sub }: { kicker?: string; line1: string; line2: string; tape: string; sub: string }) {
  const font = await readFile(path.join(process.cwd(), "node_modules/@fontsource/schibsted-grotesk/files/schibsted-grotesk-latin-900-normal.woff"));
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#121110", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, color: "#efe9df", fontFamily: "Schibsted" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <svg width="96" height="96" viewBox="0 0 200 200">
            <polygon points="14,46 186,40 182,48 188,55 183,62 189,70 186,80 16,86 20,79 13,72 19,64 12,57 18,50" fill="#FF5A1F" />
            <polygon points="80,83 122,82 121,188 115,183 109,190 103,184 97,190 91,184 85,190 80,186" fill="#FF5A1F" />
          </svg>
          {kicker && <div style={{ fontSize: 24, color: "#FF5A1F", letterSpacing: "0.12em", textTransform: "uppercase", display: "flex" }}>{kicker}</div>}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 108, lineHeight: 0.92, letterSpacing: "-0.045em", display: "flex" }}>{line1}</div>
          <div style={{ fontSize: 108, lineHeight: 0.92, letterSpacing: "-0.045em", display: "flex" }}>
            {line2 && <span style={{ marginRight: 26 }}>{line2}</span>}
            <span style={{ background: "#FF5A1F", color: "#121110", padding: "0 18px" }}>{tape}</span>
          </div>
          <div style={{ fontSize: 28, marginTop: 34, color: "#a8a196", letterSpacing: "-0.01em", display: "flex" }}>{sub}</div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: [{ name: "Schibsted", data: font, weight: 900, style: "normal" }] },
  );
}
