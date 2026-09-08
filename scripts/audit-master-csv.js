const fs = require("fs");

function collapse(name) { return name.toLowerCase().replace(/[^a-z0-9]/g, ""); }
function csvEsc(s) {
  s = String(s ?? "");
  s = s.replace(/"/g, '""');
  return /[",\n]/.test(s) ? `"${s}"` : s;
}

const invRecords = JSON.parse(fs.readFileSync("scripts/audit-records.json", "utf8"));
const pubEntries = JSON.parse(fs.readFileSync("scripts/audit-published.json", "utf8"));
const pubBySlug = new Map(pubEntries.map((e) => [e.slug, e]));

const rows = [[
  "originalName", "normalizedName", "currentName", "slug", "status", "classification",
  "parent", "zone", "verified", "indexable", "inSitemap", "canonical", "pageExists",
  "aliasOf", "reason", "sourceSection", "notes",
]];

for (const r of invRecords) {
  const originalName = r.variants[0] || r.name;
  const normalizedName = collapse(r.name);
  const currentName = r.name;
  const slug = r.slug;
  const status = r.status;
  const classification = r.cls;
  const pub = r.cls === "PUBLISHED" ? pubBySlug.get(r.slug) : null;
  const parent = classification === "PUBLISHED"
    ? (pub && pub.nearbyAreas[0] ? (pubBySlug.get(pub.nearbyAreas[0]) || {}).name || "" : "")
    : r.parent;
  const zone = classification === "PUBLISHED" ? (pub ? pub.zone : "") : r.zoneHint;
  const verified = classification === "PUBLISHED" || classification === "ALIAS" ? "true" : "false";
  const indexable = classification === "PUBLISHED" ? "true" : "false";
  const inSitemap = classification === "PUBLISHED" ? "true" : "false";
  const canonical = classification === "PUBLISHED" ? `https://turbofix.in/locations/${r.slug}` : "";
  const pageExists = classification === "PUBLISHED" ? "true" : "false";
  const aliasOf = r.alias || "";
  const reason = r.reason;
  const sourceSection = r.sections.join(" | ");
  const notes = r.variants.length > 1 ? `Spelling variants: ${r.variants.join(" / ")}` : "";

  rows.push([
    originalName, normalizedName, currentName, slug, status, classification,
    parent, zone, verified, indexable, inSitemap, canonical, pageExists,
    aliasOf, reason, sourceSection, notes,
  ]);
}

const csv = rows.map((r) => r.map(csvEsc).join(",")).join("\n");
fs.writeFileSync("scripts/master-location-status-audit.csv", csv);
console.log(`Wrote ${rows.length - 1} data rows to scripts/master-location-status-audit.csv`);
