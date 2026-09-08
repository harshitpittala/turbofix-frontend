const fs = require("fs");

function collapse(name) { return name.toLowerCase().replace(/[^a-z0-9]/g, ""); }

// Rebuild sectionPrimary exactly like build-location-inventory.js does:
// the first name literally listed under each "## SECTION" header.
const raw = fs.readFileSync("scripts/master-location-list.txt", "utf8");
const lines = raw.split(/\r?\n/);
let currentSection = null;
const sectionPrimary = new Map();
for (const rawLine of lines) {
  const line = rawLine.trim();
  if (!line) continue;
  if (line.startsWith("## ")) { currentSection = line.slice(3).trim(); continue; }
  if (!sectionPrimary.has(currentSection)) sectionPrimary.set(currentSection, line);
}

const invRecords = JSON.parse(fs.readFileSync("scripts/audit-records.json", "utf8"));
const pubEntries = JSON.parse(fs.readFileSync("scripts/audit-published.json", "utf8"));
const pubBySlug = new Map(pubEntries.map((e) => [e.slug, e]));
const pubByCollapsedName = new Map(pubEntries.map((e) => [collapse(e.name), e]));

const suspicious = [];
for (const r of invRecords) {
  if (r.cls !== "PUBLISHED") continue;
  const pub = pubByCollapsedName.get(collapse(r.name));
  if (!pub) continue;
  const actualParentSlug = pub.nearbyAreas[0] || null;
  const actualParent = actualParentSlug ? pubBySlug.get(actualParentSlug) : null;

  // Derive the section-implied parent exactly like the real script does for
  // drafts: first section (excluding ADDITIONAL LOCALITIES) whose primary
  // name resolves to a DIFFERENT published location.
  let impliedParentName = null;
  for (const s of r.sections) {
    if (s === "ADDITIONAL LOCALITIES") continue;
    const primaryName = sectionPrimary.get(s);
    if (!primaryName) continue;
    const primaryPub = pubByCollapsedName.get(collapse(primaryName));
    if (primaryPub && collapse(primaryPub.name) !== collapse(r.name)) {
      impliedParentName = primaryPub.name;
      break;
    }
  }
  if (!impliedParentName) continue; // no specific-locality claim made by the source list
  if (!actualParent || collapse(actualParent.name) !== collapse(impliedParentName)) {
    suspicious.push({
      name: r.name,
      slug: r.slug,
      sourceListImpliedParent: impliedParentName,
      actualCurrentParent: actualParent ? actualParent.name : "(none / no nearbyAreas)",
    });
  }
}
console.log("Published locations where the source-list-implied parent (a specific locality name) differs from the current verified parent:", suspicious.length);
console.log(JSON.stringify(suspicious, null, 2));
