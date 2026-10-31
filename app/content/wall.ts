import { unstable_cache } from "next/cache";
import type { Tape } from "./wall-data";
export { PROMPTS, FIRST_TAPE } from "./wall-data";
export type { Tape } from "./wall-data";

// The wall: visitors sign a strip of gaffer tape. Stored in the Make data store "CDH wall",
// read and written through one Make webhook (scenario "CDH website: the wall (sign + read)").
export const WALL_HOOK = process.env.MAKE_WALL_URL || "https://hook.us2.make.com/mn2jy15ca6lmf7padhsmyswmg9fxt2o5";

export const getWall = unstable_cache(
  async (): Promise<Tape[]> => {
    try {
      const res = await fetch(WALL_HOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "read" }),
        signal: AbortSignal.timeout(10000),
        cache: "no-store",
      });
      const data = JSON.parse(await res.text());
      if (!Array.isArray(data)) return [];
      return data
        .filter((t) => t && t.name && t.line)
        .map((t) => ({ k: String(t.k), name: String(t.name), line: String(t.line), prompt: String(t.prompt || ""), from: t.from ? String(t.from) : "", tilt: Number(t.tilt) || 0, at: String(t.at || "") }))
        .slice(0, 120);
    } catch {
      return [];
    }
  },
  ["cdh-wall"],
  { tags: ["wall"], revalidate: 21600 },
);
