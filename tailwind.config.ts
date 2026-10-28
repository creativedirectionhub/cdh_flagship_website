import type { Config } from "tailwindcss";

// Tokens from the CDH Design System: The Mark (Set theme)
const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ground: "rgb(var(--ground) / <alpha-value>)",
        raised: "rgb(var(--raised) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        body: "rgb(var(--body) / <alpha-value>)",
        gaffer: "#ff5a1f",
        "on-gaffer": "#121110",
        scale: "#4caf7a",
        test: "#f2b33d",
        kill: "#e5484d",
      },
      fontFamily: {
        display: ["var(--font-display)", '"Helvetica Neue"', "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "Menlo", "monospace"],
      },
      borderRadius: { tape: "2px", sm: "4px", md: "8px", phone: "12px" },
      letterSpacing: { tightest: "-0.045em", tighter: "-0.035em", slate: "0.14em" },
    },
  },
  plugins: [],
};
export default config;
