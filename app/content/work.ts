// Every case on the site. Add a case here and it appears on /work, gets its own page and lands in the sitemap.
// label: "client" = paid client work. "concept" = made by CDH, not commissioned. "studio" = CDH's own brands. "personal" = Willie's own photography.

export type Lane = "consumer" | "personal" | "hospitality";
export type Discipline = "brand" | "campaigns" | "content" | "digital" | "ai";
export type Label = "client" | "concept" | "studio" | "personal";

export type Media =
  | { kind: "image"; src: string; alt: string; w: number; h: number; caption?: string }
  | { kind: "video"; src: string; poster: string; alt: string; w: number; h: number; caption?: string; ai?: boolean; sound?: boolean };

export type Case = {
  slug: string;
  title: string;
  client: string;
  label: Label;
  lanes: Lane[];
  disciplines: Discipline[];
  year: string;
  brief: string;
  did: string[];
  cover: Media;
  media: Media[];
  credits: string[];
  ai?: string;
  notice?: string;
  selected?: number;
};

export const LANES: Record<Lane, string> = { consumer: "Consumer brands", personal: "Personal brands", hospitality: "Hospitality" };
export const DISCIPLINES: Record<Discipline, string> = { brand: "Brand", campaigns: "Campaigns and ads", content: "Content and production", digital: "Digital", ai: "AI art direction" };
export const LABELS: Record<Label, string> = { client: "Client", concept: "Concept", studio: "Studio", personal: "Personal work" };

import local from "../components/spec-local.json";
const CDN = "https://d2ol7oe51mr4n9.cloudfront.net/user_35SNUXuDx8PwiiQXCbLt8W4KG7m";
const spec = (id: string) => ((local as Record<string, boolean>)[id] ? `/spec/${id}.png` : `${CDN}/${id}.png`);

// Static ad concepts for real brands. Not commissioned by, affiliated with or endorsed by them.
const statics: [string, string, string][] = [
  ["Blissy", "Hair doesn't break like it did before.", "e62c2d53-bfca-4b48-aacc-92e0c68746a1"],
  ["Quince", "The sweater you'll reach for every cold morning.", "8e624c80-58ec-4655-9700-aa71c700e180"],
  ["Shinola", "The watch that starts the conversation.", "bfa16e71-9072-4a89-bffa-42265a4d202d"],
  ["Fabletics", "Leggings that make you want to leave the house.", "9f3d6f5d-d3ee-4910-94f8-ec4e2645bbc0"],
  ["FoundRae", "Some jewelry you wear. Some you mean.", "25db57c4-d870-41e4-95be-10c133e44051"],
  ["Trade Coffee", "You don't hate coffee. You haven't met your roaster.", "71e3088a-397b-493b-98a0-bad76fd851ef"],
  ["Seint", "The foundation shade you stop second-guessing.", "e9c99231-6a9a-4fb4-8617-5b03e0887abc"],
  ["Blissy", "About 29 cents a night for better mornings.", "483c5ad5-3edc-47b7-86c3-adaf99d5c629"],
  ["Title Nine", "Gear made for women who actually go.", "33b83fbc-c558-481b-89fb-a8458f497e0a"],
  ["Blissy", "Your hair care doesn't stop at bedtime.", "5b1c6e75-14a0-4954-9816-4be545b34a12"],
];

const img = (src: string, alt: string, w: number, h: number, caption?: string): Media => ({ kind: "image", src, alt, w, h, caption });

