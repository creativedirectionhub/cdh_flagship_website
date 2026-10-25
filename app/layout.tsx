import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import Pixels from "./components/Pixels";
import { display, mono } from "./fonts";
import "./globals.css";

const url = "https://www.creativedirectionhub.com";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: "Creative Direction Hub · Your brand, directed.",
  description:
    "A remote creative studio that directs, makes and runs Meta and TikTok ads for online consumer brands, every week. Start with a Free Ad Check.",
  openGraph: {
    title: "Creative Direction Hub · Ads people actually watch.",
    description: "Every ad has a director. We direct, make and run ads for online consumer brands, every week.",
    url,
    siteName: "Creative Direction Hub",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: url },
};

export const viewport: Viewport = { themeColor: "#121110", width: "device-width", initialScale: 1, viewportFit: "cover" };

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${url}/#org`,
      name: "Creative Direction Hub",
      alternateName: "CDH",
      url,
      logo: `${url}/icon.svg`,
      slogan: "Your brand, directed.",
      description:
        "A remote creative studio that directs, makes and runs Meta and TikTok ads for online consumer brands.",
      email: "hello@creativedirectionhub.com",
      areaServed: "Worldwide",
      founder: { "@type": "Person", name: "Willie Bernoudy", jobTitle: "Founder and Creative Director" },
      knowsAbout: ["Paid social creative", "Meta ads", "TikTok ads", "UGC", "AI video production", "Creative direction"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Plans",
        itemListElement: ["Creative Sprint", "Growth Retainer", "Commercial Production", "Free Ad Check"].map((n) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: n },
        })),
      },
    },
    { "@type": "WebSite", "@id": `${url}/#site`, url, name: "Creative Direction Hub", publisher: { "@id": `${url}/#org` } },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        {children}
        <Analytics />
        <Pixels />
      </body>
    </html>
  );
}
