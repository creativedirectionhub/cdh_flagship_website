import type { Discipline, Lane } from "./work";

export const site = {
  name: "Creative Direction Hub",
  tagline: "We put brands on their mark.",
  promise: "Every project has a director.",
  positioning: "Creative Direction Hub is the creative department for growing businesses, led by creative director Willie Bernoudy.",
  support: "Brand identity, logos, packaging, social media branding and the rollout that carries it everywhere, directed by one person and made by one team.",
  url: "https://www.creativedirectionhub.com",
  email: "hello@creativedirectionhub.com",
};

export const lanes: { id: Lane; name: string; who: string; problem: string; proof: string }[] = [
  {
    id: "consumer",
    name: "Consumer brands",
    who: "DTC and retail: beauty, apparel, food and drink, lifestyle.",
    problem: "You need launches that land, ads that sell, and a look that holds across every channel.",
    proof: "hattiesburg-black-sox",
  },
  {
    id: "personal",
    name: "Personal brands",
    who: "Founders, talent, creators, coaches and experts who are the face of the business.",
    problem: "You need a brand that looks as serious as you are, pictures that prove it, a site, and content you can post every week.",
    proof: "portraits",
  },
  {
    id: "hospitality",
    name: "Hospitality",
    who: "Boutique hotels, resorts, villas, restaurants, cafes and travel brands.",
    problem: "You need imagery and film that make people book, seasonal campaigns, and social that fills rooms and tables.",
    proof: "island-resort-arrival",
  },
];

export const disciplines: { id: Discipline; name: string; short: string; what: string; get: string[]; proof: string[] }[] = [
  {
    id: "identity",
    name: "Brand identity",
    short: "The whole world your brand lives in.",
    what: "Positioning, name, voice, logo system, color, type, photography rules, motion and guidelines. Decided once, so every piece after it looks like it came from the same place.",
    get: ["A positioning you can say in one breath", "A full visual system: mark, color, type, image style and motion", "Voice and messaging your whole team can write in", "Guidelines as a living page, not a PDF nobody opens"],
    proof: ["blac-birdie-farms", "her-mark"],
  },
  {
    id: "logo",
    name: "Logo design",
    short: "A mark that means something.",
    what: "Logos, wordmarks and monograms built to work at app-icon size and on a storefront, in one color and in motion. Built to last decades, not seasons.",
    get: ["Primary logo, wordmark and a compact mark", "Versions for dark, light and one color", "An animated logo for reels and video", "Files for print, web and social, organized"],
    proof: ["blac-birdie-farms", "identity"],
  },
  {
    id: "packaging",
    name: "Packaging design",
    short: "Sells before anyone picks it up.",
    what: "Labels, boxes, bottles and bags designed for the shelf and the scroll: structure, label system, production-ready files, and the product photography to launch it.",
    get: ["A label or box system that extends across the range", "Print-ready files checked with your printer", "Launch photography of the finished pack", "Shelf and feed mockups before anything is printed"],
    proof: ["blac-birdie-farms", "her-mark"],
  },
  {
    id: "social",
    name: "Social media branding",
    short: "Your feed, looking like a brand.",
    what: "Profile, grid, templates, highlight covers, cover frames and the rules for photos, captions and video, so every post looks like yours without a designer on every one.",
    get: ["Profile, bio and highlight covers", "Post, story and reel cover templates your team can use", "A grid plan and content pillars", "Photo, caption and video rules in one page"],
    proof: ["blacktravelgram", "hattiesburg-black-sox"],
  },
  {
    id: "rollout",
    name: "Brand rollout",
    short: "Carried everywhere, the same way.",
    what: "Launch campaigns, ads for Meta and TikTok, photography, brand film, websites and collateral that carry the brand into the world. AI-directed production where it helps, labeled every time.",
    get: ["A launch campaign with one idea across every channel", "Photography and brand film, with cut-downs", "A website or landing page built around one action", "Ads made, read and reported every week"],
    proof: ["hattiesburg-black-sox", "hope-live-agency"],
  },
];

// Packages, named like takes on set. No prices on the site; every project is quoted on a call.
export const takes = [
  { id: "take-01", take: "Take 01", name: "The Mark", for: "New brands that need to look real, fast.", items: ["Logo, wordmark and compact mark", "Color and type", "Animated logo", "Social profile kit"] },
  { id: "take-02", take: "Take 02", name: "The Identity", for: "Growing brands ready to look like one company everywhere.", items: ["Everything in The Mark", "Positioning and voice", "Full visual system and image style", "Guidelines and social templates"] },
  { id: "take-03", take: "Take 03", name: "The World", for: "Launches: a new product, a rebrand, a range.", items: ["Everything in The Identity", "Packaging design", "Launch campaign and photography", "Website or landing page"] },
];

