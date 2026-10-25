// Spec work made by CDH. Concepts and self-initiated pieces, not client work.
// Static spec ads are copied onto this domain at build time (scripts/fetch-spec.mjs);
// any that couldn't be copied fall back to the Higgsfield CDN.
import local from "./spec-local.json";

const CDN = "https://d2ol7oe51mr4n9.cloudfront.net/user_35SNUXuDx8PwiiQXCbLt8W4KG7m";
const spec = (id: string) => ((local as Record<string, boolean>)[id] ? `/spec/${id}.png` : `${CDN}/${id}.png`);

export type SpecAd = { brand: string; headline: string; src: string; category: string };

export const specAds: SpecAd[] = [
  { brand: "Blissy", category: "Sleep", headline: "Hair doesn't break like it did before.", src: spec("e62c2d53-bfca-4b48-aacc-92e0c68746a1") },
  { brand: "Quince", category: "Apparel", headline: "The sweater you'll reach for every cold morning.", src: spec("8e624c80-58ec-4655-9700-aa71c700e180") },
  { brand: "Shinola", category: "Watches", headline: "The watch that starts the conversation.", src: spec("bfa16e71-9072-4a89-bffa-42265a4d202d") },
  { brand: "Fabletics", category: "Activewear", headline: "Leggings that make you want to leave the house.", src: spec("9f3d6f5d-d3ee-4910-94f8-ec4e2645bbc0") },
  { brand: "FoundRae", category: "Jewelry", headline: "Some jewelry you wear. Some you mean.", src: spec("25db57c4-d870-41e4-95be-10c133e44051") },
  { brand: "Trade Coffee", category: "Coffee", headline: "You don't hate coffee. You haven't met your roaster.", src: spec("71e3088a-397b-493b-98a0-bad76fd851ef") },
  { brand: "Seint", category: "Beauty", headline: "The foundation shade you stop second-guessing.", src: spec("e9c99231-6a9a-4fb4-8617-5b03e0887abc") },
  { brand: "Blissy", category: "Sleep", headline: "About 29¢ a night for better mornings.", src: spec("483c5ad5-3edc-47b7-86c3-adaf99d5c629") },
  { brand: "Title Nine", category: "Activewear", headline: "Gear made for women who actually go.", src: spec("33b83fbc-c558-481b-89fb-a8458f497e0a") },
  { brand: "Blissy", category: "Sleep", headline: "Your hair care doesn't stop at bedtime.", src: spec("5b1c6e75-14a0-4954-9816-4be545b34a12") },
];

// The hero reel: vertical spots first, then static spec ads.
export type ReelItem =
  | { kind: "video"; src: string; poster: string; title: string; label: string; alt: string }
  | { kind: "image"; src: string; title: string; label: string; alt: string };

export const reel: ReelItem[] = [
  { kind: "video", src: "/media/golf-lifestyle.mp4", poster: "/media/golf-lifestyle.webp", title: "First Tee", label: "Lifestyle spot · Spec", alt: "Golf morning lifestyle spot: a hand sets a ball on a tee in low gold light" },
  { kind: "video", src: "/media/ugc-frappe.mp4", poster: "/media/ugc-frappe.webp", title: "Caramel Drop", label: "AI UGC-style ad · Spec", alt: "AI-generated UGC-style ad: a creator holds up a caramel iced coffee" },
  { kind: "video", src: "/media/morning-routine.mp4", poster: "/media/morning-routine.webp", title: "Morning Routine", label: "Lifestyle short · Spec", alt: "Lifestyle short: a quiet morning routine" },
  ...specAds.slice(0, 4).map((a) => ({
    kind: "image" as const,
    src: a.src,
    title: a.brand,
    label: "Static ad · Concept",
    alt: `${a.brand} spec ad concept: ${a.headline}`,
  })),
];

// Wide motion work for the reel section.
export const films = [
  { src: "/media/back-home.mp4", poster: "/media/back-home.webp", title: "Back Home", label: "Cinematic short · 0:13", alt: "Cinematic Southern short: a son returns to the family house at golden hour" },
  { src: "/media/product-macro.mp4", poster: "/media/product-macro.webp", title: "Cold Pour", label: "Beverage product macro · 0:06", alt: "Beverage product macro with condensation for paid social" },
  { src: "/media/ai-twin-presenter.mp4", poster: "/media/ai-twin-presenter.webp", title: "Spokesperson", label: "AI twin spokesperson · 0:25", alt: "Willie's AI twin delivering a direct-to-camera brand message" },
];