export const cases: Case[] = [
  {
    slug: "hattiesburg-black-sox",
    title: "More than a game.",
    client: "Hattiesburg Black Sox",
    label: "client",
    lanes: ["consumer"],
    disciplines: ["campaigns", "content"],
    year: "",
    brief: "A hometown baseball club needed the town to feel the season before it started.",
    did: [
      "Campaign idea and headline: More Than a Game",
      "Editorial portraits of the players in raw, unposed moments",
      "Billboard and print layouts built from the same shoot",
    ],
    cover: img("/work/events-27.webp", "A Black Sox player, number 13, seen from behind in the dugout, in black and white", 1120, 1400),
    media: [
      img("/work/events-27.webp", "Player number 13 leaning on the dugout rail, black and white", 1120, 1400, "Editorial portrait, dugout"),
      img("/work/events-17.webp", "Player number 44 walking across the infield in the late sun", 768, 960, "Infield, golden hour"),
      img("/work/spec-blacksox-3.webp", "Billboard layout: More Than a Game, Hattiesburg Black Sox, over a team photo", 800, 450, "Billboard layout"),
      img("/work/spec-blacksox-4.webp", "Print layout: More Than a Game, with a portrait and campaign notes", 800, 450, "Print layout"),
    ],
    credits: ["Directed and photographed by Willie Bernoudy", "Design and layout: CDH network"],
    selected: 1,
  },
  {
    slug: "portraits",
    title: "The face of the business.",
    client: "Talent and founders",
    label: "client",
    lanes: ["personal"],
    disciplines: ["content", "brand"],
    year: "",
    brief: "People who are their own brand need pictures that look as serious as they are. One session, a year of content.",
    did: [
      "Art direction, location and wardrobe calls",
      "Editorial portrait photography on location",
      "A set sized for press, site, social and print",
    ],
    cover: img("/work/portrait-37.webp", "A woman in a dark dress and leopard scarf, sunglasses on, on a tree-lined path", 1000, 1400),
    media: [
      img("/work/portrait-37.webp", "A woman in a dark dress and leopard scarf, sunglasses on, on a tree-lined path", 1000, 1400),
      img("/work/portrait-01.webp", "A woman in a draped dress looking up, lit from the side, in black and white", 1119, 1400),
      img("/work/portrait-21.webp", "A woman in a red gown with a high slit, leaning on a stone wall", 999, 1400),
      img("/work/portrait-53.webp", "A man in black with a red head wrap seated on terracotta steps", 1050, 1400),
      img("/work/portrait-10.webp", "A woman in a pink floral dress in front of a painted mural", 1000, 1400),
      img("/work/portrait-55.webp", "A woman in a yellow two-piece, hand on her head, in a garden", 1080, 1350),
      img("/work/talent-ptosha-storey-1.webp", "An actor at a dinner table, glass in hand, in patterned print", 600, 800),
      img("/work/talent-jada-wada-1.webp", "A woman in a purple cropped top and head scarf, looking off camera", 600, 800),
      img("/work/talent-adrian-lockett-1.webp", "A man in a white logo tee listening to a woman in green", 600, 800),
      img("/work/talent-david-banner-1.webp", "A man in a cap, hands folded, in black and white", 600, 800),
      img("/work/talent-sasha.webp", "A woman with long braids at a window, in black and white", 571, 800),
      img("/work/talent-susan-1.webp", "A woman in a white jacket reading in a dark hallway", 640, 800),
    ],
    credits: ["Photographed and directed by Willie Bernoudy"],
    notice: "Subjects shown with permission. Names on request.",
    selected: 2,
  },
  {
    slug: "four-seasons-anguilla",
    title: "The arrival.",
    client: "Four Seasons Anguilla",
    label: "concept",
    lanes: ["hospitality"],
    disciplines: ["content", "campaigns", "ai"],
    year: "2026",
    brief: "A private villa sells the moment you land. This spot sells that moment: the jet, the tarmac, the driver, the water.",
    did: [
      "Script, shot list and direction",
      "AI-assisted production, from plane to villa, with a labeled AI performer",
      "A 30-second arrival film",
    ],
    cover: { kind: "video", src: "/media/luxury-travel.mp4", poster: "/media/luxury-travel.webp", alt: "A private jet banks over turquoise water toward a Caribbean island", w: 1280, h: 720, ai: true },
    media: [
      { kind: "video", src: "/media/luxury-travel.mp4", poster: "/media/luxury-travel.webp", alt: "Arrival film: a jet lands, a guest steps onto the tarmac, a driver waits, the car runs along the coast", w: 1280, h: 720, caption: "Arrival film, 0:30", ai: true },
    ],
    credits: ["Written and directed by Willie Bernoudy", "AI production: CDH network"],
    ai: "Made with AI tools. The on-screen lead is an AI performer. Concept made by CDH; not commissioned by, affiliated with or endorsed by Four Seasons.",
    selected: 3,
  },
  {
    slug: "paid-social",
    title: "Ads people actually watch.",
    client: "Consumer brands",
    label: "concept",
    lanes: ["consumer"],
    disciplines: ["campaigns", "content", "ai"],
    year: "2026",
    brief: "Paid social for Meta and TikTok lives or dies in the first three seconds. These are the hooks, the cuts and the statics we make on a weekly loop.",
    did: [
      "Hooks and scripts from reviews and best sellers",
      "Product macro, UGC-style video and static ads",
      "Sized and captioned for Meta and TikTok",
    ],
    cover: { kind: "video", src: "/media/cold-pour.mp4", poster: "/media/cold-pour.webp", alt: "Dark cola pours over clear ice in a rocks glass, backlit in amber", w: 1280, h: 720, ai: true },
    media: [
      { kind: "video", src: "/media/cold-pour.mp4", poster: "/media/cold-pour.webp", alt: "Cold Pour: dark cola poured over clear ice in slow motion, hard amber backlight", w: 1280, h: 720, caption: "Cold Pour, product macro", ai: true },
      { kind: "video", src: "/media/caramel-drop.mp4", poster: "/media/caramel-drop.webp", alt: "Caramel Drop: a woman in a cream sweatshirt sips a homemade iced caramel latte in her kitchen and reacts to camera", w: 720, h: 1280, caption: "Caramel Drop, UGC-style", ai: true },
      { kind: "video", src: "/media/ugc-smoothie.mp4", poster: "/media/ugc-smoothie.webp", alt: "A creator drinks a lemon smoothie in a kitchen", w: 960, h: 960, caption: "Smoothie, UGC-style", ai: true },
      ...statics.map(([brand, line, id]) => img(spec(id), `${brand} static ad concept: ${line}`, 1080, 1920, `${brand}, static concept`)),
    ],
    credits: ["Directed by Willie Bernoudy", "Edit and motion: CDH network"],
    ai: "Every spot here is AI-made. UGC-style spots use AI performers and are labeled as such. Static concepts for real brands are not commissioned by, affiliated with or endorsed by those brands.",
    selected: 4,
  },
  {
    slug: "identity",
    title: "A mark that holds.",
    client: "Blac Birdie, Soulful Ties, Trading One, Good Laughs",
    label: "studio",
    lanes: ["consumer"],
    disciplines: ["brand"],
    year: "",
    brief: "Four small brands, four marks built to work at app-icon size and on a storefront.",
    did: ["Logo and wordmark", "Color and type"],
    cover: img("/work/logo-blac-birdie.webp", "Blac Birdie logo: a black bird holding a golf tee, with a serif wordmark", 800, 800),
    media: [
      img("/work/logo-blac-birdie.webp", "Blac Birdie logo: a black bird holding a golf tee", 800, 800, "Blac Birdie"),
      img("/work/logo-soulful-ties.webp", "Soulful Ties logo: an S in two tones with the line Go with the flow, naturally", 420, 420, "Soulful Ties"),
      img("/work/logo-trading-one.webp", "Trading One crest: a green bull and a red bear in a gold shield", 800, 800, "Trading One"),
      img("/work/logo-good-laughs.webp", "Good Laughs logo: a laughing G on a yellow circle", 500, 500, "Good Laughs"),
    ],
    credits: ["Creative direction and design: Willie Bernoudy"],
    notice: "Blac Birdie and Trading One are CDH studio brands, shown as studio work, not client work.",
    selected: 6,
  },
  {
    slug: "brand-films",
    title: "Story first.",
    client: "First Tee and Back Home",
    label: "concept",
    lanes: ["consumer"],
    disciplines: ["content", "ai"],
    year: "2026",
    brief: "Two short films that sell a feeling before a product: a golf morning, and a son coming home.",
    did: ["Script and direction", "AI-assisted production, color and sound"],
    cover: { kind: "video", src: "/media/golf-lifestyle.mp4", poster: "/media/golf-lifestyle.webp", alt: "A hand sets a golf ball on a tee in low gold light", w: 1080, h: 1920, ai: true },
    media: [
      { kind: "video", src: "/media/golf-lifestyle.mp4", poster: "/media/golf-lifestyle.webp", alt: "First Tee: a golf morning in low gold light", w: 1080, h: 1920, caption: "First Tee, 0:15", ai: true },
      { kind: "video", src: "/media/back-home.mp4", poster: "/media/back-home.webp", alt: "Back Home: a son returns to the family house at golden hour", w: 1280, h: 720, caption: "Back Home, 0:13", ai: true },
      { kind: "video", src: "/media/morning-routine.mp4", poster: "/media/morning-routine.webp", alt: "Morning Routine: a quiet morning, coffee in hand", w: 1080, h: 1920, caption: "Morning Routine, 0:15", ai: true },
    ],
    credits: ["Written and directed by Willie Bernoudy"],
    ai: "Made with AI tools. People shown are AI performers.",
  },
  {
    slug: "travel",
    title: "Twenty-three countries.",
    client: "Personal work",
    label: "personal",
    lanes: ["hospitality"],
    disciplines: ["content"],
    year: "",
    brief: "Hotels and travel brands buy an eye for place. This is mine, shot across 23 countries, the Great Wall included.",
    did: ["Travel and landscape photography", "Editorial color", "Licensed for hospitality campaigns on request"],
    cover: img("/work/travel-24.webp", "Snow-capped mountains across deep blue water under a bright sky", 1400, 1050),
    media: [
      img("/work/travel-24.webp", "Snow-capped mountains across deep blue water", 1400, 1050),
      img("/work/travel-03.webp", "Hallgrimskirkja church in Reykjavik under snow", 1120, 1400),
      img("/work/travel-60.webp", "The Great Wall of China running over a ridge in winter", 1120, 1400),
      img("/work/travel-16.webp", "A snowy coastline and a frozen waterfall from above", 1400, 933),
      img("/work/travel-31.webp", "A beach at sunset with mountains on the horizon", 1400, 1050),
      img("/work/travel-42.webp", "A stone plaza under a blue sky, a lone walker crossing", 1400, 1120),
    ],
    credits: ["Photographed by Willie Bernoudy"],
  },
  {
    slug: "cafe-social",
    title: "Fresh on the menu.",
    client: "Cafe and juice bar",
    label: "concept",
    lanes: ["hospitality", "consumer"],
    disciplines: ["campaigns", "digital"],
    year: "",
    brief: "A social set a cafe can post the same day: one product, one offer, one picture that makes you thirsty.",
    did: ["Social campaign graphics", "Offer and menu templates", "Sized for feed and story"],
    cover: img("/work/gfx-pineapple-juice.webp", "Pineapple juice social graphic: a tall glass and cut pineapple on a beach-blue background", 640, 800),
    media: [
      img("/work/gfx-pineapple-juice.webp", "Pineapple juice social graphic", 640, 800, "Juice bar, feed"),
      img("/work/gfx-liceria-coffee.webp", "Cold cappuccino social graphic with the line Fresh on the menu", 640, 800, "Cafe, offer post"),
    ],
    credits: ["Creative direction: Willie Bernoudy", "Design: CDH network"],
    ai: "Concept work. Brand names shown are placeholders.",
  },
  {
    slug: "art-direction",
    title: "One look, every frame.",
    client: "Skincare concept",
    label: "concept",
    lanes: ["consumer"],
    disciplines: ["ai", "brand", "content"],
    year: "2026",
    brief: "AI can make anything, which is why most of it looks like nothing in particular. This is one product held to one rulebook: same bottle, same light, same palette, across every shot.",
    did: ["A visual rulebook: palette, light, lens and styling", "Two scenes directed to that rulebook, product consistent shot to shot", "Every frame reviewed before it ships"],
    cover: { kind: "video", src: "/media/art-direction.mp4", poster: "/media/art-direction.webp", alt: "An amber dropper bottle on warm travertine beside folded linen, leaf shadows drifting across the stone", w: 1280, h: 720, ai: true },
    media: [
      { kind: "video", src: "/media/art-direction.mp4", poster: "/media/art-direction.webp", alt: "Shot one: the bottle on travertine in morning sun. Shot two: the same bottle on a limestone shelf as a hand lifts the dropper and a golden drop falls", w: 1280, h: 720, caption: "Two shots, one rulebook, 0:10", ai: true },
    ],
    credits: ["Art direction: Willie Bernoudy", "AI production: CDH network"],
    ai: "Made with AI tools. The hand is AI-generated. The product is an invented concept, not a real brand.",
  },
  {
    slug: "dinner-service",
    title: "The last touch.",
    client: "Restaurant concept",
    label: "concept",
    lanes: ["hospitality"],
    disciplines: ["content", "ai"],
    year: "2026",
    brief: "A dining room sells the moment the plate leaves the pass. This spot is that moment: the final leaf, the wiped rim, the hand-off, candlelight behind it.",
    did: ["Script, shot design and direction", "AI-assisted production with a labeled AI performer", "A 16:9 spot ready to cut down for Reels"],
    cover: { kind: "video", src: "/media/dinner-service.mp4", poster: "/media/dinner-service.webp", alt: "A chef plates seared fish at the pass of a candlelit restaurant", w: 1280, h: 720, ai: true },
    media: [
      { kind: "video", src: "/media/dinner-service.mp4", poster: "/media/dinner-service.webp", alt: "A chef sets the final herb leaf with tweezers, wipes the plate rim and slides it to a server, guests and a wood-fired oven glowing behind", w: 1280, h: 720, caption: "Dinner service, 0:08", ai: true },
    ],
    credits: ["Written and directed by Willie Bernoudy", "AI production: CDH network"],
    ai: "Made with AI tools. People shown are AI performers. Concept made by CDH; not commissioned by any restaurant.",
  },
  {
    slug: "commercials",
    title: "Three brands, one standard.",
    client: "Commercial concepts",
    label: "concept",
    lanes: ["consumer", "hospitality", "personal"],
    disciplines: ["campaigns", "content", "ai"],
    year: "2026",
    brief: "A skincare brand, a small hotel and a founder-led ceramics studio, one for each lane we work in. Each spot is written, art directed, scored and cut the way a paid commercial would be, with the same faces, product and places held shot to shot.",
    did: ["Script, shot list and a visual rulebook for each brand", "AI-assisted production with labeled AI performers, kept consistent across every shot", "Original score, supers and end card, cut as finished spots under 30 seconds"],
    cover: { kind: "video", src: "/media/spots-cover.mp4", poster: "/media/spots-cover.webp", alt: "Morning sun across a travertine bathroom shelf with an amber dropper bottle", w: 1280, h: 720, ai: true },
    media: [
      { kind: "video", src: "/media/spot-halden.mp4", poster: "/media/spot-halden.webp", alt: "Halden face oil: a quiet bathroom at dawn, an amber dropper bottle, a woman pressing oil into her skin, ending on the bottle in moving sunlight", w: 1280, h: 720, caption: "Halden, face oil. Consumer brands, 0:30", ai: true, sound: true },
      { kind: "video", src: "/media/spot-marisol.mp4", poster: "/media/spot-marisol.webp", alt: "Casa Marisol: a drone glide to a white hotel on a cliff, a guest arriving at golden hour, a swim at sunset, dinner on the terrace, the hotel lit up at night", w: 1280, h: 720, caption: "Casa Marisol, boutique hotel. Hospitality, 0:27", ai: true, sound: true },
      { kind: "video", src: "/media/spot-okafor.mp4", poster: "/media/spot-okafor.webp", alt: "Okafor Clay: the founder at the potter's wheel, opening the kiln, wrapping an order, then standing in her studio doorway", w: 1280, h: 720, caption: "Okafor Clay, founder brand. Personal brands, 0:30", ai: true, sound: true },
    ],
    credits: ["Written and directed by Willie Bernoudy", "AI production: CDH network"],
    ai: "Made with AI tools, including the music. Everyone shown is an AI performer. Halden, Casa Marisol and Okafor Clay are invented brands made by CDH to show the work; none of them is a real business.",
    selected: 5,
  },
];

export const selectedCases = cases.filter((c) => c.selected).sort((a, b) => (a.selected ?? 99) - (b.selected ?? 99));
export const bySlug = (slug: string) => cases.find((c) => c.slug === slug);