export const ways = [
  {
    id: "audit",
    label: "Start here",
    name: "Free Creative Audit",
    pace: "Free",
    term: "3 business days",
    body: "We review your brand, your site and your last three pieces of content or ads, then email you what's holding them back, with fixes. Yours to keep, whether you hire us or not.",
    items: ["Brand, site and last 3 pieces reviewed", "Fixes you can use tomorrow", "No call required"],
    cta: "Get a Free Creative Audit",
    href: "/start",
    featured: true,
  },
  {
    id: "projects",
    label: "Fixed scope",
    name: "Projects",
    pace: "2 to 8",
    term: "weeks",
    body: "A start, a finish and a price agreed before we begin. Pick a Take, or scope one service on its own.",
    items: ["Take 01: The Mark", "Take 02: The Identity", "Take 03: The World", "Or one service: packaging, social, a launch"],
    cta: "Book a call",
    href: "book",
  },
  {
    id: "retainer",
    label: "Ongoing",
    name: "Creative Director on Retainer",
    pace: "Monthly",
    term: "3-month minimum",
    body: "A creative director over everything you put out after launch, with the team to make it: social, ads and new pieces that stay on brand.",
    items: ["Social posts and reels made on brand", "Growth Retainer: 16 ads a month, 3 hooks each", "Weekly report in plain words"],
    cta: "Book a call",
    href: "book",
  },
];

export const process = [
  { step: "Audit", body: "We look at what you have and tell you what's holding it back." },
  { step: "Direction", body: "The idea, the look and the shot list, decided before anything gets made." },
  { step: "Design", body: "The mark, the system, the pack and the feed, made by the network under one director." },
  { step: "Launch", body: "Live on your site, your feeds and your ads, sized for every placement." },
  { step: "Read the results", body: "What worked, what didn't, what we make next. Every week, in plain words." },
];

export const faqs = [
  { q: "Who owns the work?", a: "You do, once it's paid for. Creator usage terms, meaning how long and where a creator's face can run, are written into each deal before filming." },
  { q: "How do you use AI?", a: "For speed and range: concepts, edits, product shots, voice and AI performers. Concept work on this site is made with AI and marked as concept; every AI person or scene in client work is labeled, and a director checks every piece before you see it. Where a real face matters, we cast real people." },
  { q: "Who actually does the work?", a: "Willie directs every project. A vetted network of editors, designers, photographers, motion artists and creators makes it with him, picked for each job." },
  { q: "How many revisions do I get?", a: "Two rounds on every piece. The first cut lands within 5 business days of an approved brief." },
  { q: "What does it cost?", a: "Projects are quoted on a short call after your audit, with a fixed price before we start. Retainers have a 3-month minimum, then run month to month with 30 days’ notice." },
  { q: "How does the Free Creative Audit work?", a: "Send your website or Instagram. We review the brand, the site and your last three pieces, mark what's holding each one back, and email you the fixes within 3 business days." },
];

export const network = ["Editors", "Designers", "Photographers", "Motion artists", "Creators and talent", "Writers", "Developers"];

export const facts = [
  { k: "15 years", v: "in creative strategy, direction and photography" },
  { k: "2 awards", v: "Corporate Vision Awards for Blacksheepfocus: Best Social Media Marketing Agency (2022), Best Social Media Strategy Agency (2023)" },
  { k: "23 countries", v: "photographed, with an ND Awards honorable mention for travel and culture" },
  { k: "38k to 100k+", v: "followers grown for a travel media brand with its creative squad" },
];

// The values, and they spell the point.
export const values = [
  { l: "M", name: "Make it bold.", body: "If it looks like everyone else's, it isn't done." },
  { l: "A", name: "Act fast.", body: "Culture moves every week. So do we." },
  { l: "R", name: "Respect the craft.", body: "Light, lens, type and timing. All of it matters." },
  { l: "K", name: "Keep your word.", body: "Dates hit, revisions honored, and you own what you pay for." },
];

// Who Willie has made work for. Names only, no logos.
// Clients and partners: work he directed or shot for them directly.
export const clients = ["Hattiesburg Black Sox", "H.O.P.E Live Agency", "Blacktravelgram", "Black Girl Travel Slay", "Mom on the Move"];
// Brand deals: paid partnerships where Willie made the content that ran for the brand.
export const brandDeals = ["Sonic", "Walmart", "Fashion Nova", "RTIC", "Red Diamond", "Homer"];
export const brandDealsLine = "Paid brand deals where Willie concepted, shot and delivered the content that ran for the brand.";
/** Everything above, in one list, for schema and anywhere a single list is needed. */
export const brands = [...clients, ...brandDeals];

// Talent Willie has photographed.
export const talent = ["Eva Marcille", "David Banner", "Blac Chyna", "Adrian Lockett", "Blue Kimble", "Ptosha Storey", "DreamDoll", "Jada Wada"];
