import { depts, offers } from "../content/offer";
import { faqs, site } from "../content/services";
import { LABELS, shownCases } from "../content/work";

// /llms.txt: the site in plain Markdown, for AI assistants that read it. Built from the same content files as the pages.
export const dynamic = "force-static";

export function GET() {
  const u = site.url;
  const out = [
    `# ${site.name}`,
    "",
    `> ${site.tagline} ${site.positioning} ${site.support}`,
    "",
    `Contact: ${site.email}. Start with a free creative audit: ${u}/start`,
    "",
    ...depts.flatMap((d) => [
      `## ${d.name}`,
      "",
      ...offers.filter((o) => o.dept === d.id).map((o) => `- [${o.long ?? o.name}](${u}/services/${o.slug}): ${o.answer}`),
      "",
    ]),
    "## Work",
    "",
    ...shownCases.map((c) => `- [${c.client}: ${c.title}](${u}/work/${c.slug}) (${LABELS[c.label]}): ${c.brief}`),
    "",
    "## How we work",
    "",
    ...faqs.map((f) => `- ${f.q} ${f.a}`),
    "",
    "## Pages",
    "",
    `- [Services](${u}/services)`,
    `- [Work](${u}/work)`,
    `- [Proof](${u}/proof)`,
    `- [About](${u}/about)`,
    `- [Free Creative Audit](${u}/start)`,
    "",
  ].join("\n");
  return new Response(out, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" } });
}
