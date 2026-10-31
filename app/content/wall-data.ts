// Prompts and the first tape for the wall. Safe for the browser.
export type Tape = { k: string; name: string; line: string; prompt: string; from?: string; tilt: number; at: string; own?: boolean };

export const PROMPTS = [
  "Your brand in three words.",
  "What would you shoot with no budget?",
  "The song on your brand's trailer.",
  "Where would you film your next ad?",
  "The word your customers use for you.",
  "The billboard you'd put up tomorrow.",
  "A brand you secretly love.",
];

// Willie's own tape, so the wall is never bare. Real, and labeled as his.
export const FIRST_TAPE: Tape = {
  k: "willie", name: "Willie Bernoudy", from: "CDH", prompt: "Your brand in three words.", line: "Bold. Southern. Directed.", tilt: -2, at: "2026-10-30T00:00:00Z",
};

