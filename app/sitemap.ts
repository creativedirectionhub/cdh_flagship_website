import type { MetadataRoute } from "next";
import { cases } from "./content/work";
import { site } from "./content/services";
import { offers } from "./content/offer";
import { notes } from "./content/notes";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/work`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/proof`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/start`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    ...offers.map((o) => ({ url: `${site.url}/services/${o.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.85 })),
    { url: `${site.url}/notes`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 },
    ...notes.map((n) => ({ url: `${site.url}/notes/${n.slug}`, lastModified: new Date(n.date), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...cases.filter((c) => !c.archived).map((c) => ({ url: `${site.url}/work/${c.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
