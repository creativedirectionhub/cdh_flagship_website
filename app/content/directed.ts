import fs from "node:fs";
import path from "node:path";
import type { Pair } from "../components/DirectedSlider";

// Undirected / directed pairs for the home page slider. Concept frames, labeled Concept on the image.
// First, two takes from the Her Mark film, playing side by side. Then stills: a home page for the same brand, a founder and a plate.
export const pairs: Pair[] = [
  {
    id: "film",
    lane: "The film",
    title: "Same kitchen. Same sauce.",
    before: "/media/directed/film-before.webp",
    after: "/media/directed/film-after.webp",
    beforeVideo: "/media/directed/film-before.mp4",
    afterVideo: "/media/directed/film-after.mp4",
    beforeTag: "1:47 AM",
    afterTag: "Sunrise",
    beforeAlt: "Undirected: a founder alone in her dark kitchen at night, holding her hot sauce bottle up to a ring light and frowning at it",
    afterAlt: "Directed: the same founder in the same kitchen at sunrise, hands flat on the counter, looking into the camera, her Mama Lou's bottle standing on an orange tape mark in front of her",
    notes: [
      "The ring light went back in the drawer. The sun does the work now, from behind her, at the hour that kitchen looks its best.",
      "The bottle came out of her hand and onto its mark. Dead center, label to camera.",
      "She stopped looking at the product and started looking at you.",
    ],
  },
  {
    id: "website",
    lane: "Website",
    title: "The home page.",
    before: "/media/directed/website-before.webp",
    after: "/media/directed/website-after.webp",
    beforeAlt: "Undirected: a template home page for Mama Lou's hot sauce with a promo banner, three small copies of the same flash photo, three buttons and three icon boxes",
    afterAlt: "Directed: the same home page rebuilt around one wide photograph of the branded Mama Lou's bottle on its orange mark beside a steaming skillet, the headline One pot. One recipe. No shortcuts. and a single Order a bottle button",
    notes: [
      "One photograph, edge to edge, from the film. Not three small copies of a flash shot.",
      "One headline that says what makes it hers, and one button. Three buttons is no decision at all.",
      "Cream, red and a serif taken from the label, so the site and the bottle look like family.",
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
