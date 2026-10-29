import type { MetadataRoute } from "next";
import { cases } from "./content/work";
import { site } from "./content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/work`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/start`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    ...cases.map((c) => ({ url: `${site.url}/work/${c.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
