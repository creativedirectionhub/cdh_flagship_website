// Notes: short, plain answers to the questions clients ask before they hire us.
// Each one opens with the answer, so a search engine or an AI assistant can quote it. Rules: docs/BUILD-GUIDE.md.

export type Note = {
  slug: string;
  title: string;
  /** The answer in one or two sentences. Shown big at the top and used as the description. */
  answer: string;
  date: string;
  /** Service pages this note backs up. */
  services: string[];
  sections: { h: string; p: string[] }[];
};

export const notes: Note[] = [
  {
    slug: "seo-aeo-geo-difference",
    title: "SEO, AEO and GEO: what each one is, and which one you need",
    answer: "SEO gets your page ranked in search results. AEO gets a sentence from your page shown as the answer. GEO gets your business named when someone asks an AI assistant. Most businesses need all three, in that order.",
    date: "2026-11-16",
    services: ["seo", "aeo", "geo"],
    sections: [
      { h: "Start with what the customer does", p: [
        "Someone needs a caterer. Ten years ago they typed it into Google and clicked a link. That still happens, and getting that click is SEO.",
        "Now the same person might read the answer box at the top of the results and never click anything. Being the source of that box is AEO. Or they skip the search engine and ask ChatGPT who the best caterer in town is. Being one of the names it gives back is GEO.",
      ] },
      { h: "What the work looks like", p: [
        "SEO is a fast site, pages built around what people type, clean titles and other good sites linking to yours.",
        "AEO adds questions. You find the ones your customers ask and answer each in the first two lines of a page, then mark the page up so a machine can tell the question from the answer.",
        "GEO adds agreement. Your name, address, hours, services and prices have to say the same thing on your site, your Google profile, your social pages and every directory, because an assistant trusts facts it sees repeated.",
      ] },
      { h: "Which one first", p: [
        "SEO, almost always. Answer engines and AI assistants both lean on pages that already rank and read clearly. A site that is slow or thin gives them nothing to quote.",
        "If you already rank and the phone is still quiet, look at AEO and GEO. Search your main service and see whose sentence is in the answer box. Then ask two AI assistants the same question and see whose name comes back.",
      ] },
    ],
  },
  {
    slug: "check-what-ai-says-about-your-business",
    title: "How to check what AI says about your business in ten minutes",
    answer: "Ask three AI assistants the same five questions a customer would ask, write down whether you are named and what they get wrong, then fix the source of each wrong fact. It takes ten minutes and a notebook.",
    date: "2026-11-16",
    services: ["geo", "ai-marketing"],
    sections: [
      { h: "The five questions", p: [
        "Use your real city and your real service. Who is the best one near me. Who does this for a business like mine. What does it cost. Tell me about my business by name. Is my business any good.",
        "Ask each one in ChatGPT, Gemini and Perplexity. Do it in a private window so your own history doesn't flatter you.",
      ] },
      { h: "What to write down", p: [
        "Were you named. Who was named instead. What was wrong: an old address, a service you dropped, a price from three years ago, a name spelled two ways.",
        "Perplexity shows its sources. Click them. That list is where the assistants are learning about you, and it is usually a directory you forgot existed.",
      ] },
      { h: "What to fix first", p: [
        "Wrong facts before missing mentions. Correct your Google Business Profile, then the directories the assistants cited, then your own site, so all of them agree.",
        "Then give them something to quote. One page per service, opening with a plain sentence that says what you do and where. Run the same five questions again in a month and compare.",
      ] },
    ],
  },
  {
    slug: "logo-at-16-pixels",
    title: "Your logo at 16 pixels: the test most logos fail",
    answer: "Shrink your logo to the size of a browser tab icon, 16 pixels wide. If you can't tell what it is, it needs a simpler cut for small sizes. Most logos are seen small far more often than they are seen large.",
    date: "2026-11-16",
    services: ["logo-design", "identity-branding"],
    sections: [
      { h: "Where your logo really lives", p: [
        "A storefront sign gets seen by the people who drive past. Your profile picture gets seen by everyone who scrolls. On a phone that picture is about the size of a pencil eraser.",
        "A logo drawn for the sign and squeezed into the circle turns into a grey smudge. Thin lines vanish, small type fills in, and a detailed drawing reads as a dot.",
      ] },
      { h: "Run the test yourself", p: [
        "Open your logo on your phone and pinch it down until it is the width of your fingernail. Then look at it in one color, black on white. Then white on black.",
        "If the shape still reads in all three, you have a strong mark. If it only works large and in color, it is an illustration.",
      ] },
      { h: "The fix is a family, not a redesign", p: [
        "Good identities carry three versions from the same drawing: the full logo, a stacked one for square spaces, and a compact mark for tiny ones.",
        "The compact mark has fewer parts and heavier lines. It is usually one letter or one shape taken from the full logo, so people connect the two without being told.",
      ] },
    ],
  },
  {
    slug: "one-shoot-day-a-year-of-content",
    title: "How to get a year of content from one shoot day",
    answer: "Plan the shoot backward from where the pictures will run. List every place you need an image for the next twelve months, turn that list into a shot list, and shoot each setup wide, tight and vertical before you move the light.",
    date: "2026-11-16",
    services: ["brand-photography", "social-media"],
    sections: [
      { h: "Write the list before you book the day", p: [
        "Home page. About page. Each service. The Google profile. Ads. Twelve months of posts. The holiday you always scramble for. Hiring.",
        "Every line on that list is a picture you will need. Most shoots skip this step, which is why a business ends up with forty versions of one headshot and nothing for the website banner.",
      ] },
      { h: "Three frames from every setup", p: [
        "Light is what takes time on set. Once a setup is lit, shoot it wide for the website, tight for detail, and vertical for phones. Then shoot it again with space on one side for a headline.",
        "That is four usable pictures for the cost of one. Eight setups in a day gives you more than thirty finished images that all look like they belong together.",
      ] },
      { h: "Shoot the things that change", p: [
        "People, product, place. Then the seasonal pieces: the holiday menu, the summer line, the new hire. Change a shirt and a background and one day covers four seasons.",
        "Leave with the files organized by where they will be used, and nobody has to hunt for the banner image in March.",
      ] },
    ],
  },
];

export const noteBySlug = (slug: string) => notes.find((n) => n.slug === slug);
export const notesFor = (service: string) => notes.filter((n) => n.services.includes(service));
