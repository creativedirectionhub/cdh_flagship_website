import type { Metadata, Viewport } from "next";
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
