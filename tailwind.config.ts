import type { Config } from "tailwindcss";

// Tokens from the CDH Design System: The Mark (Set theme)
const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ground: "#121110",
        raised: "#1b1a18",
        surface: "#2a2826",
        line: "#3a3733",
        ink: "#efe9df",
        muted: "#a8a196",
        gaffer: "#ff5a1f",
        "on-gaffer": "#121110",
        scale: "#4caf7a",
        test: "#f2b33d",
        kill: "#e5484d",
      },
      fontFamily: {
        display: ['"Schibsted Grotesk"', '"Helvetica Neue"', "Arial", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "Menlo", "monospace"],
      },
      borderRadius: { tape: "2px", sm: "4px", md: "8px", phone: "12px" },
      letterSpacing: { tightest: "-0.045em", tighter: "-0.035em", slate: "0.14em" },
    },
  },
  plugins: [],
};
export default config;
