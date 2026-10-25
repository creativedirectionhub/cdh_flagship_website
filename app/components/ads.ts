// Spec work made by CDH. Concepts and self-initiated pieces, not client work.
// Static spec ads are hosted on the Higgsfield CDN for now; move them into /public before launch.
const CDN = "https://d2ol7oe51mr4n9.cloudfront.net/user_35SNUXuDx8PwiiQXCbLt8W4KG7m";

export type SpecAd = { brand: string; headline: string; src: string; category: string };

export const specAds: SpecAd[] = [
  { brand: "Blissy", category: "Sleep", headline: "Hair doesn't break like it did before.", src: `${CDN}/e62c2d53-bfca-4b48-aacc-92e0c68746a1.png` },
  { brand: "Quince", category: "Apparel", headline: "The sweater you'll reach for every cold morning.", src: `${CDN}/8e624c80-58ec-4655-9700-aa71c700e180.png` },
  { brand: "Shinola", category: "Watches", headline: "The watch that starts the conversation.", src: `${CDN}/bfa16e71-9072-4a89-bffa-42265a4d202d.png` },
  { brand: "Fabletics", category: "Activewear", headline: "Leggings that make you want to leave the house.", src: `${CDN}/9f3d6f5d-d3ee-4910-94f8-ec4e2645bbc0.png` },
  { brand: "FoundRae", category: "Jewelry", headline: "Some jewelry you wear. Some you mean.", src: `${CDN}/25db57c4-d870-41e4-95be-10c133e44051.png` },
  { brand: "Trade Coffee", category: "Coffee", headline: "You don't hate coffee. You haven't met your roaster.", src: `${CDN}/71e3088a-397b-493b-98a0-bad76fd851ef.png` },
  { brand: "Seint", category: "Beauty", headline: "The foundation shade you stop second-guessing.", src: `${CDN}/e9c99231-6a9a-4fb4-8617-5b03e0887abc.png` },
  { brand: "Blissy", category: "Sleep", headline: "About 29¢ a night for better mornings.", src: `${CDN}/483c5ad5-3edc-47b7-86c3-adaf99d5c629.png` },
  { brand: "Title Nine", category: "Activewear", headline: "Gear made for women who actually go.", src: `${CDN}/33b83fbc-c558-481b-89fb-a8458f497e0a.png` },
  { brand: "Blissy", category: "Sleep", headline: "Your hair care doesn't stop at bedtime.", src: `${CDN}/5b1c6e75-14a0-4954-9816-4be545b34a12.png` },
];

// The hero reel: vertical spots first, then static spec ads.
export type ReelItem =
  | { kind: "video"; src: string; poster: string; title: string; label: string; alt: string }
  | { kind: "image"; src: string; title: string; label: string; alt: string };

export const reel: ReelItem[] = [
  { kind: "video", src: "/media/golf-lifestyle.mp4", poster: "/media/golf-lifestyle.jpg", title: "First Tee", label: "Lifestyle spot · Spec", alt: "Golf morning lifestyle spot: a hand sets a ball on a tee in low gold light" },
  { kind: "video", src: "/media/ugc-frappe.mp4", poster: "/media/ugc-frappe.jpg", title: "Caramel Drop", label: "AI UGC-style ad · Spec", alt: "AI-generated UGC-style ad: a creator holds up a caramel iced coffee" },
  { kind: "video", src: "/media/morning-routine.mp4", poster: "/media/morning-routine.jpg", title: "Morning Routine", label: "Lifestyle short · Spec", alt: "Lifestyle short: a quiet morning routine" },
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
  { src: "/media/southern-short.mp4", poster: "/media/southern-short.jpg", title: "Back Home", label: "Cinematic short · 0:15", alt: "Cinematic Southern short: a son returns to the family house at golden hour" },
  { src: "/media/product-macro.mp4", poster: "/media/product-macro.jpg", title: "Cold Pour", label: "Beverage product macro · 0:06", alt: "Beverage product macro with condensation for paid social" },
  { src: "/media/ai-twin-presenter.mp4", poster: "/media/ai-twin-presenter.jpg", title: "Spokesperson", label: "AI spokesperson · 0:25", alt: "Willie's AI twin delivering a direct-to-camera brand message" },
];
