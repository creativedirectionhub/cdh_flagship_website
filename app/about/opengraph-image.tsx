import { ogCard, ogSize } from "../og-card";

export const runtime = "nodejs";
export const alt = "Willie Bernoudy, creative director and AI art director";
export const size = ogSize;
export const contentType = "image/png";

export default function OG() {
  return ogCard({ kicker: "About", line1: "I direct", line2: "every", tape: "project.", sub: "Willie Bernoudy · Creative director and AI art director" });
}
