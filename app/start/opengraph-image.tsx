import { ogCard, ogSize } from "../og-card";

export const runtime = "nodejs";
export const alt = "Get a Free Creative Audit";
export const size = ogSize;
export const contentType = "image/png";

export default function OG() {
  return ogCard({ kicker: "Free Creative Audit", line1: "Let's find", line2: "your", tape: "mark.", sub: "Your brand, site and last three pieces, reviewed in 3 business days" });
}
