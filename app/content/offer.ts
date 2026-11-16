// What CDH sells: four departments, fourteen scenes. This file is the source of truth for the header menus,
// the Services call sheet, every /services/<slug> page, the sitemap, the structured data and /llms.txt.
// Rules for writing here live in docs/BUILD-GUIDE.md. `npm run gates` reads this file.

export type Dept = "branding" | "marketing" | "websites" | "photography";

export type Offer = {
  slug: string;
  dept: Dept;
  /** Page title and H1. */
  name: string;
  /** Short label for menus. */
  nav: string;
  /** Spelled out, for acronyms. */
  long?: string;
  /** The line under the title. */
  line: string;
  /** One plain sentence that says what this is. Search engines and AI assistants quote this. */
  answer: string;
  body: string[];
  get: string[];
  /** "Call us when…" */
  when: string[];
  /** How it's bought. */
  shape: "Project" | "Monthly" | "Project or monthly";
  faq: { q: string; a: string }[];
  /** Case slugs from work.ts. Real work only. */
  proof: string[];
  /** Said above the proof when the work shown is the nearest piece, not an exact match. */
  proofNote?: string;
  meta: { title: string; description: string };
};

export const depts: { id: Dept; name: string; line: string; blurb: string }[] = [
  { id: "branding", name: "Branding", line: "Decide who you are. Then look like it everywhere.", blurb: "The idea, the name, the mark and the system, and every piece made from them." },
  { id: "marketing", name: "Marketing", line: "Found when they search, ask or scroll.", blurb: "Search, answers, AI assistants, social and paid, read every week in plain words." },
  { id: "websites", name: "Websites", line: "One site. One action. Built by hand.", blurb: "Written, designed and built around the one thing a visitor should do." },
  { id: "photography", name: "Photography", line: "Pictures that prove it.", blurb: "Directed shoots of your people, products and places." },
];

