import { ogCard, ogSize } from "../og-card";

export const runtime = "nodejs";
export const alt = "Creative Direction Hub services";
export const size = ogSize;
export const contentType = "image/png";

export default function OG() {
  return ogCard({ kicker: "Services", line1: "Fourteen scenes.", line2: "One", tape: "director.", sub: "Branding · Marketing · Websites · Photography" });
}
