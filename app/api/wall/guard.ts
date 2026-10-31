// The wall's guard. Server only. Three outcomes:
//   "block": slurs, hate, sexual content, profanity, threats, links, impersonation. Never saved.
//   "hold":  borderline words that can be fine or ugly in context. Saved hidden until Willie OKs it.
//   "ok":    goes up right away.
// Text is normalized first so l33t, s p a c e d or d.o.t.t.e.d letters, repeats, look-alike letters
// and hidden characters don't slip through. Checks run word by word, with a safe-list, so real words
// like Nigeria, grape, therapist, Scunthorpe, analysis, spicy, Egypt or Pakistan stay clean.

const LEET: Record<string, string> = { "0": "o", "1": "i", "!": "i", "|": "i", "3": "e", "4": "a", "@": "a", "5": "s", "$": "s", "7": "t", "+": "t", "8": "b", "9": "g", "6": "g" };
const HOMOGLYPH: Record<string, string> = { "а": "a", "е": "e", "о": "o", "р": "p", "с": "c", "х": "x", "у": "y", "і": "i", "ј": "j", "ѕ": "s", "к": "k", "м": "m", "н": "h", "т": "t", "в": "b", "ԁ": "d", "ɡ": "g" };

function base(s: string) {
  return s
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[​-‏⁠﻿]/g, "")
    .toLowerCase()
    .replace(/./g, (c) => HOMOGLYPH[c] ?? LEET[c] ?? c)
    .replace(/honky[\s-]*tonk/g, "honkytonk");
}
const dedupe = (w: string) => w.replace(/(.)\1+/g, "$1"); // "fuuuck" -> "fuck"... and "ass" -> "as": stems only
const two = (w: string) => w.replace(/(.)\1{2,}/g, "$1$1"); // "asssss" -> "ass": whole-word checks

/** Words, plus runs of single letters joined back up ("n i g" / "f.u.c.k" / "s-h-i-t"). */
function tokens(s: string) {
  const raw = s.split(/[^a-z]+/).filter(Boolean);
  const out = [...raw];
  let run = "";
  for (const w of raw) { if (w.length === 1) run += w; else { if (run.length > 1) out.push(run); run = ""; } }
  if (run.length > 1) out.push(run);
  // Words split by a stray space ("fu ck"): try each neighbor pair joined.
  for (let i = 0; i < raw.length - 1; i++) if (raw[i].length <= 4 && raw[i + 1].length <= 4 && raw[i].length + raw[i + 1].length >= 4) out.push(raw[i] + raw[i + 1]);
  return out.map(two);
}

// Real words that contain a blocked stem. Removed before checking.
const SAFE = ["nigeria", "nigerian", "nigerians", "niger", "sniger", "sniggering", "scunthorpe", "shitake", "shiitake", "retardant", "flameretardant", "cocktail", "cockpit", "peacock", "hancock", "babcock", "hitchcock", "dickens", "dickinson", "pussycat", "pussywillow", "assassin", "bassist", "classic", "passion", "therapist", "grape", "drape", "scrape", "analysis", "analyst", "canal", "banal", "spicy", "spice", "egypt", "egyptian", "pakistan", "pakistani", "cumin", "document", "circumstance", "titan", "title", "titanic", "constitution", "hoedown", "shoe", "phoenix", "honkytonk", "cracker", "crackers", "coconut", "cocoon", "raccoon", "tycoon", "japan", "japanese"].map(two); // compared as spelled, so a slur can't hide behind a place name

