import { ogCard, ogSize } from "../og-card";

export const runtime = "nodejs";
export const alt = "The work of Creative Direction Hub";
export const size = ogSize;
export const contentType = "image/png";

export default function OG() {
  return ogCard({ kicker: "The work", line1: "Every piece", line2: "has a", tape: "director.", sub: "Campaigns, photography, brand films and AI art direction" });
}
