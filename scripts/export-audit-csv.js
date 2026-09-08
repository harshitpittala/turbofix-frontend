// One-off export: turns data/locationInventory.ts into a flat CSV audit
// covering every one of the 593 distinct supplied locations, for review
// outside the app (spreadsheet, sharing, archiving). Run with
// `node scripts/export-audit-csv.js` any time after regenerating the
// inventory.
const fs = require("fs");
const path = require("path");

const src = fs.readFileSync(path.join(__dirname, "..", "data", "locationInventory.ts"), "utf8");
const blocks = src.split("\n  {\n").slice(1);

function csvEsc(s) {
  s = String(s ?? "");
  s = s.replace(/"/g, '""');
  return /[",\n]/.test(s) ? `"${s}"` : s;
}

const rows = [["Name", "OriginalSourceSections", "Parent", "Zone", "Classification", "Verified", "Indexable", "Sitemap", "AliasOf", "PageURL", "Reason"]];

for (const b of blocks) {
  const name = (b.match(/name: "([^"]*)"/) || [])[1] || "";
  const sectionsRaw = (b.match(/sourceSections: \[([^\]]*)\]/) || [])[1] || "";
  const sections = [...sectionsRaw.matchAll(/"([^"]*)"/g)].map((m) => m[1]).join(" | ");
  const parentM = (b.match(/parentName: (null|"[^"]*")/) || [])[1] || "null";
  const parent = parentM === "null" ? "" : parentM.replace(/^"|"$/g, "");
  const zone = (b.match(/zoneHint: "([^"]*)"/) || [])[1] || "";
  const status = (b.match(/status: "([^"]*)"/) || [])[1] || "";
  const verified = (b.match(/verified: (true|false)/) || [])[1] || "";
  const indexable = (b.match(/indexable: (true|false)/) || [])[1] || "";
  const sitemap = (b.match(/inSitemap: (true|false)/) || [])[1] || "";
  const aliasM = (b.match(/aliasOf: (null|"[^"]*")/) || [])[1] || "null";
  const alias = aliasM === "null" ? "" : aliasM.replace(/^"|"$/g, "");
  const viable = (b.match(/viable: (true|false)/) || [])[1] || "true";
  const publishedSlugM = (b.match(/publishedSlug: (null|"[^"]*")/) || [])[1] || "null";
  const url = publishedSlugM === "null" ? "" : `https://turbofix.in/locations/${publishedSlugM.replace(/^"|"$/g, "")}`;
  const reasonM = b.match(/reason: "((?:[^"\\]|\\.)*)"/);
  const reason = reasonM ? reasonM[1].replace(/\\"/g, '"') : "";

  let classification = "Draft — needs verification";
  if (alias) classification = "Alias / Duplicate";
  else if (status === "published") classification = "Published";
  else if (viable === "false") classification = "Sub-unit (not standalone)";

  rows.push([name, sections, parent, zone, classification, verified, indexable, sitemap, alias, url, reason]);
}

const csv = rows.map((r) => r.map(csvEsc).join(",")).join("\n");
const outPath = path.join(__dirname, "full-audit.csv");
fs.writeFileSync(outPath, csv);
console.log(`Wrote ${rows.length - 1} data rows to ${outPath}`);
