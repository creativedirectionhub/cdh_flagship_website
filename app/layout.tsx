import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import Pixels from "./components/Pixels";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import { display, mono } from "./fonts";
import { site } from "./content/services";
import "./globals.css";

const url = site.url;

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: { default: "Creative Direction Hub · We put brands on their mark.", template: "%s · Creative Direction Hub" },
  description: "The creative department for growing businesses, led by creative director Willie Bernoudy. Brand, campaigns, content, digital and AI art direction for consumer brands, personal brands and hospitality.",
  openGraph: { siteName: "Creative Direction Hub", type: "website", url },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "./" },
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
      slogan: site.tagline,
      description: site.positioning,
      email: site.email,
      areaServed: "Worldwide",
      founder: { "@type": "Person", "@id": `${url}/about#willie`, name: "Willie Bernoudy", jobTitle: "Founder and Creative Director" },
      knowsAbout: ["Brand identity", "Creative direction", "Campaigns", "Paid social", "Photography", "Brand film", "Web design", "AI art direction"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: ["Brand", "Campaigns and ads", "Content and production", "Digital", "AI art direction", "Free Creative Audit"].map((n) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: n } })),
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
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-gaffer focus:px-4 focus:py-3 focus:text-on-gaffer">Skip to content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <Analytics />
        <Pixels />
      </body>
    </html>
  );
}
