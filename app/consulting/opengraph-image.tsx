import { ogCard, ogSize } from "../og-card";

export const runtime = "nodejs";
export const alt = "Willie Bernoudy, creative director and AI art director";
export const size = ogSize;
export const contentType = "image/png";

export default function OG() {
  return ogCard({ kicker: "Consulting", line1: "Your", line2: "creative", tape: "director.", sub: "Willie Bernoudy · Creative consultant and fractional creative director" });
}
