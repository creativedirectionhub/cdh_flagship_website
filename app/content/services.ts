import type { Discipline, Lane } from "./work";

export const site = {
  name: "Creative Direction Hub",
  tagline: "We put brands on their mark.",
  promise: "Every project has a director.",
  positioning: "Creative Direction Hub is the creative department for growing businesses, led by creative director Willie Bernoudy.",
  support: "Brand, campaigns, content, digital and AI art direction, directed by one person and made by one team.",
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
    proof: "four-seasons-anguilla",
  },
];

export const disciplines: { id: Discipline; name: string; short: string; what: string; get: string[]; proof: string[] }[] = [
  {
    id: "brand",
    name: "Brand",
    short: "Who you are, decided once.",
    what: "Positioning, naming, identity, logo systems, guidelines and voice. The part most growing businesses skip, then pay for on every piece after.",
    get: ["A positioning you can say in one breath", "A logo system that works at icon size and on a storefront", "Color, type and voice rules your whole team can follow", "Guidelines as a living document, not a PDF nobody opens"],
    proof: ["identity", "portraits"],
  },
  {
    id: "campaigns",
    name: "Campaigns and ads",
    short: "One idea, every channel.",
    what: "Campaign concepts, paid social for Meta and TikTok, launches and seasonal pushes. Directed to sell, read every week, scaled or cut on the numbers.",
    get: ["A campaign idea with a headline you'd put on a billboard", "Hooks, scripts and statics made on a weekly loop", "Ads launched, read and reported in plain words", "Cut-downs sized for every placement"],
    proof: ["hattiesburg-black-sox", "paid-social"],
  },
  {
    id: "content",
    name: "Content and production",
    short: "Pictures and film that do the selling.",
    what: "Photography, brand film and commercials, short-form video, UGC-style and AI-assisted production. Every AI person or scene is labeled.",
    get: ["Editorial photography, on location", "Brand films and commercials with cut-downs", "A month of short-form from one shoot day", "AI production for speed and range, labeled every time"],
    proof: ["commercials", "dinner-service"],
  },
  {
    id: "digital",
    name: "Digital",
    short: "A site that closes.",
    what: "Websites, landing pages and social design systems, built fast on Next.js and Vercel, wired to your forms and booking.",
    get: ["A site built around the one action you need visitors to take", "Landing pages for each campaign", "Social templates your team can post from", "Forms and booking connected on day one"],
    proof: ["cafe-social"],
  },
  {
    id: "ai",
    name: "AI art direction",
    short: "AI that looks like your brand.",
    what: "Most AI content looks like everyone else's. We set the look first, then direct the models: the light, the lens, the wardrobe, the talent, the product. A director checks every frame before it ships, and every AI person or scene is labeled.",
    get: ["A visual rulebook the AI follows: palette, light, lens, styling", "Product and lifestyle imagery at the volume ads need", "Custom AI talent and spokespeople, labeled as AI", "Every frame reviewed by a director before it ships"],
    proof: ["commercials", "art-direction"],
  },
];

export const ways = [
  {
    id: "audit",
    label: "Start here",
    name: "Free Creative Audit",
    pace: "Free",
    term: "back in 3 business days",
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
    body: "A start, a finish and a price agreed before we begin. Brand Build, Website, Launch Campaign, Brand Film or Commercial, 30-Day Content Sprint.",
    items: ["Brand Build", "Website", "Launch Campaign", "Brand Film or Commercial", "30-Day Content Sprint"],
    cta: "Book a call",
    href: "book",
  },
  {
    id: "retainer",
    label: "Ongoing",
    name: "Creative Director on Retainer",
    pace: "Monthly",
    term: "no long contract",
    body: "A creative director over everything you put out, with the team to make it. The Growth Retainer, for example: 16 ads a month on a weekly test loop.",
    items: ["Direction on everything you publish", "Growth Retainer: 16 ads a month, 3 hooks each", "Weekly report in plain words"],
    cta: "Book a call",
    href: "book",
  },
];

export const process = [
  { step: "Audit", body: "We look at what you have and tell you what's holding it back." },
  { step: "Direction", body: "The idea, the look and the shot list, decided before anything gets made." },
  { step: "Production", body: "Photography, film, design and AI, made by the network under one director." },
  { step: "Launch", body: "Live on your site, your feeds and your ads, sized for every placement." },
  { step: "Read the results", body: "What worked, what didn't, what we make next. Every week, in plain words." },
];

export const faqs = [
  { q: "Who owns the work?", a: "You do, once it's paid for. Creator usage terms, meaning how long and where a creator's face can run, are written into each deal before filming." },
  { q: "How do you use AI?", a: "For speed and range: concepts, edits, product shots, voice and AI performers. Every AI person or scene is labeled, and a director checks every piece before you see it. Where a real face matters, we cast real people." },
  { q: "Who actually does the work?", a: "Willie directs every project. A vetted network of editors, designers, photographers, motion artists and creators makes it with him, picked for each job." },
  { q: "How many revisions do I get?", a: "Two rounds on every piece. The first cut lands within 5 business days of an approved brief." },
  { q: "What does it cost?", a: "Projects are quoted on a short call after your audit, with a fixed price before we start. Retainers run month to month." },
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

// Brands Willie has worked with across his career, as named in his portfolio. Names only, no logos.
export const brands = ["Hattiesburg Black Sox", "H.O.P.E Live Agency", "Sonic", "Walmart", "Fashion Nova", "RTIC", "Red Diamond", "Homer", "Black Girl Travel Slay", "Mom on the Move", "Blacktravelgram"];

// Talent Willie has photographed.
export const talent = ["Eva Marcille", "David Banner", "Blac Chyna", "Adrian Lockett", "Blue Kimble", "Ptosha Storey", "DreamDoll", "Jada Wada"];
