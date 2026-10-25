// Runs before `next build` (npm "prebuild"). Copies the spec ad images from the
// Higgsfield CDN into /public/spec so the site serves them from its own domain.
// If a download fails, that ad keeps its CDN address, so the build never breaks.
import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";

const CDN = "https://d2ol7oe51mr4n9.cloudfront.net/user_35SNUXuDx8PwiiQXCbLt8W4KG7m";
const ids = [
  "e62c2d53-bfca-4b48-aacc-92e0c68746a1",
  "8e624c80-58ec-4655-9700-aa71c700e180",
  "bfa16e71-9072-4a89-bffa-42265a4d202d",
  "9f3d6f5d-d3ee-4910-94f8-ec4e2645bbc0",
  "25db57c4-d870-41e4-95be-10c133e44051",
  "71e3088a-397b-493b-98a0-bad76fd851ef",
  "e9c99231-6a9a-4fb4-8617-5b03e0887abc",
  "483c5ad5-3edc-47b7-86c3-adaf99d5c629",
  "33b83fbc-c558-481b-89fb-a8458f497e0a",
  "5b1c6e75-14a0-4954-9816-4be545b34a12",
];

const dir = path.join(process.cwd(), "public", "spec");
await mkdir(dir, { recursive: true });
const local = {};

for (const id of ids) {
  const file = path.join(dir, `${id}.png`);
  try {
    await access(file);
    local[id] = true;
    continue;
  } catch {}
  try {
    const res = await fetch(`${CDN}/${id}.png`, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(String(res.status));
    await writeFile(file, Buffer.from(await res.arrayBuffer()));
    local[id] = true;
  } catch (e) {
    console.warn(`spec ad ${id}: kept on CDN (${e.message})`);
  }
}

await writeFile(path.join(process.cwd(), "app", "components", "spec-local.json"), JSON.stringify(local, null, 1));
console.log(`spec ads on own domain: ${Object.keys(local).length}/${ids.length}`);
