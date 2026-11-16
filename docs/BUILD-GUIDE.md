# CDH site build guide

Read this before touching the site. If a change breaks a rule here, the change is wrong, not the rule.
`npm run gates` checks the parts a script can check. The rest is on whoever is building.

## 1. The bar

Treat every change as part of a $250k build. The site is judged the way award juries judge.

| Jury | What they score | What that means here |
|---|---|---|
| Awwwards | Design 40%, Usability 30%, Creativity 20%, Content 10%. Site of the Day needs about 8.0 average | Design and usability are 70%. A clever effect never pays for a page that is slow or hard to use |
| CSS Design Awards / FWA | UI, UX, innovation | One new idea per page, built properly, beats ten effects |
| Webby | Content, structure and navigation, visual design, functionality, interactivity, overall experience | Navigation is scored. The services menu has to be the easiest thing on the site |
| D&AD | Is the idea inspiring? Is it brilliantly executed? Is it relevant? In craft categories, craft comes first | Every line of copy and every pixel of type is entered work |
| Effie / Cannes case studies | A clear line from insight to idea to result, and results that can't be argued with | A case page is a business argument: the problem, the idea, what we made, what happened. No inflated numbers |

Score every page 1 to 10 on Design, Usability, Creativity, Content, Motion, Mobile, Performance. Anything under 8 gets fixed before it ships.

## 2. Concept lock

1. **Concept:** CDH is a set. Every project has a director, every service is a scene on the call sheet.
2. **Art direction:** a black stage, bone paper, gaffer tape. Slates, call sheets, tape strips, marker handwriting. Nothing glossy.
3. **Type:** Schibsted Grotesk 900 for display, IBM Plex Mono for slate labels, Permanent Marker only on tape.
4. **Palette:** Set Black `#121110`, Bone `#EFE9DF`, Gaffer Orange `#FF5A1F`. Orange is allowed on tape, one key word per page, primary buttons and small markers. Nowhere else.
5. **Signature moments:** the slate clap opener on Home, the Director's Commentary, the Undirected/Directed slider, the wall, and the call sheet for services. No new effect is added unless it is one of these or replaces one.

Campaign line: **We put brands on their mark.** If a page can't carry that line, stop and talk to Willie before building around it.

## 3. What we sell

Four departments, fourteen scenes. Source of truth: `app/content/offer.ts`.

- **Branding:** Business branding, Restaurant branding, Graphic design, Identity branding, Logo design, Brand support
- **Marketing:** SEO, AEO, GEO, Social media, Google Ads, AI marketing
- **Websites:** Website design and build
- **Photography:** Brand photography

Rules:
- Every service has its own page at `/services/<slug>` with copy written for that service alone. No page shares a paragraph with another.
- Every page answers "what is this?" in one plain sentence near the top. That sentence is what search engines and AI assistants quote.
- No prices on the site. No timelines we haven't promised. Standing promises: fixed scope and price before we start, first cut within 5 business days of an approved brief, two rounds of revisions, the client owns the work once paid, retainers have a 3-month minimum.
- Proof on a service page must be real work from `app/content/work.ts`. If we have no proof for a service yet, show the nearest honest piece and say what it is.

## 4. Voice

Written by a director who has been on set for 15 years. Plain, specific, a little dry. Short sentences next to long ones.

- Say the thing. "A logo that still reads at 16 pixels" beats "impactful visual identities".
- Use nouns a client can picture: the menu, the storefront, the box, the first page of Google.
- One idea per sentence. Read it out loud. If you wouldn't say it to a client across a table, cut it.
- Willie is named only on About and where the site already names him as director. Everywhere else the site speaks as CDH.
- Banned: elevate, unlock, seamless, revolutionize, cutting-edge, world-class, game-changing, leverage, synergy, next level, in today's, delve, tapestry, supercharge, empower, robust, bespoke solutions, "we're passionate about". Also no em dashes, no emoji, no exclamation marks.
- Never claim an award, client, result or testimonial that isn't real and on file.

## 5. Creative gates

Work passes all of these or it does not go on the site. This is what keeps slop out.

**Images and film**
- A director picked the light, the lens and the frame, and can say why.
- Hands, teeth, text on products, reflections and logos checked at 100%. One wrong finger and it's out.
- Skin has texture. Nothing waxy, nothing over-symmetrical, no floating props, no nonsense signage.
- It could sit next to the Black Sox photographs without looking like a different company made it.

**Design**
- No purple-to-blue gradients, glass panels, glowing blobs, or three matching icon cards.
- No stock icons as the main visual language. Tape, slates and type do the work.
- Sections do not all share one height and rhythm. Something is big, something is quiet.
- Type has real contrast: display at 64px and up, body at 16 to 19px, labels at 12 to 13px mono.

**Copy**
- Passes section 4. Every headline could only belong to CDH.
- Every claim has a source in the content files.

**Labels**
- Work is labeled by who commissioned it: Client, Concept, Studio, Personal work. Concepts say they were not commissioned by the brand shown.
- We do not tag work by the tools that made it. If a client asks how a piece was made, we tell them.
- Client ads that run on Meta, TikTok or YouTube follow each platform's own disclosure rules. That is handled at delivery, not on this site.

**Code**
- First frame is complete without JavaScript. Motion respects `prefers-reduced-motion`.
- One animation approach: CSS scroll-driven animations and small client components. No second scroll library.
- Tap targets 44px or more. Text never under 12px. Contrast passes AA. Every image has alt text that describes the picture.
- Largest Contentful Paint under 2.5s on a phone. Images in WebP or AVIF, sized. Fonts self-hosted.
- Every page has a title, description, canonical, Open Graph image and structured data. New pages go in the sitemap and `llms.txt`.

## 6. How a change ships

1. Write the change against this guide.
2. `npm run gates` and `npm run build` both pass.
3. Look at it on desktop and on a phone-size screen. Score it (section 1).
4. Push to a preview branch. Never push to `the-mark-2026` (that is the live site) without Willie's go.
5. Report: what changed, the scores, what is still a placeholder.

## 7. Off-track check

Stop and ask if any of these is true:
- You are adding a second effect to a page that already has its moment.
- You are writing a sentence that could be on any agency's site.
- You are inventing a number, a client or a deadline.
- The page looks fine but you can't say what the idea is.