// Stems blocked inside any word (after the safe-list).
const BLOCK_STEMS = [
  "niger", "niga", "nigah", "negro", "jigabo", "porchmonkey", "junglebuny", "pickaniny", "darkie", "golywog", "golliwog",
  "chink", "zipperhead", "wetback", "beaner", "towelhead", "raghead", "cameljock", "redskin", "squaw", "halfbred", "chinaman",
  "faget", "fagot", "tranie", "trany", "shemale", "retard", "spastic", "mongoloid",
  "hitler", "nazi", "kukluxklan",
  "pusy", "vagina", "penis", "dildo", "blowjob", "handjob", "rimjob", "cumshot", "jiz", "orgasm", "porn", "hentai", "nudes", "onlyfans", "titie", "milf", "molest", "incest", "bestiality", "pedophil",
  "fuck", "fuk", "fck", "fvck", "phuck", "motherfu", "shit", "bitch", "biatch", "cunt", "bastard", "ashole", "dumbas", "jackas", "dickhead", "douche", "twat", "wanker", "whore", "slut",
].map(dedupe);
// Whole words only (short or ambiguous on their own).
const BLOCK_WORDS = [
  "nig", "nigs", "coon", "coons", "spic", "spics", "spick", "gook", "gooks", "kike", "kikes", "heeb", "heebs", "wog", "wogs", "paki", "pakis", "jap", "japs", "gyp", "gypo", "sambo", "kafir", "kaffir",
  "fag", "fags", "dyke", "dykes", "lesbo",
  "kkk", "kk", "heil",
  "ass", "asses", "arse", "dick", "dicks", "cock", "cocks", "cum", "tit", "tits", "boob", "boobs", "hoe", "hoes", "thot", "sex", "sexy", "nude", "anal", "rape", "raped", "rapes", "raping", "rapist", "pedo", "pedos",
  "kys",
];
// Phrases checked across the whole squashed line.
const BLOCK_PHRASES = ["killyourself", "kilyourself", "gokilyourself", "kilurself", "ihopeyoudie", "hopeyoudie", "whitepower", "siegheil", "heilhitler", "gasthejews", "whitesuprem", "sendthemback", "gobacktoyourcountry", "gobacktowhereyou"].map(dedupe);
// Can be fine or ugly in context: held for Willie's OK.
const HOLD_WORDS = [
  "hate", "hates", "hater", "stupid", "idiot", "dumb", "ugly", "trash", "garbage", "honky", "honkey", "loser", "sucks", "suck", "lame", "fake", "scam", "scammer", "ho", "homo", "gypsy", "fraud", "worst", "clown", "cracker", "crackers", "lynch",
  "asian", "mexican", "latino", "latina", "arab", "muslim", "islam", "jew", "jews", "jewish", "christian", "gay", "lesbian", "trans", "queer", "race", "racist", "racism", "illegal", "illegals", "immigrant", "immigrants", "ghetto", "hood", "thug", "thugs",
  "drug", "drugs", "weed", "crack", "meth", "gun", "guns", "dead", "death", "die", "kill", "killed", "murder", "damn", "hell", "crap", "piss", "pissed", "freak", "weirdo", "bomb",
  "trump", "biden", "harris", "maga", "democrat", "democrats", "republican", "republicans", "liberal", "liberals",
];

// Nobody signs as Willie Bernoudy or CDH. Other Willies are welcome.
const IMPERSONATE_LONG = ["wiliebernoudy", "bernoudy", "directorstackz", "creativedirectionhub"];
const IMPERSONATE_EXACT = ["cdh", "admin", "moderator", "oficial", "cdhteam", "cdhstaf"];

const LINK = /(https?:|www\.|\.(com|net|org|io|co|xyz|ru|ly|app|me|gg|tv|biz|info|link)\b|@\w|\d{6,}|\b(1488|14\s*88|14\s*words)\b)/i;

export type Verdict = "ok" | "hold" | "block";

export function guard(fields: { line: string; name: string; from: string }): Verdict {
  const all = `${fields.name} ${fields.line} ${fields.from}`;
  if (LINK.test(all)) return "block";
  const b = base(all);
  const toks = tokens(b);
  const flat = toks.filter((t) => !SAFE.includes(t)).map(dedupe);
  if (flat.some((t) => BLOCK_STEMS.some((s) => t.includes(s)))) return "block";
  if (toks.some((t) => BLOCK_WORDS.includes(t))) return "block";
  const line = dedupe(b.replace(/[^a-z]/g, ""));
  if (BLOCK_PHRASES.some((p) => line.includes(p))) return "block";
  const nm = dedupe(base(fields.name).replace(/[^a-z]/g, ""));
  if (IMPERSONATE_LONG.some((s) => nm.includes(s)) || IMPERSONATE_EXACT.includes(nm)) return "block";
  if (toks.some((t) => HOLD_WORDS.includes(t))) return "hold";
  const ln = fields.line;
  if (/(.)\1{5,}/.test(ln) || (ln.replace(/[^A-Za-z]/g, "").length > 12 && ln === ln.toUpperCase())) return "hold";
  return "ok";
}
