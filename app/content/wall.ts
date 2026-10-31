import { unstable_cache } from "next/cache";
import { ROLLS, type Tape } from "./wall-data";
export { FIRST_TAPE } from "./wall-data";
export type { Tape } from "./wall-data";

// The wall: visitors sign a strip of gaffer tape. Stored in the Make data store "CDH wall",
// read and written through one Make webhook (scenario "CDH website: the wall (sign + read)").
export const WALL_HOOK = process.env.MAKE_WALL_URL || "https://hook.us2.make.com/mn2jy15ca6lmf7padhsmyswmg9fxt2o5";

const cached = unstable_cache(
  async (): Promise<Tape[]> => {
    try {
      const res = await fetch(WALL_HOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "read" }),
        signal: AbortSignal.timeout(10000),
        next: { tags: ["wall"], revalidate: 21600 },
      });
      if (!res.ok) throw new Error(`wall read ${res.status}`);
      const data = JSON.parse(await res.text());
      if (!Array.isArray(data)) throw new Error("wall read: not a list");
      return data
        .filter((t) => t && t.name && t.line)
        .map((t): Tape => ({ k: String(t.k), name: String(t.name), line: String(t.line), from: t.from ? String(t.from) : "", color: (String(t.color) in ROLLS ? String(t.color) : "orange") as Tape["color"], x: Number(t.x) || 0, y: Number(t.y) || 0, tilt: Number(t.tilt) || 0, at: String(t.at || "") }))
        .slice(0, 120);
    } catch (e) {
      console.error(e);
      throw e; // never cache a failed read
    }
  },
  ["cdh-wall"],
  { tags: ["wall"], revalidate: 21600 },
);

export async function getWall(): Promise<Tape[]> {
  try { return await cached(); } catch { return []; }
}
