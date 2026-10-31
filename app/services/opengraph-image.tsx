import { ogCard, ogSize } from "../og-card";

export const runtime = "nodejs";
export const alt = "Creative Direction Hub services";
export const size = ogSize;
export const contentType = "image/png";

export default function OG() {
  return ogCard({ kicker: "Services", line1: "Five ways we put", line2: "you on your", tape: "mark.", sub: "Brand · Campaigns · Content · Digital · AI art direction" });
}
