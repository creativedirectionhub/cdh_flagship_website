import type { MetadataRoute } from "next";

// Search crawlers and AI assistants are both welcome: being read is how the site gets quoted.
const assistants = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Applebot-Extended", "CCBot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: assistants, allow: "/", disallow: "/api/" },
    ],
    sitemap: "https://www.creativedirectionhub.com/sitemap.xml",
  };
}
