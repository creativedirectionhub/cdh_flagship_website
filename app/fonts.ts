import localFont from "next/font/local";

// Self-hosted and preloaded, so the headline paints in its real face on first load.
export const display = localFont({
  src: [
    { path: "./fonts/schibsted-grotesk-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/schibsted-grotesk-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/schibsted-grotesk-latin-800-normal.woff2", weight: "800", style: "normal" },
    { path: "./fonts/schibsted-grotesk-latin-900-normal.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

export const mono = localFont({
  src: [
    { path: "./fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "Menlo", "monospace"],
});
