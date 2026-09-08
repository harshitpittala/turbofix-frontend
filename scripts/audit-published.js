const fs = require("fs");

const src = fs.readFileSync("data/locations.ts", "utf8").replace(/\r\n/g, "\n");
const arrayStart = src.indexOf("export const locationData");
const bodyStart = src.indexOf("[", arrayStart);
const bodyEnd = src.indexOf("\n];", bodyStart);
const body = src.slice(bodyStart, bodyEnd);
const blocks = body.split(/\n  \},/).map((b) => b.trim()).filter(Boolean);

const entries = blocks.map((b) => {
  const slug = (b.match(/slug: "([^"]+)"/) || [])[1] || "";
  const name = (b.match(/name: "([^"]+)"/) || [])[1] || "";
  const pincode = (b.match(/pincode: "([^"]+)"/) || [])[1] || "";
  const zone = (b.match(/zone: "([^"]+)"/) || [])[1] || "";
  const type = (b.match(/type: "([^"]+)"/) || [])[1] || "";
  const intro = (b.match(/intro: "([^"]+)"/) || [])[1] || "";
  const context = (b.match(/context: "([^"]+)"/) || [])[1] || "";
  const nearbyM = b.match(/nearbyAreas: \[([^\]]*)\]/);
  const nearbyAreas = nearbyM ? [...nearbyM[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]) : [];
  const hasStatusDraft = /status:\s*"draft"/.test(b);
  return { slug, name, pincode, zone, type, intro, context, nearbyAreas, hasStatusDraft };
});

fs.writeFileSync("scripts/audit-published.json", JSON.stringify(entries, null, 2));

console.log("Total published entries:", entries.length);

const publishedSlugs = new Set(entries.map((e) => e.slug));

// Duplicate slug / name / intro
const slugCounts = {}, nameCounts = {}, introCounts = {};
for (const e of entries) {
  slugCounts[e.slug] = (slugCounts[e.slug] || 0) + 1;
  nameCounts[e.name] = (nameCounts[e.name] || 0) + 1;
  introCounts[e.intro] = (introCounts[e.intro] || 0) + 1;
}
const dupSlugs = Object.entries(slugCounts).filter(([, c]) => c > 1);
const dupNames = Object.entries(nameCounts).filter(([, c]) => c > 1);
const dupIntros = Object.entries(introCounts).filter(([, c]) => c > 1);
console.log("Duplicate slugs:", dupSlugs.length, dupSlugs);
console.log("Duplicate names (=> duplicate titles):", dupNames.length, dupNames);
console.log("Duplicate intros:", dupIntros.length, dupIntros);

// Broken nearbyAreas links
let brokenLinks = [];
for (const e of entries) {
  for (const n of e.nearbyAreas) {
    if (!publishedSlugs.has(n)) brokenLinks.push({ from: e.slug, to: n });
  }
}
console.log("Broken nearbyAreas links:", brokenLinks.length, brokenLinks);

// Any entry with status: "draft" leaking into locationData
const draftLeaks = entries.filter((e) => e.hasStatusDraft);
console.log("Entries with status:draft still in locationData:", draftLeaks.length, draftLeaks.map((e) => e.slug));

// Policy wording scan across intro/context (rendered body content)
const riskyTerms = [
  "repair", "technical support", "tech support", "official support", "authorized support",
  "manufacturer support", "apple support", "samsung support", "xiaomi support", "oneplus support",
  "google support", "official service center", "authorized service center", "authorised service centre",
];
const wordingHits = [];
for (const e of entries) {
  const combined = (e.intro + " " + e.context).toLowerCase();
  for (const term of riskyTerms) {
    if (combined.includes(term)) wordingHits.push({ slug: e.slug, term });
  }
}
console.log("Policy-risk wording hits in intro/context:", wordingHits.length, wordingHits);

// Semantic similarity (Jaccard on intro word sets, words > 3 chars)
function wordset(s) {
  return new Set(s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter((w) => w.length > 3));
}
function jaccard(a, b) {
  const inter = [...a].filter((x) => b.has(x)).length;
  const union = new Set([...a, ...b]).size;
  return inter / union;
}
const sets = entries.map((e) => ({ ...e, ws: wordset(e.intro) }));
const pairs = [];
for (let i = 0; i < sets.length; i++) {
  for (let j = i + 1; j < sets.length; j++) {
    const sim = jaccard(sets[i].ws, sets[j].ws);
    if (sim > 0.25) pairs.push({ a: sets[i].name, b: sets[j].name, sim });
  }
}
pairs.sort((a, b) => b.sim - a.sim);
console.log("Similarity pairs > 0.25:", pairs.length);
console.log("Top 20:", pairs.slice(0, 20).map((p) => `${p.sim.toFixed(3)} ${p.a} <-> ${p.b}`));

// Parent (zone) sanity: entries whose nearbyAreas[0] parent zone differs from own zone (informational only)
const zoneMismatches = [];
for (const e of entries) {
  if (e.nearbyAreas.length === 0) continue;
  const parent = entries.find((x) => x.slug === e.nearbyAreas[0]);
  if (parent && parent.zone !== e.zone) zoneMismatches.push({ slug: e.slug, zone: e.zone, parentSlug: parent.slug, parentZone: parent.zone });
}
console.log("Zone mismatches vs first nearbyAreas parent:", zoneMismatches.length, JSON.stringify(zoneMismatches));
