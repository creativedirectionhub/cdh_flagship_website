import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const alt = "Creative Direction Hub. Your brand, directed.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  const font = await readFile(
    path.join(process.cwd(), "node_modules/@fontsource/schibsted-grotesk/files/schibsted-grotesk-latin-900-normal.woff"),
  );
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#121110", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, color: "#efe9df", fontFamily: "Schibsted" }}>
        <svg width="110" height="110" viewBox="0 0 200 200">
          <polygon points="14,46 186,40 182,48 188,55 183,62 189,70 186,80 16,86 20,79 13,72 19,64 12,57 18,50" fill="#FF5A1F" />
          <polygon points="80,83 122,82 121,188 115,183 109,190 103,184 97,190 91,184 85,190 80,186" fill="#FF5A1F" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 118, lineHeight: 0.9, letterSpacing: "-0.045em", display: "flex" }}>Your brand,</div>
          <div style={{ fontSize: 118, lineHeight: 0.9, letterSpacing: "-0.045em", display: "flex" }}>
            <span style={{ background: "#FF5A1F", color: "#121110", padding: "0 18px" }}>directed.</span>
          </div>
          <div style={{ fontSize: 30, marginTop: 36, color: "#a8a196", letterSpacing: "-0.01em" }}>Creative Direction Hub · The creative department for growing businesses</div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Schibsted", data: font, weight: 900, style: "normal" }] },
  );
}
