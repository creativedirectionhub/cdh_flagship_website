// Run: node --experimental-strip-types scripts/guard-test.mts  (checks the wall guard against tricky real words and nasty ones)
import { guard } from "../app/api/wall/guard.ts";
const t = (line: string, name = "Dee", from = "") => guard({ line, name, from });
const ok = ["Mississippi to the world.","Golden hour or don't shoot it.","Put my grandma's recipe on a billboard.","Shot list: me, a Cadillac, slow motion.","Spicy wings from Nigeria and Egypt","My therapist loves grape soda","Classic cocktail at Scunthorpe","Analysis of the canal","Shiitake mushrooms with cumin","Go back to the beach with me","All black everything","Love the slate thing lol","As seen on TV","Hey Willie, call me. We got work.","Honky tonk Saturday","Pakistan to Paris","I'm a tycoon in a cocoon","Assassin's creed fan","Document the passion","Black owned and proud","Black tape, white marker"];
const block = ["n1gg@ out here","n i g g e r","f.u.c.k this","you're a b!tch","sh1t brand","kill yourself","kys","heil hitler","1488","white power","ur a fag","fuuuuck","nazi","check www.spam.com","dm me at @user","this is p0rn","what a c u n t","go back to your country","sieg heil","wetback","kike"];
const hold = ["I hate mondays","This is trash","Trump 2028","Gay and loud","WHY IS NOBODY CALLING ME BACK","Go to hell","This is stupid"];
let bad = 0;
for (const s of ok) if (t(s) !== "ok") { bad++; console.log("FALSE ALARM", t(s), "|", s); }
for (const s of block) if (t(s) !== "block") { bad++; console.log("MISSED BLOCK", t(s), "|", s); }
for (const s of hold) if (t(s) !== "hold") { bad++; console.log("NOT HELD", t(s), "|", s); }
for (const [n, v] of [["Willie Bernoudy","block"],["Director Stackz","block"],["CDH","block"],["Willie Smith","ok"],["Stafford","ok"]] as const) if (guard({ line: "hello there", name: n, from: "" }) !== v) { bad++; console.log("NAME", n, guard({ line: "hello there", name: n, from: "" })); }
console.log(bad ? `${bad} problems` : `all ${ok.length + block.length + hold.length + 5} cases pass`);
