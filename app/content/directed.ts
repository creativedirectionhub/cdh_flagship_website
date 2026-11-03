import fs from "node:fs";
import path from "node:path";
import type { Pair } from "../components/DirectedSlider";

// Undirected / directed pairs for the home page slider. AI concepts, labeled on the image.
// One per lane: a consumer product, a personal brand, a hospitality plate.
export const pairs: Pair[] = [
  {
    id: "product",
    lane: "Consumer brand",
    title: "The bottle on the counter.",
    before: "/media/directed/product-before.webp",
    after: "/media/directed/product-after.webp",
    beforeAlt: "Undirected: the same hot sauce bottle on a cluttered kitchen counter next to mail and a coffee mug, shot with a harsh phone flash",
    afterAlt: "Directed: the same hot sauce bottle on warm stone in low side light, a pepper and a spoon placed beside it",
    notes: [
      "One light, low and from the side, so the glass glows instead of glaring.",
      "Clutter out. Two props in, each one telling you what's inside.",
      "Camera down at bottle height, so the label reads like a hero.",
    ],
  },
  {
    id: "founder",
    lane: "Personal brand",
    title: "The founder headshot.",
    before: "/media/directed/founder-before.webp",
    after: "/media/directed/founder-after.webp",
    beforeAlt: "Undirected: the same woman in an arm's-length selfie under office fluorescent lights",
    afterAlt: "Directed: the same woman photographed in window light against a dark wall, arms relaxed, looking straight at the camera",
    notes: [
      "Window light from one side instead of the ceiling, so her face has shape.",
      "A longer lens from farther back. No more arm's-length distortion.",
      "A plain dark wall, so the only thing to look at is her.",
    ],
  },
  {
    id: "dish",
    lane: "Hospitality",
    title: "The plate at the pass.",
    before: "/media/directed/dish-before.webp",
    after: "/media/directed/dish-after.webp",
    beforeAlt: "Undirected: the same fish plate shot from above under yellow restaurant light, a phone shadow across it and a ketchup bottle at the edge",
    afterAlt: "Directed: the same fish dish at a low angle by candlelight, a chef's hand finishing it with a spoon of sauce",
    notes: [
      "Low angle at eye level with the plate, the way a guest actually sees it.",
      "Candle and window instead of the yellow overheads.",
      "A hand in frame. People book people, not plates.",
    ],
  },
];

/** Only the pairs whose two images are actually in /public. The section hides itself when none are. */
export const readyPairs = pairs.filter((p) => [p.before, p.after].every((src) => fs.existsSync(path.join(process.cwd(), "public", src))));