export const offers: Offer[] = [
  // ---------------------------------------------------------------- Branding
  {
    slug: "business-branding",
    dept: "branding",
    name: "Business branding",
    nav: "Business branding",
    line: "Look like the company you're becoming.",
    answer: "Business branding is deciding what your company stands for and how it looks, sounds and shows up, so customers recognize you everywhere they meet you.",
    body: [
      "Most businesses grow a brand by accident. A logo from one person, a website from another, a sign from the print shop. Each piece is fine. Together they look like three companies.",
      "We start over at the idea. One position, one voice, one look. Then every piece a customer touches gets rebuilt to match, with one director holding all of it, so the truck, the invoice and the Instagram post look like they came from the same place.",
    ],
    get: ["A position you can say in one breath", "Name and tagline work, if you need it", "Logo, color, type and image style as one system", "Voice and messaging your whole team can write in", "The first pieces rebuilt: cards, signs, decks, social and site"],
    when: ["You've outgrown the logo you started with", "You're opening, launching or raising your prices", "Customers can't tell you from the shop down the road"],
    shape: "Project",
    faq: [
      { q: "How is business branding different from a logo?", a: "A logo is one mark. Branding is every decision around it: what you stand for, how you talk, the colors, type and photographs, and how all of it gets used. The logo is usually the last thing we draw." },
      { q: "Do you rebrand businesses that are already open?", a: "Yes. Most of our branding work is for businesses that already have customers. We keep what people know you by and fix what's holding you back." },
      { q: "Where do the three Takes fit?", a: "They're the usual sizes of a branding project. Take 01 is the mark. Take 02 is the full identity. Take 03 adds the launch: packaging, campaign, photography and a site." },
    ],
    proof: ["blac-birdie-farms", "identity"],
    meta: { title: "Business Branding Services | Creative Direction Hub", description: "Business branding from the idea out: position, name, voice, logo system and the first pieces rebuilt to match, with one creative director over all of it." },
  },
  {
    slug: "restaurant-branding",
    dept: "branding",
    name: "Restaurant branding",
    nav: "Restaurant branding",
    line: "Full tables start before the food.",
    answer: "Restaurant branding is the name, look and voice of a restaurant carried across the menu, the sign, the room, the to-go bag and the feed, so the place feels like one idea from the sidewalk to the check.",
    body: [
      "People pick where to eat from a photo, a sign and a menu they read on their phone. We brand restaurants, cafes, bars and food trucks for that decision.",
      "The menu is designed to be read and to sell. The food is photographed the way it tastes. And your hours, menu and address say the same thing on every site that lists you, because that is what Google and AI assistants repeat when someone asks where to eat tonight.",
    ],
    get: ["Name, logo and a look built for the room", "Menus: dine-in, to-go, QR and specials", "Signage, packaging and uniforms", "Food and interior photography", "Listings cleaned up: Google, maps and delivery apps"],
    when: ["You're opening a first or a second location", "The food got better and the brand didn't", "Your menu looks different in six places"],
    shape: "Project",
    faq: [
      { q: "Do you design menus on their own?", a: "Yes. A menu is the most common place to start, and often the fastest change a guest will notice." },
      { q: "Can you photograph the food too?", a: "Yes. The same director who lays out the menu directs the shoot, so the photographs are made for the layout instead of squeezed into it." },
      { q: "Do you work with food trucks, bars and cafes?", a: "Yes. Anywhere people eat or drink. The pieces change, a truck wrap instead of a dining room, but the work is the same." },
    ],
    proof: ["blac-birdie-farms", "her-mark"],
    proofNote: "Two food brands from our own bench: a Mississippi mushroom farm we built from the name up, and a concept film for a hot sauce founder.",
    meta: { title: "Restaurant Branding, Menu Design & Food Photography | CDH", description: "Restaurant branding for restaurants, cafes, bars and food trucks: name, logo, menus, signage, packaging, food photography and clean listings." },
  },
  {
    slug: "graphic-design",
    dept: "branding",
    name: "Graphic design",
    nav: "Graphic design",
    line: "Every piece, on brand.",
    answer: "Graphic design is the day-to-day making of a brand: the packaging, menus, decks, flyers, ads and posts people hold in their hands and scroll past.",
    body: [
      "A brand is only as good as the last thing it printed. We design the pieces between the big launches to the same standard as the launch.",
      "Packaging and labels with print-ready files. Decks that hold a room. Social graphics, flyers, signs and one-sheets. A director reads the brief before a designer opens a file, so the piece has an idea before it has a layout.",
    ],
    get: ["Packaging and labels, checked with your printer", "Pitch decks, proposals and one-sheets", "Print: flyers, posters, signage and mailers", "Social graphics and ad layouts", "Files named and organized so your team can find them"],
    when: ["You have a brand and nobody to make things with it", "A launch, an event or a pitch has a date on it", "Your printer keeps sending files back"],
    shape: "Project or monthly",
    faq: [
      { q: "Can I hire you for one piece?", a: "Yes. One menu, one deck, one label. If the requests keep coming, Brand support is the better fit." },
      { q: "Do you design packaging?", a: "Yes. Labels, boxes, bottles and bags, with dielines and print-ready files, and mockups of the shelf and the feed before anything is printed." },
      { q: "Will it match the brand I already have?", a: "We work inside your guidelines. If you don't have any, we write a one-page set first so the pieces match each other." },
    ],
    proof: ["blac-birdie-farms", "hattiesburg-black-sox"],
    meta: { title: "Graphic Design: Packaging, Decks, Print & Social | CDH", description: "Graphic design directed by a creative director: packaging and labels, pitch decks, print, signage, social graphics and ad layouts, on brand every time." },
  },
  {
    slug: "identity-branding",
    dept: "branding",
    name: "Identity branding",
    nav: "Identity branding",
    line: "The whole world your brand lives in.",
    answer: "Identity branding is the full system behind a brand: the logo, color, type, photography style and voice, with the rules for using them.",
    body: [
      "A logo answers one question. An identity answers all the ones that come after it. What color is the sign. What does a caption sound like. What do the photographs look like.",
      "We build both halves. The visual identity: logo system, color, type, image style and motion. The verbal identity: name, tagline, voice, and the words you use and the ones you don't. Decided once and written down, so everything made after it looks like it came from the same place.",
    ],
    get: ["Visual identity: logo system, color, type, image style and motion", "Verbal identity: voice, tagline and messaging", "Guidelines as a living page, not a PDF nobody opens", "Templates for the pieces you make most", "A handover session with your team"],
    when: ["You have a logo and nothing else", "Three people post for you and it shows", "You're about to hire an agency, a printer or a web team"],
    shape: "Project",
    faq: [
      { q: "What's the difference between visual and verbal identity?", a: "Visual identity is how the brand looks: logo, color, type, photographs, motion. Verbal identity is how it sounds: the name, the tagline, the voice and the phrases you repeat. A brand needs both to be recognized." },
      { q: "What's in the guidelines?", a: "How to use the logo, the colors with their codes, the typefaces, photo and video rules, voice with examples, and the templates. It lives on a page you can share with anyone who makes things for you." },
    ],
    proof: ["blac-birdie-farms", "her-mark"],
    meta: { title: "Identity Branding: Visual & Verbal Brand Identity | CDH", description: "Identity branding by Creative Direction Hub: logo system, color, type, image style, voice and guidelines, built as one system and handed to your team." },
  },
  {
    slug: "logo-design",
    dept: "branding",
    name: "Logo design",
    nav: "Logo design",
    line: "A mark that means something.",
    answer: "Logo design is drawing the one mark that stands for your business: a symbol, a wordmark or both, built to work at any size.",
    body: [
      "We draw logos the slow way. Research first, then pencil, then several directions before one is chosen.",
      "Every mark is tested at 16 pixels and on a storefront, in one color and in motion, because those are the places logos fail. You get a mark with a reason behind it, made to last decades and not seasons.",
    ],
    get: ["Primary logo, wordmark and a compact mark", "Versions for dark, light and one color", "An animated logo for reels and video", "Files for print, web and social, organized"],
    when: ["You're starting and need to look real", "Your logo falls apart when it gets small", "You drew it yourself and it's time"],
    shape: "Project",
    faq: [
      { q: "How many directions will I see?", a: "Several, each with the thinking behind it. You pick one and we refine it over two rounds." },
      { q: "What files do I get?", a: "Vector and image files for print, web and social, in full color, one color, dark and light, plus the animated version." },
      { q: "Can you redraw a logo I already have?", a: "Yes. Sometimes the idea is right and the drawing is wrong. We keep what people recognize and fix the rest." },
    ],
    proof: ["identity", "blac-birdie-farms"],
    meta: { title: "Logo Design: Logos, Wordmarks & Monograms | CDH", description: "Logo design by Creative Direction Hub: symbols, wordmarks and monograms drawn by hand, tested at every size, delivered with every file you need." },
  },
  {
    slug: "brand-support",
    dept: "branding",
    name: "Brand support",
    nav: "Brand support",
    line: "A creative department, on call.",
    answer: "Brand support is ongoing design and direction for a brand that's already built: a creative director and crew on retainer, making what the business needs each month.",
    body: [
      "After the launch comes Tuesday. A new menu, a hiring post, a trade-show banner, a deck due Friday.",
      "Brand support puts a creative director over everything you put out, with designers, editors and photographers behind them. You send requests to one place. We make them on brand and keep the look from drifting. It runs monthly, with a 3-month minimum.",
    ],
    get: ["A creative director over everything you publish", "Design, edits and updates made each month", "One place to send every request", "A monthly review: what shipped and what's next", "Guidelines kept current as the brand grows"],
    when: ["Your team is making things without a designer", "The brand looked right at launch and has drifted since", "You need a creative department and not a full-time hire"],
    shape: "Monthly",
    faq: [
      { q: "Is there a minimum?", a: "Three months, then month to month with 30 days' notice." },
      { q: "What can I ask for?", a: "Anything a creative department makes: graphics, decks, menus, signage, social posts, edits, photo direction and updates to the site." },
      { q: "Do I need to have branded with CDH first?", a: "No. We start with a free audit of what you have, then work inside it." },
    ],
    proof: ["blacktravelgram", "hattiesburg-black-sox"],
    meta: { title: "Brand Support: Creative Director on Retainer | CDH", description: "Ongoing brand support from Creative Direction Hub: a creative director and crew on monthly retainer for design, content and everything you publish." },
  },

  // --------------------------------------------------------------- Marketing
  {
    slug: "seo",
    dept: "marketing",
    name: "SEO",
    nav: "SEO",
    long: "Search engine optimization",
    line: "Found when they search.",
    answer: "SEO, search engine optimization, is the work of getting your website to rank in Google and other search engines when people look for what you sell.",
    body: [
      "Ranking is mostly craft. A fast site. Pages that match what people type. Clear titles, clean structure and other good sites pointing at yours.",
      "We fix the technical problems first. Then we build the pages and articles your customers are searching for, written to rank and to be read by a person. Each month you get a report in plain words: what moved, what didn't, what we're doing next.",
    ],
    get: ["A technical audit, and the fixes made", "Keyword research tied to what you sell", "Pages and articles written to rank and to be read", "Google Business Profile and local listings", "A monthly report in plain words"],
    when: ["You rank for your own name and nothing else", "A competitor shows up first for your service", "Your site is slow or was never set up for search"],
    shape: "Monthly",
    faq: [
      { q: "How long does SEO take?", a: "Search engines move slowly. Technical fixes can show within weeks. Rankings for competitive searches usually take months. Anyone promising page one by a date is guessing." },
      { q: "Do you guarantee rankings?", a: "No, and no honest shop does. We promise the work, the reporting and our judgment." },
      { q: "Is SEO still worth it now that people ask AI?", a: "Yes. AI assistants lean on pages that already rank and read clearly. SEO is the ground AEO and GEO are built on." },
    ],
    proof: ["hope-live-agency"],
    proofNote: "Our search case studies are still being written. The nearest finished proof is a site we planned, wrote and built from the ground up.",
    meta: { title: "SEO Services: Search Engine Optimization | CDH", description: "SEO from Creative Direction Hub: technical fixes, keyword research, pages written to rank and be read, local listings and a monthly report in plain words." },
  },
  {
    slug: "aeo",
    dept: "marketing",
    name: "AEO",
    nav: "AEO",
    long: "Answer engine optimization",
    line: "The answer they get is you.",
    answer: "AEO, answer engine optimization, is structuring your content so search engines and voice assistants can lift a direct answer from it: featured snippets, AI Overviews, People Also Ask and spoken results.",
    body: [
      "More searches now end without a click. Someone asks a question and reads the answer at the top of the page. AEO is the work of making that answer yours.",
      "We find the questions your customers ask, write clear answers in the first lines of the page, and mark them up so a machine can read them. Hours, service areas, how-tos, what something costs to start: stated once, plainly, where an engine can find it.",
    ],
    get: ["The list of questions your customers really ask", "Answer-first pages and FAQs", "Schema markup: FAQ, how-to, local business and product", "Tracking for featured snippets and AI Overviews", "Voice search basics: hours, location and near-me searches"],
    when: ["A competitor's sentence is the answer to your customers' question", "Your traffic dropped but your rankings didn't", "People call to ask things your site should have told them"],
    shape: "Monthly",
    faq: [
      { q: "What's the difference between AEO and SEO?", a: "SEO gets your page ranked. AEO gets a sentence from your page shown as the answer. They share most of the same work. AEO adds question research, answer-first writing and schema." },
      { q: "What is an answer engine?", a: "Any tool that replies with an answer instead of a list of links: Google's AI Overviews and featured snippets, voice assistants like Siri and Alexa, and AI chat tools." },
      { q: "Do I need SEO first?", a: "Usually, yes. Engines pull answers from pages they already trust. We check the basics in the audit and fix them alongside the AEO work." },
    ],
    proof: ["hope-live-agency"],
    proofNote: "This page is built the way we'd build yours: one plain answer up top, questions marked up underneath. The nearest client proof is a site we wrote and built end to end.",
    meta: { title: "AEO Services: Answer Engine Optimization | CDH", description: "Answer engine optimization from Creative Direction Hub: question research, answer-first pages, schema markup and tracking for snippets and AI Overviews." },
  },
  {
    slug: "geo",
    dept: "marketing",
    name: "GEO",
    nav: "GEO",
    long: "Generative engine optimization",
    line: "Named when they ask AI.",
    answer: "GEO, generative engine optimization, is the work of getting your brand cited and recommended inside AI answers from tools like ChatGPT, Gemini, Perplexity and Claude.",
    body: [
      "When someone asks an AI assistant who the best caterer in town is, it builds an answer from the sources it trusts. GEO is the work of being one of them.",
      "That takes facts about your business that agree everywhere, pages written to be quoted, mentions on the sites these tools read, and a regular check of what the assistants are saying about you today.",
    ],
    get: ["An audit of what AI assistants say about you now", "Your facts made consistent across the web", "Pages written to be quoted, with sources", "Mentions and listings on the sites AI tools read", "A monthly check across the major assistants"],
    when: ["You asked an AI about your own business and it got it wrong", "Assistants recommend competitors and never you", "Customers tell you they found you through ChatGPT and you don't know why"],
    shape: "Monthly",
    faq: [
      { q: "Can you guarantee ChatGPT will recommend us?", a: "No. Nobody controls those answers. What we control is how clear, consistent and well-sourced your brand is, which is what those tools reward." },
      { q: "How is GEO different from AEO?", a: "AEO aims for the single answer box in search. GEO aims for a mention or citation inside a longer answer written by an AI. The groundwork overlaps, so we usually run them together with SEO." },
      { q: "How do you measure it?", a: "We ask the major assistants a fixed set of questions about your category each month and record whether you're named, how you're described and which sources they cite." },
    ],
    proof: ["hope-live-agency"],
    proofNote: "GEO is young and so are our case studies. This site publishes an llms.txt file and structured data on every service, the same groundwork we'd lay for you.",
    meta: { title: "GEO Services: Generative Engine Optimization | CDH", description: "Generative engine optimization from Creative Direction Hub: get your brand cited in answers from ChatGPT, Gemini, Perplexity and Claude." },
  },
  {
    slug: "social-media",
    dept: "marketing",
    name: "Social media",
    nav: "Social media",
    line: "Your feed, looking like a brand.",
    answer: "Social media marketing is planning, making and posting content on platforms like Instagram, TikTok and LinkedIn so the right people find, follow and buy from your brand.",
    body: [
      "A feed is a storefront window that changes every day. We set the look first: profile, grid, templates, and the rules for photos, captions and video.",
      "Then we make the posts and reels, shot and edited by people who do this for a living, and read the numbers every week to decide what to make next.",
    ],
    get: ["Profile, bio and highlight covers", "Templates your team can use without a designer", "Posts and reels made each month", "A content plan built around what you sell", "A weekly report in plain words"],
    when: ["You post when you remember to", "The feed doesn't look like the business", "You have followers and no customers from them"],
    shape: "Project or monthly",
    faq: [
      { q: "Do you post for us?", a: "Yes, or we hand you finished posts and a schedule. Your call." },
      { q: "Which platforms?", a: "The ones your customers are on. For most of our clients that's Instagram, TikTok, Facebook and LinkedIn." },
      { q: "Do you run paid social too?", a: "Yes. Ads for Meta and TikTok are made and read on the same weekly loop as the posts." },
    ],
    proof: ["blacktravelgram", "hattiesburg-black-sox"],
    meta: { title: "Social Media Marketing & Social Media Branding | CDH", description: "Social media from Creative Direction Hub: profile and feed branding, templates, posts and reels made each month, and a weekly report in plain words." },
  },
  {
    slug: "google-ads",
    dept: "marketing",
    name: "Google Ads",
    nav: "Google Ads",
    line: "In front of people ready to buy.",
    answer: "Google Ads is paid advertising on Google Search, Maps, YouTube and partner sites, where you pay when someone clicks or calls.",
    body: [
      "Search ads reach people at the moment they're looking. Most accounts waste that moment on the wrong keywords and a weak page.",
      "We build the account around what you sell, write the ads, design the page they land on, and track calls and forms so you know what a customer cost you. Every week you hear what ran, what worked and what we're cutting.",
    ],
    get: ["A new account, or a cleanup of the one you have", "Keyword research and negative keywords", "Ads written and tested against each other", "Landing pages designed to convert", "Call and form tracking, with a weekly report"],
    when: ["You're paying for clicks and can't say what they bought", "Your ads send people to your home page", "You need the phone to ring this month"],
    shape: "Monthly",
    faq: [
      { q: "What budget do I need?", a: "It depends on what a click costs in your market. After the audit we'll tell you whether your budget can reach a decision, before you spend anything." },
      { q: "Do you guarantee results?", a: "No. We guarantee the weekly read: what ran, what it cost and what we're changing." },
      { q: "Who owns the ad account?", a: "You do. We work inside your account, so the data and the history stay with you." },
    ],
    proof: ["hattiesburg-black-sox"],
    proofNote: "Paid search case studies are on the way. Here is a campaign we directed from the dugout photographs to the billboard, to show how we carry one message.",
    meta: { title: "Google Ads Management: Search, Maps & YouTube | CDH", description: "Google Ads from Creative Direction Hub: account build or cleanup, keywords, ads, landing pages, call tracking and a weekly report in plain words." },
  },
  {
    slug: "ai-marketing",
    dept: "marketing",
    name: "AI marketing",
    nav: "AI marketing solutions",
    line: "Faster follow-up. Same human taste.",
    answer: "AI marketing is using AI tools to do marketing work faster: answering leads, following up, reporting, and making sure AI search can read your business.",
    body: [
      "Most small teams lose customers in the gaps. The DM nobody answered. The lead that waited two days. We set up the tools that close those gaps.",
      "Instant replies in your DMs. Follow-up emails that send themselves. Reports that write their own first draft. A person still decides what gets said, and a director signs off on anything a customer sees.",
    ],
    get: ["DM and chat replies written in your voice", "Lead follow-up by email and text", "Your tools connected, so nothing gets typed twice", "AI search setup: your business, readable by assistants", "Training, so your team can run it"],
    when: ["Leads come in after hours and wait until morning", "You retype the same answer twenty times a week", "You bought the software and nobody set it up"],
    shape: "Project or monthly",
    faq: [
      { q: "Will it sound like a robot?", a: "Not if it's written properly. We write every reply in your brand's voice and test it on real questions before it goes live." },
      { q: "Do I need new software?", a: "Usually not much. We build on tools like ManyChat, Make and Brevo, and connect what you already use." },
      { q: "How do you keep the quality up?", a: "Nothing reaches a customer without a person reading it first. The tools handle speed. People handle taste." },
    ],
    proof: ["hope-live-agency"],
    proofNote: "Automation hides when it's done right, so it's hard to photograph. The nearest proof is a recruiting site whose application flow we designed and built.",
    meta: { title: "AI Marketing Solutions: Automation & AI Search | CDH", description: "AI marketing from Creative Direction Hub: DM and lead follow-up automation, connected tools, AI search setup and training, checked by a person." },
  },

  // ---------------------------------------------------------------- Websites
  {
    slug: "website-design",
    dept: "websites",
    name: "Website design",
    nav: "Websites",
    line: "A site built around one action.",
    answer: "Website design is planning, writing, designing and building a site so visitors understand what you do and take the next step.",
    body: [
      "A website has one job: get the right visitor to do one thing. Book, buy, call, apply.",
      "We write the words, design every screen and build it by hand, so it loads fast, reads well on a phone and shows up in search. No template with your logo dropped in.",
    ],
    get: ["Strategy: who it's for and the one action", "Copy written for the page, not pasted in", "Custom design for phone and desktop", "The build: forms, booking and analytics", "Search and AI basics built in from the first day"],
    when: ["Your site looks like it was built five years ago, because it was", "People visit and don't call", "You're launching and the page has to be right the first time"],
    shape: "Project",
    faq: [
      { q: "What do you build on?", a: "Mostly Next.js hosted on Vercel, for speed and control. If your team needs to edit pages often, we choose a setup that lets them." },
      { q: "Can you do a single landing page?", a: "Yes. One page built around one action is often the best first project." },
      { q: "Will I be able to update it myself?", a: "Yes. We hand the site over with a walkthrough, and Brand support covers updates if you'd rather not." },
    ],
    proof: ["hope-live-agency"],
    meta: { title: "Website Design & Build: Custom Sites That Convert | CDH", description: "Website design from Creative Direction Hub: strategy, copy, custom design and a hand-built site that loads fast, reads on a phone and shows up in search." },
  },

  // ------------------------------------------------------------- Photography
  {
    slug: "brand-photography",
    dept: "photography",
    name: "Brand photography",
    nav: "Photography",
    line: "Pictures that prove it.",
    answer: "Brand photography is a planned shoot of your people, products and places, made to be used across your site, ads and social for months.",
    body: [
      "Our director has spent fifteen years behind a camera, in 23 countries and on the set of Bid for Love 2. It comes down to one habit: decide the light, the lens and the frame on purpose.",
      "We build the shot list around where the pictures will run, direct the shoot, and deliver edited images cropped for every placement. Founders and teams. Products and food. Rooms, events and game days.",
    ],
    get: ["A shot list built from where the photos will run", "A directed shoot: people, product and place", "Edited images, cropped for site, ads and social", "A library organized by use", "Usage rights spelled out in writing"],
    when: ["Your site is full of stock photos", "The product is better than its pictures", "You have a launch, an opening or a season coming"],
    shape: "Project",
    faq: [
      { q: "Where do you shoot?", a: "On location, wherever you are. Travel is quoted with the shoot." },
      { q: "How many photos do I get?", a: "It depends on the shot list. We agree the number of final images before the shoot, so there are no surprises." },
      { q: "Can you shoot video the same day?", a: "Often, yes. Photos and short video from one set-up is the best use of a shoot day." },
    ],
    proof: ["portraits", "hattiesburg-black-sox"],
    meta: { title: "Brand Photography: People, Product & Place | CDH", description: "Brand photography directed by Willie Bernoudy: planned shoots of people, products and places, edited and cropped for your site, ads and social." },
  },
];

export const offerBySlug = (slug: string) => offers.find((o) => o.slug === slug);
export const byDept = (d: Dept) => offers.filter((o) => o.dept === d);
/** Scene number on the call sheet, 1-based, in the order above. */
export const sceneOf = (slug: string) => offers.findIndex((o) => o.slug === slug) + 1;
export const pad2 = (n: number) => String(n).padStart(2, "0");
export const deptById = (d: Dept) => depts.find((x) => x.id === d)!;
