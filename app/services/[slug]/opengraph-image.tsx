import { ogCard, ogSize } from "../../og-card";
import { deptById, offerBySlug, offers, pad2, sceneOf } from "../../content/offer";

export const runtime = "nodejs";
export const alt = "Creative Direction Hub service";
export const size = ogSize;
export const contentType = "image/png";
export function generateStaticParams() {
  return offers.map((o) => ({ slug: o.slug }));
}

export default function OG({ params }: { params: { slug: string } }) {
  const o = offerBySlug(params.slug) ?? offers[0];
  const words = o.name.split(" ");
  const tape = `${words.pop()}.`;
  return ogCard({ kicker: `${deptById(o.dept).name} · Scene ${pad2(sceneOf(o.slug))}`, line1: words.join(" "), line2: "", tape, sub: o.line });
}
